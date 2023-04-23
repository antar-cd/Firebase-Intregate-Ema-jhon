import React from 'react';
import Cart from '../Cart/Cart';
import { useLoaderData } from 'react-router-dom';
import Product from '../Product/Product';
import RiviewItem from '../RiviewItem/RiviewItem';
import './Orders.css'

const Orders = () => {
    const cart = useLoaderData();
    console.log(cart);
    return (
        <div className='shop-container'>
            <div className='review-container'>
                {
                    cart.map(product => <RiviewItem
                       key={product.id}
                       product={product} 
                    ></RiviewItem>)
                }
            </div>
            <div className='cart-container'>
                <Cart cart={[]}></Cart>
            </div>
        </div>

    );
};

export default Orders;