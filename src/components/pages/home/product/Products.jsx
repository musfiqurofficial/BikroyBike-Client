import React from 'react';
import { useLoaderData } from 'react-router-dom/dist';
import Product from './Product';

const Products = () => {
    const products = useLoaderData();

    return (
        <div className='my-12'>
            <div>
                {
                    products?.map(product => <Product key={product._id} product={product}></Product>)
                }
            </div>
        </div>
    );
};

export default Products;