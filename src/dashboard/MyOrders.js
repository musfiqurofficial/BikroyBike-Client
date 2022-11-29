import { useQuery } from '@tanstack/react-query';
import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import ConfirmationModal from './ConfirmationModal';
import { useContext } from 'react';
import { AuthContext } from '../context/AuthProvider';

const MyOrders = () => {
    const { user } = useContext(AuthContext)
    const [deletingOrder, setDeletingOrder] = useState(null);

    const closeModal = () => {
        setDeletingOrder(null);
    };


    const { data: bookings = [], refetch } = useQuery({
        queryKey: ['bookings', user?.email],
        queryFn: async () => {
            const res = await fetch(`http://localhost:5000/bookings?email=${user?.email}`, {

            });
            const data = await res.json();
            return data;
        }
    });
    const handleDelete = booking => {
        fetch(`http://localhost:5000/booking/${booking._id}`, {
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
            <h1 className='text-3xl font-semibold mb-5'>My Orders</h1>
            <div className='overflow-x-auto'>
                <table className="table w-full">
                    <thead>
                        <tr>
                            <th></th>
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
                            bookings.map((booking, i) => <tr>


                                <th>{i + 1}</th>
                                <th>{booking?.image ?
                                    <img className='w-20 rounded-full' src={booking.image} alt="" />
                                    :
                                    <p>no photo</p>
                                }</th>
                                <th>{
                                    booking.customer_name
                                }</th>
                                <th>{
                                    booking.email
                                }</th>
                                <th>{
                                    booking.phone
                                }</th>

                                <th>{
                                    booking.price && !booking.paid &&
                                    <Link to={`/dashboard/payment/${booking._id}`}> <button className='btn bg-indigo-500 text-white'>Pay</button></Link>

                                }
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
        </div>
    )
}

export default MyOrders
