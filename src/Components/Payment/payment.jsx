import React from "react";
import style from './payment.module.css'
import PaymentForm from "./PaymentForm/PaymentForm";

class Payment extends React.Component {
    constructor() {
        super();
        this.state = {
            disabled: {
                card: true,
                cardHolder: true,
                expiryYear: true,
                securityCode: true,
            }
        }
    }

    updateState = (name, state, func) => {
        this.setState(prevState => ({
            [name]: {
            ...prevState[name],
            ...state
            }
        }), func)
    }

    updateDisabledButton = (state, func) => this.updateState('disabled', state, func);


    render() {
        const {cart, shipping, updateHomeDisplay, updatePaymentDisplay, updateShippingDisplay, updateCartDisplay, updateConfirmedDisplay, updateCurrentUser, updatePayment} = this.props;


        return (
            <div>
                <PaymentForm 
                    cart={cart}
                    shipping={shipping}
                    updateHomeDisplay={updateHomeDisplay}
                    updateShippingDisplay={updateShippingDisplay}
                    updateCartDisplay={updateCartDisplay}
                    updateConfirmedDisplay={updateConfirmedDisplay}
                    updatePaymentDisplay={updatePaymentDisplay}
                    updateCurrentUser={updateCurrentUser}
                    updatePayment={updatePayment}
                    updateDisabledButton={this.updateDisabledButton}
                />
            </div>
        )
    }
}

export default Payment;