import { createBrowserRouter } from "react-router-dom";
import Home from "../components/pages/home/Home";
import About from "../components/pages/about/About";
import LoginForm from "../components/pages/login/LoginForm";
import Main from "../root/Main";
import Contact from "../components/pages/contact/Contact";
import Register from "../components/pages/login/Register";
import Login from "../components/pages/login/Login";
import Products from "../components/pages/home/product/Products";
import ProductDetail from "../components/pages/home/product/ProductDetail";
import Orders from "../components/pages/myOrder/Orders";
import ErrorPage from "../error/ErrorPage";
import PrivateRoute from "../private/PrivateRoute";
import DashboardLayout from "../dashboard/DashboardLayout";
import MyOrders from "../dashboard/MyOrder";
import Payment from "../dashboard/payment/Payment";
import MyProducts from "../dashboard/MyProduct";
import AddProduct from "../dashboard/AddProduct";
import AllSaller from "../dashboard/AllSeller";
import AllBuyer from "../dashboard/AllBuyer";
import AllUser from "../dashboard/AllUsers";

export const router = createBrowserRouter([
    {
        path: '/',
        element: <Main></Main>,
        errorElement: <ErrorPage></ErrorPage>,
        children: [
            {
                path: '/',
                element: <Home></Home>
            },
            {
                path: '/home',
                element: <Home></Home>
            },
            {
                path: '/product/:name',
                element: <Products></Products>,
                loader: ({ params }) => fetch(`http://localhost:5000/product/${params.name}`)
            },
            {
                path: '/product/detail/:id',
                element: <ProductDetail></ProductDetail>,
                loader: ({ params }) => fetch(`http://localhost:5000/product/detail/${params.id}`)
            },
            {
                path: '/about',
                element: <About></About>
            },
            {
                path: '/orders',
                element: <Orders></Orders>
            },
            {
                path: '/contact',
                element: <Contact></Contact>
            },
            {
                path: '/loginForm',
                element: <LoginForm></LoginForm>
            },
            {
                path: '/login',
                element: <Login></Login>
            },
            {
                path: '/register',
                element: <Register></Register>
            },
        ]
    },
    {
        path: '/dashboard',
        element: <PrivateRoute><DashboardLayout></DashboardLayout></PrivateRoute>,
        errorElement: <ErrorPage></ErrorPage>,
        children: [
            {
                path: '/dashboard',
                element: <MyOrders></MyOrders>
            },
            {
                path: '/dashboard/myorders',
                element: <MyOrders></MyOrders>
            },
            {
                path: '/dashboard/payment/:paymentId',
                element: <Payment></Payment>,
                loader: ({ params }) => fetch(`http://localhost:5000/paybooking/${params.paymentId}`)
            },
            {
                path: '/dashboard/myproducts',
                element: <MyProducts></MyProducts>
            },
            {
                path: '/dashboard/addproduct',
                element: <AddProduct></AddProduct>
            },
            {
                path: '/dashboard/allsaller',
                element: <AllSaller></AllSaller>
            },
            {
                path: '/dashboard/allbuyer',
                element: <AllBuyer></AllBuyer>
            },
            {
                path: '/dashboard/alluser',
                element: <AllUser></AllUser>
            },
        ]
    }


])