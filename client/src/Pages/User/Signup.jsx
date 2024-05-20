import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { BsPersonCircle } from 'react-icons/bs'
import { createAccount } from '../../Redux/Slices/AuthSlice';
import { useDispatch } from 'react-redux';
import { toast } from "react-hot-toast"

const Signup = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate()

    const [previewImage, setPreviewImage] = useState("")
    // const [selectedRole, setSelectedRole] = useState("USER") // Default role is "USER"

    const [signupData, setSignupData] = useState({
        fullName: "",
        email: "",
        password: "",
        role: "",
        avatar: ""
    });

    function handleUserInput(e) {
        const { name, value } = e.target
        setSignupData({
            ...signupData,
            [name]: value
        })
    }

    function getImage(event) {
        event.preventDefault();

        // getting the image
        const uploadImage = event.target.files[0]

        if (uploadImage) {
            setSignupData({
                ...signupData,
                avatar: uploadImage
            })
            const fileReader = new FileReader();
            fileReader.readAsDataURL(uploadImage)
            fileReader.addEventListener("load", function () {
                // console.log(this.result);
                setPreviewImage(this.result);
            })
        }
    }

    async function createNewAccount(event) {
        event.preventDefault();
        if (!signupData.email || !signupData.password || !signupData.fullName || !signupData.avatar) {
            toast.error("Please fill all the details")
        }
        // checking name field length
        if (signupData.fullName.length < 5) {
            toast.error("Name should be atleast of 5 characters")
            return;
        }

        // checking valid email id
        if (!signupData.email.match(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)) {
            toast.error("Invalid email id")
            return;
        }

        // checking password validation
        if (!signupData.password.match(/^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/)) {
            toast.error("Password should be 6-16 character long with atleast a number and special character")
            return;
        }

        // checking mobile Number validation
        if (!signupData.mobileNumber.match(/^[6-9]\d{9}$/)) {
            toast.error("Enter Valid Mobile Number")
            return;
        }

        const formData = new FormData();

        formData.append("fullName", signupData.fullName);
        formData.append("email", signupData.email);
        formData.append("mobileNumber", signupData.mobileNumber);
        formData.append("password", signupData.password);
        formData.append("avatar", signupData.avatar);
        formData.append("role", signupData.role); // Append selected role to the form data

        // dispatch create account action
        const response = await dispatch(createAccount(formData))
        console.log(response);

        if (response?.payload?.success)
            navigate("/login");

        setSignupData({
            fullName: "",
            email: "",
            mobileNumber: "",
            password: "",
            role: "",
            avatar: ""
        });
        setPreviewImage("");
    }

    return (
        <section className="bg-gray-50 dark:bg-gray-900">
            <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
                <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
                    <div className="p-6 space-y-2 md:space-y-6 sm:p-8">
                        <form noValidate onSubmit={createNewAccount} className="space-y-4 md:space-y-6">
                            <h1 className="text-xl flex items-center justify-center font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                                Registration Page
                            </h1>
                            <label htmlFor="image_uploads" className='cursor-pointer'>
                                {previewImage ? (
                                    <img className='w-24 h-24 rounded-full m-auto' src={previewImage} />
                                ) : (
                                    <BsPersonCircle className='w-24 h-24 rounded-full m-auto' />
                                )
                                }
                            </label>
                            <input
                                onChange={getImage}
                                className="hidden " // display var show jhala nahi pahije mhanun hidden kel aahe
                                type='file'
                                name="image_uploads"
                                id="image_uploads"
                                accept=".jpg, .jpeg, .png, .webp, .svg"
                            />
                            <div>
                                <label htmlFor="fullName" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your FullName</label>
                                <input
                                    type="text"
                                    required
                                    name="fullName"
                                    id="fullName"
                                    placeholder="Enter your FullName"
                                    onChange={handleUserInput}
                                    value={signupData.fullName}
                                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
                            </div>
                            <div>
                                <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your email</label>
                                <input
                                    type="email"
                                    required
                                    name="email"
                                    id="email"
                                    placeholder="name@company.com"
                                    onChange={handleUserInput}
                                    value={signupData.email}
                                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
                            </div>

                            <div>
                                <label htmlFor="mobileNumber" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Enter Your Whatsapp Number</label>
                                <input
                                    type="tel"
                                    required
                                    name="mobileNumber"
                                    id="mobileNumber"
                                    placeholder="8888888888"
                                    maxLength={10}
                                    onChange={handleUserInput}
                                    value={signupData.mobileNumber}
                                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
                            </div>
                            <div>
                                <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
                                <input
                                    type="password"
                                    name="password"
                                    id="password"
                                    required
                                    onChange={handleUserInput}
                                    value={signupData.password}
                                    placeholder="••••••••" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
                            </div>
                            <div>
                                <label htmlFor="role" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Select Role</label>
                                <select
                                    id="role"
                                    name="role"
                                    value={signupData.role}
                                    onChange={handleUserInput}
                                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                                    <option value="USER">USER</option>
                                    <option value="ADMIN">ADMIN</option>
                                </select>
                            </div>
                            <button type="submit" className="w-full text-white bg-red-600 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">Create an account</button>
                            <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                                Already have an account?
                                <Link
                                    to="/login"
                                    className="font-medium text-red-600 hover:underline dark:text-primary-500 ml-1"
                                >Login here</Link>
                            </p>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Signup
