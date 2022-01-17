import React from "react";
import style from "./ConfirmedSummary.module.css";
import CartItemSummary from "../../Summary/CartItemSummary/CartItemSummary";
import CartSummary from "../../Summary/CartSummary/CartSummary";
import { CARDICON } from "../../JavaScript/Constants";

const ConfirmedSummary = (props) => {
    const totalPrice = () => {
        const { cart } = props.currentUser;
        const cartItemNames = Object.keys(cart);
        let total = 0;
        for (const product of cartItemNames) {
            const quantity = cart[product]["quantity"];
            const price = cart[product]["price"];
            total += +(quantity * price).toFixed(2);
        }
        return total;
    };

    const shippingAmount =
        props.currentUser.shipping["delivery"] === "express"
            ? totalPrice() * 0.05
            : totalPrice() >= 250
            ? 0
            : 50;

    const moneyDenomination = (amount) =>
        amount.toLocaleString("en-US", { style: "currency", currency: "USD" });

    const lastFour = () => {
        const card = props.currentUser.paymentInfo.card;
        return card.slice(card.length - 4);
    };

    const { cart, shipping, paymentInfo } = props.currentUser;
    const { cardType } = paymentInfo;

    return (
        <div className={style.confirmContainer}>
            <h3 className="header-sm">Summary</h3>
            <hr />
            <div className={style.paymentSummaryItemContainer}>
                <CartItemSummary cart={cart} />
            </div>
            <hr />
            <div>
                <div className={style.flexShippingNumbers}>
                    <CartSummary
                        cart={cart}
                        shipping={shipping}
                        totalPrice={totalPrice}
                        moneyDenomination={moneyDenomination}
                    />
                </div>
            </div>
            <hr />
            <div className={style.shippingInfoContainer}>
                <h3 className={`header-sm`}>Shipping</h3>
                <div>
                    {shipping.firstName} {shipping.lastName}
                </div>
                <div>{shipping.address}</div>
                <div>
                    {shipping.city}, {shipping.state} {shipping.country}{" "}
                    {shipping.zipCode}
                </div>
                <div>Phone: {shipping.phoneNumber}</div>
                <h3 className={`header-sm`}>Shipping Method</h3>
                {shipping.delivery === "standard" ? (
                    <div>Delivery in 5-10 Business Days</div>
                ) : (
                    <div>Delivery in 3-5 Business Days</div>
                )}
            </div>
            <hr />
            <div>
                <h3 className="header-sm">Payment</h3>
                <div className={style.paymentInfoContainer}>
                    <img
                        className={style.cardIcon}
                        src={CARDICON[cardType]}
                        alt="card"
                    />
                    <span>{cardType}</span>
                    <span>
                        Total Payment:{" "}
                        {moneyDenomination(
                            +(totalPrice() * 1.055 + shippingAmount).toFixed(2)
                        )}
                    </span>
                    <span>Credit Card: *{lastFour()}</span>
                </div>
            </div>
        </div>
    );
};

export default ConfirmedSummary;
