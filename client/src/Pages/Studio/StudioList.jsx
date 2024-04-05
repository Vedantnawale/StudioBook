import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllStudios } from "../../Redux/Slices/StudioSlice";
import HomeLayout from "../../Layouts/HomeLayout";
import StudioCard from "../../Components/Card/StudioCard";

function StudioList() {
    const dispatch = useDispatch();
    const { studioData } = useSelector((state) => state.studio);
    const [location, setLocation] = useState('');
    const [category, setCategory] = useState('');
    const [customLocation, setCustomLocation] = useState('');

    useEffect(() => {
        dispatch(getAllStudios());
    }, [dispatch]);

    const filterStudios = () => {
        let filteredStudios = [...studioData];
        if (location) {
            filteredStudios = filteredStudios.filter(studio => studio.location === location);
        }
        if (customLocation) {
            filteredStudios = filteredStudios.filter(studio => studio.location === customLocation);
        }
        if (category) {
            filteredStudios = filteredStudios.filter(studio => studio.category === category);
        }
        return filteredStudios;
    };

    const handleLocationChange = (e) => {
        setLocation(e.target.value);
    };

    const handleCategoryChange = (e) => {
        setCategory(e.target.value);
    };

    const handleCustomLocationChange = (e) => {
        setCustomLocation(e.target.value);
    };

    return (
        <HomeLayout>
            <div className="bg-slate-200">
                <div>
                    <h1 className="text-center text-gray-600 text-3xl font-semibold mb-5">
                        Explore the Studio & Choose
                        <span className="font-bold text-red-500">
                            Best Photographer
                        </span>
                    </h1>
                </div>
                <div className="min-h-[100vh] w-full pt-12 flex justify-start items-start text-white">
                    <div className="text-black text-sm w-1/5 mt-4 mx-3 fixed left-0 top-14">
                        <div className="filter-section">
                            <div className="border border-gray-500 p-2 shadow-2xl rounded-lg mb-3">
                                <p className="text-start text-gray-500 font-semibold mb-1">Location</p>
                                <div>
                                    <label className="block mb-2">
                                        <input type="radio" name="location" value="Mumbai" checked={location === 'Mumbai'} onChange={handleLocationChange} />
                                        Mumbai
                                    </label>
                                </div>
                                <div>
                                    <label className="block mb-2">
                                        <input type="radio" name="location" value="Bengaluru" checked={location === 'Bengaluru'} onChange={handleLocationChange} />
                                        Bengaluru
                                    </label>
                                </div>
                                <div>
                                    <label className="block mb-2">
                                        <input type="radio" name="location" value="Delhi" checked={location === 'Delhi'} onChange={handleLocationChange} />
                                        Delhi
                                    </label>
                                </div>
                                <div>
                                    <label className="block mb-2">
                                        <input type="radio" name="location" value="Kolkata" checked={location === 'Kolkata'} onChange={handleLocationChange} />
                                        Kolkata
                                    </label>
                                </div>
                                <div>
                                    <label className="block mb-2">
                                        <input type="radio" name="location" value="Chennai" checked={location === 'Chennai'} onChange={handleLocationChange} />
                                        Chennai
                                    </label>
                                </div>
                                <div>
                                    <label className="block mb-2">
                                        <input type="radio" name="location" value="Hyderabad" checked={location === 'Hyderabad'} onChange={handleLocationChange} />
                                        Hyderabad
                                    </label>
                                </div>
                                <div>
                                    <label className="block mb-2">
                                        <input type="radio" name="location" value="Pune" checked={location === 'Pune'} onChange={handleLocationChange} />
                                        Pune
                                    </label>
                                </div>
                                <div>
                                    <label className="block mb-2">
                                        <input type="radio" name="location" value="Ahmedabad" checked={location === 'Ahmedabad'} onChange={handleLocationChange} />
                                        Ahmedabad
                                    </label>
                                </div>
                                {/* Add more cities as needed */}
                                <div className="mt-3">
                                    {/* <label className="block text-gray-500 font-semibold">Custom Location:</label> */}
                                    <input type="text" value={customLocation} onChange={handleCustomLocationChange} className="border-none bg-white text-gray-400 rounded-sm py-3 px-2 w-full" placeholder="Search City" />
                                </div>
                            </div>
                            <div className="border border-gray-500 shadow-2xl p-2 rounded-lg mb-3">
                                <p className="text-start text-gray-500 font-semibold mb-1">Category</p>
                                <div>
                                    <label className="block mb-2">
                                        <input type="radio" name="category" value="Wedding" checked={category === 'Wedding'} onChange={handleCategoryChange} />
                                        Wedding
                                    </label>
                                </div>
                                <div>
                                    <label className="block mb-2">
                                        <input type="radio" name="category" value="Babies & Kids" checked={category === 'Babies & Kids'} onChange={handleCategoryChange} />
                                        Babies & Kids
                                    </label>
                                </div>
                                <div>
                                    <label className="block mb-2">
                                        <input type="radio" name="category" value="Special Occasion" checked={category === 'Special Occasion'} onChange={handleCategoryChange} />
                                        Special Occasion
                                    </label>
                                </div>
                                <div>
                                    <label className="block mb-2">
                                        <input type="radio" name="category" value="Commercial" checked={category === 'Commercial'} onChange={handleCategoryChange} />
                                        Commercial
                                    </label>
                                </div>
                                <div>
                                    <label className="block mb-2">
                                        <input type="radio" name="category" value="Corporate Events" checked={category === 'Corporate Events'} onChange={handleCategoryChange} />
                                        Corporate Events
                                    </label>
                                </div>
                                <div>
                                    <label className="block mb-2">
                                        <input type="radio" name="category" value="Fashion & Portfolio" checked={category === 'Fashion & Portfolio'} onChange={handleCategoryChange} />
                                        Fashion & Portfolio
                                    </label>
                                </div>
                                <div>
                                    <label className="block mb-2">
                                        <input type="radio" name="category" value="Nature" checked={category === 'Nature'} onChange={handleCategoryChange} />
                                        Nature
                                    </label>
                                </div>
                                {/* Add more categories as needed */}
                            </div>
                        </div>
                    </div>
                    <div className="mb-10 w-3/4 flex flex-col justify-start items-end gap-10 ml-72 overflow-y-auto">
                        {filterStudios().map((element) => (
                            <StudioCard key={element._id} data={element} />
                        ))}
                    </div>
                </div>
            </div>
        </HomeLayout>
    );
}

export default StudioList;
