import React, { Component } from "react";
import Summary from "../Summary/Summary";
import ShippingForm from "./ShippingForm/ShippingForm";

class Shipping extends Component {
    constructor() {
        super();
        this.state = {
            toPaymentButton: true,
        };
    }

    updatePaymentButton = (boolean) => {
        this.setState({ toPaymentButton: boolean });
    };

    render() {
        const {
            updateShipping,
            updateShippingDisplay,
            updatePaymentDisplay,
            updateCartDisplay,
            cart,
            shipping,
            displayScreens,
            updateHomeDisplay,
        } = this.props;

        return (
            <div style={{ display: "flex" }}>
                <ShippingForm
                    updatePayButton={this.updatePaymentButton}
                    updateShipping={updateShipping}
                    updateShippingDisplay={updateShippingDisplay}
                    updatePaymentDisplay={updatePaymentDisplay}
                    updateCartDisplay={updateCartDisplay}
                />
                <Summary
                    cart={cart}
                    shipping={shipping}
                    displayScreens={displayScreens}
                    updateHomeDisplay={updateHomeDisplay}
                    updateShippingDisplay={updateShippingDisplay}
                    updateCartDisplay={updateCartDisplay}
                    toPaymentButton={this.state.toPaymentButton}
                />
            </div>
        );
    }
}

export default Shipping;
