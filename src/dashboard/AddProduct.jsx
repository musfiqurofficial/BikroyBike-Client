import { useQuery } from '@tanstack/react-query';
import React, { useContext, useState } from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import Loading from '../components/common/loading/Loading';
import { AuthContext } from '../context/AuthProvider';

const AddProduct = () => {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const { user } = useContext(AuthContext);
    const [isLoading, setisLoading] = useState(false)
    console.log(user);

    const imgHostKey = process.env.REACT_APP_imgbb_key;

    const navigate = useNavigate();


    const handleAddProduct = data => {
        const image = data.image[0];
        const formData = new FormData();
        formData.append('image', image);
        const url = `https://api.imgbb.com/1/upload?key=${imgHostKey}`
        fetch(url, {
            method: 'POST',
            body: formData
        })
            .then(res => res.json())
            .then(imgData => {
                if (imgData.success) {
                    console.log(imgData.data.url);
                    const product = {
                        model_name: data.model_name,
                        address: data.address,
                        category: data.category,
                        km: data.km,
                        cc: data.cc,
                        price: parseInt(data.price),
                        verified_seller: Boolean(data.verified_seller),
                        used_year: data.used_year,
                        brand_name: data.brand_name,
                        Post_date: new Date().toLocaleString(),
                        seller_name: data.seller_name,
                        email: data.email,
                        product_img1: imgData.data.url,
                        sellerImg: user?.photoURL,
                        verified: user?.verified,
                        phone_number: parseInt(data.phone_number),
                        detail: data.detail

                    }

                    console.log(product)
                    // save product information to the database
                    fetch('https://assingment-12-server.vercel.app/products', {
                        method: 'POST',
                        headers: {
                            'content-type': 'application/json',
                        },
                        body: JSON.stringify(product)
                    })
                        .then(res => res.json())
                        .then(result => {
                            console.log(result);
                            toast.success(`${data.name} is added successfully`);
                            setisLoading(true)
                            navigate('/dashboard/myproducts')
                        })
                }
            })
    }

    if (isLoading) {
        return <Loading></Loading>
    }

    return (
        <div className='w-96 p-7'>
            <h2 className="text-4xl">Add A Product</h2>
            <form onSubmit={handleSubmit(handleAddProduct)}>
                <div className="form-control w-full ">
                    <label className="label"> <span className="label-text">Seller Name</span></label>
                    <input
                        defaultValue={user?.displayName} readOnly
                        type="text" {...register("seller_name", {
                            required: "Name is Required"
                        })} className="input input-bordered w-full " />
                </div>
                <div className="form-control w-full ">
                    <label className="label"> <span className="label-text">Email</span></label>
                    <input
                        defaultValue={user?.email} readOnly
                        type="email" {...register("email", {
                            required: true
                        })} className="input input-bordered w-full " />
                </div>
                {/* model name  */}
                <div className="form-control w-full ">
                    <label className="label"> <span className="label-text">Model Name</span></label>
                    <input
                        type="text" {...register("model_name", {
                            required: "Phone Name is Required"
                        })} className="input input-bordered w-full " />
                    {errors.model_name && <p className='text-red-500'>{errors.model_name.message}</p>}

                </div>
                {/* model year */}
                <div className="form-control w-full ">
                    <label className="label"> <span className="label-text">Model Year</span></label>
                    <input
                        type="text" {...register("model_year", {
                            required: "Phone Name is Required"
                        })} className="input input-bordered w-full " />
                    {errors.model_name && <p className='text-red-500'>{errors.model_name.message}</p>}

                </div>
                <div className='flex gap-5'>
                    <div className="form-control w-full ">
                        <label className="label"> <span className="label-text">Price</span></label>
                        <input
                            type="text" {...register("price", {
                                required: "Resal Price is Required"
                            })} className="input input-bordered w-full " />
                        {errors.price && <p className='text-red-500'>{errors.price.message}</p>}

                    </div>
                </div>
                <div className='flex gap-5'>
                    <div className="form-control w-full ">
                        <label className="label"> <span className="label-text">Address</span></label>
                        <input
                            type="text" {...register("address", {
                                required: "address is Required"
                            })} className="input input-bordered w-full " />
                        {errors.address && <p className='text-red-500'>{errors.address.message}</p>}
                    </div>
                    <div className="form-control w-full ">
                        <label className="label"> <span className="label-text">Phone Number</span></label>
                        <input
                            type="text" {...register("phone_number", {
                                required: "Number is Required"
                            })} className="input input-bordered w-full " />
                        {errors.phone_number && <p className='text-red-500'>{errors.phone_number.message}</p>}
                    </div>
                </div>
                <div className='flex gap-5'>
                    <div className="form-control w-full ">
                        <label className="label"> <span className="label-text">Category</span></label>
                        <input
                            type="text" {...register("category", {
                                required: "category is Required"
                            })} className="input input-bordered w-full " />
                        {errors.category && <p className='text-red-500'>{errors.category.message}</p>}
                    </div>
                    <div className="form-control w-full ">
                        <label className="label"> <span className="label-text">cc</span></label>
                        <input
                            type="text" {...register("cc", {
                                required: "cc is Required"
                            })} className="input input-bordered w-full " />
                        {errors.cc && <p className='text-red-500'>{errors.cc.message}</p>}
                    </div>
                    <div className="form-control w-full ">
                        <label className="label"> <span className="label-text">km</span></label>
                        <input
                            type="text" {...register("km", {
                                required: "km is Required"
                            })} className="input input-bordered w-full " />
                        {errors.km && <p className='text-red-500'>{errors.km.message}</p>}
                    </div>
                </div>
                <div className="form-control w-full ">
                    <label className="label"> <span className="label-text">Details</span></label>
                    <input
                        type="text" {...register("detail", {
                            required: "Details is Required"
                        })} className="input input-bordered w-full " />
                    {errors.detail && <p className='text-red-500'>{errors.detail.message}</p>}
                </div>
                <div className='flex gap-5'>

                    <div className="form-control w-full ">
                        <label className="label"> <span className="label-text">Years/Month of Use</span></label>
                        <input
                            type="text" {...register("used_year", {
                                required: "Use is Required"
                            })} className="input input-bordered w-full " />
                        {errors.used_year && <p className='text-red-500'>{errors.used_year.message}</p>}
                    </div>
                </div>
                <div className='flex gap-5'>
                    <div className="form-control w-full ">
                        <label className="label"> <span className="label-text"> Verified Seller</span></label>
                        <select
                            {...register('verified_seller')}
                            className="select input-bordered w-full ">
                            <option selected>false</option>
                            <option>true</option>
                        </select>
                    </div>
                    <div className="form-control w-full ">
                        <label className="label"> <span className="label-text">Select a Brand Category</span></label>
                        <select
                            {...register('brand_name')}
                            className="select input-bordered input-sm input-primary w-full ">
                            <option selected>SUZUKI</option>
                            <option>YAMAHA</option>
                            <option>HONDA</option>
                            <option>TVS</option>
                        </select>

                    </div>
                </div>
                <div className="form-control w-full ">
                    <label className="label"> <span className="label-text">Photo</span></label>
                    <input type="file" {...register("image", {
                        required: "Photo is Required"
                    })} className="input input-bordered w-full " />
                    {errors.image && <p className='text-red-500'>{errors.image.message}</p>}
                </div>
                <input className='btn bg-indigo-500 text-white w-full mt-4' value="Add Product" type="submit" />
            </form>
        </div>
    );
};


