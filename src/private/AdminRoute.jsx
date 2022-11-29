import React from 'react';
import { useContext } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { AuthContext } from '../context/AuthProvider';
import useAdmin from '../hooks/useAdmin';

const AdminRoute = ({ children }) => {
    const { user, loading } = useContext(AuthContext);
    const [isAdmin, isAdminLoading] = useAdmin(user?.email);
    const location = useLocation();

    if (loading || isAdminLoading) {
        return <div className="flex justify-center items-center h-screen">
            <h1 className='text-3xl text-bold'>L<div className='inline-block w-16 h-16 border-4 border-dashed rounded-full animate-spin border-green-700'></div>ading...</h1>
        </div>
    }
    if (user && isAdmin) {
        return children;
    }
    return <Navigate to='/loginForm' state={{ from: location }} replace></Navigate>;
};

export default AdminRoute;