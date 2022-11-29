import React from 'react';
import { NavLink } from 'react-router-dom';
import terms from "../../../assets/287739675_5454704374551047_1838096713574124594_n.jpg";

const HomeTerms = () => {
    return (
        <div className='lg:py-10'>
            <div className="w-9/12 mx-auto">
                <div className="hero-content flex-col lg:flex-row-reverse justify-between">
                    <img src={terms} className="max-w-xs rounded-lg shadow-2xl shadow-slate-300" alt='' />
                    <div className='lg:pl-8 my-10 lg:my-0 '>
                        <h1 className="lg:text-5xl text-3xl font-bold">Exceptional Dental Care, on Your Terms</h1>
                        <p className="py-6">It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsumis that it has a more-or-less normal distribution of letters,as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page</p>
                        <NavLink to='/loginForm' className="btn text-base-100 linear-gradient border-none hover:bg-secondary hover:border-none my-2 ">Get started</NavLink>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default HomeTerms;