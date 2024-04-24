import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllStudios } from "../../Redux/Slices/StudioSlice";
import HomeLayout from "../../Layouts/HomeLayout";
import StudioCard from "../../Components/Card/StudioCard";
import data from "../../Components/city.json";

function StudioList() {
    const dispatch = useDispatch();
    const { studioData } = useSelector((state) => state.studio);
    const [location, setLocation] = useState('');
    const [category, setCategory] = useState('');
    const [customLocation, setCustomLocation] = useState('');
    const [showDropdown, setShowDropdown] = useState(false);
    const [filteredCities, setFilteredCities] = useState([]);

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
        const value = e.target.value;
        setCustomLocation(value);
        const filtered = data.filter(city => city.city.toLowerCase().startsWith(value.toLowerCase()));
        setFilteredCities(filtered);
        setShowDropdown(true);
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
                            <div className="border border-gray-500 p-2 shadow-2xl rounded-lg mb-3 relative">
                                <p className="text-start text-gray-500 font-semibold mb-1">Location</p>
                                <div>
                                    <label className="block mb-2">
                                        <input type="radio" name="location" value="Mumbai, Maharashtra" checked={location === 'Mumbai, Maharashtra'} onChange={handleLocationChange} />
                                        Mumbai
                                    </label>
                                    <label className="block mb-2">
                                        <input type="radio" name="location" value="Bangalore, Karnataka" checked={location === 'Bangalore, Karnataka'} onChange={handleLocationChange} />
                                        Bengaluru
                                    </label>
                                    <label className="block mb-2">
                                        <input type="radio" name="location" value="Delhi, Delhi" checked={location === 'Delhi, Delhi'} onChange={handleLocationChange} />
                                        Delhi
                                    </label>
                                    <label className="block mb-2">
                                        <input type="radio" name="location" value="Chennai, Tamil Nadu" checked={location === 'Chennai, Tamil Nadu'} onChange={handleLocationChange} />
                                        Chennai
                                    </label>
                                    <label className="block mb-2">
                                        <input type="radio" name="location" value="Ahmedabad, Gujarat" checked={location === 'Ahmedabad, Gujarat'} onChange={handleLocationChange} />
                                        Ahmedabad
                                    </label>
                                    <label className="block mb-2">
                                        <input type="radio" name="location" value="Nagpur, Maharashtra" checked={location === 'Nagpur, Maharashtra'} onChange={handleLocationChange} />
                                        Nagpur
                                    </label>
                                    <label className="block mb-2">
                                        <input type="radio" name="location" value="Pune, Maharashtra" checked={location === 'Pune, Maharashtra'} onChange={handleLocationChange} />
                                        Pune
                                    </label>
                                </div>
                                <div className="mt-3">
                                    <input
                                        type="text"
                                        value={customLocation}
                                        onChange={handleCustomLocationChange}
                                        className="border-none bg-white text-gray-400 rounded-sm py-3 px-2 w-full"
                                        placeholder="Search City"
                                    />
                                    {showDropdown && (
                                        <div className="absolute top-full w-full bg-white shadow-md rounded-md z-10">
                                            {filteredCities
                                            .slice(0, 2)
                                            .map((item, index) => (
                                                <div
                                                    onClick={() => {
                                                        setCustomLocation(`${item.city}, ${item.state}`);
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
                            </div>
                            <div className="border border-gray-500 shadow-2xl p-2 rounded-lg mb-3">
                                <p className="text-start text-gray-500 font-semibold mb-1">Category</p>
                                <div>
                                    <label className="block mb-2">
                                        <input type="radio" name="category" value="Wedding" checked={category === 'Wedding'} onChange={handleCategoryChange} />
                                        Wedding
                                    </label>
                                    <label className="block mb-2">
                                        <input type="radio" name="category" value="Commercial" checked={category === 'Commercial'} onChange={handleCategoryChange} />
                                        Commercial
                                    </label>
                                    <label className="block mb-2">
                                        <input type="radio" name="category" value="Baby & Kids" checked={category === 'Baby & Kids'} onChange={handleCategoryChange} />
                                        Baby & Kids
                                    </label>
                                    <label className="block mb-2">
                                        <input type="radio" name="category" value="Occassion" checked={category === 'Occassion'} onChange={handleCategoryChange} />
                                        Occassion
                                    </label>
                                    <label className="block mb-2">
                                        <input type="radio" name="category" value="Nature" checked={category === 'Nature'} onChange={handleCategoryChange} />
                                        Nature
                                    </label>
                                    <label className="block mb-2">
                                        <input type="radio" name="category" value="Fashion & Portfolio" checked={category === 'Fashion & Portfolio'} onChange={handleCategoryChange} />
                                        Fashion & Portfolio
                                    </label>
                                </div>
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
