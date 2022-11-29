import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
    return (
        <footer className='footer-container text-white'>
            <div className='w-11/12 mx-auto'>
                <footer className=" py-10 grid lg:grid-cols-3 md:grid-cols-3 ">
                    <div className='flex lg:flex-none md:flex-none flex-col items-center lg:items-start md:items-start'>
                        <p className="font-bold mb-2 text-2xl text-secondary">Services</p>
                        <Link className="link link-hover text-base">Second Hand Bike</Link>
                        <Link className="link link-hover text-base">Safe Delivery</Link>
                        <Link className="link link-hover text-base">Free Delivery</Link>
                        <Link className="link link-hover text-base">Long Service</Link>
                    </div>
                    <div className='flex lg:flex-none md:flex-none flex-col items-center lg:items-center md:items-center my-5 lg:my-0 md:my-0'>
                        <p className="font-bold mb-2 text-2xl text-secondary ">Our Condition</p>
                        <Link className="link link-hover text-base">Original Parts</Link>
                        <Link className="link link-hover text-base">All Documentation </Link>
                        <Link className="link link-hover text-base">Best Deal</Link>
                    </div>
                    <div className='flex lg:flex-none md:flex-none flex-col items-center lg:items-end md:items-end'>
                        <p className="font-bold mb-2 text-2xl text-secondary">OUR ADDRESS</p>
                        <Link className="link link-hover text-base">Bonani, Dhaka - 1200</Link>
                    </div>
                </footer>
                <hr />
                <footer className="footer footer-center p-5">
                    <div>
                        <p>Copyright © 2022 - All right reserved by MusfiqurOfficial</p>
                    </div>
                </footer>
            </div>
        </footer>
    );
};

export default Footer;