import React from 'react';
import { useState } from 'react';
import { useLoaderData } from 'react-router-dom/dist';
import BookingModal from './BookingModal';

const ProductDetail = () => {
    const data = useLoaderData();
    const { _id, product_img, brand_name, detail, model_name, model_year, category, Post_date, Post_time, address, km, cc, price, used_year, seller } = data;

    const [productDetail, setProductDetail] = useState(null);


    return (
        <div className=''>
            <div className='w-11/12 lg:w-8/12 mx-auto'>
                <div className='grid grid-cols-3'>
                    <div className='col-span-2 p-8'>
                        <h1 className='text-3xl font-semibold text-primary'>{brand_name} {model_name} {model_year}</h1>
                        <div>
                            <div className="carousel w-full">
                                <div id="item1" className="carousel-item w-full">
                                    <img src={product_img?.product_img1} className="w-full" alt='' />
                                </div>
                                <div id="item2" className="carousel-item w-full">
                                    <img src={product_img?.product_img2} className="w-full" alt='' />
                                </div>
                                <div id="item3" className="carousel-item w-full">
                                    <img src={product_img?.product_img3} className="w-full" alt='' />
                                </div>
                            </div>
                            <div className="flex justify-center w-full py-2 gap-2">
                                <a href="#item1"><img className='w-16' src={product_img?.product_img2} alt="" /></a>
                                <a href="#item2"><img className='w-16' src={product_img?.product_img2} alt="" /></a>
                                <a href="#item3"><img className='w-16' src={product_img?.product_img3} alt="" /></a>
                            </div>
                        </div>
                        <h2 className='text-3xl font-semibold my-6'><span className='text-5xl text-bold text-primary'>৳</span>{price}</h2>
                        <p>Category: {category}</p>
                        <p className='my-3'>Brand: {brand_name}</p>
                        <p><span className='text-xl font-semibold'>Detail:</span> {detail}</p>
                    </div>
                    <div className='bg-stone-50 shadow-lg px-5 py-8 '>
                        <div className='sticky top-28'>
                            <h3 className='text-xl font-bold'>Name: {seller?.seller_name}</h3>
                            <p className='my-3'>{km ? km : <></>}, {cc ? cc : <></>}</p>
                            <p>Address: {address.city}, {address.state}-{address.zip_code}, {address.country}</p>
                            <h3 className='my-3'>Phone: {seller?.phone_number}</h3>
                            <div className='flex justify-between'>
                                <h5>Used: {used_year}</h5>
                                <p>{Post_date}, {Post_time}</p>
                            </div>
                            <label onClick={() => setProductDetail(data)} htmlFor="my-modal-3" className="btn text-base-100 bg-primary border-none hover:bg-secondary hover:border-none mt-8 w-full">Book Now</label>
                            <BookingModal data={data} setProductDetail={setProductDetail} productDetail={productDetail}></BookingModal>
                        </div>
                    </div>
                </div>
                    <div className='w-10/12 mx-auto'>
                        <p className='text-center py-4 px-5 bg-primary text-white rounded-lg shadow-lg my-5'>'বিঃ দ্রঃ পণ্য কেনার আগে ভালোভাবে যাচাই করে কিনবেন। কোন সমস্যা হলে কর্তৃপক্ষ দাই নয়।</p>
                    </div>
            </div >
        </div>
    );
};

export default ProductDetail;