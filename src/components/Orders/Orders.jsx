import React, { useState } from 'react';
import Cart from '../Cart/Cart';
import { Link, useLoaderData } from 'react-router-dom';
import Product from '../Product/Product';
import RiviewItem from '../RiviewItem/RiviewItem';
import './Orders.css'
import { deleteShoppingCart, removeFromDb } from '../../utilities/fakedb';

const Orders = () => {
    const savedCart = useLoaderData();
    const [cart, setCart] = useState(savedCart)
    //console.log(savedCart);

    const handleRemoveFromCart = (id) => {

        const remaining = cart.filter(product => product.id !== id);
        setCart(remaining);
        removeFromDb(id);
    }

    const handleClearCart = () => {
        setCart([])
        deleteShoppingCart()
    }



    return (
        <div className='shop-container'>
            <div className='review-container'>
                {
                    cart.map(product => <RiviewItem
                        key={product.id}
                        product={product}
                        handleRemoveFromCart={handleRemoveFromCart}
                    ></RiviewItem>)
                }
            </div>
            <div className='cart-container'>
                <Cart cart={cart}
                 handleClearCart={handleClearCart}
                >
                    <Link to='/checkout'>
                        <button className='proceed-checkout'>Proceed Checkout</button>
                    </Link>
                </Cart>
            </div>
        </div>

    );
};

export default Orders;