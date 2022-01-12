import React from "react";
import style from './CartItem.module.css'

class CartItem extends React.Component {
    
    updateCartQuantity = (e,func) => {
        e.preventDefault();
        this.props.updateCartItem('commerce', 'cart', this.props.product.name, {quantity: +e.target.value}, func)
    }

    moneyDenomination = amount => amount.toLocaleString('en-US', {style: 'currency', currency: 'USD'});

    deleteFromCart = () => {
        this.props.deleteCartItem(this.props.product.name);
    }

    createElements = n => {
        let numberArray = [];
        for(let i = 0; i <= n; i++){
            numberArray.push(<option key={i} value={i}>{i}</option>);
        }
        return numberArray;
    }

    render() {
        const { name, price, inventory, quantity } = this.props.product;

        return (
            <div className={style.cartFlex}>
                <button className={style.deleteButton} onClick={this.deleteFromCart}><i className="fas fa-times-circle"></i></button>
                <div className={`${style.itemWidth}`}>
                    <div className={`${style.imgContainer}`}>
                        <img src={localStorage.getItem('Armoire')} alt="product" />
                    </div>
                    <div>
                        <span><strong>{name}</strong></span>
                    </div>
                </div>
                <div className={`${style.itemWidth}`}>{this.moneyDenomination(price)}</div>
                <div className={`${style.itemWidth}`}>
                    <select name="inventory" id="inventory" onChange={this.updateCartQuantity} value={quantity}>
                        {this.createElements(inventory)}
                    </select>
                </div>
                <div className={`${style.itemWidth}`}>{this.moneyDenomination(quantity * price)}</div>
            </div>
        )
    }
}

export default CartItem;