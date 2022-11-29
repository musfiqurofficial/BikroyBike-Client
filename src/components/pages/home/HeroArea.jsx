import React from 'react';
import { NavLink } from 'react-router-dom';
import hero from "../../../assets/hero.jpg";


const HeroArea = () => {
    return (
        <div className='hero-container lg:py-28 py-10 text-white'>
            <div className=" lg:w-6/12 md:w-7/12 w-10/12 mx-auto text-center">
                <h1 className="lg:text-5xl text-3xl font-bold">Bangladesh's largest used bike selling marketplace.!</h1>
                <p className="py-6">BikeBikroy is basically a platform where you can buy and sell almost anything! We try to keep the marketplace verified by products.</p>
                <NavLink to='/loginForm' className="btn text-base-100 bg-primary border-none hover:bg-secondary hover:border-none my-2 ">Get started</NavLink>
            </div>
        </div>
    );
};

export default HeroArea;