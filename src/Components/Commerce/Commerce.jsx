import React from "react";
import Home from "../Home/home";
import Navbar from "../Navbar/Navbar";
import { commerceVariables } from "../JavaScript/InitialStateVariables";
import Cart from "../Cart/Cart";
import Footer from "../Footer/Footer";
import Login from "../Login/Login";
import SignUp from "../SignUp/SignUp";
import ProgressBar from "../ProgressBar/ProgressBar";
import Shipping from "../Shipping/Shipping";
import Payment from "../Payment/payment";
import Confirmed from "../Confirmed/Confirmed";

const INIT_CARD = commerceVariables;

class Commerce extends React.Component {
    constructor() {
        super();
        this.state = {
            commerce: INIT_CARD,
        };
    }

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

    updateSubState = (name, sub, state, func) => {
        this.setState(
            (prevState) => ({
                [name]: {
                    ...prevState[name],
                    [sub]: {
                        ...prevState[name][sub],
                        ...state,
                    },
                },
            }),
            func
        );
    };

    updateCartItem = (name, sub, cartItem, state, func) => {
        this.setState(
            (prevState) => ({
                [name]: {
                    ...prevState[name],
                    [sub]: {
                        ...prevState[name][sub],
                        [cartItem]: {
                            ...prevState[name][sub][cartItem],
                            ...state,
                        },
                    },
                },
            }),
            func
        );
    };

    deleteStateVariable = (commerce, name, sub) => {
        this.setState((prevState) => {
            const state = { ...prevState };
            delete state[commerce][name][sub];
            return state;
        });
    };

    resetState = () => {
        this.setState({
            commerce: commerceVariables,
        });
    };

    updateCart = (state, func) =>
        this.updateSubState("commerce", "cart", state, func);
    updatePayment = (state, func) =>
        this.updateSubState("commerce", "payment", state, func);
    updateShipping = (state, func) =>
        this.updateSubState("commerce", "shipping", state, func);
    deleteCartItem = (name) =>
        this.deleteStateVariable("commerce", "cart", name);
    updateCartDisplay = (boolean, func) =>
        this.updateSubState(
            "commerce",
            "displayScreens",
            { cart: boolean },
            func
        );
    updatePaymentDisplay = (boolean, func) =>
        this.updateSubState(
            "commerce",
            "displayScreens",
            { payment: boolean },
            func
        );
    updateConfirmedDisplay = (boolean, func) =>
        this.updateSubState(
            "commerce",
            "displayScreens",
            { confirmed: boolean },
            func
        );
    updateShippingDisplay = (boolean, func) =>
        this.updateSubState(
            "commerce",
            "displayScreens",
            { shipping: boolean },
            func
        );
    updateLoginDisplay = (boolean, func) =>
        this.updateSubState(
            "commerce",
            "displayScreens",
            { login: boolean },
            func
        );
    updateSignUpDisplay = (boolean, func) =>
        this.updateSubState(
            "commerce",
            "displayScreens",
            { signUp: boolean },
            func
        );
    updateHomeDisplay = (boolean, func) =>
        this.updateSubState(
            "commerce",
            "displayScreens",
            { home: boolean },
            func
        );
    updateFooterDisplay = (boolean, func) =>
        this.updateSubState(
            "commerce",
            "displayScreens",
            { footer: boolean },
            func
        );
    updateCurrentUser = (state, func) =>
        this.updateSubState("commerce", "currentUser", state, func);
    updateUserList = (state, func) =>
        this.updateSubState("commerce", "savedUsers", state, func);

    render() {
        const { commerce } = this.state;
        const {
            cart,
            confirmed,
            home,
            login,
            payment,
            shipping,
            signUp,
            footer,
        } = commerce.displayScreens;

        return (
            <>
                <div className="background">
                    <div className="container">
                        <Navbar
                            cart={commerce.cart}
                            displayList={commerce.displayScreens}
                            updateDisplay={this.updateSubState}
                            currentUser={commerce.currentUser}
                        />
                    </div>
                </div>
                <div className="container" style={{ position: "relative" }}>
                    {home && (
                        <Home
                            updateCart={this.updateCart}
                            cart={commerce.cart}
                            deleteCartItem={this.deleteCartItem}
                            updateFooterDisplay={this.updateFooterDisplay}
                            updateCartItem={this.updateCartItem}
                        />
                    )}
                    {(cart || payment || shipping || confirmed) && (
                        <ProgressBar displayScreens={commerce.displayScreens} />
                    )}
                    {cart && (
                        <Cart
                            cart={commerce.cart}
                            shipping={commerce.shipping}
                            deleteCartItem={this.deleteCartItem}
                            updateCartItem={this.updateCartItem}
                            displayScreens={commerce.displayScreens}
                            updateHomeDisplay={this.updateHomeDisplay}
                            updateShippingDisplay={this.updateShippingDisplay}
                            updateCartDisplay={this.updateCartDisplay}
                        />
                    )}
                    {shipping && (
                        <Shipping
                            cart={commerce.cart}
                            shipping={commerce.shipping}
                            displayScreens={commerce.displayScreens}
                            updateHomeDisplay={this.updateHomeDisplay}
                            updateShippingDisplay={this.updateShippingDisplay}
                            updateCartDisplay={this.updateCartDisplay}
                            updatePaymentDisplay={this.updatePaymentDisplay}
                            updateShipping={this.updateShipping}
                        />
                    )}
                    {payment && (
                        <Payment
                            cart={commerce.cart}
                            shipping={commerce.shipping}
                            displayScreens={commerce.displayScreens}
                            updateHomeDisplay={this.updateHomeDisplay}
                            updateShippingDisplay={this.updateShippingDisplay}
                            updateCartDisplay={this.updateCartDisplay}
                            updatePaymentDisplay={this.updatePaymentDisplay}
                            updateConfirmedDisplay={this.updateConfirmedDisplay}
                            updateCurrentUser={this.updateCurrentUser}
                            updatePayment={this.updatePayment}
                            currentUser={commerce.currentUser}
                        />
                    )}
                    {confirmed && (
                        <Confirmed
                            currentUser={commerce.currentUser}
                            resetState={this.resetState}
                        />
                    )}
                    {login && (
                        <Login
                            users={commerce.savedUsers}
                            cart={commerce.cart}
                            updateCartDisplay={this.updateCartDisplay}
                            updateLoginDisplay={this.updateLoginDisplay}
                            updateCurrentUser={this.updateCurrentUser}
                            updateHomeDisplay={this.updateHomeDisplay}
                            updateUserList={this.updateUserList}
                        />
                    )}
                    {signUp && (
                        <SignUp
                            updateSignUpDisplay={this.updateSignUpDisplay}
                            users={commerce.savedUsers}
                            cart={commerce.cart}
                            updateCartDisplay={this.updateCartDisplay}
                            updateHomeDisplay={this.updateHomeDisplay}
                            updateCurrentUser={this.updateCurrentUser}
                            updateUserList={this.updateUserList}
                        />
                    )}
                    {home && footer && (
                        <Footer
                            updateCartDisplay={this.updateCartDisplay}
                            updateHomeDisplay={this.updateHomeDisplay}
                            updateLoginDisplay={this.updateLoginDisplay}
                            updateSignUpDisplay={this.updateSignUpDisplay}
                            updateCurrentUser={this.updateCurrentUser}
                            currentUser={commerce.currentUser}
                        />
                    )}
                </div>
            </>
        );
    }
}

export default Commerce;
