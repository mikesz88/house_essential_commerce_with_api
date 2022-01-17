import React from "react";
import style from "./Navbar.module.css";

class Navbar extends React.Component {
    updateDisplay = (display) => {
        const displayList = Object.keys(this.props.displayList);
        for (const currentDisplay of displayList) {
            this.props.updateDisplay("commerce", "displayScreens", {
                [currentDisplay]: false,
            });
        }
        this.props.updateDisplay("commerce", "displayScreens", {
            [display]: true,
        });
    };

    render() {
        const { cart, currentUser } = this.props;
        const cartCount =
            Object.keys(cart).length !== 0 ? Object.keys(cart).length : 0;
        return (
            <div className={style.navbarContainer}>
                <div
                    className="btn round-pill"
                    onClick={() => this.updateDisplay("home")}
                >
                    House Essentials
                </div>
                <ul className={`ul-defaults-none`}>
                    {!currentUser && (
                        <li>
                            <button
                                className={`btn round-pill ${style.fontSize}`}
                                onClick={() => this.updateDisplay("login")}
                            >
                                Login
                            </button>
                        </li>
                    )}
                    {!currentUser && (
                        <li>
                            <button
                                className={`btn round-pill ${style.fontSize}`}
                                onClick={() => this.updateDisplay("signUp")}
                            >
                                Create an Account
                            </button>
                        </li>
                    )}
                    {currentUser && (
                        <li className={style.user}>
                            Welcome {currentUser.firstName}!
                        </li>
                    )}
                    <li>
                        <button
                            disabled={cartCount === 0 || !currentUser}
                            className={`btn round-pill ${style.fontSize}`}
                            onClick={() => this.updateDisplay("cart")}
                        >
                            <i className="fas fa-shopping-cart"></i>-{" "}
                            {cartCount}
                        </button>
                    </li>
                </ul>
            </div>
        );
    }
}

export default Navbar;
