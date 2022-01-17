import React from "react";
import style from "./ConfirmedPayment.module.css";

const ConfirmedPayment = (props) => {
    const resetState = () => props.resetState();

    return (
        <div className={`${style.confirmContainer}`}>
            <h3 className={`header-sm`}>Confirmation</h3>
            <hr />
            <div className={style.flexContainer}>
                <div className={style.checkContainer}>
                    <i className="far fa-check-circle"></i>
                </div>
                <p className={`header-md`}>Congratulations</p>
                <p className={`header-md`}>Your order is accepted.</p>
                <p>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                    do eiusmod tempor incididunt ut labore et dolore magna
                    aliqua. Sit amet est placerat in egestas erat.
                </p>
                <button
                    className={`btn ${style.trackOrderButton}`}
                    onClick={resetState}
                >
                    Track Order
                </button>
                <button
                    className={`btn ${style.backToHomeButton}`}
                    onClick={resetState}
                >
                    Back To Home
                </button>
            </div>
        </div>
    );
};

export default ConfirmedPayment;
