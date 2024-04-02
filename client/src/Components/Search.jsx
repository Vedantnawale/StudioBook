import React, { useState } from 'react';
import data from "./city.json";

const Search = () => {
  const [value, setValue] = useState('');
  const [showDropdown, setShowDropdown] = useState(false);

  const onChange = (event) => {
    setValue(event.target.value);
    setShowDropdown(true);
  }

  const onSearch = (searchItem) => {
    setValue(`${searchItem.city}, ${searchItem.state}`); // Concatenating city and state
    // Your API call or search function here
    console.log('search', `${searchItem.city}, ${searchItem.state}`); // Logging city and state
    setShowDropdown(false);
  }

  return (
    <div className="flex items-center justify-center mt-12 relative">
      <select
        className="px-9 py-3 mr-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500 text-white"
      >
        <option value="wedding">Wedding</option>
        <option value="babies">Babies & Kids</option>
        <option value="commercial">Commercial</option>
        <option value="nature">Nature</option>
        <option value="ocassion">Special Occasion</option>
        <option value="other">Other</option>
      </select>
      <input
        type="text"
        placeholder="Enter city..."
        value={value}
        onChange={onChange}
        className="px-5 py-3 mr-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500 text-white"
      />

      <button
        className="px-6 py-3 bg-red-500 text-white rounded-md hover:bg-white hover:text-red-500 focus:outline-none focus:bg-white focus:text-red-600"
        // onClick={() => onSearch({ city: value })}
      >
        Search
      </button>

      {showDropdown && (
        <div className="text-black absolute top-full ml-32 mt-1 w-1/2 bg-white shadow-md rounded-md z-10">
          {data
            .filter((item) => {
              const searchItem = value.toLowerCase();
              const city = item.city.toLowerCase();
              const state = item.state.toLowerCase(); // Accessing state property
              return searchItem && (city.startsWith(searchItem) || state.startsWith(searchItem)); // Checking both city and state
            })
            .slice(0, 4)
            .map((item, index) => (
              <div
                onClick={() => onSearch(item)}
                className="px-4 py-2 cursor-pointer hover:bg-gray-100"
                key={index}
              >
                {item.city}, {item.state} {/* Displaying both city and state */}
              </div>
            ))}
        </div>
      )}
    </div>
  );
};

export default Search;
