import React from 'react';

const Cards = () => {
    return (
        <div>
            <h1 className='text-4xl madimi-one-regular mt-12 mb-6 ml-3 py-3 text-red-600 text-center'>How it Works?</h1>
            <div className='flex gap-2 justify-center items-center'>
                <div className="max-w-sm border border-white rounded-lg overflow-hidden shadow-lg bg-white">
                    <img className="w-1/3 rounded-xl m-auto mt-2" src="https://cdn-icons-png.flaticon.com/512/954/954591.png" alt="Sunset in the mountains" />
                    <div className="px-6 py-4">
                        <div className="font-bold text-xl mb-2 text-black">The Coldest Sunset</div>
                        <p className="text-gray-700 text-base">
                            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptatibus quia, nulla! Maiores et perferendis eaque, exercitationem praesentium nihil.
                        </p>
                    </div>
                </div>
                <div className="max-w-sm border border-white rounded-lg overflow-hidden shadow-lg bg-white">
                    <img className="w-1/3 rounded-xl m-auto mt-2" src="https://static.thenounproject.com/png/2642560-200.png" alt="Sunset in the mountains" />
                    <div className="px-6 py-4">
                        <div className="font-bold text-xl mb-2 text-black">The Coldest Sunset</div>
                        <p className="text-gray-700 text-base">
                            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptatibus quia, nulla! Maiores et perferendis eaque, exercitationem praesentium nihil.
                        </p>
                    </div>
                </div>
                <div className="max-w-sm border border-white rounded-lg overflow-hidden shadow-lg bg-white">
                    <img className="w-1/3 rounded-xl m-auto mt-2" src="https://www.srilankan.com/assets/img/Feedback-navi.png" alt="Sunset in the mountains" />
                    <div className="px-6 py-4">
                        <div className="font-bold text-xl mb-2 text-black">The Coldest Sunset</div>
                        <p className="text-gray-700 text-base">
                            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptatibus quia, nulla! Maiores et perferendis eaque, exercitationem praesentium nihil.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Cards;
