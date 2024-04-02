import React, { useState } from 'react';
import { FiMenu, FiX } from 'react-icons/fi';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import Footer from '../Pages/Footer';
import { logout } from '../Redux/Slices/AuthSlice';

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const isLoggedIn = useSelector(state => state.auth.isLoggedIn);
    const role = useSelector(state => state.auth.role);

    const handleToggle = () => {
        setIsOpen(!isOpen);
    };

    const handleLogout = async () => {
        const res = await dispatch(logout());
        if (res?.payload?.success) navigate("/");
    };

    return (
        <nav className="bg-gray-800 sticky top-0 z-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    <div className="flex items-center">
                        <Link to="/" className="flex items-center space-x-2 text-white font-bold">
                            {/* <img src="/logo.png" alt="Logo" className={`h-8 w-8 ${isOpen ? 'hidden' : ''}`} /> */}
                            <span className={isOpen ? 'hidden' : ''}>STUDIOBOOK</span>
                        </Link>
                    </div>
                    <div className="md:hidden flex items-center z-50">
                        <button onClick={handleToggle} className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:bg-gray-700 focus:text-white">
                            {isOpen ? <FiX className="h-6 w-6" /> : <FiMenu className="h-6 w-6" />}
                        </button>
                    </div>
                    <div className="hidden md:flex items-center space-x-4">
                        {isLoggedIn ? (
                            <>
                                <Link to="/" className="text-white hover:bg-gray-700 px-3 py-2 rounded-md text-sm font-medium">Home</Link>
                                {role === 'ADMIN' && <Link to="/admin/dashboard" className="text-white hover:bg-gray-700 px-3 py-2 rounded-md text-sm font-medium">Admin Dashboard</Link>}
                                <Link to="/aboutus" className="text-white hover:bg-gray-700 px-3 py-2 rounded-md text-sm font-medium">About Us</Link>
                                {role === "USER" && <Link to="/user/explore" className="text-white hover:bg-gray-700 px-3 py-2 rounded-md text-sm font-medium">Explore</Link>}
                                <Link to="/user/profile" className="text-white hover:bg-gray-700 px-3 py-2 rounded-md text-sm font-medium">Profile</Link>
                                <button onClick={handleLogout} className="text-white hover:bg-gray-700 px-3 py-2 rounded-md text-sm font-medium">Logout</button>
                            </>
                        ) : (
                            <>
                                <Link to="/" className="text-white hover:bg-gray-700 px-3 py-2 rounded-md text-sm font-medium">Home</Link>
                                <Link to="/aboutus" className="text-white hover:bg-gray-700 px-3 py-2 rounded-md text-sm font-medium">About Us</Link>
                                <Link to="/login"> <button className="text-white hover:bg-gray-700 px-3 py-2 rounded-md text-sm font-bold">Login</button></Link>
                                <Link to="/signup"> <button className="text-white bg-red-500 hover:bg-gray-700 px-3 py-2 rounded-md text-sm font-bold">Register as Studio </button></Link>
                            </>
                        )}
                    </div>
                </div>
            </div>
            <div className={`md:hidden ${isOpen ? 'block' : 'hidden'}`}>
                <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
                    {isLoggedIn ? (
                        <>
                            <Link to="/" className="text-white block hover:bg-gray-700 px-3 py-2 rounded-md text-base font-medium">Home</Link>
                            {role === 'ADMIN' && <Link to="/admin/dashboard" className="text-white block hover:bg-gray-700 px-3 py-2 rounded-md text-base font-medium">Admin Dashboard</Link>}
                            {role === "USER" && <Link to="/user/explore" className="text-white block hover:bg-gray-700 px-3 py-2 rounded-md text-base font-medium">Explore</Link>}
                            <Link to="/user/profile" className="text-white block hover:bg-gray-700 px-3 py-2 rounded-md text-base font-medium">Profile</Link>
                            <button onClick={handleLogout} className="text-white block hover:bg-gray-700 px-3 py-2 rounded-md text-base font-medium">Logout</button>
                        </>
                    ) : (
                        <>
                            <Link to="/" className="text-white hover:bg-gray-700 px-3 py-2 rounded-md text-sm font-medium">Home</Link>
                            <Link to="/aboutus" className="text-white block hover:bg-gray-700 px-3 py-2 rounded-md text-base font-medium">About Us</Link>
                            <Link to="/login"> <button className="text-white block mb-5 hover:bg-gray-700 px-3 py-2 rounded-md text-base font-bold">Login </button></Link>
                            <Link to="/signup" className="text-white  bg-red-500  hover:bg-gray-700 px-3 py-2 rounded-md text-base font-bold">Register as Studio</Link>
                        </>
                    )}
                </div>
            </div>
        </nav>
    );
};

const HomeLayout = ({ children }) => {
    return (
        <div className="min-h-[90vh]">
            <Navbar />
            {children}
            <Footer />
        </div>
    );
};

export default HomeLayout;
