import React, { Component } from 'react';
import Summary from '../Summary/Summary';
import style from './Shipping.module.css';
import ShippingForm from './ShippingForm/ShippingForm';

class Shipping extends Component {
    constructor() {
        super();
        this.state = {
            toPaymentButton: true,
        }
    }

    updatePaymentButton = (boolean) => {
        this.setState({toPaymentButton: boolean})
    }

    render() {
        return (
            <div style={{display: 'flex'}}>
                <ShippingForm
                    updatePayButton={this.updatePaymentButton}
                    updateShipping={this.props.updateShipping}
                    updateShippingDisplay={this.props.updateShippingDisplay}
                    updatePaymentDisplay={this.props.updatePaymentDisplay}
                    updateCartDisplay={this.props.updateCartDisplay}
/>
                <Summary 
                    cart={this.props.cart}
                    shipping={this.props.shipping}
                    displayScreens={this.props.displayScreens}
                    updateHomeDisplay={this.props.updateHomeDisplay}
                    updateShippingDisplay={this.props.updateShippingDisplay}
                    updateCartDisplay={this.props.updateCartDisplay}
                    toPaymentButton={this.state.toPaymentButton}
                />
            </div>
        )
    }
}

export default Shipping;