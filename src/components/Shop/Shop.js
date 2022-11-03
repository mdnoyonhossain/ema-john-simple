import React, { useEffect, useState } from 'react';
import { Link, useLoaderData } from 'react-router-dom';
import { addToDb, deleteShoppingCart, getStroredCart } from '../../utilities/fakedb';
import Cart from '../Cart/Cart';
import Product from '../Product/Product';
import './Shop.css';

const Shop = () => {
    const [products, setPorducts] = useState([]);
    const [count, setCount] = useState(0);
    const [cart, setCart] = useState([]);
    const [page, setPage] = useState(0)
    const [size, setSize] = useState(10);

    useEffect( () => {
        const url = `http://localhost:5000/products?page=${page}&size=${size}`;
        fetch(url)
        .then(res => res.json())
        .then(data => {
            setCount(data.count);
            setPorducts(data.products);
        })
    }, [page, size])

    const pages = Math.ceil(count / size);

    const clearCart = () => {
        setCart([]);
        deleteShoppingCart();
    }

    useEffect(() => {
        const storeCart = getStroredCart();
        const saveCart = [];
        for (const id in storeCart) {
            const addedProduct = products.find(product => product._id === id);
            if (addedProduct) {
                const quantity = storeCart[id];
                addedProduct.quantity = quantity;
                saveCart.push(addedProduct);
            }
            setCart(saveCart);
        }
    }, [products])

    const handelAddToCart = (selectedProduct) => {
        let newCart = [];
        const exist = cart.find(product => product._id === selectedProduct.id);
        if (!exist) {
            selectedProduct.quantity = 1;
            newCart = [...cart, selectedProduct];
        }
        else {
            const rest = cart.filter(product => product._id !== selectedProduct._id);
            exist.quantity = exist.quantity + 1;
            newCart = [...rest, exist]
        }
        setCart(newCart);
        addToDb(selectedProduct._id)
    }

    return (
        <div className='shop-container'>
            <div className="products-container">
                {
                    products.map(product => <Product key={product._id} product={product} handelAddToCart={handelAddToCart}></Product>)
                }
            </div>
            <div className="cart-container">
                <Cart clearCart={clearCart} cart={cart}>
                    <Link to='/orders'>
                        <button>Review Orders</button>
                    </Link>
                </Cart>
            </div>
            <div className='pagination'>
                <p>page: {page}</p>
                {
                    [...Array(pages).keys()].map(number => <button key={number} onClick={() => setPage(number)} className={page === number && 'selected'}>{number + 1}</button>)
                }
                <select onChange={(event) => setSize(event.target.value)}>
                    <option value="5">5</option>
                    <option value="10" selected>10</option>
                    <option value="15">15</option>
                    <option value="20">20</option>
                </select>
            </div>
        </div>
    );
};

export default Shop;