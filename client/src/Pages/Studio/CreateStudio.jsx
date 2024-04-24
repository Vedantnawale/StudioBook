import { useState } from "react";
import toast from "react-hot-toast";
import { AiOutlineArrowLeft } from "react-icons/ai";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import HomeLayout from "../../Layouts/HomeLayout";
import { createNewStudio } from "../../Redux/Slices/StudioSlice";
import data from "../../Components/city.json";
import ReactSelect from "react-select";

function CreateStudio() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [showDropdown, setShowDropdown] = useState(false);
    const [filteredData, setFilteredData] = useState([]);
    const options = [
        { value: "Wedding", label: "Wedding" },
        { value: "Babies & Kids", label: "Babies & Kids" },
        { value: "Special Occasion", label: "Special Occasion" },
        { value: "Commercial", label: "Commercial" },
        { value: "Corporate Events", label: "Corporate Events" },
        { value: "Fashion & Portfolio", label: "Fashion & Portfolio" },
        { value: "Nature", label: "Nature" },
        { value: "Travel", label: "Travel" },
    ];

    const services = [
        { value: "Documentary", label: "Documentary" },
        { value: "Photobook", label: "Photobook" },
        { value: "Cinematography", label: "Cinematography" },
        { value: "Shortfilms", label: "Shortfilms" },
        { value: "Coffee Table Book", label: "Coffee Table Book" },
        { value: "Cheque", label: "Cheque" },
        { value: "Bank Transfer", label: "Bank Transfer" },
    ];

    const languages = [
        { value: "English", label: "English" },
        { value: "Marathi", label: "Marathi" },
        { value: "Gujarati", label: "Gujarati" },
        { value: "Hindi", label: "Hindi" },
        { value: "Bengali", label: "Bengali" },
        { value: "Tamil", label: "Tamil" },
        { value: "Telugu", label: "Telugu" },
    ];

    const [userInput, setUserInput] = useState({
        title: "",
        price: "",
        location: "",
        description: "",
        specialities: [],
        services: [],
        languages: [],
        createdBy: "",
        mobileNumber: "",
        images: Array.from({ length: 4 }).fill(null),
        previewImages: Array.from({ length: 5 }).fill(null),
    });

    function handleImageUpload(index, e) {
        const uploadedImage = e.target.files[0];
        if (uploadedImage) {
            const fileReader = new FileReader();
            fileReader.readAsDataURL(uploadedImage);
            fileReader.onload = function () {
                setUserInput(prevState => {
                    const updatedImages = [...prevState.images];
                    updatedImages[index] = uploadedImage;
                    const updatedPreviewImages = [...prevState.previewImages];
                    updatedPreviewImages[index + 1] = this.result;
                    return {
                        ...prevState,
                        images: updatedImages,
                        previewImages: updatedPreviewImages
                    };
                });
            };
        }
    }

    function handleUserInput(e) {
        const { name, value } = e.target;
        setUserInput(prevState => ({
            ...prevState,
            [name]: value
        }));

        // Toggle showDropdown based on the input name
        setShowDropdown(name === 'location' && value.trim().length > 0);

        // Filter the data based on the input text
        const filtered = data.filter(city => city.city.toLowerCase().startsWith(value.toLowerCase()));
        setFilteredData(filtered);
    }

    function handleSpecialitiesChange(selectedOptions) {
        const specialities = selectedOptions.map(option => option.value);
        setUserInput(prevState => ({
            ...prevState,
            specialities: specialities,
        }));
    }

    function handleServicesChange(selectedOptions) {
        const services = selectedOptions.map(option => option.value);
        setUserInput(prevState => ({
            ...prevState,
            services: services,
        }));
    }

    function handleLanguageChange(selectedOptions) {
        const languages = selectedOptions.map(option => option.value);
        setUserInput(prevState => ({
            ...prevState,
            languages: languages,
        }));
    }

    async function onFormSubmit(e) {
        e.preventDefault();

        if (!userInput.title || !userInput.price || !userInput.location || userInput.images.some(image => image === null)) {
            toast.error("All fields are mandatory and exactly 4 images should be uploaded");
            return;
        }

        const response = await dispatch(createNewStudio(userInput));
        if (response?.payload?.success) {
            setUserInput({
                title: "",
                price: "",
                specialities: [],
                services: [],
                languages: [],
                location: "",
                description: "",
                createdBy: "",
                mobileNumber: "",
                images: Array.from({ length: 4 }).fill(null),
                previewImages: Array.from({ length: 5 }).fill(null),
            });
            navigate("/studios");
        }
    }

    return (
        <HomeLayout>
            <div className="flex items-center justify-center w-full">
                <form
                    encType="multipart/form-data"
                    onSubmit={onFormSubmit}
                    className="flex flex-col justify-center gap-5 rounded-lg p-4 text-white w-full my-10 shadow-[0_0_10px_black] relative"
                >
                    <Link to="/" className="absolute top-8 text-2xl text-accent cursor-pointer">
                        <AiOutlineArrowLeft />
                    </Link>

                    <h1 className="text-center text-2xl font-bold">
                        Create Studio
                    </h1>

                    <main className="grid grid-cols-2 gap-x-10">
                        <div className="gap-y-6">
                            <div className="flex flex-col gap-1">
                                <label className="text-lg font-semibold" htmlFor="title">
                                    Studio title
                                </label>
                                <input
                                    required
                                    type="text"
                                    name="title"
                                    id="title"
                                    placeholder="Enter Studio title"
                                    className="bg-transparent px-2 py-1 border"
                                    value={userInput.title}
                                    onChange={handleUserInput}
                                />
                            </div>

                            <div className="flex flex-col gap-1 mt-4">
                                <label className="text-lg font-semibold" htmlFor="createdBy">
                                    Studio Owner
                                </label>
                                <input
                                    required
                                    type="text"
                                    name="createdBy"
                                    id="createdBy"
                                    placeholder="Enter Studio Owner Name"
                                    className="bg-transparent px-2 py-1 border"
                                    value={userInput.createdBy}
                                    onChange={handleUserInput}
                                />
                            </div>

                            <div className="flex flex-col gap-1 mt-4">
                                <label className="text-lg font-semibold" htmlFor="mobileNumber">
                                    Mobile Number
                                </label>
                                <input
                                    required
                                    type="phone"
                                    name="mobileNumber"
                                    id="mobileNumber"
                                    placeholder="Enter Mobile Number"
                                    className="bg-transparent px-2 py-1 border"
                                    value={userInput.mobileNumber}
                                    onChange={handleUserInput}
                                />
                            </div>

                            <div className="flex flex-col gap-1 mt-4">
                                <label className="text-lg font-semibold" htmlFor="createdBy">
                                    Specialities
                                </label>
                                <ReactSelect
                                    required
                                    name="specialities"
                                    options={options}
                                    placeholder="Enter Specialities"
                                    className="text-gray-600 border"
                                    value={options.filter(option => userInput.specialities.includes(option.value))}
                                    onChange={handleSpecialitiesChange}
                                    isMulti={true}
                                    styles={{
                                        control: (styles) => ({
                                            ...styles,
                                            backgroundColor: 'transparent',
                                            border: 'none',
                                        }),
                                        placeholder: (styles) => ({
                                            ...styles,
                                            color: 'gray'
                                        }),
                                    }}
                                />
                            </div>
                        </div>

                        <div className="flex flex-col gap-1">
                            <div className="flex flex-col gap-1 relative">
                                <label className="text-lg font-semibold" htmlFor="location">
                                    Location
                                </label>
                                <input
                                    required
                                    type="text"
                                    name="location"
                                    id="location"
                                    placeholder="Enter Location"
                                    className="bg-transparent px-2 py-1 border"
                                    value={userInput.location}
                                    onChange={handleUserInput}
                                />
                                {showDropdown && (
                                    <div className="text-black absolute w-full top-[calc(100%+10px)] bg-white shadow-md rounded-md z-10">
                                        {filteredData
                                            .slice(0, 2)
                                            .map((item, index) => (
                                                <div
                                                    onClick={() => {
                                                        setUserInput(prevState => ({
                                                            ...prevState,
                                                            location: `${item.city}, ${item.state}`
                                                        }));
                                                        setShowDropdown(false);
                                                    }}
                                                    className="px-4 py-2 cursor-pointer hover:bg-gray-100"
                                                    key={index}
                                                >
                                                    {item.city}, {item.state}
                                                </div>
                                            ))}
                                    </div>
                                )}
                            </div>

                            <div className="flex flex-col gap-1">
                                <label className="text-lg font-semibold" htmlFor="price">
                                    Services
                                </label>
                                <ReactSelect
                                    required
                                    name="services"
                                    options={services}
                                    placeholder="Enter Services"
                                    className="text-gray-600  border"
                                    value={services.filter(service => userInput.services.includes(service.value))}
                                    onChange={handleServicesChange}
                                    isMulti={true}
                                    styles={{
                                        control: (styles) => ({
                                            ...styles,
                                            backgroundColor: 'transparent',
                                            border: 'none',
                                        }),
                                        placeholder: (styles) => ({
                                            ...styles,
                                            color: 'gray',
                                        }),
                                    }}
                                />
                            </div>

                            <div className="flex flex-col gap-1">
                                <label className="text-lg font-semibold" htmlFor="languageKnown">
                                    Language Known
                                </label>
                                <ReactSelect
                                    required
                                    name="languageKnown"
                                    options={languages}
                                    placeholder="Enter Languages that you understand"
                                    className="text-gray-600 border"
                                    value={languages.filter(language => userInput.languages.includes(language.value))}
                                    onChange={handleLanguageChange}
                                    isMulti={true}
                                    styles={{
                                        control: (styles) => ({
                                            ...styles,
                                            backgroundColor: 'transparent',
                                            border: 'none',
                                        }),
                                        placeholder: (styles) => ({
                                            ...styles,
                                            color: 'gray',
                                        }),
                                    }}
                                />
                            </div>

                            <div className="flex flex-col gap-1">
                                <label className="text-lg font-semibold" htmlFor="price">
                                    Price
                                </label>
                                <input
                                    required
                                    type="number"
                                    name="price"
                                    id="price"
                                    placeholder="Enter Studio price"
                                    className="bg-transparent px-2 py-1 border"
                                    value={userInput.price}
                                    onChange={handleUserInput}
                                />
                            </div>

                            <div className="flex flex-col gap-1">
                                <label className="text-lg font-semibold" htmlFor="description">
                                    Description
                                </label>
                                <textarea
                                    required
                                    type="text"
                                    name="description"
                                    id="description"
                                    placeholder="Description"
                                    className="bg-transparent px-2 py-1 h-24 overflow-y-scroll resize-none border"
                                    value={userInput.description}
                                    onChange={handleUserInput}
                                />
                            </div>
                        </div>
                    </main>

                    <div className="grid grid-cols-4 gap-4">
                        {Array.from({ length: 4 }).map((_, index) => (
                            <div key={index} className="flex flex-col gap-1">
                                <label htmlFor={`image_upload_${index}`} className="cursor-pointer">
                                    {userInput.previewImages[index + 1] ? (
                                        <img
                                            className="w-full h-44 m-auto border"
                                            src={userInput.previewImages[index + 1]}
                                            alt={`Image ${index + 1} Preview`}
                                        />
                                    ) : (
                                        <div className="w-full h-44 m-auto flex items-center justify-center border">
                                            <span className="font-bold text-lg">Upload Image {index + 1}</span>
                                        </div>
                                    )}
                                    <input
                                        className="hidden"
                                        type="file"
                                        id={`image_upload_${index}`}
                                        accept=".jpg, .jpeg, .png"
                                        name={`image_${index}`}
                                        onChange={(e) => handleImageUpload(index, e)}
                                    />
                                </label>
                                {userInput.images[index] === null && (
                                    <span className="text-red-500 text-sm">Please upload an image.</span>
                                )}
                            </div>
                        ))}
                    </div>

                    <button type="submit" className="w-full py-2 rounded-sm font-semibold text-lg cursor-pointer bg-yellow-600 hover:bg-yellow-500 transition-all ease-in-out duration-300">
                        Create Studio
                    </button>
                </form>
            </div>
        </HomeLayout>
    );
}

export default CreateStudio;
