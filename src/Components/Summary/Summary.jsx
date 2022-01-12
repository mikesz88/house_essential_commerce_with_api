import React from "react";
import CartSummary from "../Cart/CartSummary/CartSummary";
import style from "./Summary.module.css"

const Summary = (props) => {

    return (
        <div className={style.container}>
            <CartSummary />
        </div>
    )
}

export default Summary;