/**
 * Three places to store images
 * 1. Third party image hosting server 
 * 2. File system of your server
 * 3. mongodb (database)
*/

export default AddProduct;















































// import { useQuery } from '@tanstack/react-query';
// import React, { useContext, useState } from 'react';
// import { useForm } from 'react-hook-form';
// import { useNavigate } from 'react-router-dom';
// import { toast } from 'react-hot-toast';
// import Loading from '../components/common/loading/Loading';
// import { AuthContext } from '../context/AuthProvider';

// const AddProduct = () => {
//     const { register, handleSubmit, formState: { errors } } = useForm();
//     const { user } = useContext(AuthContext);
//     const [isLoading, setIsLoading] = useState(false)
//     const imgHostKey = process.env.REACT_APP_imgbb_key

//     const navigate = useNavigate();


//     const handleAddProduct = data => {
//         const image = data.image[0];
//         const formData = new FormData();
//         formData.append('image', image);
//         fetch(`https://api.imgbb.com/1/upload?key=${imgHostKey}`, {
//             method: 'POST',
//             body: formData
//         })
//             .then(res => res.json())
//             .then(imgData => {
//                 if (imgData.success) {
//                     console.log(imgData.data.url);
//                     const product = {
//                         brand_name: data.brand_name,
//                         model_name: data.model_name,


//                     }
//                     console.log(product);

//                     // fetch('https://assingment-12-server.vercel.app/products', {
//                     //     method: 'POST',
//                     //     headers: {
//                     //         'content-type': 'application/json',
//                     //         // authorization: `bearer ${localStorage.getItem('token')}`
//                     //     },
//                     //     body: JSON.stringify(product)
//                     // })
//                     //     .then(res => res.json())
//                     //     .then(result => {
//                     //         console.log(result);
//                     //         toast.success(`${data.name} is added successfully`);
//                     //         setIsLoading(true)
//                     //         navigate('/dashboard/myproducts')
//                     //     })
//                 }

//             })
//     }

//     if (isLoading) {
//         return <Loading></Loading>
//     }

