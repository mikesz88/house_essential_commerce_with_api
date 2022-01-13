import React from "react";
import style from "./CartSummary.module.css"

class CartSummary extends React.Component {

    moneyDenomination = amount => amount.toLocaleString('en-US', {style: 'currency', currency: 'USD'});
    
    totalPrice = () => {
        const { cart } = this.props;
        const cartItemNames = Object.keys(cart);
        let total = 0;
        for (const product of cartItemNames) {
            const quantity = cart[product]['quantity'];
            const price = cart[product]['price'];
            total += +((quantity*price).toFixed(2))
        }
        return total;
    }
    render() {

        return (
            <div style={{display: 'flex', flexDirection: 'column', justifyContent: 'center'}}>
                <span style={{textAlign: 'center'}}>Cart Subtotal: {this.moneyDenomination((this.totalPrice()))}</span>
                <span style={{textAlign: 'center'}}>Taxes (5.5%): {this.moneyDenomination(+(this.totalPrice()*0.055).toFixed(2))}</span>
                <span style={{textAlign: 'center'}}>Total: {this.moneyDenomination(+(this.totalPrice()*1.055).toFixed(2))}</span>
            </div>
        )
    }
}

export default CartSummary;