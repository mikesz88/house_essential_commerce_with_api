import React from "react";
import Home from "../Home/home";
import Navbar from '../Navbar/Navbar';
import { commerceVariables } from '../JavaScript/InitialStateVariables';

const INIT_CARD = commerceVariables;

class Commerce extends React.Component {
    constructor() {
        super()
        this.state = {
            commerce: INIT_CARD
        }
    }

    updateState = (name, state, func) => {
        this.setState(prevState => ({
            [name]: {
                ...prevState[name],
                ...state
            }
        }), func)
    }
    
    updateSubState = (name, sub, state, func) => {
        this.setState(prevState => ({
          [name]: {
            ...prevState[name],
            [sub]: {
                ...prevState[name][sub],
                ...state
            },
          },
        }), func);
      }
    
    deleteStateVariable = (commerce, name, sub) => {
        this.setState(prevState => {
          const state = { ...prevState };
          delete state[commerce][name][sub];
          return state;
        });
      };
    
    resetState = () => {
        this.setState({
            commerce: commerceVariables
        })
    }

    updateCart = (state, func) => this.updateSubState('commerce', 'cart', state, func);
    deleteCartItem = name => this.deleteStateVariable('commerce', 'cart', name);

    render() {
        const { commerce } = this.state;
        const { cart, confirmed, home, login, payment, shipping, signUp } = commerce.displayScreens;

        return (
            <>
                <div className="background">
                    <div className="container">
                        <Navbar 
                            cart={commerce.cart}
                        />
                    </div>
                </div>
                <div className="container">
                    {home && <Home
                        updateCart={this.updateCart}
                        cart={commerce.cart}
                        deleteCartItem={this.deleteCartItem}
                    />}
                </div>
            </>
        )
    }
}

export default Commerce;