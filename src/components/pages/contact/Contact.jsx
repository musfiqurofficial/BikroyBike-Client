import React from 'react';

const Contact = () => {
    return (
        <div className='appointment-container py-14'>
            <form className="lg:w-5/12 md:w-8/12 w-10/12 mx-auto">
                <div className='text-center mb-8'>
                    <h4 className='text-lg font-bold text-secondary uppercase'>Contact Us</h4>
                    <h2 className='font-semibold text-4xl text-base-100'>Stay connected with us</h2>
                </div>
                <div className="flex flex-wrap -mx-3 mb-6">
                    <div className="w-full px-3">
                        <input className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="email" type="email" placeholder='Your Email' required />
                    </div>
                </div>
                <div className="flex flex-wrap -mx-3 mb-6">
                    <div className="w-full px-3">
                        <input className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="name" type="text" placeholder='Your Name' required />
                    </div>
                </div>
                <div className="flex flex-wrap -mx-3 mb-6">
                    <div className="w-full px-3">
                        <textarea className=" no-resize appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-2 leading-tight focus:outline-none focus:bg-white focus:border-gray-500 h-36 resize-none" id="message" placeholder='Message' required></textarea>
                    </div>
                </div>
                <div className="w-1/2 mx-auto">
                    <div className="text-center">
                        <button className="shadow bg-primary hover:bg-secondary focus:shadow-outline focus:outline-none text-white font-bold py-3 px-8 rounded" type="submit">
                            Submit
                        </button>
                    </div>
                </div>
            </form>
        </div>
    );
};

export default Contact;