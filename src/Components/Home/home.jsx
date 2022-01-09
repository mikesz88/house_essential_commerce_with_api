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
        userSearch: ''
    };

    updateCart = (state, func) => this.props.updateCart(state, func);
    deleteCartItem = name => this.props.deleteCartItem(name);


    updateUserSearch = state => {
        this.setState({
          userSearch: state,
        })
      }

      searchKeywords = (keywordString, searchItem) => {
        const keywordArray = keywordString.split(" ");
        return keywordArray.some(word => word.includes(searchItem.toLowerCase())) ? true : false;
    }

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
                this.setState(({
                    loading: false, 
                    error: true
                }))
            })
        }
        
    render() {
        const { data, loading, error, userSearch } = this.state;
        data.map(product => localStorage.setItem(product.name, product.img));
        return (
            <>
                <SearchBarAndCategory 
                    updateUserSearch={this.updateUserSearch}
                />
                    {this.state.data && 
                        <div style={{display: 'flex', flexWrap: 'wrap', justifyContent: 'center', paddingBottom: '5rem'}}>
                            {!loading ? this.state.data
                            .sort((a, b) => {
                                if(a.name < b.name) { return -1; }
                                if(a.name > b.name) { return 1; }
                                return 0;
                            })
                            .filter(product => 
                                this.searchKeywords(product.name.toLowerCase(), userSearch) 
                                || product.category.includes(userSearch))
                            .map((product, index) => (
                                <ProductItems
                                    key={index} 
                                    product={product}
                                    updateCart={this.updateCart}
                                    cart={this.props.cart}
                                    deleteCartItem={this.props.deleteCartItem}
                                    updateFooterDisplay={this.props.updateFooterDisplay}
                                />
                            )): <div className={style.loadingScreen}>Loading...</div>
                        }
                        </div>
                    }
                {error && <h3 style={{color: 'red'}} className={style.loadingScreen}>Error loading data</h3>}
            </>
        )
    }
}

export default Home;