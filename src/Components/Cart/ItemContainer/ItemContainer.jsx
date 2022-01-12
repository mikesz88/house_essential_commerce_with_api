import React from "react";
import CartItem from "./CartItem/CartItem";
import style from "./ItemContainer.module.css"


const ItemContainer = (props) => {

    return (
        <div className={style.container}>
            <div className={`${style.cartFlex}`}>
               <h3 className={`header-sm ${style.product}`}>Product</h3> 
               <h3 className={`header-sm ${style.other}`}>Price</h3> 
               <h3 className={`header-sm ${style.other}`}>Quantity</h3> 
               <h3 className={`header-sm ${style.other}`}>Total Price</h3> 
            </div>
            <hr />
            {Object.keys(props.cart).map((productName, index) => {
                const product = props.cart[productName];
                return (
                    <CartItem
                        key={index} 
                        product={product}
                        deleteCartItem={props.deleteCartItem}
                        updateCartItem={props.updateCartItem}
                    />
                )
            })

            }

        </div>    
    )
}

export default ItemContainer;