import { useQuery } from '@tanstack/react-query';
import React, { useState } from 'react'
import toast, { Toaster } from 'react-hot-toast';
import { GoVerified } from 'react-icons/go'
import Loading from '../components/common/loading/Loading';
import DeleteConfirmModal from './DeleteConfirmModel';

const AllSaller = () => {

    const [deletingSeller, setDeletingSeller] = useState(null);

    const closeModal = () => {
        setDeletingSeller(null);
    };



    const { data: sellers = [], refetch, isLoading } = useQuery({
        queryKey: ['sellers'],
        queryFn: async () => {
            const res = await fetch('https://assingment-12-server.vercel.app/allseller?role=Seller')
            const data = await res.json();
            return data;
        }
    });




    const handelMakeVerifide = id => {
        fetch(`https://assingment-12-server.vercel.app/allseller/${id}`, {
            method: 'PUT',
        })
            .then(res => res.json())
            .then(data => {
                if (data.modifiedCount > 0) {
                    toast.success('Make Verifiy Successful.');
                    refetch();
                }
            })
    };


    const handleDeleteUser = seller => {
        fetch(`https://assingment-12-server.vercel.app/user/${seller._id}`, {
            method: 'DELETE',
        })
            .then(res => res.json())
            .then(data => {
                if (data.deletedCount > 0) {
                    refetch();
                    toast.success(`${seller.displayName} deleted successfully`)
                }
            })
    };


    if (isLoading) {
        return <Loading></Loading>
    }
    return (
        <div className='mt-10 w-full'>
            <h1 className='text-3xl font-semibold mb-5'>All Users</h1>
            <div className='overflow-x-auto'>
                <table className="table w-full ">
                    <thead>
                        <tr>
                            <th></th>
                            <th>User Name</th>
                            <th>User Email</th>
                            <th>Make Verifiy</th>
                            <th>Designation</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>

                        {
                            sellers.map((seller, i) => <tr key={seller._id}>
                                <th>{i + 1}</th>
                                <td>{seller.displayName}</td>
                                <td>{seller.email}</td>
                                <td>{seller?.verified !== true ?
                                    <button onClick={() => handelMakeVerifide(seller._id)} className='btn btn-xs bg-primary text-white '>Make Verify</button>
                                    :
                                    <span className='text-blue-500'><GoVerified></GoVerified></span>
                                }</td>
                                <td>{seller?.designation}</td>
                                <td>
                                    <label onClick={() => setDeletingSeller(seller)} htmlFor="confirmation-modal" className="btn btn-sm btn-error">Delete</label>
                                </td>
                            </tr>)
                        }
                    </tbody>
                </table>
            </div>
            {
                deletingSeller &&

                <DeleteConfirmModal
                    title={`Are you sure you want to delete?`}
                    message={`If you delete ${deletingSeller.displayName}. It cannot be undone.`}
                    successAction={handleDeleteUser}
                    successButtonName="Delete"
                    modalData={deletingSeller}
                    closeModal={closeModal}

                >

                </DeleteConfirmModal>}
            <Toaster></Toaster>
        </div>
    )
}

export default AllSaller