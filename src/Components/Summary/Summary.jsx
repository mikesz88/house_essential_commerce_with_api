import React from "react";
import CartSummary from "./CartSummary/CartSummary";
import style from "./Summary.module.css"

const Summary = (props) => {

    return (
        <div className={style.container}>
            <CartSummary cart={props.cart}/>
        </div>
    )
}

export default Summary;