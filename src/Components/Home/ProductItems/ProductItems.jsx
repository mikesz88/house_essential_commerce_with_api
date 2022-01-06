import React from "react";
import style from './ProductItems.module.css';

class ProductItems extends React.Component {
    constructor() {
        super();
        this.state = {
            isShown: false
        }
    }

    filterDesc = string => {
        const filteredString = string.slice(3).slice(0,-4);
        return filteredString;
    }

    render() {
        const { name, price, desc } = this.props;
        const { isShown } = this.state;
        const descFiltered = this.filterDesc(desc);
        return(
            <div 
            className={style.productContainer}
            onMouseEnter={() => this.setState({ isShown: true })}
            onMouseLeave={() => this.setState({ isShown: false })}
            >
                <div className={style.imgContainer}>
                    <img src={localStorage.getItem(name)} alt={`${name}`} />
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
                        <button className="btn">Add to Cart</button>
                    </div>
                )}
            </div>
        )
    }
}

export default ProductItems;