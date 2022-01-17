import React from "react";
import PaymentForm from "./PaymentForm/PaymentForm";
import Summary from "../Summary/Summary";

class Payment extends React.Component {
    constructor() {
        super();
        this.state = {
            toPay: true,
        };
    }

    updatePaymentButton = (boolean) => {
        this.setState({ toPay: boolean });
    };

    updateState = (name, state, func) => {
        this.setState(
            (prevState) => ({
                [name]: {
                    ...prevState[name],
                    ...state,
                },
            }),
            func
        );
    };

    render() {
        const {
            cart,
            shipping,
            updateHomeDisplay,
            updatePaymentDisplay,
            updateShippingDisplay,
            updateCartDisplay,
            updateConfirmedDisplay,
            updateCurrentUser,
            updatePayment,
            displayScreens
        } = this.props;

        return (
            <div style={{ display: "flex" }}>
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
                    updatePaymentButton={this.updatePaymentButton}
                />
                <Summary
                    cart={cart}
                    shipping={shipping}
                    displayScreens={displayScreens}
                    updateHomeDisplay={updateHomeDisplay}
                    updateShippingDisplay={updateShippingDisplay}
                    updateCartDisplay={updateCartDisplay}
                    toPay={this.state.toPay}
                />
            </div>
        );
    }
}

export default Payment;
