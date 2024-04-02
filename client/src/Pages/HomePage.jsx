import React from 'react';
import HomeLayout from '../Layouts/HomeLayout';
// import { Link } from 'react-router-dom';
import CustomBackground from '../Components/CustomBackground';
// import Trending from '../Components/Trending';
import Trend from '../Components/Trend'
import Cards from '../Components/Cards'
import Scrollbar from '../Components/Scrollbar'
import Babies from '../Components/Babies'
import Ocassion from '../Components/Ocassion'
import Nature from '../Components/Nature'
import Reviews from '../Components/Reviews'
import Studio from '../Components/Studio'
// import CarouselSlide from '../Components/CarouselSlide';
// import HomePageImage from "../assets/Images/homePageMainImage.png"

const Homepage = () => {
  return (
    <HomeLayout>
      <CustomBackground imageUrl="https://images.pexels.com/photos/132146/pexels-photo-132146.jpeg" />
      {/* <Trending /> */}
      {/* <CarouselSlide /> */}
      {/* <Slider /> */}
      <Trend />
      <Cards />
      <Scrollbar />
      <Babies />
      <Ocassion />
      <Nature />
      <Reviews />
      <Studio />
    </HomeLayout>
  );
};

export default Homepage;
