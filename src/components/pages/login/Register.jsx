import React from 'react';
import { useState } from 'react';
import { useContext } from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../../context/AuthProvider';

const Register = () => {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const { createUser, updateUser } = useContext(AuthContext);
    const [registerError, setRegisterError] = useState('')
    const [createUserEmail, setCreateUserEmail] = useState('');
    const imgHostKey = process.env.REACT_APP_imgbb_key
    const navigate = useNavigate();

    console.log(imgHostKey);

    const onSubmit = data => {
        const photoURL = data.image[0];
        const formData = new FormData();
        formData.append('image', photoURL);
        fetch(`https://api.imgbb.com/1/upload?key=${imgHostKey}`, {
            method: "POST",
            body: formData
        })
            .then(res => res.json())
            .then(imgData => {
                if (imgData.success) {
                    console.log(imgData.data.url);
                    setRegisterError('');
                    createUser(data.email, data.password, data.category, imgData.data.url)
                        .then(result => {
                            toast.success('Successfully Register!')
                            const userInfo = {
                                displayName: data.name,
                                photoURL: imgData.data.url
                            }
                            updateUser(userInfo)
                                .then(() => {
                                    saveUser(data.name, data.email, data.category, imgData.data.url);
                                    navigate('/')
                                })
                                .catch(error => console.error(error))

                        }).catch(error => {
                            setRegisterError(error.message)
                            console.log(error)
                        })
                }
            })
    }

    const saveUser = (name, email, category, url) => {
        const user = { name, email, category, url };
        fetch('http://localhost:5000/users', {
            method: "POST",
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(user)
        })
            .then(res => res.json())
            .then(data => {
                setCreateUserEmail(data.email);
            })
    }

    return (
        <div>
            <div className="flex flex-col p-6 sm:p-10 bg-base-100 text-gray-900">
                <div className="mb-2 text-center">
                    <h1 className="my-3 text-4xl font-bold">Register</h1>
                    <p className="text-sm text-gray-700">Create an account!</p>
                </div>
                <form onSubmit={handleSubmit(onSubmit)} className="lg:w-5/12 md:6/12 w-10/12 mx-auto space-y-8 ng-untouched ng-pristine ng-valid">
                    <div className="space-y-4">
                        <div>
                            <label className="block mb-2 text-sm">Your Name</label>
                            <input type="text" {...register("name", {
                                required: 'Input your name!'
                            })} placeholder="Your Name" className="w-full px-3 py-2 border rounded-md border-blue-600 bg-base-100 text-gray-900" />
                            {errors.name && <p className='text-red-600 pt-2'>{errors.name.message}</p>}
                        </div>
                        <div>
                            <label className="block mb-2 text-sm">Email address</label>
                            <input type="email" {...register("email", {
                                required: 'Email is required'
                            })} placeholder="leroy@jenkins.com" className="w-full px-3 py-2 border rounded-md border-blue-600 bg-base-100 text-gray-900" />
                            {errors.email && <p className='text-red-600 pt-2'>{errors.email.message}</p>}
                        </div>
                        <div>
                            <div className="flex justify-between mb-2">
                                <label className="text-sm">Password</label>
                            </div>
                            <input type="password" {...register("password", {
                                required: 'Password is required',
                                minLength: { value: 6, message: 'Password must be 6 characters long!' },
                                pattern: { value: /(?=.*[A-Z])(?=.*[!@#$&*])(?=.*[0-9])(?=.*[a-z].*[a-z])/, message: 'Password must be strong!' }
                            })} placeholder="*****" className="w-full px-3 py-2 border rounded-md border-blue-600 bg-base-100 text-gray-900" />
                            {errors.password && <p className='text-red-600 pt-2'>{errors.password.message}</p>}
                        </div>
                        <div className='flex items-center justify-between'>
                            <div>
                                <div className="form-control w-full max-w-xs">
                                    <input type="file"  {...register("image", {
                                        required: 'image is required'
                                    })} className="block w-full text-sm text-slate-500
                                file:mr-4 file:py-4 file:px-4
                                file:rounded-full file:border-0
                                file:text-sm file:font-semibold
                                file:bg-violet-50 file:text-violet-700
                                hover:file:bg-violet-100
                                "/>
                                </div>
                            </div>
                            <div>
                                <select
                                    type="text" {...register("category", {
                                        required: "It's requires",
                                    })}
                                    className="select select-bordered w-full max-w-xs border rounded-md border-blue-600 bg-base-100 text-gray-900">
                                    <option selected>Buyer</option>
                                    <option>Seller</option>
                                </select>
                            </div>
                        </div>
                    </div>
                    <div className="space-y-2">
                        <div>
                            <div>
                                {registerError && <p className='text-red-600 text-center mb-2'>{registerError}</p>}
                            </div>
                            <input type="submit" className="w-full px-8 py-3 font-semibold rounded-md focus:bg-blue-50 active:bg-blue-100 text-lg hover:text-white text-black hover:bg-blue-600 bg-blue-200" value="Register" />
                        </div>
                        <p className=" text-sm text-center text-gray-700">Already have an account?
                            <Link to="/loginForm" className="hover:underline text-blue-400">Login</Link>.
                        </p>
                    </div>
                </form>
            </div>
        </div >
    );
};

export default Register;