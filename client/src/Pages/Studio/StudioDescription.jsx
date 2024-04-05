import React from 'react';
import { useLocation } from 'react-router-dom';
import HomeLayout from '../../Layouts/HomeLayout';
import { useSelector } from 'react-redux';

const StudioDescription = () => {
    const { state } = useLocation();
    const { role, data } = useSelector((state) => state.auth);

    return (
        <HomeLayout>
            <div className='min-h-[90vh] pt-12 px-20 flex flex-col items-center justify-center text-white'>
                <div className='grid grid-cols-2 gap-10 py-10 relative'>
                    <div className='space-y-5'>
                        {state?.thumbnail?.secure_url && (
                            <img
                                src={state.thumbnail.secure_url}
                                alt="thumbnail"
                                className='w-full h-64'
                            />
                        )}

                        <div className='space-y-4'>
                            <div className='flex flex-col items-center justify-between text-xl'>
                                <p className='font-semibold'>
                                    <span className='text-yellow-500 font-bold'>Location : </span>
                                    {state?.location}
                                </p>
                                <p className='font-semibold'>
                                    <span className='text-yellow-500 font-bold'>Price : </span>
                                    {state?.price}
                                </p>
                                <p className='font-semibold'>
                                    <span className='text-yellow-500 font-bold'>Specialities : </span>
                                    {state?.specialities}
                                </p>
                                <p className='font-semibold'>
                                    <span className='text-yellow-500 font-bold'>Owner : </span>
                                    {state?.createdBy}
                                </p>
                            </div>
                            {role === "ADMIN" || data?.subscription?.status === "ACTIVE" ? (
                                <button className='bg-yellow-600 text-xl rounded-md font-bold px-5 py-3 w-full hover:bg-yellow-500 transition-all ease-in-out duration-300'>
                                    Edit
                                </button>
                            ) : (
                                <button className='bg-yellow-600 text-xl rounded-md font-bold px-5 py-3 w-full hover:bg-yellow-500 transition-all ease-in-out duration-300'>
                                    Book
                                </button>
                            )}
                        </div>
                    </div>
                    <div className='space-y-2 text-xl text-justify'>
                        <h1 className='text-3xl font-bold text-yellow-500 mb-5 text-center'>
                            {state?.title}
                        </h1>
                        {state?.images.map((image, index) => (
                            <img
                                key={index}
                                src={image.secure_url}
                                alt={`image-${index}`}
                                className='w-full h-64'
                            />
                        ))}
                    </div>
                </div>
            </div>
        </HomeLayout>
    );
}

export default StudioDescription;
