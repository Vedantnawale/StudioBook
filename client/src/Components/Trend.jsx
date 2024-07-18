import React from 'react';
import { FaCameraRetro, FaTags, FaGift } from 'react-icons/fa';

const Trend = () => {
    return (
        <div className="container mx-auto p-4">
            <h1 className='text-4xl madimi-one-regular mt-28 mb-6 py-3 text-red-600 text-center'>
                Trending Offers
            </h1>
            <div className='flex flex-col sm:flex-row justify-center gap-3 mt-2'>
                <div className="max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-white shadow-slate-400 dark:border-2 flex-1">
                    <FaCameraRetro className="w-7 h-7 text-gray-500 dark:text-gray-400 mb-3" />
                    <a href="#">
                        <h5 className="mb-2 text-2xl font-semibold tracking-tight text-gray-900 dark:text-white">
                            Flat 30% Discount for First 20 Users!
                        </h5>
                    </a>
                    <p className="mb-3 font-normal text-gray-500 dark:text-gray-400">
                        Book your first studio session with us and enjoy a flat 30% discount. This offer is limited to the first 20 users, so hurry up and reserve your spot now!
                    </p>
                    <a href="#" className="inline-flex font-medium items-center text-blue-600 hover:underline">
                        Book Now
                        <svg className="w-3 h-3 ml-2.5 rtl:rotate-[270deg]" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 18">
                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11v4.833A1.166 1.166 0 0 1 13.833 17H2.167A1.167 1.167 0 0 1 1 15.833V4.167A1.166 1.166 0 0 1 2.167 3h4.618m4.447-2H17v5.768M9.111 8.889l7.778-7.778" />
                        </svg>
                    </a>
                </div>
                <div className="max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-white shadow-slate-400 dark:border-2 flex-1">
                    <FaTags className="w-7 h-7 text-gray-500 dark:text-gray-400 mb-3" />
                    <a href="#">
                        <h5 className="mb-2 text-2xl font-semibold tracking-tight text-gray-900 dark:text-white">
                            Special Weekend Packages!
                        </h5>
                    </a>
                    <p className="mb-3 font-normal text-gray-500 dark:text-gray-400">
                        Enjoy our exclusive weekend packages with additional perks and discounts. Perfect for photographers looking to make the most out of their weekends.
                    </p>
                    <a href="#" className="inline-flex font-medium items-center text-blue-600 hover:underline">
                        See Details
                        <svg className="w-3 h-3 ml-2.5 rtl:rotate-[270deg]" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 18">
                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11v4.833A1.166 1.166 0 0 1 13.833 17H2.167A1.167 1.167 0 0 1 1 15.833V4.167A1.166 1.166 0 0 1 2.167 3h4.618m4.447-2H17v5.768M9.111 8.889l7.778-7.778" />
                        </svg>
                    </a>
                </div>
                <div className="max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-white shadow-slate-400 dark:border-2 flex-1">
                    <FaGift className="w-7 h-7 text-gray-500 dark:text-gray-400 mb-3" />
                    <a href="#">
                        <h5 className="mb-2 text-2xl font-semibold tracking-tight text-gray-900 dark:text-white">
                            Free Props with Every Booking!
                        </h5>
                    </a>
                    <p className="mb-3 font-normal text-gray-500 dark:text-gray-400">
                        Enhance your photoshoots with our wide range of props, available for free with every studio booking. Create memorable and unique photographs effortlessly.
                    </p>
                    <a href="#" className="inline-flex font-medium items-center text-blue-600 hover:underline">
                        Learn More
                        <svg className="w-3 h-3 ml-2.5 rtl:rotate-[270deg]" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 18">
                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11v4.833A1.166 1.166 0 0 1 13.833 17H2.167A1.167 1.167 0 0 1 1 15.833V4.167A1.166 1.166 0 0 1 2.167 3h4.618m4.447-2H17v5.768M9.111 8.889l7.778-7.778" />
                        </svg>
                    </a>
                </div>
            </div>
        </div>
    );
}

export default Trend;
