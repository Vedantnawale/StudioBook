import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FiMapPin, FiDollarSign, FiUser } from 'react-icons/fi';

const Packages = () => {
  const navigate = useNavigate();
  
  const packageData = [
    {
      title: "Wedding Photo Shoot",
      content: "Package content not defined yet",
      optionalContent: "Video Shoot",
      price: 20000
    },
    {
      title: "Babies & Kids",
      content: "Package content not defined yet",
      optionalContent: "Video Shoot",
      price: 20000
    },
    {
      title: "Special Occasion",
      content: "Package content not defined yet",
      optionalContent: "Video Shoot",
      price: 20000
    },
    {
      title: "Fashion & Portfolio",
      content: "Package content not defined yet",
      optionalContent: "Video Shoot",
      price: 20000
    }
  ];

  return (
    <div className="flex flex-col justify-center items-center w-full">
      <div className="bg-white rounded-lg shadow-md overflow-hidden w-full max-w-screen-md p-4 ">
        {packageData.map((item, index) => (
          <div key={index} className="flex justify-center items-center flex-col md:flex-row gap-4 mt-4 mb-4 border border-solid border-gray-600 rounded-md p-2">
            <div className="flex-none">
              <img
                className="w-24 h-24 rounded-full border border-gray-300"
                src="https://i.pinimg.com/736x/5d/c1/35/5dc135c6d75eed8728d17a0494872161.jpg"
                alt="studio thumbnail"
              />
            </div>
            <div className="flex-grow flex flex-col justify-between">
              <div className="space-y-2">
                <h2 className="text-lg md:text-xl font-semibold text-gray-800">{item.title}</h2>
                <div className="flex items-center space-x-2 text-gray-600">
                  <FiUser className="text-red-500" />
                  <p className="font-semibold">Package Contents:</p>
                </div>
                <span className="text-gray-600">{item.content}</span>
                <div className="flex items-center space-x-2 text-gray-600">
                  <FiMapPin className="text-red-500" />
                  <p className="font-semibold">Optional Package Content:</p>
                </div>
                <span className="text-gray-600">{item.optionalContent}</span>
              </div>
              <div className="flex items-center justify-between mt-4">
                <div className="flex items-center space-x-2 text-gray-600">
                  <FiDollarSign className="text-red-500" />
                  <p className="font-semibold">Pricing:</p>
                  <p>{item.price}</p>
                </div>
                <button
                  onClick={() => navigate('/booking')}
                  className="px-4 py-2 bg-red-500 text-white rounded-md shadow-md hover:bg-red-600 focus:outline-none focus:bg-red-600 transition duration-300"
                >
                  Book
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Packages;
