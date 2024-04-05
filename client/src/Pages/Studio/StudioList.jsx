import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import HomeLayout from "../../Layouts/HomeLayout";
import { getAllStudios } from "../../Redux/Slices/StudioSlice";
import StudioCard from "../../Components/Card/StudioCard";

function StudioList() {
    const dispatch = useDispatch();

    const { studioData } = useSelector((state) => state.studio);


    async function loadStudios() {
        await dispatch(getAllStudios());
    }

    useEffect(() => {
        loadStudios();
    }, []);

    return (
        <HomeLayout>
            <div className="bg-slate-200">
                <div>
                    <h1 className="text-center text-gray-600 text-3xl font-semibold mb-5">
                        Explore the Studio & Choose
                        <span className="font-bold text-red-500">
                            Best Photograpgher
                        </span>
                    </h1>
                </div>
                <div className="min-h-[100vh] w-full pt-12 flex flex-col justify-start items-end text-white">
                    <div className="mb-10 w-3/4 flex flex-col justify-start items-end gap-10">
                        {studioData?.map((element) => {
                            return <StudioCard key={element._id} data={element} />
                        })}
                    </div>


                </div>
            </div>
        </HomeLayout>
    );

}

export default StudioList;