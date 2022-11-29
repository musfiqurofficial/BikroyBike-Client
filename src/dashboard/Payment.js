import React from 'react'
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import { useLoaderData, useNavigation } from 'react-router-dom';
import CheckoutForm from './CheckoutForm';
import Loading from '../components/common/loading/Loading';

const stripePromise = loadStripe('pk_test_51M6U64G7PkQ5daFNJ5jIwvzjgdLP0ANXmUoTnVYgQHAGCqCwm2cIsy62dVJ8QbCmVLmThdXNGRVYedVJNfK7p1JN009bkUa0eS');


const Payment = () => {
    const data = useLoaderData();
    const { peoductName, price } = data;
    const navigation = useNavigation();

    if (navigation.state === "loading") {
        return <Loading></Loading>
    }

    return (
        <div>
            <p className='text-3xl font-bold'>Payment for {peoductName}</p>
            <p className='text-xl '> Please pay <span className='font-bold'> ${price} </span></p>

            <div className='w-96 my-12'>
                <Elements stripe={stripePromise}>
                    <CheckoutForm
                        data={data}
                    />
                </Elements>
            </div>
        </div>
    )
}

export default Payment
