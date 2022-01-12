import React from "react";
import Summary from "../Summary/Summary";
import ItemContainer from "./ItemContainer/ItemContainer";
import style from './Cart.module.css'

class Cart extends React.Component {

    render() {
        return (
            <div className={style.cartContainer}>
                <ItemContainer 
                    deleteCartItem={this.props.deleteCartItem}
                    cart={this.props.cart}
                    updateCartItem={this.props.updateCartItem}
                />
                <Summary cart={this.props.cart}/>
            </div>
        )
    }
}

export default Cart;