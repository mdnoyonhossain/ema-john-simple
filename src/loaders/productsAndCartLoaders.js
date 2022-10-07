import { getStroredCart } from "../utilities/fakedb";

export const productsAndCartLoaders = async () => {
    const productsData = await fetch('products.json');
    const products = await productsData.json();

    //get Cart
    const saveCart = getStroredCart();
    const initialCart = [];
    for(const id in saveCart){
        const addedProduct = products.find(product => product.id === id);
        if(addedProduct){
            const quantity = saveCart[id];
            addedProduct.quantity = quantity;
            initialCart.push(addedProduct);
        }
    }
    
    return {products: products, initialCart: initialCart};
}