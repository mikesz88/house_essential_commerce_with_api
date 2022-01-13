import React from "react";
import style from './ProductItems.module.css';

class ProductItems extends React.Component {
    constructor() {
        super();
        this.state = {
            isShown: false
        }
    }

    updateCart = (state, func) => {
        this.props.updateCart(state, func);
        this.props.updateCartItem('commerce', 'cart', this.props.product.name, {quantity: 1}, func)
        this.props.updateFooterDisplay(true)

    };

    updateCartQuantity = (e,func) => {
        e.preventDefault();
        this.props.updateCartItem('commerce', 'cart', this.props.product.name, {quantity: +e.target.value}, func)
    }

    createElements = n => {
        let numberArray = [];
        for(let i = 0; i <= n; i++){
            numberArray.push(<option key={i} value={i}>{i}</option>);
        }
        return numberArray;
    }

    deleteCartItem = name => this.props.deleteCartItem(name);

    filterDesc = string => {
        const filteredString = string.slice(3).slice(0,-4);
        return filteredString;
    }

    render() {
        const { product, cart, img } = this.props;
        const { name, price, desc, inventory, } = product;
        const { isShown } = this.state;
        const descFiltered = this.filterDesc(desc);
        return(
            <div 
            className={style.productContainer}
            onMouseEnter={() => this.setState({ isShown: true })}
            onMouseLeave={() => this.setState({ isShown: false })}
            >
                <div className={style.imgContainer}>
                    <img src={img} alt={`${name}`} />
                </div>
                <div className={style.titleAndPrice}>
                    <span>{name}</span>
                    <span className={style.greenFont}>${price}</span>
                </div>
                {isShown && (
                    <div className={style.hoverComponent}>
                        <div className={style.detailedTitleAndPrice}>
                            <span><strong>{name}</strong></span>
                            <span className={style.greenFont}>
                                <strong>${price}</strong>
                            </span>
                        </div>
                        <div>{descFiltered}</div>
                            {!Object.keys(cart).includes(name)
                            ? <button className="btn" onClick={() => this.updateCart({[name]: product})}>Add to Cart</button>
                            : (
                            <>
                                <button className="btn" onClick={() => this.deleteCartItem(name)}>Remove from Cart</button>
                                <div>
                                    <span>Quantity</span>
                                    <select name="inventory" id="inventory" onChange={this.updateCartQuantity} value={cart[name]['quantity']}>
                                        {this.createElements(inventory)}
                                    </select>
                                </div>
                            </>
                            )}
                        
                    </div>
                )}
            </div>
        )
    }
}

export default ProductItems;