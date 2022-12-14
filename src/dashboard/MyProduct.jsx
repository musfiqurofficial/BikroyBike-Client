import { useQuery } from '@tanstack/react-query';
import React, { useContext, useState } from 'react'
import toast, { Toaster } from 'react-hot-toast';
import Loading from '../components/common/loading/Loading';
import { AuthContext } from '../context/AuthProvider';
import ConfirmationModal from './ConfirmationModal';


const MyProducts = () => {
    const { user } = useContext(AuthContext)
    const [deletingProduct, setDeletingProduct] = useState(null);

    const closeModal = () => {
        setDeletingProduct(null);
    }

    const { data: products, isLoading, refetch } = useQuery({
        queryKey: ['products', user?.email],
        queryFn: async () => {
            const res = await fetch(`https://assingment-12-server.vercel.app/myproducts?email=${user?.email}`)
            const data = await res.json();
            return data;
        }
    });
    const handleDeleteProduct = product => {
        fetch(`https://assingment-12-server.vercel.app/products/${product._id}`, {
            method: 'DELETE'
        })
            .then(res => res.json())
            .then(data => {
                if (data.deletedCount > 0) {
                    refetch();
                    toast.success(`${product.phoneName} deleted successfully`)
                }
            })
    }

    if (isLoading) {
        return <Loading></Loading>
    }

    return (
        <div className='mt-10 w-full'>
            <h1 className='text-3xl font-semibold mb-5'>My Products</h1>
            <div className='overflow-x-auto'>
                <table className="table w-full ">
                    <thead>
                        <tr>
                            <th></th>

                            <th>Image</th>
                            <th>Name</th>
                            <th>Price</th>
                            <th>Posted Date</th>
                            <th>Use</th>
                            <th>Condition</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>

                        {
                            products.map((product, i) => <tr>


                                <th>{i + 1}</th>
                                <th><img className='w-20 rounded-full' src={product.image} alt="" srcset="" /></th>
                                <th>{product.brand_name} {product.model_name}</th>
                                <th>{product.price}</th>
                                <th>{product.Post_date}</th>
                                <th>{product.used_year}</th>
                                <th>{product.phone_number}</th>
                                <td>
                                    <label onClick={() => setDeletingProduct(product)} htmlFor="confirmation-modal" className="btn btn-sm btn-error">Delete</label>
                                </td>
                            </tr>
                            )
                        }
                    </tbody>
                </table>
            </div>
            {
                deletingProduct && <ConfirmationModal
                    title={`Are you sure you want to delete?`}
                    message={`If you delete ${deletingProduct.phoneName}. It cannot be undone.`}
                    successAction={handleDeleteProduct}
                    successButtonName="Delete"
                    modalData={deletingProduct}
                    closeModal={closeModal}
                >
                </ConfirmationModal>
            }
            <Toaster></Toaster>
        </div>
    )
}

export default MyProducts