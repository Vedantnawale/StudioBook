import React, { useState } from 'react';
import HomeLayout from '../../Layouts/HomeLayout';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import './client.css';
import Packages from './Packages';
import Albums from './Albums';
import Reviews from './Reviews';

const ClientDescription = () => {
    const { state } = useLocation();
    const { role, data } = useSelector((state) => state.auth);
    const navigate = useNavigate();
    const [activeSection, setActiveSection] = useState('about');

    const Whatsapp = `https://wa.me/${state?.mobileNumber}`

    const renderActionButton = () => {
        const isAdmin = role === 'ADMIN';
        const isActiveSubscription = data?.subscription?.status === 'ACTIVE';
        const buttonText = isAdmin || isActiveSubscription ? 'Edit' : 'Book';
        
        const handleClick = () => {
            if (isAdmin) {
                navigate('/edit');  // Replace '/edit' with the actual route for the edit page
            } else {
                navigate('/checkout');  // Replace '/checkout' with the actual route for the checkout page
            }
        };

        return (
            <button
                className="bg-green-600 text-white text-md rounded-md font-bold px-8 py-2 mt-3 hover:bg-green-500 transition-all ease-in-out duration-300"
                onClick={handleClick}
            >
                {buttonText}
            </button>
        );
    };

    return (
        <HomeLayout>
            <div className="container">
                <main className="main">
                    <section className="hero">
                        <div className="flex justify-center items-center gap-3">
                            {state?.thumbnail?.secure_url && (
                                <img
                                    className="w-48 rounded-full border-4 border-gray-400 mt-20"
                                    src="https://i.pinimg.com/736x/5d/c1/35/5dc135c6d75eed8728d17a0494872161.jpg"
                                    alt="studio thumbnail"
                                />
                            )}
                            <div className="pt-20">
                                <h2 className="text-3xl font-bold">{state?.title}</h2>
                                <p className="font-semibold">{state?.location}</p>
                                <div className="contact-buttons">
                                    <button>Call Phone</button>
                                    <Link to={Whatsapp}>
                                    <button>WhatsApp</button>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </section>
                    <section className="services-button">
                        {state?.specialities?.map((speciality, index) => (
                            <button key={index}>{speciality}</button>
                        ))}
                    </section>
                    <section className="ratings">
                        <p>★★★★★ 4.9</p>
                        <p>132 Reviews</p>
                    </section>
                </main>

                <div className="Tabs">
                    <button
                        className={activeSection === 'about' ? 'active' : ''}
                        onClick={() => setActiveSection('about')}
                    >
                        About
                    </button>
                    <button
                        className={activeSection === 'albums' ? 'active' : ''}
                        onClick={() => setActiveSection('albums')}
                    >
                        Albums
                    </button>
                    <button
                        className={activeSection === 'packages' ? 'active' : ''}
                        onClick={() => setActiveSection('packages')}
                    >
                        Packages
                    </button>
                    <button
                        className={activeSection === 'reviews' ? 'active' : ''}
                        onClick={() => setActiveSection('reviews')}
                    >
                        Reviews
                    </button>
                </div>

                <div className="Content">
                    <div className="About" style={{ display: activeSection === 'about' ? 'block' : 'none' }}>
                        <section className="about-section">
                            <h2 className="mt-2 mb-2 text-xl font-semibold text-white">Overview</h2>
                            <p>{state?.description}</p>

                            <h2 className="mt-2 mb-2 text-xl font-semibold text-white">Services Location</h2>
                            <button>{state?.location}</button>

                            <h2 className="mt-2 mb-2 text-xl font-semibold text-white">Language Known</h2>
                            <div className="language-buttons">
                                {state?.languages?.map((language, index) => (
                                    <button key={index}>{language}</button>
                                ))}
                            </div>

                            <h2 className="mt-2 mb-2 text-xl font-semibold text-white">Services</h2>
                            <div className="services-buttons">
                                {state?.services?.map((service, index) => (
                                    <button key={index}>{service}</button>
                                ))}
                            </div>
                        </section>
                        {renderActionButton()}
                    </div>
                    <div className="Albums" style={{ display: activeSection === 'albums' ? 'block' : 'none' }}>
                        <Albums />
                    </div>
                    <div className="Packages" style={{ display: activeSection === 'packages' ? 'block' : 'none' }}>
                        <Packages />
                    </div>
                    <div className="Reviews" style={{ display: activeSection === 'reviews' ? 'block' : 'none' }}>
                        <Reviews />
                    </div>
                </div>
            </div>
        </HomeLayout>
    );
};

export default ClientDescription;
