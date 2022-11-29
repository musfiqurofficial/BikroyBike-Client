import React from 'react'
import { useContext } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import Loading from '../components/common/loading/Loading';
import { AuthContext } from '../context/AuthProvider';
import useSellar from '../hooks/useSellar';

const SellerPrivet = ({ children }) => {
    const { user, loding } = useContext(AuthContext)
    const [isSellar, isloading] = useSellar(user?.email)
    const location = useLocation();

    if (loding || isloading) {
        return <Loading></Loading>;
    }
    else if (user && isSellar) {
        return children;
    }
    else {
        return <Navigate to='/login' state={{ from: location }} replace></Navigate>
    }
}

export default SellerPrivet


































// import React, { useContext } from 'react'
// import { Navigate, useLocation } from 'react-router-dom';
// import Spinner from '../Components/Pages/Spinner';
// import { AuthContext } from '../Context/Context';

// const SellerPrivet = ({ children }) => {
//     const { user, loding } = useContext(AuthContext)
//     console.log(user);
//     const location = useLocation();

//     if (loding) {
//         return <Spinner></Spinner>;
//     }
//     else if (user.role === 'admin' || user.designation === 'Seller') {
//         return children;
//     }
//     else {
//         return <Navigate to='/login' state={{ from: location }} replace></Navigate>
//     }
// }

// export default SellerPrivet
