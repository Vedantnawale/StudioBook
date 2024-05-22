import React, { useState } from 'react';
import { AiOutlineArrowLeft } from 'react-icons/ai';
import HomeLayout from '../../Layouts/HomeLayout';
import { Link, useNavigate } from 'react-router-dom';
import ReactSelect from 'react-select';
import { useDispatch, useSelector } from 'react-redux';

const EditStudio = () => {
    const options = [
        { value: 'Wedding', label: 'Wedding' },
        { value: 'Babies & Kids', label: 'Babies & Kids' },
        { value: 'Special Occasion', label: 'Special Occasion' },
        { value: 'Commercial', label: 'Commercial' },
        { value: 'Corporate Events', label: 'Corporate Events' },
        { value: 'Fashion & Portfolio', label: 'Fashion & Portfolio' },
        { value: 'Nature', label: 'Nature' },
        { value: 'Travel', label: 'Travel' },
    ];

    const services = [
        { value: 'Documentary', label: 'Documentary' },
        { value: 'Photobook', label: 'Photobook' },
        { value: 'Cinematography', label: 'Cinematography' },
        { value: 'Shortfilms', label: 'Shortfilms' },
        { value: 'Coffee Table Book', label: 'Coffee Table Book' },
        { value: 'Cheque', label: 'Cheque' },
        { value: 'Bank Transfer', label: 'Bank Transfer' },
    ];

    const languages = [
        { value: 'English', label: 'English' },
        { value: 'Marathi', label: 'Marathi' },
        { value: 'Gujarati', label: 'Gujarati' },
        { value: 'Hindi', label: 'Hindi' },
        { value: 'Bengali', label: 'Bengali' },
        { value: 'Tamil', label: 'Tamil' },
        { value: 'Telugu', label: 'Telugu' },
    ];

    const albums = [
        { value: 'Wedding', label: 'Wedding' },
        { value: 'Babies & Kids', label: 'Babies & Kids' },
        { value: 'Special Occasion', label: 'Special Occasion' },
        { value: 'Commercial', label: 'Commercial' },
        { value: 'Corporate Events', label: 'Corporate Events' },
        { value: 'Fashion & Portfolio', label: 'Fashion & Portfolio' },
        { value: 'Nature', label: 'Nature' },
        { value: 'Travel', label: 'Travel' },
    ];

    const packages = [
        { value: 'Wedding Photo Shoot', label: 'Wedding Photo Shoot' },
        { value: 'Babies & Kids Photo Shoot', label: 'Babies & Kids Photo Shoot' },
        { value: 'Special Occasion Photo Shoot', label: 'Special Occasion Photo Shoot' },
        { value: 'Corporate Events Photo Shoot', label: 'Corporate Events Photo Shoot' },
        { value: 'Corporate Events', label: 'Corporate Events' },
        { value: 'Fashion & Portfolio Photo Shoot', label: 'Fashion & Portfolio Photo Shoot' },
    ];

    const packagesOptional = [
        { value: 'Video Shoot', label: 'Video Shoot' },
        { value: 'Drone Shoot', label: 'Drone Shoot' },
        { value: 'Softboxes, umbrellas, and reflectors', label: 'Softboxes, umbrellas, and reflectors' },
        { value: 'Light stands and booms', label: 'Light stands and booms' },
        { value: 'Green screen setup', label: 'Green screen setup' },
    ];

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [data, setData] = useState({
        title: "",
        specialities: "",
        services: "",
        description: "",
        price: "",
        userId: useSelector((state) => state?.studio?.data?._id)
    });

    function handleInputChange(e) {
        const {name, value} = e.target;
        setData({
            ...data,
            [name]: value
        })
    }

    async function onFormSubmit(e) {
        e.preventDefault();
        console.log(data);
        if(!data.title || !data.specialities || !data.services || !data.description || !data.price || !data.packages || !data.albums) {
            toast.error("All fields are mandatory");
            return;
        }
        if(data.title.length < 5) {
            toast.error("Name cannot be of less than 5 characters");
            return;
        }
        const formData = new FormData();
        formData.append("title", data.title);
        formData.append("description", data.description);
        formData.append("price", data.price);
        data.services.forEach((service) => formData.append("services", service));
        data.specialities.forEach((speciality) => formData.append("specialities", speciality));
        data.albums.forEach((albums) => formData.append("albums", albums));
        data.packages.forEach((packages) => formData.append("packages", packages));
        console.log(formData.entries().next())
        await dispatch(updateProfile([data.userId, formData]));

        await dispatch(getUserData());

        navigate("/studio/description");
    }
    function handleSpecialitiesChange(selectedOptions) {
        const specialities = selectedOptions.map(option => option.value);
        setData(prevState => ({
            ...prevState,
            specialities: specialities,
        }));
    }

    function handleServicesChange(selectedOptions) {
        const services = selectedOptions.map(option => option.value);
        setData(prevState => ({
            ...prevState,
            services: services,
        }));
    }


    function handleAlbumChange(selectedOptions) {
        const albums = selectedOptions.map(option => option.value);
        setData(prevState => ({
            ...prevState,
            albums: albums,
        }));
    }

    function handlePackagesChange(selectedOptions) {
        const packages = selectedOptions.map(option => option.value);
        setData(prevState => ({
            ...prevState,
            packages: packages,
        }));
    }

    return (
        <HomeLayout>
            <div className="flex items-center justify-center w-full">
                <form
                    encType="multipart/form-data"
                    onSubmit={onFormSubmit}
                    className="flex flex-col justify-center gap-6 rounded-lg p-6 text-white w-full max-w-4xl my-10 bg-gray-900 shadow-lg relative"
                >
                    <Link to="/" className="absolute top-6 left-6 text-3xl text-accent cursor-pointer hover:text-yellow-500 transition-all duration-300">
                        <AiOutlineArrowLeft />
                    </Link>

                    <h1 className="text-center text-3xl font-bold text-yellow-500">
                        Edit Studio
                    </h1>

                    <main className="grid grid-cols-1 md:grid-cols-2 gap-10">
                        <div className="flex flex-col gap-6">
                            <div className="flex flex-col gap-2">
                                <label className="text-lg font-semibold" htmlFor="title">
                                    Studio title
                                </label>
                                <input
                                    required
                                    type="text"
                                    name="title"
                                    id="title"
                                    placeholder="Enter Studio title"
                                    className="bg-gray-800 px-4 py-2 border border-gray-700 rounded-lg focus:outline-none focus:border-yellow-500"
                                    value={data.title}
                                    onChange={handleInputChange}
                                />
                            </div>

                            <div className="flex flex-col gap-2">
                                <label className="text-lg font-semibold" htmlFor="createdBy">
                                    Specialities
                                </label>
                                <ReactSelect
                                    required
                                    name="specialities"
                                    options={options}
                                    placeholder="Enter Specialities"
                                    className="text-gray-600 border-gray-700 rounded-lg"
                                    value={data.specialities}
                                    onChange={handleSpecialitiesChange}
                                    isMulti={true}
                                    styles={{
                                        control: (styles) => ({
                                            ...styles,
                                            backgroundColor: 'transparent',
                                            borderColor: 'gray-700',
                                            color: 'white',
                                        }),
                                        placeholder: (styles) => ({
                                            ...styles,
                                            color: 'gray',
                                        }),
                                    }}
                                />
                            </div>

                            <div className="flex flex-col gap-2">
                                <label className="text-lg font-semibold" htmlFor="description">
                                    Description
                                </label>
                                <textarea
                                    required
                                    type="text"
                                    name="description"
                                    id="description"
                                    placeholder="Description"
                                    className="bg-gray-800 px-4 py-2 h-24 overflow-y-scroll resize-none border border-gray-700 rounded-lg focus:outline-none focus:border-yellow-500"
                                    value={data.description}
                                    onChange={handleInputChange}
                                />
                            </div>
                        </div>
                    </main>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                        <div className="flex flex-col gap-2">
                            <label className="text-lg font-semibold" htmlFor="services">
                                Services
                            </label>
                            <ReactSelect
                                required
                                name="services"
                                options={services}
                                placeholder="Enter Services"
                                className="text-gray-600 border-gray-700 rounded-lg"
                                value={data.description}
                                onChange={handleServicesChange}
                                isMulti={true}
                                styles={{
                                    control: (styles) => ({
                                        ...styles,
                                        backgroundColor: 'transparent',
                                        borderColor: 'gray-700',
                                    }),
                                    placeholder: (styles) => ({
                                        ...styles,
                                        color: 'gray',
                                    }),
                                }}
                            />
                        </div>

                        <div className="flex flex-col gap-2">
                            <label className="text-lg font-semibold" htmlFor="price">
                                Price
                            </label>
                            <input
                                required
                                type="number"
                                name="price"
                                id="price"
                                placeholder="Enter Studio price"
                                className="bg-gray-800 px-4 py-2 border border-gray-700 rounded-lg focus:outline-none focus:border-yellow-500"
                                value={data.price}
                                onChange={handleInputChange}
                            />
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                        <div className="flex flex-col gap-2">
                            <label className="text-lg font-semibold" htmlFor="albums">
                                Albums
                            </label>
                            <ReactSelect
                                required
                                name="albums"
                                options={albums}
                                placeholder="Choose albums"
                                className="text-gray-600 border-gray-700 rounded-lg"
                                isMulti={true}
                                value={data.albums}
                                onChange={handleAlbumChange}
                                styles={{
                                    control: (styles) => ({
                                        ...styles,
                                        backgroundColor: 'transparent',
                                        borderColor: 'gray-700',
                                    }),
                                    placeholder: (styles) => ({
                                        ...styles,
                                        color: 'gray',
                                    }),
                                }}
                            />
                        </div>

                        <div className="flex flex-col gap-2">
                            <label className="text-lg font-semibold" htmlFor="packages">
                                Packages
                            </label>
                            <ReactSelect
                                required
                                name="packages"
                                options={packages}
                                placeholder="Choose Packages"
                                className="text-gray-600 border-gray-700 rounded-lg"
                                isMulti={true}
                                value={data.packages}
                                onChange={handlePackagesChange}
                                styles={{
                                    control: (styles) => ({
                                        ...styles,
                                        backgroundColor: 'transparent',
                                        borderColor: 'gray-700',
                                    }),
                                    placeholder: (styles) => ({
                                        ...styles,
                                        color: 'gray',
                                    }),
                                }}
                            />
                        </div>
                    </div>

                    <button type="submit" className="w-full py-3 rounded-lg font-semibold text-lg cursor-pointer bg-yellow-600 hover:bg-yellow-500 transition-all ease-in-out duration-300">
                        Edit Studio
                    </button>
                </form>
            </div>
        </HomeLayout>
    );
};

export default EditStudio;
