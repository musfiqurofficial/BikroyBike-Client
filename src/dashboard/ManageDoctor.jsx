import { useQuery } from '@tanstack/react-query';
import React from 'react';
import { Toaster } from 'react-hot-toast';

const ManageDoctor = () => {
    const { data: doctors, } = useQuery({
        queryKey: ['doctors'],
        queryFn: async () => {
            try {
                const res = await fetch('http://localhost:5000/doctors', {
                    headers: {
                        authorization: `bearer ${localStorage.getItem('accessToken')}`

                    }
                })
                const data = await res.json();
                return data;
            } catch (error) {

            }
        }
    })
    return (
        <div>
            <div className="w-11/12 mx-auto my-8 overflow-x-auto">
                <h1 className="text-3xl font-bold mb-5">All Users Appointment</h1>
                <table className="table table-zebra w-full">
                    <thead>
                        <tr>
                            <th></th>
                            <th>Avatar</th>
                            <th>Name</th>
                            <th>Speciality</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            doctors?.map((doctor, idx) => <tr key={doctor._id}>
                                <th>{idx + 1}</th>
                                <td><div className="avatar">
                                    <div className="w-24 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                                        <img src={doctor.image} alt='' />
                                    </div>
                                </div></td>
                                <td>{doctor.name}</td>
                                <td>{doctor.specialty}</td>
                                <td><button className='py-2 text-white px-6 rounded-md bg-red-600 hover:bg-red-900'>Delete</button></td>
                            </tr>)
                        }
                    </tbody>
                </table>
            </div>
            <Toaster></Toaster>
        </div>
    );
};

export default ManageDoctor;