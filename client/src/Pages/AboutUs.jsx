import React from 'react'
import aboutMainImage from "../assets/Images/aboutMainImage.png"
import HomeLayout from '../Layouts/HomeLayout'

export const AboutUs = () => {
    return (
        <HomeLayout>
        <div
            className="pl-20 pt-20 flex flex-col text-white">
            <div className="flex items-center gap-5 mx-10">
                <section className="w-1/2 space-y-10">
                    <h1 className="text-5xl text-yellow-500 font-semibold ">
                        Affordable and Quality Photographer
                    </h1>
                    <p className="text-xl to-gray-200">
                        Our goal is to provide the affordable and quality photographer across the counrty.
                        We are providing the platform for the aspiring teacher and students to share
                        their skills, creativity and knowledge to each other to empower and contribute
                        in thr growth and wellness in mankind.
                    </p>
                </section>
                <div className="w-1/2">
                    <img
                        id="test1"
                        style={{
                            filter: "drop-shadow(0px 10px 10px rgb(0,0,0)"
                        }}
                        className="drop-shadow-2xl"
                        src={aboutMainImage}
                        alt="aboutMainImg" />
                </div>
            </div>
        </div>
        </HomeLayout>
    )
}
