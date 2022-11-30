import React, { useContext } from 'react'
import { Link, Outlet } from 'react-router-dom'
import Header from '../components/common/Header';
import { AuthContext } from '../context/AuthProvider';
import useSeller from '../hooks/useSeller';

const DashboardLayout = () => {
    const { user } = useContext(AuthContext);
    const [isSeller] = useSeller(user?.email);

    return (
        <div>
            <Header></Header>
            <div className="drawer drawer-mobile">
                <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
                <div className="drawer-content flex flex-col items-center">
                    <Outlet></Outlet>


                </div>
                <div className="drawer-side mr-5 ">
                    <label htmlFor="dashboard-dawer" className="drawer-overlay "></label>
                    <ul className="menu p-4 w-80  text-base-content bg-primary">

                        <li className='text-white font-bold'> <Link to='/dashboard/myorders'>My Order</Link></li>
                        <>
                            <li className='text-white font-bold'><Link to='/dashboard/myproducts'>My Products</Link></li>
                            <li className='text-white font-bold'> <Link to='/dashboard/addproduct'>Add Product</Link></li>
                        </>

                        <>
                            <li className='text-white font-bold'><Link to='/dashboard/allsaller'>All Seller</Link></li>
                            <li className='text-white font-bold'><Link to='/dashboard/allbuyer'>All Buyer</Link></li>
                            <li className='text-white font-bold'><Link to='/dashboard/alluser'>All User</Link></li>
                        </>

                    </ul>

                </div>
            </div>
        </div>
    )
}

export default DashboardLayout
