import React from "react";
import CartItemSummary from "./CartItemSummary/CartItemSummary";
import CartSummary from "./CartSummary/CartSummary";
import style from "./Summary.module.css"

const Summary = (props) => {
    
    const shippingScreen = props.displayScreens['shipping'];
    const paymentScreen = props.displayScreens['payment'];

    return (
        <div className={style.container}>
            {shippingScreen && (
            <>
                <CartItemSummary cart={props.cart}/>
                <hr />
            </>
            )}
            <CartSummary 
                cart={props.cart}
                shipping={props.shipping}
            />
            {shippingScreen && (
                <div style={{display: 'flex', justifyContent: 'center', marginTop: '1rem'}}>
                    <button 
                        disabled={props.toPaymentButton} 
                        type='submit' 
                        form='shippingForm' 
                        className={`btn round-pill`}>Go to Payment
                    </button>
                </div>
            )}
            {/* Shipping Portion */}

        </div>
    )
}

export default Summary;