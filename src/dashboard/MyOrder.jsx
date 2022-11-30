import { useQuery } from '@tanstack/react-query';
import React, { useContext, useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import { Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthProvider';
import ConfirmationModal from './ConfirmationModal';
const MyOrders = () => {
    const { user } = useContext(AuthContext)
    const [deletingOrder, setDeletingOrder] = useState(null);

    const closeModal = () => {
        setDeletingOrder(null);
    };


    const { data: bookings = [], refetch } = useQuery({
        queryKey: ['bookings', user?.email],
        queryFn: async () => {
            const res = await fetch(`https://assingment-12-server.vercel.app/bookings?email=${user?.email}`, {

            });
            const data = await res.json();
            return data;
        }
    });
    const handleDelete = booking => {
        fetch(`https://assingment-12-server.vercel.app/booking/${booking._id}`, {
            method: 'DELETE',

        })
            .then(res => res.json())
            .then(data => {
                if (data.deletedCount > 0) {
                    refetch();
                    toast.success(` ${booking.name} deleted successfully`)
                }
            })
    };



    return (
        <div className='mt-10 w-full'>
            <div className="w-11/12 mx-auto my-8 overflow-x-auto">
                <h1 className="text-3xl font-bold mb-5">All Users Appointment</h1>
                <table className="table table-zebra w-full">
                    <thead>
                        <tr>
                            <th>No</th>
                            <th>Image</th>
                            <th>Name</th>
                            <th>Price</th>
                            <th>Payment</th>
                            <th>Transaction-Id</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>

                        {
                            bookings.map((booking, idx) => <tr>
                                <th>{idx + 1}</th>
                                <th>{booking?.image ?
                                    <img className='w-20 rounded-full' src={booking.image} alt="" />
                                    :
                                    <p>no photo</p>
                                }</th>
                                <th>{booking.customer_name}</th>
                                <th>{booking.price}</th>
                                <th>{booking.price && !booking.paid &&
                                    <Link to={`/dashboard/payment/${booking._id}`}> <button className='btn bg-indigo-500 text-white'>Pay</button></Link>}
                                    {
                                        booking.price && booking.paid &&
                                        <span className=' '>Paid</span>
                                    }
                                </th>
                                <th>{booking.transactionId}</th>
                                <th>
                                    <label onClick={() => setDeletingOrder(booking)} htmlFor="confirmation-modal" className="btn btn-sm btn-error">Delete</label>
                                </th>
                            </tr>
                            )
                        }
                    </tbody>
                </table>
            </div>
            {
                deletingOrder &&
                <ConfirmationModal
                    title={`Are you sure you want to delete?`}
                    message={`If you delete ${deletingOrder.peoductName}. It cannot be undone.`}
                    successAction={handleDelete}
                    successButtonName="Delete"
                    modalData={deletingOrder}
                    closeModal={closeModal}
                ></ConfirmationModal>
            }
            <Toaster></Toaster>
        </div>
    )
}

export default MyOrders