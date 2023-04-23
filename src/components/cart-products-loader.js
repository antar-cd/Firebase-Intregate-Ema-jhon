import { getShoppingCart } from "../utilities/fakedb";

const cartProductsloader = async () =>{
    const loadedProducts = await fetch('products.json');
    const products = await loadedProducts.json();


    // if cart data is in database , you have to use async await

    const storeCart = getShoppingCart();
    const savedcart =[];

    for(const id in storeCart){
        const addedProduct = products.find(pd => pd.id === id);
        if(addedProduct){
            const quantity = storeCart[id];
            addedProduct.quantity = quantity;
            savedcart.push(addedProduct)
        } 
    }

    return savedcart;
}

export default cartProductsloader;