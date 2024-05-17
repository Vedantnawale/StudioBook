import React from 'react';
import { useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';

const Albums = () => {
    const { state } = useLocation();
    const { role, data } = useSelector((state) => state.auth);
    const coverImageUrl = {
        image1: "https://images.pexels.com/photos/2060239/pexels-photo-2060239.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
        image2: "https://images.pexels.com/photos/20211569/pexels-photo-20211569/free-photo-of-a-baby-sitting-in-a-basket-with-autumnal-decorations.jpeg?auto=compress&cs=tinysrgb&w=600",
        image3: "https://images.pexels.com/photos/681335/pexels-photo-681335.jpeg?auto=compress&cs=tinysrgb&w=600",
        image4: "https://images.pexels.com/photos/245240/pexels-photo-245240.jpeg?auto=compress&cs=tinysrgb&w=600"
    };

    const renderAlbums = () => {
        if (!state || !state.albums) return null;
        return state.albums.map((album, index) => (
            <div className='border-2 rounded-lg border-solid bg-white border-inherit' key={index}>
                <div className='flex items-center gap-2'>
                    <img
                        className="w-14 h-14 rounded-full"
                        src="https://i.pinimg.com/736x/5d/c1/35/5dc135c6d75eed8728d17a0494872161.jpg"
                        alt="studio thumbnail"
                    />
                    <div>
                        <h3 className='text-gray-700'>Album-{album}</h3>
                        <p className='text-gray-400'>{album}</p>
                    </div>
                </div>
                <div>
                    <div className="grid grid-cols-3 gap-1 mt-2">
                        <div className="col-span-3">
                            <img
                                className="w-full h-56"
                                src={coverImageUrl[`image${index + 1}`]} // Use album cover image URL
                                alt="album cover"
                            />
                        </div>
                        {/* Display images for this album */}
                        {album.imageUrls && album.imageUrls.map((url, imgIndex) => (
                            <img
                                key={imgIndex}
                                className="w-full"
                                src={url}
                                alt="album image"
                            />
                        ))}
                    </div>
                </div>
            </div>
        ));
    };

    return (
        <div className='grid grid-cols-3 gap-2'>
            {renderAlbums()}
        </div>
    );
};

export default Albums;
