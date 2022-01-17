import React from "react";
import Summary from "../Summary/Summary";
import ItemContainer from "./ItemContainer/ItemContainer";
import style from "./Cart.module.css";

class Cart extends React.Component {
    goToDisplay = (e) => {
        e.preventDefault();
        this.props.updateCartDisplay(false);
        e.target.value === "home"
            ? this.props.updateHomeDisplay(true)
            : this.props.updateShippingDisplay(true);
    };

    render() {
        const {
            deleteCartItem,
            updateCartItem,
            cart,
            shipping,
            displayScreens,
            updateHomeDisplay,
            updateShippingDisplay,
            updateCartDisplay,
        } = this.props;

        return (
            <div className={style.cartContainer}>
                <ItemContainer
                    deleteCartItem={deleteCartItem}
                    cart={cart}
                    updateCartItem={updateCartItem}
                />
                <Summary
                    cart={cart}
                    shipping={shipping}
                    displayScreens={displayScreens}
                    updateHomeDisplay={updateHomeDisplay}
                    updateShippingDisplay={updateShippingDisplay}
                    updateCartDisplay={updateCartDisplay}
                />

                <div className={style.buttonContainer}>
                    <button
                        className="btn round-pill"
                        onClick={this.goToDisplay}
                        value="home"
                    >
                        Back to Home
                    </button>
                    <button
                        className="btn round-pill"
                        onClick={this.goToDisplay}
                        value="shipping"
                    >
                        Go to Shipping
                    </button>
                </div>
            </div>
        );
    }
}

export default Cart;
