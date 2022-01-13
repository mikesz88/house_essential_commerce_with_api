import React, { Component } from 'react';
import Summary from '../Summary/Summary';
import style from './Shipping.module.css';
import ShippingForm from './ShippingForm/ShippingForm';

class Shipping extends Component {
    constructor() {
        super();
        this.state = {
            toPaymentButton: false,
        }
    }

    updatePaymentButton = (boolean) => {
        this.setState({toPaymentButton: boolean})
    }

    render() {
        return (
            <div>
                <ShippingForm 
                    updatePayButton={this.updatePaymentButton}
                />
                <Summary 
                    cart={this.props.cart}
                    displayScreens={this.props.displayScreens}
                    updateHomeDisplay={this.updateHomeDisplay}
                    updateShippingDisplay={this.updateShippingDisplay}
                    updateCartDisplay={this.updateCartDisplay}
                />
            </div>
        )
    }
}

export default Shipping;