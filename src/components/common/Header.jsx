import React from 'react';
import { useContext } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { AuthContext } from '../../context/AuthProvider';
import logo from "../../assets/Logo.png";

const Header = () => {
    const { user, logOut } = useContext(AuthContext);

    const handleLogOut = () => {
        logOut()
            .then(() => { })
            .catch(error => console.error(error))
    }

    let activeStyle = {
        backgroundColor: '#ffffff00',
        borderBottom: '3px solid #F15C27',
        color: 'black'
    };
    const menuItems = <>
        <li>
            {
                user?.uid ? <NavLink to='/dashboard' style={({ isActive }) =>
                    isActive ? activeStyle : undefined
                } >Dashboard</NavLink> : <></>
            }
        </li>
        <li><NavLink to='/home' style={({ isActive }) =>
            isActive ? activeStyle : undefined
        } >Home</NavLink></li>
        <li><NavLink to='/blog' style={({ isActive }) =>
            isActive ? activeStyle : undefined
        }>Blog</NavLink></li>
        <li><NavLink to='/orders' style={({ isActive }) =>
            isActive ? activeStyle : undefined
        }>Orders</NavLink></li>
        <li><NavLink to='/contact' style={({ isActive }) =>
            isActive ? activeStyle : undefined
        }>Contact Us</NavLink></li>
    </>

    return (
        <div className='bg-base-100 shadow-sm sticky top-0 z-40'>
            <div className="navbar w-11/12 mx-auto py-2 p-0">
                <div className="navbar-start">
                    <div className="dropdown">
                        <label tabIndex={0} className="btn btn-ghost p-0 pr-5 hover:bg-base-100 lg:hidden">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
                        </label>
                        <ul tabIndex={0} className="font-semibold menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52">
                            {menuItems}
                        </ul>
                    </div>
                    <Link to='/' className="text-secondary text-xl font-bold"><img className='w-20' src={logo} alt="" /></Link>
                </div>
                <div className="navbar-center hidden lg:flex">
                    <ul className="font-semibold menu menu-horizontal p-0">
                        {menuItems}
                    </ul>
                </div>
                {
                    user?.uid ?
                        <div className="navbar-end">
                            <div className="dropdown dropdown-end">
                                <label tabIndex={0} className="btn btn-ghost btn-circle avatar w-16 mr-5">
                                    <div className="rounded-full">
                                        <img className='w-full' src={user.photoURL} alt="" />

                                    </div>
                                </label>
                                <ul tabIndex={0} className="mt-3 p-2 shadow menu menu-compact dropdown-content bg-base-100 rounded-box w-52">
                                    <li><Link to='/'>Settings</Link></li>
                                    <Link to='/loginForm' onClick={handleLogOut} className="btn text-base-100 bg-primary border-none hover:bg-secondary hover:border-none">Sing Out</Link>
                                </ul>
                            </div>
                            <Link to='/loginForm' onClick={handleLogOut} className="btn text-base-100 bg-primary border-none hover:bg-secondary hover:border-none">Sing Out</Link>
                            <label htmlFor="my-drawer-2" tabIndex={0} className="btn btn-ghost hover:bg-base-100 lg:hidden">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
                            </label>
                        </div>
                        :
                        <div className="navbar-end">
                            <NavLink to='/loginForm' className="btn text-base-100 bg-primary border-none hover:bg-secondary hover:border-none">Get started</NavLink>
                        </div>
                }
            </div>
        </div>
    );
};

export default Header;