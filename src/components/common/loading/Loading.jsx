import React from 'react';

const Loading = () => {
    return (
        <div>
            <div className="flex justify-center items-center h-screen">
                <h1 className='text-3xl text-bold'>L<div className='inline-block w-16 h-16 border-4 border-dashed rounded-full animate-spin border-green-700'></div>ading...</h1>
            </div>
        </div>
    );
};

export default Loading;