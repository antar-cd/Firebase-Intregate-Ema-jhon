import React, { useEffect, useState } from 'react';
import Product from '../Product/Product';
import'./Shop.css'
import Cart from '../Cart/Cart';
import { addToDb, getShoppingCart } from '../../utilities/fakedb';

const Shop = () => {
    const [products,setProducts]=useState([]);
    const [cart,setCart] =useState([]);

    useEffect(()=>{
        fetch('products.json')
        .then(res => res.json())
        .then(data => setProducts (data));
    },[]);

  useEffect(()=>{
        const storeCart = getShoppingCart();
        const savedCart = [];

        // step 01 : get id of the addedproduct

        for(const id in storeCart ){

            // step-02: get product from products state by using id

            const addedProduct = products.find(product => product.id === id)
            if(addedProduct){
                // step -03: add quantity
                const quantity = storeCart[id];
                addedProduct.quantity = quantity;

                // step- 04: add the added product to the saved cart
                savedCart.push(addedProduct);

            }
            //console.log('addedProduct', addedProduct)
        }
        // step-05: set the cart
        setCart(savedCart);
  },[products])

    const handleAddToCart=(product)=>{
        console.log('products',product)
        //cart.push(product)

        let newCart = [];

        //const newCart = [...cart,product];
        // if product does not exist in the cart , then set quantity = 1
        // if exist update quantity by 1

        const exists = cart.find(pd => pd.id === product.id);
        if(!exists){
            product.quantity = 1;
            newCart= [...cart,product]
        }
        else{
            exists.quantity = exists.quantity + 1;
            const remaining = cart.filter(pd => pd.id !==product.id);
            newCart = [...remaining,exists]; 
        }
        setCart(newCart);
        addToDb(product.id)
    }

    return (
        <div className='shop-container'>
                <div className="products-container">
                   {
                    products.map(product=><Product
                        key={product.id}
                        product={product}
                        handleAddToCart={handleAddToCart}
                    ></Product>)
                   }
                </div>
                <div className="cart-container">
                    <Cart cart={cart}></Cart>
                </div>
            
        </div>
    );
};

export default Shop;