//     return (
//         <div className='lg:w-10/12 mx-auto my-10'>
//             <h2 className="text-4xl">Add A Product</h2>
//             <form onSubmit={handleSubmit(handleAddProduct)}>
//                 <div className="form-control w-full ">
//                     <label className="label"> <span className="text-black text-lg font-semibold label-text"> Select Brand Name</span></label>
//                     <select
//                         {...register('brand_name')}
//                         className="select input-bordered input-sm input-primary w-full ">
//                         <option selected>SUZUKI</option>
//                         <option>YAMAHA</option>
//                         <option>HONDA</option>
//                         <option>TVS</option>
//                     </select>
//                 </div>
//                 <div className="form-control w-full ">
//                     <label className="label"> <span className="text-black text-lg font-semibold label-text">Model Name</span></label>
//                     <input type="text" {...register("model_name", {
//                         // required: "Required"
//                     })} className="input input-sm input-bordered input-primary w-full " />
//                 </div>
//                 <div className="form-control w-full ">
//                     <label className="label"> <span className="text-black text-lg font-semibold label-text">Model year</span></label>
//                     <input type="text" {...register("model_year", {
//                         // required: "Required"
//                     })} className="input input-sm input-bordered input-primary w-full " />
//                 </div>
//                 <div className="form-control w-full ">
//                     <label className="label"> <span className="text-black text-lg font-semibold label-text">Product Images</span></label>
//                     <div className='flex fle'>
//                         <input type="file" className="file-input w-full max-w-xs border-black " {...register("img1", {
//                             // required: "Required"
//                         })} />
//                         <input type="file" className="file-input w-full max-w-xs border-black mx-2" {...register("img2", {
//                             // required: "Required"
//                         })} />
//                         <input type="file" className="file-input w-full max-w-xs border-black " {...register("img3", {
//                             // required: "Required"
//                         })} />
//                     </div>
//                 </div>
//                 <div className="form-control w-full ">
//                     <label className="label"> <span className="text-black text-lg font-semibold label-text">Seller Name</span></label>
//                     <input type="text" defaultValue={user?.displayName} {...register("seller_name", {
//                         // required: "Required"
//                     })} className="input input-sm input-bordered input-primary w-full " />
//                     <label className="label"> <span className="text-black text-lg font-semibold label-text">Seller Email</span></label>
//                     <input type="email" defaultValue={user?.email} {...register("seller_email", {
//                         // required: "Required"
//                     })} className="input input-sm input-bordered input-primary w-full " readOnly />
//                     <label className="label"> <span className="text-black text-lg font-semibold label-text">Seller Phone</span></label>
//                     <input type="text" defaultValue={user.phone}  {...register("seller_phone", {
//                         // required: "Required"
//                     })} className="input input-sm input-bordered input-primary w-full " />
//                 </div>
//                 <div className="flex flex-row justify-around form-control w-full ">
//                     <div>
//                         <label className="label"> <span className="text-black text-lg font-semibold label-text">Original Price</span></label>
//                         <input
//                             type="text" {...register("price", {
//                                 // required: "Required"
//                             })} className="input input-sm input-bordered input-primary w-full " />
//                     </div>
//                     <div>
//                         <label className="label"> <span className="text-black text-lg font-semibold label-text">Resell Price</span></label>
//                         <input
//                             type="text" {...register("resell_price", {
//                                 // required: "Required"
//                             })} className="input input-sm input-bordered input-primary w-full " />
//                     </div>
//                 </div>

//                 <div className='flex flex-row justify-around form-control w-full '>
//                     <div>
//                         <label className="label"> <span className="text-black text-lg font-semibold label-text">Km</span></label>
//                         <input
//                             type="text" {...register("km", {
//                                 // required: "Required"
//                             })} className="input input-sm input-bordered input-primary w-full " />
//                         <label className="label"> <span className="text-black text-lg font-semibold label-text">CC</span></label>
//                         <input
//                             type="text" {...register("cc", {
//                                 // required: "Required"
//                             })} className="input input-sm input-bordered input-primary w-full " />
//                     </div>
//                     <div>
//                         <label className="label"> <span className="text-black text-lg font-semibold label-text">Category</span></label>
//                         <input
//                             type="text" {...register("category", {
//                                 // required: "Required"
//                             })} className="input input-sm input-bordered input-primary w-full " />
//                         <label className="label"> <span className="text-black text-lg font-semibold label-text">User Year</span></label>
//                         <input
//                             type="text" {...register("user_year", {
//                                 // required: "Required"
//                             })} className="input input-sm input-bordered input-primary w-full " />
//                     </div>
//                 </div>

//                 <div className="form-control w-full ">
//                     <label className="label"> <span className="text-black text-lg font-semibold label-text"> Advertising</span></label>
//                     <select
//                         {...register('advertising')}
//                         className="select input-bordered input-sm input-primary w-full ">
//                         <option selected>true</option>
//                         <option>false</option>
//                     </select>
//                 </div>
//                 <input className='btn bg-primary text-white w-full mt-4' value="Add Product" type="submit" />
//             </form>
//         </div>
//     );
// };

// export default AddProduct;