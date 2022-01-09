import React from "react";
import style from './Footer.module.css';

const Footer = (props) => {
    const { updateHomeDisplay, updateCartDisplay, updateLoginDisplay, updateSignUpDisplay } = props;

    const goToCart = () => {
        updateHomeDisplay(false);
        updateCartDisplay(true);
    }

    const goToLogin = () => {
        updateHomeDisplay(false);
        updateLoginDisplay(true);
    }

    const goToSignUp = () => {
        updateHomeDisplay(false);
        updateSignUpDisplay(true);
    }

    return (
        <div className={`background ${style.fixedFooter}`}>
            <button onClick={goToLogin} className="btn round-pill">Login</button>
            <button onClick={goToCart} className="btn round-pill">Guest Check Out</button>
            <button onClick={goToSignUp} className="btn round-pill">Sign Up</button>
        </div>
    )
}

export default Footer;