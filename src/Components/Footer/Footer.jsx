import React from "react";
import style from './Footer.module.css';

const Footer = (props) => {
    const { updateHomeDisplay, updateCartDisplay, updateLoginDisplay, updateSignUpDisplay, currentUser } = props;

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
            {!currentUser &&  <button onClick={goToLogin} className="btn round-pill">Login</button>}
            {!currentUser &&  <button onClick={goToCart} className="btn round-pill">Guest Check Out</button>}
            {!currentUser &&  <button onClick={goToSignUp} className="btn round-pill">Sign Up</button>}
            {currentUser &&  <button onClick={goToCart} className="btn round-pill">Go To Cart</button>}           
        </div>
    )
}

export default Footer;