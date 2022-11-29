import { useQuery } from '@tanstack/react-query';
import React from 'react';
import { Link } from 'react-router-dom';

const CategoryProduct = () => {
    const { data: categories = [], isLoading } = useQuery({
        queryKey: ['categories'],
        queryFn: () => fetch('http://localhost:5000/categories')
            .then(res => res.json())
    })
    console.log(categories)
    return (
        <div className='bg-base-100 my-16'>
            <h1 className='text-center text-3xl font-semibold mb-3 underline'>Categories</h1>
            <div className='w-10/12 lg:w-8/12 mx-auto grid lg:grid-cols-4 grid-cols-2 gap-6 justify-around items-center'>
                {
                    categories.map(category => <div key={category._id} className='w-48'>
                        <Link to={`/product/${category.brand_name}`}><img src={category.brand_Logo} alt="" /></Link>
                    </div>
                    )
                }
            </div>
        </div>
    );
};

export default CategoryProduct;