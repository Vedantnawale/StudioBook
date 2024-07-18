import React, { useState } from 'react';
import data from "./city.json";
import { useNavigate } from 'react-router-dom';

const Search = () => {
  const [value, setValue] = useState('');
  const [specialist, setSpecialist] = useState('');
  const [showDropdown, setShowDropdown] = useState(false);
  const [filteredData, setFilteredData] = useState([]);
  const navigate = useNavigate();

  const onChange = (event) => {
    setValue(event.target.value);
    setShowDropdown(true);
    filterData(event.target.value, specialist);
  }

  const filterData = (searchValue, selectedSpecialist) => {
    const filteredData = data.filter(item => {
      const searchItem = searchValue.toLowerCase();
      const city = item.city.toLowerCase();
      const state = item.state.toLowerCase();
      const itemSpecialist = item.specialist ? item.specialist.toLowerCase() : '';
      return (searchItem && (city.startsWith(searchItem) || state.startsWith(searchItem))) &&
             (!selectedSpecialist || itemSpecialist === selectedSpecialist);
    });
    setFilteredData(filteredData);
  }

  const onSearch = () => {
    setShowDropdown(false);
    navigate("/studios");
  }

  return (
    <div className="flex flex-col sm:flex-row items-center justify-center mt-12 relative">
      <select
        className="px-3 py-2 sm:px-9 sm:py-3 mb-2 sm:mb-0 sm:mr-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500 text-gray-700"
        onChange={(e) => {
          setSpecialist(e.target.value);
          filterData(value, e.target.value);
        }}
      >
        <option value="">All</option>
        <option value="wedding">Wedding</option>
        <option value="babies">Babies & Kids</option>
        <option value="commercial">Commercial</option>
        <option value="nature">Nature</option>
        <option value="occasion">Special Occasion</option>
        <option value="other">Other</option>
      </select>
      <input
        type="text"
        placeholder="Enter city..."
        value={value}
        onChange={onChange}
        className="px-3 py-2 sm:px-5 sm:py-3 mb-2 sm:mb-0 sm:mr-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500 text-gray-700"
      />

      <button
        onClick={onSearch}
        className="px-4 py-2 sm:px-6 sm:py-3 bg-red-500 text-white rounded-md hover:bg-white hover:text-red-500 focus:outline-none focus:bg-white focus:text-red-600"
      >
        Search
      </button>

      {showDropdown && (
        <div className="text-gray-700 absolute top-full mt-1 w-full sm:w-1/2 bg-white shadow-md rounded-md z-10">
          {filteredData
            .slice(0, 4)
            .map((item, index) => (
              <div
                onClick={() => {
                  setValue(`${item.city}, ${item.state}`);
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
  );
};

export default Search;
