import { useQuery } from '@tanstack/react-query';
import React, { useContext, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import Loading from '../components/common/loading/Loading';
import { AuthContext } from '../context/AuthProvider';

const AddProduct = () => {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const { user } = useContext(AuthContext);
    const [isLoading, setIsLoading] = useState(false)
    const imgHostKey = process.env.REACT_APP_imgbb_key

    const navigate = useNavigate();


    const handleAddProduct = data => {
        const image = data.image[0];
        const formData = new FormData();
        formData.append('image', image);
        fetch(`https://api.imgbb.com/1/upload?key=${imgHostKey}`, {
            method: 'POST',
            body: formData
        })
            .then(res => res.json())
            .then(imgData => {
                if (imgData.success) {
                    console.log(imgData.data.url);
                    const product = {
                        brand_name: data.brand_name,
                        model_name: data.model_name,
                       

                    }
                    console.log(product);

                    // fetch('http://localhost:5000/products', {
                    //     method: 'POST',
                    //     headers: {
                    //         'content-type': 'application/json',
                    //         // authorization: `bearer ${localStorage.getItem('token')}`
                    //     },
                    //     body: JSON.stringify(product)
                    // })
                    //     .then(res => res.json())
                    //     .then(result => {
                    //         console.log(result);
                    //         toast.success(`${data.name} is added successfully`);
                    //         setIsLoading(true)
                    //         navigate('/dashboard/myproducts')
                    //     })
                }
                
            })
    }

    if (isLoading) {
        return <Loading></Loading>
    }

    return (
        <div className='lg:w-10/12 mx-auto my-10'>
            <h2 className="text-4xl">Add A Product</h2>
            <form onSubmit={handleSubmit(handleAddProduct)}>
                <div className="form-control w-full ">
                    <label className="label"> <span className="text-black text-lg font-semibold label-text"> Select Brand Name</span></label>
                    <select
                        {...register('brand_name')}
                        className="select input-bordered input-sm input-primary w-full ">
                        <option selected>SUZUKI</option>
                        <option>YAMAHA</option>
                        <option>HONDA</option>
                        <option>TVS</option>
                    </select>
                </div>
                <div className="form-control w-full ">
                    <label className="label"> <span className="text-black text-lg font-semibold label-text">Model Name</span></label>
                    <input type="text" {...register("model_name", {
                        required: "Required"
                    })} className="input input-sm input-bordered input-primary w-full " />
                </div>
                <div className="form-control w-full ">
                    <label className="label"> <span className="text-black text-lg font-semibold label-text">Model year</span></label>
                    <input type="text" {...register("model_year", {
                        required: "Required"
                    })} className="input input-sm input-bordered input-primary w-full " />
                </div>
                <div className="form-control w-full ">
                    <label className="label"> <span className="text-black text-lg font-semibold label-text">Product Images</span></label>
                    <div className='flex fle'>
                        <input type="file" className="file-input w-full max-w-xs border-black " {...register("img1", {
                            required: "Required"
                        })} />
                        <input type="file" className="file-input w-full max-w-xs border-black mx-2" {...register("img2", {
                            required: "Required"
                        })} />
                        <input type="file" className="file-input w-full max-w-xs border-black " {...register("img3", {
                            required: "Required"
                        })} />
                    </div>
                </div>
                <div className="form-control w-full ">
                    <label className="label"> <span className="text-black text-lg font-semibold label-text">Seller Name</span></label>
                    <input type="text" defaultValue={user?.displayName} {...register("seller_name", {
                        required: "Required"
                    })} className="input input-sm input-bordered input-primary w-full " />
                    <label className="label"> <span className="text-black text-lg font-semibold label-text">Seller Email</span></label>
                    <input type="email" defaultValue={user?.email} {...register("seller_email", {
                        required: "Required"
                    })} className="input input-sm input-bordered input-primary w-full " readOnly />
                    <label className="label"> <span className="text-black text-lg font-semibold label-text">Seller Phone</span></label>
                    <input type="text" defaultValue={user.phone}  {...register("seller_phone", {
                        required: "Required"
                    })} className="input input-sm input-bordered input-primary w-full " />
                </div>
                <div className="flex flex-row justify-around form-control w-full ">
                    <div>
                        <label className="label"> <span className="text-black text-lg font-semibold label-text">Original Price</span></label>
                        <input
                            type="text" {...register("price", {
                                required: "Required"
                            })} className="input input-sm input-bordered input-primary w-full " />
                    </div>
                    <div>
                        <label className="label"> <span className="text-black text-lg font-semibold label-text">Resell Price</span></label>
                        <input
                            type="text" {...register("resell_price", {
                                required: "Required"
                            })} className="input input-sm input-bordered input-primary w-full " />
                    </div>
                </div>

                <div className='flex flex-row justify-around form-control w-full '>
                    <div>
                        <label className="label"> <span className="text-black text-lg font-semibold label-text">Km</span></label>
                        <input
                            type="text" {...register("km", {
                                required: "Required"
                            })} className="input input-sm input-bordered input-primary w-full " />
                        <label className="label"> <span className="text-black text-lg font-semibold label-text">CC</span></label>
                        <input
                            type="text" {...register("cc", {
                                required: "Required"
                            })} className="input input-sm input-bordered input-primary w-full " />
                    </div>
                    <div>
                        <label className="label"> <span className="text-black text-lg font-semibold label-text">Category</span></label>
                        <input
                            type="text" {...register("category", {
                                required: "Required"
                            })} className="input input-sm input-bordered input-primary w-full " />
                        <label className="label"> <span className="text-black text-lg font-semibold label-text">User Year</span></label>
                        <input
                            type="text" {...register("user_year", {
                                required: "Required"
                            })} className="input input-sm input-bordered input-primary w-full " />
                    </div>
                </div>

                <div className="form-control w-full ">
                    <label className="label"> <span className="text-black text-lg font-semibold label-text"> Advertising</span></label>
                    <select
                        {...register('advertising')}
                        className="select input-bordered input-sm input-primary w-full ">
                        <option selected>true</option>
                        <option>false</option>
                    </select>
                </div>
                <input className='btn bg-primary text-white w-full mt-4' value="Add Product" type="submit" />
            </form>
        </div>
    );
};

export default AddProduct;