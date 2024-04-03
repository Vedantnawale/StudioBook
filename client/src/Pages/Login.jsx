import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { login } from '../Redux/Slices/AuthSlice';
import { toast } from "react-hot-toast"

const Login = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate()

   
    const [loginData, setLoginData] = useState({
        email: "",
        password: "",
    });

    function handleUserInput(e) {
        const { name, value } = e.target
        setLoginData({
            ...loginData,
            [name]: value
        })
    }


    async function onLogin(event) {
        event.preventDefault();
        if (!loginData.email || !loginData.password) {
            toast.error("Please fill all the details")
        }
        // TODO:  user login without their credentials
        // if(loginData.password !==  ) {
        //     toast.error("Password does not match")
        // }

        // dispatch create account action
        const response = await dispatch(login(loginData))
        console.log(response);

        if (response?.payload?.success)
            navigate("/");

        setLoginData({
            email: "",
            password: "",
        });


    }


    return (
        <div className="flex h-screen bg-gray-800">
            {/* Login form section */}
            <section className="flex-1 flex justify-center items-center shadow-[0_0_10px_white]">
                <div className="bg-gray-50 dark:bg-gray-900 w-full max-w-md">
                    <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                        <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                            Login Page
                        </h1>
                        <form noValidate onSubmit={onLogin} className="space-y-4 md:space-y-6">
                            <div>
                                <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your email</label>
                                <input
                                    type="email"
                                    required
                                    name="email"
                                    id="email"
                                    onChange={handleUserInput}
                                    value={loginData.email}
                                    placeholder="name@company.com"
                                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
                            </div>
                            <div>
                                <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
                                <input
                                    type="password"
                                    name="password"
                                    required
                                    id="password"
                                    placeholder="••••••••"
                                    onChange={handleUserInput}
                                    value={loginData.password}
                                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
                            </div>
                            <div className="flex items-center justify-between">
                                <div className="flex items-start">
                                    <div className="flex items-center h-5">
                                        <input id="remember" aria-describedby="remember" type="checkbox" className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800" required />
                                    </div>
                                    <div className="ml-3 text-sm">
                                        <label htmlFor="remember" className="text-gray-500 dark:text-gray-300">Remember me</label>
                                    </div>
                                </div>
                                <a href="#" className="text-sm font-medium text-primary-600 hover:underline dark:text-primary-500">Forgot password?</a>
                            </div>
                            <button type="submit" className="w-full text-white bg-red-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">Log in</button>
                            <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                                Don’t have an account yet?
                                <Link
                                    to="/phone"
                                    className="font-medium text-red-500 hover:underline dark:text-primary-500 ml-1">
                                    Sign up</Link>
                            </p>
                        </form>
                    </div>
                </div>
            </section>

            {/* Placeholder image section */}
            <section className="flex-1">
                <img
                    src="https://images.pexels.com/photos/17815952/pexels-photo-17815952/free-photo-of-sun-hat-a-camera-and-a-bowl-of-blackberries-lying-on-a-white-picnic-blanket.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load"
                    alt="Your Image"
                    className="w-full h-full object-cover"
                />
            </section>
        </div>
    );
}

export default Login;
