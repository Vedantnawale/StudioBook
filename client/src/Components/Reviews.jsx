import React from 'react';

const Reviews = () => {
    const reviews = [
        {
            id: 1,
            user: {
                name: 'John Doe',
                imageUrl: 'https://randomuser.me/api/portraits/men/1.jpg'
            },
            rating: 4,
            text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.'
        },
        {
            id: 2,
            user: {
                name: 'Jane Smith',
                imageUrl: 'https://randomuser.me/api/portraits/women/2.jpg'
            },
            rating: 5,
            text: 'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.'
        },
        {
            id: 3,
            user: {
                name: 'Michael Johnson',
                imageUrl: 'https://randomuser.me/api/portraits/men/3.jpg'
            },
            rating: 3.5,
            text: 'Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.'
        },
        // Add more reviews as needed
    ];

    return (
        <div>
            <h1 className='text-4xl madimi-one-regular text-center mt-6 mb-6 ml-3 py-3 text-white'>What people are saying...</h1>
            <div className="container mx-auto my-10 flex flex-wrap justify-center">
                {reviews.map(review => (
                    <div key={review.id} className="max-w-md w-full rounded-lg overflow-hidden shadow-md m-4 bg-white border border-gray-300">
                        <div className="flex p-4">
                            <img className="w-12 h-12 rounded-full border border-gray-300 mr-4" src={review.user.imageUrl} alt={review.user.name} />
                            <div>
                                <div className="font-bold text-black text-lg">{review.user.name}</div>
                                <div className="flex items-center mt-1">
                                    <p className="text-gray-700 mr-2">{review.rating}</p>
                                    <div className="flex">
                                        {[...Array(Math.round(review.rating))].map((_, index) => (
                                            <svg key={index} className="w-5 h-5 fill-current text-yellow-500" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M10 1l2.472 6.118h6.258l-5.053 3.781 1.963 6.101L10 13.602l-5.64 3.398 1.964-6.101L1.27 7.118h6.258L10 1z" />
                                            </svg>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="px-4 py-2">
                            <p className="text-gray-700">{review.text}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Reviews;
