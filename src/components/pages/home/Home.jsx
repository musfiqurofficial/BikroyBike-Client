import React from 'react';
import HeroArea from './HeroArea';
import HomeContact from './HomeContact';
import HomeTerms from './HomeTerms';
import CategoryProduct from './CategoryProduct';
import HomeGetNTouch from './HomeGetNTouch';
const Home = () => {
    return (
        <div>
            {/* HeroArea */}
            <div><HeroArea></HeroArea></div>
            <div><CategoryProduct></CategoryProduct></div>
            <div><HomeTerms></HomeTerms></div>
            <div><HomeGetNTouch></HomeGetNTouch></div>
            <div><HomeContact></HomeContact></div>
        </div>
    );
};

export default Home;