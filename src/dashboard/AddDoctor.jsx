import { useQuery } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';
import toast, { Toaster } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

const AddDoctor = () => {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const imgHostKey = process.env.REACT_APP_imgbb_key
    const navigate = useNavigate();
    console.log(imgHostKey);
    // const { data: specialties, isLoading, error } = useQuery({
    //     queryKey: ['specialty'],
    //     queryFn: async () => {
    //         const res = await fetch('http://localhost:5000/appointmentSpecialty')
    //         const data = await res.json();
    //         return data;
    //     }
    // })

    // if (isLoading) {
    //     return <div className="flex justify-center items-center h-screen">
    //         <h1 className='text-3xl text-bold'>L<div className='inline-block w-16 h-16 border-4 border-dashed rounded-full animate-spin border-green-700'></div>ading...</h1>
    //     </div>
    // }

    const handleAddDoctorSubmit = data => {
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
                console.log(imgData)
                if (imgData.success) {
                    console.log(imgData.data.url);
                    const doctor = {
                        name: data.name,
                        email: data.email,
                        specialty: data.specialty,
                        image: imgData.data.url
                    }
                    console.log(doctor);

                    // fetch('http://localhost:5000/doctors', {
                    //     method: "POST",
                    //     headers: {
                    //         'content-type': 'application/json',
                    //         authorization: `bearer ${localStorage.getItem('accessToken')}`
                    //     },
                    //     body: JSON.stringify(doctor)
                    // })
                    //     .then(res => res.json())
                    //     .then(result => {
                    //         toast.success(`${data.name} is added!`)
                    //         navigate('/dashboard/manageDoctors')
                    //     })
                }
            })

    }

    return (
        <div>
            <div className="w-11/12 mx-auto my-8 overflow-x-auto">
                <h1 className="text-3xl font-bold mb-5 text-center">My Appointment</h1>
                <div>
                    <form onSubmit={handleSubmit(handleAddDoctorSubmit)} className="lg:w-5/12 md:6/12 w-10/12 mx-auto space-y-8 ng-untouched ng-pristine ng-valid">
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
                            {/* <div>
                                <div className="flex justify-between mb-2">
                                    <label className="text-sm">Specialty</label>
                                </div>
                                <select  {...register("specialty", {
                                    required: 'specialty is required'
                                })} className="select select-bordered w-full border rounded-md border-blue-600 bg-base-100 text-gray-900">
                                    <option disabled selected>Who shot first?</option>
                                    {
                                        specialties.map(specialty => <option key={specialty._id} value={specialty.name}>{specialty.name}</option>)
                                    }
                                </select>
                                {errors.password && <p className='text-red-600 pt-2'>{errors.password.message}</p>}
                            </div> */}
                            <div>
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
                        <div className="space-y-2">
                            <div>
                                {/* <div>
                                    {registerError && <p className='text-red-600 text-center mb-2'>{registerError}</p>}
                                </div> */}
                                <input type="submit" className="w-full px-8 py-3 font-semibold rounded-md focus:bg-blue-50 active:bg-blue-100 text-lg hover:text-white text-black hover:bg-blue-600 bg-blue-200" value="Add Doctor" />
                            </div>
                        </div>
                    </form>
                </div>
                <Toaster></Toaster>
            </div>
        </div>
    );
};

export default AddDoctor;