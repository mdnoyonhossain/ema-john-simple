import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import './Prodcut.css';

const Product = (props) => {
    const { product, handelAddToCart } = props;
    const { name, img, price, ratings, seller } = product;

    return (
        <div className='product'>
            <img src={img} alt="" />
            <div className='product-info'>
                <p className='product-name'>{name}</p>
                <p>Price: {price}</p>
                <p><small>Seller: {seller}</small></p>
                <p><small>Rating: {ratings} Stars</small></p>
            </div>
            <button onClick={() => handelAddToCart(product)} className='btn-cart'><span style={{marginRight: "8px"}}>Add to Cart</span> <FontAwesomeIcon icon={faShoppingCart}></FontAwesomeIcon></button>
        </div>
    );
};

export default Product;