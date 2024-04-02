import React from 'react'


const Ocassion = () => {
    const data = [
        {
            img: 'https://images.pexels.com/photos/1444442/pexels-photo-1444442.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
            name: 'KnotsbyAMP',
            location: 'Mumbai, Mahararshtra',
            mobile: +917878776647,
            votes: 7,
            Rating: 4.5
        },
        {
            img: 'https://images.pexels.com/photos/1024993/pexels-photo-1024993.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
            name: 'Ocassion',
            location: 'Mumbai, Mahararshtra',
            mobile: +917878776647,
            votes: 7,
            Rating: 4.5
        },
        {
            img: 'https://images.pexels.com/photos/169198/pexels-photo-169198.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
            name: 'Commercial',
            location: 'Mumbai, Mahararshtra',
            mobile: +917878776647,
            votes: 7,
            Rating: 4.5
        },
        { img: 'https://images.pexels.com/photos/853168/pexels-photo-853168.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2', 
        name: 'Personal',
        location: 'Mumbai, Mahararshtra',
        mobile: +917878776647,
        votes: 7,
        Rating: 4.5 },
        { img: 'https://images.pexels.com/photos/1973270/pexels-photo-1973270.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2', 
        name: 'Babies & Kids',
        location: 'Mumbai, Mahararshtra',
        mobile: +917878776647,
        votes: 7,
        Rating: 4.5 },
        // Add more items as needed
    ];

    return (
        <div className='mt-5 ml-10 mr-10'>
            <h1 className='text-4xl madimi-one-regular mt-6 mb-6 ml-3 py-3 text-white'>Featured Special Ocassion Photography</h1>
            <div className="overflow-x-auto w-full flex  bg-white">
                <div className="flex gap-2 mt-3 ml-5 mr-5 ">
                    {data.map((d) => (
                        <div key={d.name} className="w-80 h-80 text-center text-black rounded-xl bg-gray-300 flex flex-col justify-between mb-8 shadow-lg">
                            <img src={d.img} alt={d.name} className="w-full h-2/3 rounded-t-xl object-cover" />
                            <div className="flex items-center justify-between px-2 py-1">
                                <h2 className="text-left font-bold text-lg hover:text-gray-600">{d.name}</h2>
                            </div>
                            <div className="flex items-center justify-between px-2">
                                <p className="text-left">{d.location}</p>
                                <p className="text-right">{d.votes} votes</p>
                            </div>
                            <div className="flex items-center justify-between px-2">
                                <p className="text-right">{d.mobile}</p>
                                <p className="text-left">Rating: {d.Rating}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default Ocassion