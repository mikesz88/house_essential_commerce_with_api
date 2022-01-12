import React from "react";
import style from "./CartSummary.module.css"

class CartSummary extends React.Component {
    constructor() {
        super();
        this.state = {}
    }

    render() {
        return (
            <div className={style.container}>
                Cart Summary
            </div>
        )
    }
}

export default CartSummary;