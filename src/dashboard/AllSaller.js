import { useQuery } from '@tanstack/react-query';
import React, { useState } from 'react'
import { toast } from 'react-hot-toast';
import DeleteConfirmModal from './DeleteConfirmModal';
import { GoVerified } from 'react-icons/go'

const AllSaller = () => {
    const [deletingSeller, setDeletingSeller] = useState(null);

    const closeModal = () => {
        setDeletingSeller(null);
    };



    const { data: sellers = [], refetch } = useQuery({
        queryKey: ['sellers'],
        queryFn: async () => {
            const res = await fetch('http://localhost:5000/allseller?role=Seller')
            const data = await res.json();
            return data;
        }
    });




    const handelMakeVerifide = id => {
        fetch(`http://localhost:5000/allseller/${id}`, {
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
        fetch(`http://localhost:5000/user/${seller._id}`, {
            method: 'DELETE',
            headers: {
                authorization: `bearer ${localStorage.getItem('token')}`
            }
        })
            .then(res => res.json())
            .then(data => {
                if (data.deletedCount > 0) {
                    refetch();
                    toast.success(` ${seller.displayName} deleted successfully`)
                }
            })
    };



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
                                    <button onClick={() => handelMakeVerifide(seller._id)} className='btn btn-xs bg-indigo-500 text-white '>Make Verify</button>
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
        </div>
    )
}

export default AllSaller
