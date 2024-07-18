import React from 'react';

const Cards = () => {
  return (
    <div>
      <h1 className='text-4xl madimi-one-regular mt-12 mb-6 ml-3 py-3 text-red-600 text-center'>How it Works?</h1>
      <div className='flex flex-wrap gap-4 justify-center items-center'>
        <div className="max-w-sm border border-white rounded-lg overflow-hidden shadow-lg bg-white">
          <img className="w-1/3 rounded-xl m-auto mt-2" src="https://cdn-icons-png.flaticon.com/512/954/954591.png" alt="Searching" />
          <div className="px-6 py-4">
            <div className="font-bold text-xl mb-2 text-black">Searching</div>
            <p className="text-gray-700 text-base">
              Search for photographers based on your specific needs. Utilize filters like photographer specialty and city to find the perfect match.
            </p>
          </div>
        </div>
        <div className="max-w-sm border border-white rounded-lg overflow-hidden shadow-lg bg-white">
          <img className="w-1/3 rounded-xl m-auto mt-2" src="https://static.thenounproject.com/png/2642560-200.png" alt="Explore Studios" />
          <div className="px-6 py-4">
            <div className="font-bold text-xl mb-2 text-black">Explore Studios</div>
            <p className="text-gray-700 text-base">
              Browse through a wide range of studios to find the one that best suits your requirements. Check their portfolios and reviews.
            </p>
          </div>
        </div>
        <div className="max-w-sm border border-white rounded-lg overflow-hidden shadow-lg bg-white">
          <img className="w-1/3 rounded-xl m-auto mt-2" src="https://www.srilankan.com/assets/img/Feedback-navi.png" alt="PreBook" />
          <div className="px-6 py-4">
            <div className="font-bold text-xl mb-2 text-black">PreBook</div>
            <p className="text-gray-700 text-base">
              Reserve your photographer in advance to ensure availability. Enjoy a seamless booking experience and get ready for your event.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Cards;
