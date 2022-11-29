import React from 'react';
import { useState } from 'react';
import { useContext } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../../context/AuthProvider';

const Login = () => {
    const { register, reset, handleSubmit, formState: { errors } } = useForm();
    const { login } = useContext(AuthContext);
    const [loginError, setLoginError] = useState(' ');
    const location = useLocation();
    const navigate = useNavigate();

    const from = location.state?.form?.pathname || '/'

    const onSubmit = data => {
        console.log(data)
        console.log(errors)
        setLoginError('')
        login(data.email, data.password)
            .then(result => {
                const user = result.user;
                console.log(user);
                reset();
                navigate(from, { replace: true });
            }).catch(error => {
                console.log(error.message)
                setLoginError(error.message);
            })
    }

    return (
        <div>
            <div className="flex flex-col p-6 sm:p-10 bg-base-100 text-gray-900">
                <div className="mb-2 text-center">
                    <h1 className="my-3 text-4xl font-bold">Log In</h1>
                </div>
                <form onSubmit={handleSubmit(onSubmit)} className="lg:w-5/12 md:6/12 w-10/12 mx-auto space-y-6 ng-untouched ng-pristine ng-valid">
                    <div className="space-y-4">
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
                                required: 'Wrong Password!',
                                minLength: { value: 6, message: 'Password must be 6 characters long!' },
                                pattern: { value: /(?=.*[A-Z])(?=.*[!@#$&*])(?=.*[0-9])(?=.*[a-z].*[a-z])/, message: 'Password must be strong!' }
                            })} placeholder="*****" className="w-full px-3 py-2 border rounded-md border-blue-600 bg-base-100 text-gray-900" />
                            {errors.password && <p className='text-red-600 pt-2'>{errors.password.message}</p>}
                            <Link>Forgot Password</Link>
                        </div>

                    </div>
                    <div className="">
                        <div>
                            {loginError && <p className='text-red-600 text-center mb-2'>{loginError}</p>}
                        </div>
                        <div>
                            <input type="submit" className="w-full px-8 py-3 font-semibold rounded-md focus:bg-blue-50 active:bg-blue-100 text-lg hover:text-white text-black hover:bg-blue-600 bg-blue-200" value="Login" />
                        </div>
                        <p className="my-2 text-sm text-center text-gray-700">Create an account?
                            <Link to="/register" className="hover:underline text-blue-400">Register</Link>.
                        </p>
                    </div>
                </form>
            </div>
        </div >
    );
};

export default Login;