import React from 'react';
import getNtouch from "../../../assets/315277031_662768795426773_4871458477648140648_n.jpg";

const HomeGetNTouch = () => {
    return (
        <div className='w-10/12 mx-auto'>
            <section className="mb-12 text-gray-800 text-center lg:text-left">
                <div className="block rounded-lg shadow-lg bg-white">
                    <div className="flex flex-wrap items-center">
                        <div className="grow-0 shrink-0 basis-auto hidden lg:flex lg:w-6/12 xl:w-4/12">
                            <img src={getNtouch}
                                alt="Trendy Pants and Shoes"
                                className="w-full rounded-t-lg lg:rounded-tr-none lg:rounded-bl-lg"
                            />
                        </div>
                        <div className="grow-0 shrink-0 basis-auto w-full lg:w-6/12 xl:w-8/12">
                            <div className="px-6 py-12 md:px-12">
                                <h2 className="text-3xl font-bold mb-6">
                                    Do not miss any updates.
                                    <br />
                                    <span className="text-blue-600">Subscribe to the newsletter</span>
                                </h2>
                                <p className="text-gray-500 mb-12">
                                    We will write rarely and only high-quality content.
                                </p>
                                <div className="md:flex flex-row">
                                    <input
                                        type="text"
                                        className="form-control block w-full px-4 py-2 mb-2 md:mb-0 md:mr-2 text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                                        placeholder="Enter your email"
                                    />
                                    <button
                                        type="submit"
                                        className="inline-block px-7 py-3 bg-blue-600 text-white font-medium text-sm leading-snug uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out"
                                        data-mdb-ripple="true"
                                        data-mdb-ripple-color="light"
                                    >
                                        Subscribe
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default HomeGetNTouch;