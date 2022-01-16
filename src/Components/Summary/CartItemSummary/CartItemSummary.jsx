import React from "react";
import style from './CartItemSummary.module.css';

const CartItemSummary = props => {

    const moneyDenomination = amount => amount.toLocaleString('en-US', {style: 'currency', currency: 'USD'});

    return (
        <div className={style.summaryWindowSize}>
           {Object.keys(props.cart).map((productName, index) => {
                const product = props.cart[productName];
                const { name, price, quantity } = product;
                return (
                    <div key={index} className={`${style.container}`}>
                        <div className={`${style.imgContainer}`}>
                            <img src={localStorage.getItem(name)} alt="product" />
                        </div>
                        <div>
                            <div className={`${style.itemWidth}`}>
                                <span><strong>{name}</strong></span>
                            </div>
                            <div className={`${style.itemWidth}`}>Price: {moneyDenomination(price)}</div>
                            <div className={`${style.itemWidth}`}>Quantity: {quantity}</div>
                        </div>
                    </div>
                )
           })}
        </div>
    )
}

export default CartItemSummary;