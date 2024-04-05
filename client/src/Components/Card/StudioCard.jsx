import React from "react";
import { useNavigate } from "react-router-dom";
import { FiMapPin, FiDollarSign, FiUsers, FiUser } from "react-icons/fi";

function StudioCard({ data }) {
    const navigate = useNavigate();

    return (
        <div
            onClick={() => navigate("/studio/description/", { state: { ...data } })}
            className="text-white w-full shadow-lg border-gray-300 border-2 rounded-lg cursor-pointer overflow-hidden bg-slate-200 relative"
        >
            <div className="flex flex-col md:flex-row gap-9">
                <div className="flex-none">
                    {data?.thumbnail?.secure_url && (
                        <img
                            className="w-40 rounded-full border border-gray-400"
                            src="https://i.pinimg.com/736x/5d/c1/35/5dc135c6d75eed8728d17a0494872161.jpg"
                            alt="studio thumbnail"
                        />
                    )}
                </div>
                <div className="flex-grow p-3 space-y-1">
                    <div className="space-y-1">
                        <h2 className="text-3xl font-bold text-red-500 line-clamp-2">
                            {data?.title}
                        </h2>
                        <div className="flex items-center space-x-1">
                            <FiUser className="text-red-500" />
                            <p className="font-semibold text-black">{data?.createdBy}</p>
                        </div>
                        <div className="flex items-center space-x-1">
                            <FiMapPin className="text-red-500" />
                            <p className="line-clamp-2 text-black">{data?.location}</p>
                        </div>
                    </div>
                </div>
                <div className="flex flex-col justify-center mt-10">
                    <div className="flex items-center space-x-1">
                        <FiDollarSign className="text-red-500" />
                        <p className="font-semibold text-black">{data?.price}</p>
                    </div>
                    <div className="flex items-center space-x-1">
                        <FiUsers className="text-red-500" />
                        <p className="font-semibold text-black">{data?.specialities}</p>
                    </div>
                </div>

            </div>
            <div className="flex gap-4">
                {data?.images?.map((image, index) => (
                    <img
                        key={index}
                        className="h-48 w-52 ml-3 object-cover bg-white rounded-lg transition-all ease-in-out duration-300"
                        src={image?.secure_url}
                        alt={`studio image ${index + 1}`}
                    />
                ))}
            </div>
        </div>
    );
}

export default StudioCard;
