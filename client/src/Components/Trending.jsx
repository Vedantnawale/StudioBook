import React, { useRef } from 'react';
import Slider from 'react-slick';
// import 'slick-carousel/slick/slick.css';
// import 'slick-carousel/slick/slick-theme.css';
import "./slider.css"

const Trending = () => {
    // Define the data
    const data = [
        { img: 'https://images.pexels.com/photos/1444442/pexels-photo-1444442.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2', name: 'Wedding' },
        {
            img: 'https://images.pexels.com/photos/1024993/pexels-photo-1024993.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
            name: 'Ocassion'
        },
        {
            img: 'https://images.pexels.com/photos/169198/pexels-photo-169198.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
            name: 'Commercial'
        },
        { img: 'https://images.pexels.com/photos/853168/pexels-photo-853168.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2', name: 'Personal' },
        { img: 'https://images.pexels.com/photos/1973270/pexels-photo-1973270.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2', name: 'Babies & Kids' },
        // Add more items as needed
    ];

    const sliderRef = useRef(null);

    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 3,
        slidesToScroll: 1,
        autoplay: true, // Autoplay enabled
        autoplaySpeed: 2000, // Autoplay interval in milliseconds (e.g., 2000ms = 2 seconds)
        pauseOnHover: true, // Pause autoplay on hover
    };

    return (
        <div className='w-3/4 m-auto'>
            <div className='mt-20'>
                <Slider ref={sliderRef} {...settings}>
                    {data.map((d) => (
                        <div key={d.name} className='bg-white h-[200px] text-black rounded-xl relative'>
                            <div className='w-full h-full z-0 flex justify-center items-center rounded-xl hover:opacity-80'>
                                <img src={d.img} alt={d.name} className='rounded-xl' />
                            </div>
                            <div className='absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center'>
                                <p className='text-xl z-30 font-semibold madimi-one-regular text-rose-600'>{d.name}</p>
                            </div>
                        </div>
                    ))}
                </Slider>
            </div>
        </div>
    );
};

export default Trending;
