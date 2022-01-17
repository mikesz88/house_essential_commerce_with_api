import React from "react";
import CartItemSummary from "./CartItemSummary/CartItemSummary";
import CartSummary from "./CartSummary/CartSummary";
import ShippingSummary from "./ShippingSummary/ShippingSummary";
import style from "./Summary.module.css";

const Summary = props => {
    const shippingScreen = props.displayScreens["shipping"];
    const paymentScreen = props.displayScreens["payment"];

    const totalPrice = () => {
        const { cart } = props;
        const cartItemNames = Object.keys(cart);
        let total = 0;
        for (const product of cartItemNames) {
            const quantity = cart[product]["quantity"];
            const price = cart[product]["price"];
            total += +(quantity * price).toFixed(2);
        }
        return total;
    };

    const moneyDenomination = (amount) =>
        amount.toLocaleString("en-US", { style: "currency", currency: "USD" });

    const shipping =
        props.shipping["delivery"] === "express"
            ? totalPrice() * 0.05
            : totalPrice() >= 250
            ? 0
            : 50;

    return (
        <div className={style.container}>
            {(shippingScreen || paymentScreen) && (
                <>
                    <CartItemSummary cart={props.cart} />
                    <hr />
                </>
            )}
            <CartSummary
                cart={props.cart}
                shipping={props.shipping}
                totalPrice={totalPrice}
                moneyDenomination={moneyDenomination}
            />
            {shippingScreen && (
                <div
                    style={{
                        display: "flex",
                        justifyContent: "center",
                        marginTop: "1rem",
                    }}
                >
                    <button
                        disabled={props.toPaymentButton}
                        type="submit"
                        form="shippingForm"
                        className={`btn round-pill`}
                    >
                        Go to Payment
                    </button>
                </div>
            )}
            {paymentScreen && (
                <>
                    <ShippingSummary shipping={props.shipping} />
                    <div
                        style={{
                            display: "flex",
                            justifyContent: "center",
                            marginTop: "1rem",
                        }}
                    >
                        <button
                            disabled={props.toPay}
                            type="submit"
                            form="paymentForm"
                            className={`btn round-pill`}
                        >
                            Pay{" "}
                            {moneyDenomination(
                                +(totalPrice() * 1.055 + shipping).toFixed(2)
                            )}
                        </button>
                    </div>
                </>
            )}
        </div>
    );
};

export default Summary;
