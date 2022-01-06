import React from "react";
import style from './home.module.css'
import ProductList from "../JavaScript/CommerceService";
import SearchBarAndCategory from "./SearchBarAndCategory/SearchBarAndCategory";
import ProductItems from "./ProductItems/ProductItems";

const products = new ProductList();
class Home extends React.Component {
    state = {
        data: [],
        loading: false,
        error: false,
    };

    async componentDidMount() {
        this.setState({ loading: true});
        products.productListings()
            .then(res => {
                if (res) {
                    this.setState({
                        data: res.data,
                        loading: false,
                    })
                } else {
                    this.setState({ loading: false })
                }
            }, error => {
                console.log(error);
                this.setState(({
                    loading: false, 
                    error: true
                }))
            })
        }
        
        
    render() {
        this.state.data.map(product => localStorage.setItem(product.name, product.img));
        return (
            <div>
                <SearchBarAndCategory />
                    {this.state.data && 
                        <div style={{display: 'flex', flexWrap: 'wrap'}}>
                            {this.state.data.map((product, index) => (
                                <ProductItems
                                    key={index} 
                                    name={product.name}
                                    price={product.price}
                                    desc={product.desc}
                                />
                            ))}
                        </div>
                    }
                {/* <div style={{display: 'flex'}}>
                <ProductItems />
                <ProductItems />
                <ProductItems />
                </div> */}
            </div>
        )
    }
}

export default Home;