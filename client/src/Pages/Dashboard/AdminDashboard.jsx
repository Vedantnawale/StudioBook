import {
    ArcElement,
    BarElement,
    CategoryScale,
    Chart as ChartJS,
    Legend,
    LinearScale,
    Title,
    Tooltip
} from "chart.js";
import { useEffect, useState } from "react";
import { Bar, Pie } from "react-chartjs-2";
import { BsCollectionPlayFill, BsTrash } from "react-icons/bs";
import { FaUsers } from "react-icons/fa";
import { FcSalesPerformance } from "react-icons/fc";
import { GiMoneyStack } from "react-icons/gi";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import HomeLayout from "../../Layouts/HomeLayout";
import { deleteStudio, getAllStudios } from "../../Redux/Slices/StudioSlice";
import { getPaymentRecord } from "../../Redux/Slices/RazorpaySlice";
import { getStatsData } from "../../Redux/Slices/StatSlice";

ChartJS.register(
    ArcElement,
    BarElement,
    CategoryScale,
    Legend,
    LinearScale,
    Title,
    Tooltip
);

function AdminDashboard() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);

    const { allUsersCount, viewCounts, subscribedCount } = useSelector(
        (state) => state.stat
    );
    const { allPayments, monthlySalesRecord } = useSelector(
        (state) => state.razorpay
    );
    const studioData = useSelector((state) => state.studio);

    const adminId = useSelector((state) => state.auth.mobileNumber); // Assuming admin's user ID is stored here

    const userData = {
        labels: ["View Counts", "Subscribed Users", "All Users"],
        datasets: [
            {
                label: "User Details",
                data: [viewCounts, subscribedCount, allUsersCount],
                backgroundColor: ["yellow", "green", "red"],
                borderWidth: 1,
                borderColor: ["yellow", "green", "red"]
            }
        ]
    };

    const salesData = {
        labels: [
            "Jan",
            "Feb",
            "Mar",
            "Apr",
            "May",
            "Jun",
            "Jul",
            "Aug",
            "Sep",
            "Oct",
            "Nov",
            "Dec"
        ],
        datasets: [
            {
                label: "Sales / Month",
                data: monthlySalesRecord,
                backgroundColor: ["red"],
                borderColor: ["white"],
                borderWidth: 2
            }
        ]
    };

    const myStudios = studioData?.studioData?.filter(
        (studio) => studio.mobileNumber !== adminId
    ); // Filter studios by admin ID

    async function onStudioDelete(id) {
        if (window.confirm("Are you sure you want to delete the studio? ")) {
            const res = await dispatch(deleteStudio(id));
            if (res?.payload?.success) {
                await dispatch(getAllStudios());
            }
        }
    }

    useEffect(() => {
        (async () => {
            await dispatch(getAllStudios());
            await dispatch(getStatsData());
            await dispatch(getPaymentRecord());
            setLoading(false);
        })();
    }, [dispatch]);

    // Find the index of the last month in your sales data
    const lastMonthIndex = new Date().getMonth() - 1; // Assuming your sales data starts from January

    // Ensure to handle the case when the current month is January
    const lastMonthSales = lastMonthIndex >= 0 ? monthlySalesRecord[lastMonthIndex] : 0;

    if (loading) {
        return (
            <HomeLayout>
                <div className="min-h-[90vh] pt-5 flex flex-col flex-wrap gap-10 text-white">
                    <h1 className="text-center text-5xl font-semibold text-yellow-500">
                        Loading...
                    </h1>
                </div>
            </HomeLayout>
        );
    }

    return (
        <HomeLayout>
            <div className="min-h-[90vh] pt-5 flex flex-col flex-wrap gap-10 text-white">
                <h1 className="text-center text-5xl font-semibold text-yellow-500">
                    Admin Dashboard
                </h1>

                <div className="grid grid-cols-2 gap-5 m-auto mx-10">
                    <div className="flex flex-col items-center gap-10 p-5 shadow-lg rounded-md">
                        <div className="w-80 h-80">
                            <Pie data={userData} />
                        </div>

                        <div className="grid grid-cols-2 gap-5">
                            <div className="flex items-center justify-between p-5 gap-5 rounded-md shadow-md">
                                <div className="flex flex-col items-center">
                                    <p className="font-semibold">View Counts</p>
                                    <h3 className="text-4xl font-bold">{viewCounts}</h3>
                                </div>
                                <FaUsers className="text-yellow-500 text-5xl" />
                            </div>
                            <div className="flex items-center justify-between p-5 gap-5 rounded-md shadow-md">
                                <div className="flex flex-col items-center">
                                    <p className="font-semibold">Booked Users</p>
                                    <h3 className="text-4xl font-bold">{subscribedCount}</h3>
                                </div>
                                <FaUsers className="text-green-500 text-5xl" />
                            </div>
                            <div className="flex items-center justify-between p-5 gap-5 rounded-md shadow-md">
                                <div className="flex flex-col items-center">
                                    <p className="font-semibold">Total Users</p>
                                    <h3 className="text-4xl font-bold">{allUsersCount}</h3>
                                </div>
                                <FaUsers className="text-red-500 text-5xl" />
                            </div>
                        </div>
                    </div>

                    <div className="flex flex-col items-center gap-10 p-5 shadow-lg rounded-md">
                        <div className="h-80 w-full relative">
                            <Bar className="absolute bottom-0 h-80 w-full" data={salesData} />
                        </div>

                        <div className="grid grid-cols-2 gap-5">
                            <div className="flex items-center justify-between p-5 gap-5 rounded-md shadow-md">
                                <div className="flex flex-col items-center">
                                    <p className="font-semibold">Last Month Book Users</p>
                                    <h3 className="text-4xl font-bold">{lastMonthSales}</h3>
                                </div>
                                <FcSalesPerformance className="text-yellow-500 text-5xl" />
                            </div>
                            <div className="flex items-center justify-between p-5 gap-5 rounded-md shadow-md">
                                <div className="flex flex-col items-center">
                                    <p className="font-semibold">Total Revenue</p>
                                    <h3 className="text-4xl font-bold">{allPayments?.count * 499}</h3>
                                </div>
                                <GiMoneyStack className="text-green-500 text-5xl" />
                            </div>
                        </div>
                    </div>
                </div>

                <div className="mx-[10%] w-[80%] self-center flex flex-col items-center justify-center gap-10 mb-10">
                    <div className="flex w-full items-center justify-between">
                        <h1 className="text-center text-3xl font-semibold">
                            Studio Overview
                        </h1>

                        <button
                            onClick={() => {
                                navigate("/studio/edit");
                            }}
                            className="w-fit bg-yellow-500 hover:bg-yellow-600 transition-all ease-in-out duration-300 rounded py-2 px-4 font-semibold text-lg cursor-pointer"
                        >
                            Edit Your Studio
                        </button>
                    </div>

                    <table className="table overflow-x-scroll">
                        <thead>
                            <tr>
                                <th>S No</th>
                                <th>Studio Title</th>
                                <th>Instructor</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {myStudios?.map((studio, idx) => (
                                <tr key={studio._id}>
                                    <td>{idx + 1}</td>
                                    <td>
                                        <textarea readOnly value={studio?.title} className="w-40 h-auto bg-transparent resize-none"></textarea>
                                    </td>
                                    <td>{studio?.createdBy}</td>
                                    <td className="flex items-center gap-4">
                                        <button
                                            className="bg-green-500 hover:bg-green-600 transition-all ease-in-out duration-300 text-xl py-2 px-4 rounded-md font-bold"
                                            onClick={() => navigate("/studio/description", { state: { ...studio } })}
                                        >
                                            <BsCollectionPlayFill />
                                        </button>
                                        <button
                                            className="bg-red-500 hover:bg-red-600 transition-all ease-in-out duration-300 text-xl py-2 px-4 rounded-md font-bold"
                                            onClick={() => onStudioDelete(studio?._id)}
                                        >
                                            <BsTrash />
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </HomeLayout>
    );
}

export default AdminDashboard;
