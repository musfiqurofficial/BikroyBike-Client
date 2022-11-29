import React from 'react'
import { useContext } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import Loading from '../components/common/loading/Loading';
import { AuthContext } from '../context/AuthProvider';
import useAdmin from '../hooks/useAdmin';

const AdminRoute = ({ children }) => {
    const { user, loding } = useContext(AuthContext)
    const [isAdmin, isloading] = useAdmin(user?.email)
    const location = useLocation();

    if (loding || isloading) {
        return <Loading></Loading>
    }
    else if (user && isAdmin) {
        return children;
    }
    else {
        return <Navigate to='/login' state={{ from: location }} replace></Navigate>
    }
}

export default AdminRoute
