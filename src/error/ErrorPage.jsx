import React from 'react';

const ErrorPage = () => {
    return (
        <div className='w-5/12 mx-auto my-44 text-gray-600 text-center'>
            <h1 style={{ fontSize: '170px' }} className='text-9xl font-bold'>404</h1>
            <h3 className='text-4xl font-bold my-5'>Not Found</h3>
            <p>The resource requested could not be found on this server!</p>
        </div>
    );
};

export default ErrorPage;