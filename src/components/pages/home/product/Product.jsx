import React from 'react';
import { Link } from 'react-router-dom';
import blue from "../../../../assets/pngegg.png";

const Product = ({ product }) => {
    const { _id, brand_name, model_name, model_year, product_img, category, Post_date, Post_time, address, km, cc, price, used_year, seller } = product;
    return (
        <div className=''>
            <div className='lg:w-8/12 md:w-10/12 mx-auto hover:shadow-lg border-b-2 rounded-md'>
                <Link to={`/product/detail/${_id}`}>
                    <button className='w-full text-start'>
                        <div className='grid grid-cols-4 gap-5 items-center  py-5 '>
                            <div className=''>
                                <div className="h-44 carousel carousel-vertical rounded-box">
                                    <div className="carousel-item h-full">
                                        <img src={product_img.product_img1} alt='' />
                                    </div>
                                    <div className="carousel-item h-full">
                                        <img src={product_img.product_img2} alt='' />
                                    </div>
                                    <div className="carousel-item h-full">
                                        <img src={product_img.product_img3} alt='' />
                                    </div>
                                </div>
                            </div>
                            <div className='col-span-2 relative'>
                                <h3 className='text-xl font-semibold'>{brand_name} {model_name} {model_year}</h3>
                                <p className='font-semibold my-1'>{km ? km : <></>}, {cc ? cc : <></>}</p>
                                <p>{address.city}, {address.state}-{address.zip_code}, {address.country}</p>
                                <p className='my-1'>{category}</p>
                                <div className='flex justify-between'>
                                    <h5>{price}</h5>
                                    <p>{Post_date}, {Post_time}</p>
                                </div>
                                <p className='text-end mt-3 text-sm font-semibold'>Used {used_year}</p>
                                {
                                    seller?.verified_seller ? <span className='absolute top-0 right-0 '>Verified <img className='w-5' src={blue} alt="" /></span> : <></>


                                }
                            </div>
                        </div>
                    </button>
                </Link>
            </div>
        </div>
    );
};

export default Product;