import React from 'react';

const Cart = ({cart}) => {

    return (
        <div>
            <h4>Order Summery</h4>
            <p>Selected Item: {cart.length}</p>
        </div>
    );
};

export default Cart;