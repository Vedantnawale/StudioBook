import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import toast from "react-hot-toast";

const AlbumUploader = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [albums, setAlbums] = useState([
        { album_title: "", album_images: Array.from({ length: 4 }).fill(null) }
    ]);

    function handleInputChange(index, event) {
        const { name, value } = event.target;
        const list = [...albums];
        list[index].album_title = value;
        setAlbums(list);
    }

    function handleImageUpload(albumIndex, imageIndex, event) {
        const uploadedImage = event.target.files[0];
        if (uploadedImage) {
            const fileReader = new FileReader();
            fileReader.readAsDataURL(uploadedImage);
            fileReader.onload = function () {
                const list = [...albums];
                list[albumIndex].album_images[imageIndex] = uploadedImage;
                setAlbums(list);
            };
        }
    }

    function addAlbum() {
        if (albums.length < 4) {
            setAlbums([...albums, { album_title: "", album_images: Array.from({ length: 4 }).fill(null) }]);
        }
    }

    async function onFormSubmit(e) {
        e.preventDefault();

        if (!albums.every(album => album.album_title && album.album_images.every(image => image))) {
            toast.error("Please fill all album titles and upload four images for each album.");
            return;
        }

        // const response = await dispatch(createNewAlbum({ albums }));
        // if (response?.payload?.success) {
        //     setAlbums([{ album_title: "", album_images: Array.from({ length: 4 }).fill(null) }]);
        //     navigate("/studios");
        // }
    }

    return (
        <div className="flex items-center justify-center w-full">
            <form
                encType="multipart/form-data"
                onSubmit={onFormSubmit}
                className="flex flex-col justify-center gap-5 rounded-lg p-4 text-white w-full my-10 shadow-[0_0_10px_black] relative"
            >
                <h1 className="text-center text-2xl font-bold">
                    Create Album
                </h1>
                <h6 className='text-center'>Upload Maximum 4 Albums and exactly 4 images for each album.</h6>

                {albums.map((album, albumIndex) => (
                    <div key={albumIndex} className="flex flex-col gap-1">
                        <label className="text-lg font-semibold" htmlFor={`album_title_${albumIndex}`}>
                            Album {albumIndex + 1} title
                        </label>
                        <input
                            required
                            type="text"
                            name="album_title"
                            id={`album_title_${albumIndex}`}
                            placeholder={`Enter Album ${albumIndex + 1} title`}
                            className="bg-transparent w-64 px-2 py-1 border"
                            value={album.album_title}
                            onChange={(e) => handleInputChange(albumIndex, e)}
                        />
                        <div className="mt-4 grid grid-cols-4 gap-4">
                            {album.album_images.map((image, imageIndex) => (
                                <div key={imageIndex} className="flex flex-col gap-1">
                                    <label htmlFor={`image_upload_${albumIndex}_${imageIndex}`} className="cursor-pointer">
                                        {image ? (
                                            <img
                                                className="w-full h-44 m-auto border"
                                                src={URL.createObjectURL(image)}
                                                alt={`Album ${albumIndex + 1} Image ${imageIndex + 1} Preview`}
                                            />
                                        ) : (
                                            <div className="w-full h-44 m-auto flex items-center justify-center border">
                                                <span className="font-bold text-lg">Upload Image {imageIndex + 1}</span>
                                            </div>
                                        )}
                                        <input
                                            className="hidden"
                                            type="file"
                                            id={`image_upload_${albumIndex}_${imageIndex}`}
                                            accept=".jpg, .jpeg, .png"
                                            name={`image_${albumIndex}_${imageIndex}`}
                                            onChange={(e) => handleImageUpload(albumIndex, imageIndex, e)}
                                        />
                                    </label>
                                    {!image && (
                                        <span className="text-red-500 text-sm">Please upload an image.</span>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>
                ))}

                <button type="button" onClick={addAlbum} className="w-full py-2 rounded-sm font-semibold text-lg cursor-pointer bg-blue-600 hover:bg-blue-500 transition-all ease-in-out duration-300">
                    Add Another Album
                </button>

                {/* <button type="submit" className="w-full py-2 rounded-sm font-semibold text-lg cursor-pointer bg-yellow-600 hover:bg-yellow-500 transition-all ease-in-out duration-300">
                    Create Albums
                </button> */}
            </form>
        </div>
    );
}

export default AlbumUploader;
