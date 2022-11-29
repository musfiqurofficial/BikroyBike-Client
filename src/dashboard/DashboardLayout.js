import React from 'react'
import { useContext } from 'react';
import { Link, Outlet } from 'react-router-dom'
import Header from '../components/common/Header';
import { AuthContext } from '../context/AuthProvider';
import useAdmin from '../hooks/useAdmin';
import useSellar from '../hooks/useSellar';

const DashboardLayout = () => {
    const { user } = useContext(AuthContext);
    const [isAdmin] = useAdmin(user?.email)
    const [isSellar] = useSellar(user?.email)

    return (
        <div>
            <Header></Header>
            <div>
                <div className="drawer drawer-mobile">
                    <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
                    <div className="drawer-content w-11/12 mx-auto ">
                        <Outlet></Outlet>
                    </div>
                    <div className="drawer-side shadow-xl">
                        <label htmlFor="my-drawer-2 " className="drawer-overlay "></label>
                        <ul className="menu p-4 w-80  text-base-content bg-primary">
                            <li className='text-white font-bold'> <Link to='/dashboard/myorders'>My Order</Link></li>
                            <li className='text-white font-bold'> <Link to='/dashboard/addproduct'>Add Product</Link></li>
                            <li className='text-white font-bold'> <Link to='/dashboard/addDoctors'>Add Doctors</Link></li>
                            {
                                isSellar &&
                                <>
                                    <li className='text-white font-bold'><Link to='/dashboard/myproducts'>My Products</Link></li>
                                    {/* <li className='text-white font-bold'> <Link to='/dashboard/addproduct'>Add Product</Link></li> */}
                                </>

                            }
                            {
                                isAdmin &&
                                <>
                                    <li className='text-white font-bold'><Link to='/dashboard/allsaller'>All Saller</Link></li>
                                    <li className='text-white font-bold'><Link to='/dashboard/allbuyer'>All Buyer</Link></li>
                                    <li className='text-white font-bold'><Link to='/dashboard/alluser'>All User</Link></li>
                                </>
                            }

                        </ul>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default DashboardLayout
