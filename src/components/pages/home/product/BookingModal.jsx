import React from 'react';
import { useContext } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import { AuthContext } from '../../../../context/AuthProvider';

const BookingModal = ({ data, productDetail, setProductDetail }) => {
    const { user } = useContext(AuthContext);
    const { __id, product_img1, product_img2, product_img3, brand_name, detail, model_name, model_year, category, Post_date, address, km, cc, price, used_year, phone_number, seller_name } = data;

    const handleBookingSubmit = e => {
        e.preventDefault();
        const form = e.target;
        const name = form.name.value;
        const email = form.email.value;
        const seller_name = form.seller_name.value;
        const seller_phone = form.seller_phone.value;
        const price = form.price.value;
        const category = form.category.value;
        const location = form.location.value;
        const phone = form.phone.value;
        console.log(name, email, seller_name, seller_phone, category, location, phone)

        const booking = {
            customer_name: name,
            email,
            category,
            location,
            price,
            customer_phone: phone,
            seller_name: seller_name,
            seller_phone: seller_phone,
        }
        console.log(booking);

        fetch('https://assingment-12-server.vercel.app/booking', {
            method: "POST",
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(booking)
        })
            .then(res => res.json())
            .then(data => {
                console.log(data);
                if (data.acknowledged) {
                    form.reset();
                    // refetch();
                    toast.success('Booking Successful!')
                }
                else {
                    toast.error(data.message)
                }
            })

    }
    return (
        <div>
            <div className=''>
                <input type="checkbox" id="my-modal-3" className="modal-toggle" />
                <div className="modal">
                    <div className="modal-box relative">
                        <label htmlFor="my-modal-3" className="btn btn-sm btn-circle absolute right-2 top-2">✕</label>
                        <h3 className='text-xl font-bold'>{brand_name} {model_name} {model_year}</h3>
                        <form onSubmit={handleBookingSubmit} className='grid grid-cols-1 gap-3 mt-4'>
                            <input type="text" name='name' defaultValue={user?.displayName} placeholder="Your Name" className="input input-sm w-full border-secondary" required />
                            <input type="email" name='email' defaultValue={user?.email} readOnly disabled placeholder="Your Email" className="input input-sm w-full border-secondary" required />

                            <label className='mt-3'>Seller Info:</label>
                            <div className='grid grid-cols-2 gap-3'>
                                <input type="text" name='seller_name' defaultValue={seller_name} className="input input-sm w-full border-secondary" readOnly disabled required />
                                <input type="text" name='category' defaultValue={category} className="input input-sm w-full border-secondary" readOnly disabled required />
                                <input type="text" name='seller_phone' defaultValue={phone_number} className="input input-sm w-full border-secondary" readOnly disabled required />
                                <input type="text" name='price' defaultValue={price} className="input input-sm w-full border-secondary" readOnly disabled required />
                            </div>
                            <label className=''>Meetup Location!</label>
                            <input type="text" name='location' placeholder="Meetup Location!" className="input input-sm w-full border-secondary" required />
                            <input type="text" name='phone' placeholder="Phone Number!" className="input input-sm w-full border-secondary" required />

                            <button type="submit"><label htmlFor="my-modal-3" className='btn bg-primary border-none hover:bg-secondary hover:border-none text-white font-bold w-full'>Submit</label></button>
                        </form>
                    </div>
                </div>
            </div>
            <Toaster></Toaster>
        </div >
    );
};

export default BookingModal;