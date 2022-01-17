import React from "react";
import style from "./PaymentForm.module.css";
import { OTHERCARDS, CARD, CARDICON } from "../../JavaScript/Constants";
import {
    cardExpireValidation,
    cardNumberValidation,
    onlyTextValidation,
    securityCodeValidation,
} from "../../JavaScript/Validations";

const INIT_CARD = {
    cardHolder: "",
    card: "",
    expiry: "",
    securityCode: "",
};

class PaymentForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            cardData: INIT_CARD,
            maxLength: OTHERCARDS.length,
            error: {},
            cardType: null,
            expiryMonth: "",
            expiryYear: "",
        };
    }

    totalPrice = () => {
        const { cart } = this.props;
        const cartItemNames = Object.keys(cart);
        let total = 0;
        for (const product of cartItemNames) {
            const quantity = cart[product]["quantity"];
            const price = cart[product]["price"];
            total += +(quantity * price).toFixed(2);
        }
        return total;
    };

    moneyDenomination = (amount) =>
        amount.toLocaleString("en-US", { style: "currency", currency: "USD" });

    findDebitCardType = (cardNumber) => {
        const regexPattern = {
            MASTERCARD: /^5[1-5][0-9]{1,}|^2[2-7][0-9]{1,}$/,
            VISA: /^4[0-9]{2,}$/,
            AMERICAN_EXPRESS: /^3[47][0-9]{5,}$/,
            DISCOVER: /^6(?:011|5[0-9]{2})[0-9]{3,}$/,
        };

        for (const card in regexPattern) {
            if (cardNumber.replace(/[^\d]/g, "").match(regexPattern[card]))
                return card;
        }

        return "";
    };

    checkForPaymentButton = () => {
        const buttonValue = Object.keys(this.state.cardData).every(
            (cardItem) => this.state.cardData[cardItem]
        );
        if (buttonValue) {
            this.props.updatePaymentButton(false);
        } else {
            this.props.updatePaymentButton(true);
        }
    };

    handleValidations = (type, value) => {
        let errorText;
        switch (type) {
            case "card":
                errorText = cardNumberValidation(value);
                this.setState((prevState) => ({
                    cardType: this.findDebitCardType(value),
                    error: {
                        ...prevState.error,
                        cardError: errorText,
                    },
                }));
                break;
            case "cardHolder":
                errorText = onlyTextValidation(value);
                this.setState((prevState) => ({
                    error: { ...prevState.error, cardHolderError: errorText },
                }));
                break;
            case "expiryMonth":
                errorText = cardExpireValidation(this.state.cardData.expiry);
                this.setState((prevState) => ({
                    error: { ...prevState.error, expiryError: errorText },
                }));
                break;
            case "expiryYear":
                errorText = cardExpireValidation(this.state.cardData.expiry);
                this.setState((prevState) => ({
                    error: { ...prevState.error, expiryError: errorText },
                }));
                break;
            case "securityCode":
                errorText = securityCodeValidation(3, value);
                this.setState((prevState) => ({
                    error: { ...prevState.error, securityCodeError: errorText },
                }));
                break;
            default:
                break;
        }
    };

    handleBlur = ({ target: { name, value } }) =>
        this.handleValidations(name, value);

    handleInputData = ({ target: { name, value } }) => {
        if (name === "card") {
            let mask = value.split(" ").join("");
            if (mask.length) {
                mask = mask.match(new RegExp(".{1,4}", "g")).join(" ");
                this.setState(
                    (prevState) => ({
                        cardData: {
                            ...prevState.cardData,
                            [name]: mask,
                        },
                    }),
                    this.checkForPaymentButton
                );
            } else {
                this.setState(
                    (prevState) => ({
                        cardData: {
                            ...prevState.cardData,
                            [name]: "",
                        },
                    }),
                    this.checkForPaymentButton
                );
            }
        } else if (name === "expiryMonth") {
            this.setState(
                (prevState) => ({
                    ...prevState,
                    [name]: value,
                    cardData: {
                        ...prevState.cardData,
                        expiry: `${value}/${prevState.expiryYear}`,
                    },
                }),
                this.checkForPaymentButton
            );
        } else if (name === "expiryYear") {
            this.setState(
                (prevState) => ({
                    ...prevState,
                    [name]: value,
                    cardData: {
                        ...prevState.cardData,
                        expiry: `${prevState.expiryMonth}/${value}`,
                    },
                }),
                this.checkForPaymentButton
            );
        } else {
            this.setState(
                (prevState) => ({
                    cardData: {
                        ...prevState.cardData,
                        [name]: value,
                    },
                }),
                this.checkForPaymentButton
            );
        }
    };

    checkErrorBeforeSave = () => {
        const { cardData, error } = this.state;
        let errorValue = {};
        let isError = false;
        Object.keys(cardData).forEach((val) => {
            let checkError = `${val}Error`;
            if (!cardData[val].length || error[checkError]) {
                error[checkError]
                    ? (errorValue = {
                          ...errorValue,
                          [checkError]: error[checkError],
                      })
                    : (errorValue = {
                          ...errorValue,
                          [checkError]: "Required",
                      });
                isError = true;
            }
        });
        this.setState({ error: errorValue });
        return isError;
    };

    handlePayment = (e) => {
        e.preventDefault();
        const errorCheck = this.checkErrorBeforeSave();
        if (!errorCheck) {
            this.props.updateCurrentUser({
                ...this.props.currentUser,
                cart: this.props.cart,
                shipping: this.props.shipping["shippingInfo"],
                paymentInfo: {
                    ...this.state.cardData,
                    cardType: this.state.cardType,
                },
            });
            this.setState({
                cardData: INIT_CARD,
                maxLength: OTHERCARDS.length,
                error: {},
                cardType: null,
                expiryMonth: "",
                expiryYear: "",
            });
            this.proceedToPayment();
        }
    };

    proceedToPayment = () => {
        this.props.updatePaymentDisplay(false);
        this.props.updateConfirmedDisplay(true);
    };

    render() {
        const { cardData, error, cardType, maxLength } = this.state;

        const paymentFieldsFilled = Object.keys(cardData).every(
            (item) => cardData[item]
        );

        const shipping =
            this.props.shipping["delivery"] === "express"
                ? this.totalPrice() * 0.05
                : this.totalPrice() >= 250
                ? 0
                : 50;

        const errorCardHolderMessage =
            error &&
            error["cardHolderError"] &&
            error["cardHolderError"].length > 1
                ? error["cardHolderError"]
                : null;

        const errorCardNumberMessage =
            error && error["cardError"] && error["cardError"].length > 1
                ? error["cardError"]
                : null;

        const errorExpiryMessage =
            error && error["expiryError"] && error["expiryError"].length > 1
                ? error["expiryError"]
                : null;

        const errorSecurityCodeMessage =
            error &&
            error["securityCodeError"] &&
            error["securityCodeError"].length > 1
                ? error["securityCodeError"]
                : null;

        return (
            <div className={style.formContainer}>
                <h3 className={`header-sm`}>Payment Information</h3>
                <hr />
                <form id="paymentForm" onSubmit={this.handlePayment}>
                    <div className={style.inputContainer}>
                        <label>CardHolder Name</label>
                        <input
                            placeholder="Card Holder's Name"
                            type="text"
                            value={cardData && cardData.cardHolder}
                            onChange={this.handleInputData}
                            autoComplete="off"
                            name="cardHolder"
                            onBlur={this.handleBlur}
                        />
                        {errorCardHolderMessage && (
                            <span className={style.error}>
                                {errorCardHolderMessage}
                            </span>
                        )}
                    </div>
                    <div
                        className={`${style.inputContainer} ${style.flexContainer}`}
                    >
                        <label>Card Number</label>
                        <div className={style.cardNumberInputBorder}>
                            <input
                                className={style.cardNumberTransparentBorder}
                                placeholder="Card Number"
                                type="text"
                                value={cardData && cardData.card}
                                onChange={this.handleInputData}
                                autoComplete="off"
                                maxLength={maxLength}
                                name="card"
                                onBlur={this.handleBlur}
                            />
                            {(!error || !error.cardError) &&
                                CARD.includes(cardType) && (
                                    <img
                                        style={{
                                            position: "absolute",
                                            top: "1px",
                                            right: 0,
                                            width: "25%",
                                            height: "94%",
                                            backgroundColor:
                                                "rgba(255, 255, 255, .87)",
                                        }}
                                        src={CARDICON[cardType]}
                                        alt="card"
                                    />
                                )}
                        </div>
                        {errorCardNumberMessage && (
                            <div className={style.error}>
                                {errorCardNumberMessage}
                            </div>
                        )}
                    </div>
                    <div
                        className={`${style.flexContainer} ${style.inputContainer}`}
                    >
                        <label>Exp.Date</label>
                        <select
                            defaultValue=""
                            className={style.selectBackground}
                            onChange={this.handleInputData}
                            onBlur={this.handleBlur}
                            name="expiryMonth"
                            id="expiryMonth"
                        >
                            <option value="">Month</option>
                            <option value="01">01</option>
                            <option value="02">02</option>
                            <option value="03">03</option>
                            <option value="04">04</option>
                            <option value="05">05</option>
                            <option value="06">06</option>
                            <option value="07">07</option>
                            <option value="08">08</option>
                            <option value="09">09</option>
                            <option value="10">10</option>
                            <option value="11">11</option>
                            <option value="12">12</option>
                        </select>
                        <select
                            defaultValue=""
                            className={style.selectBackground}
                            onChange={this.handleInputData}
                            onBlur={this.handleBlur}
                            name="expiryYear"
                            id="expiryYear"
                        >
                            <option value="" disabled>
                                Year
                            </option>
                            <option value="22">22</option>
                            <option value="23">23</option>
                            <option value="24">24</option>
                            <option value="25">25</option>
                            <option value="26">26</option>
                        </select>
                        {errorExpiryMessage && (
                            <div className={style.error}>
                                {errorExpiryMessage}
                            </div>
                        )}
                    </div>
                    <div
                        className={`${style.flexContainer} ${style.inputContainer}`}
                    >
                        <label>CVV</label>
                        <input
                            onChange={this.handleInputData}
                            onBlur={this.handleBlur}
                            type="number"
                            name="securityCode"
                        />
                        {errorSecurityCodeMessage && (
                            <div className={style.error}>
                                {errorSecurityCodeMessage}
                            </div>
                        )}
                    </div>
                    <div className={`${style.submitButton}`}>
                        <button
                            disabled={!paymentFieldsFilled}
                            className={`btn round-pill`}
                            type="submit"
                        >
                            PAY{" "}
                            {this.moneyDenomination(
                                +(this.totalPrice() * 1.055 + shipping).toFixed(
                                    2
                                )
                            )}
                        </button>
                    </div>
                </form>
            </div>
        );
    }
}

export default PaymentForm;
