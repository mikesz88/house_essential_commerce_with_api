import React, { Component } from 'react';
import style from './ShippingForm.module.css';
import { countryList } from '../../JavaScript/InitialStateVariables';

class ShippingForm extends Component {
    constructor() {
        super();
        this.state = {
            shippingInfo: {
                firstName: '',
                lastName: '',
                street: '',
                city: '',
                state: '',
                country: '',
                zipCode: '',
            },
            error: {},
            generalError: false,
        }
    }

    handleChange = ({target: {name, value}}) => {
        this.setState(prevState => ({
            shippingInfo: {
                ...prevState['shippingInfo'],
                [name]: value,
            }
        }))
    }

    handleValidations = (name, value) => {
        const { shippingInfo } = this.state;
        switch (name) {
            case 'firstName':
                
            break;
            case 'lastName':
            
                break;
            case 'street':
        
            break;
            case 'city':
    
            break;
            case 'state':

            break;
            case 'country':

            break;
            case 'zipCode':

            break;
            default:
                break;
        }
    }

    handleBlur = ({target: {name, value}}) => this.handleValidations(name, value)

    render() {
        return (
            <div className={style.formContainer}>
                <form className={style.flexForm} id='shippingForm' onSubmit={this.handleSubmit}>
                    <div className='header-sm'>
                        <span>Shipping Information</span>
                    </div>
                    <div>
                        <input 
                            className={style.inputContainer} 
                            placeholder='First Name' 
                            type="text" 
                            name='firstName' 
                            id='firstName'
                            value={this.state.shippingInfo.firstName}
                            onChange={this.handleChange} 
                            onBlur={this.handleBlur}
                        />
                    </div>
                    <div>
                        <input 
                            className={style.inputContainer} 
                            placeholder='Last Name' 
                            type="text" 
                            name='lastName' 
                            id='lastName' 
                            value={this.state.shippingInfo.lastName}
                            onChange={this.handleChange} 
                            onBlur={this.handleBlur}
                        />
                    </div>
                    <div>
                        <input 
                            className={style.inputContainer} 
                            placeholder='Street Address' 
                            type="text" 
                            name='street' 
                            id='street'
                            value={this.state.shippingInfo.street}
                            onChange={this.handleChange} 
                            onBlur={this.handleBlur}
                        />
                    </div>
                    <div>
                        <input 
                            className={style.inputContainer} 
                            placeholder='City' 
                            type="text" 
                            name='city' 
                            id='city' 
                            value={this.state.shippingInfo.city}
                            onChange={this.handleChange} 
                            onBlur={this.handleBlur}
                        />
                    </div>
                    <div>
                        <input 
                            className={style.inputContainer} 
                            placeholder='State' 
                            type="text" 
                            name='state' 
                            id='state' 
                            value={this.state.shippingInfo.state}
                            onChange={this.handleChange} 
                            onBlur={this.handleBlur}
                        />
                    </div>
                    <div>
                        <select 
                            className={style.inputContainer} 
                            name="country" 
                            id="country" 
                            value={this.state.shippingInfo.country}
                            onChange={this.handleChange} 
                            onBlur={this.handleBlur}
                        >
                            {countryList.map(country => {
                                if (country === 'Country') {
                                    return <option disabled value=''>Country</option>
                                } else {
                                    return <option value={country}>{country}</option>
                                }
                            })}
                        </select>

                    </div>
                    <div>
                        <input 
                            className={style.inputContainer} 
                            placeholder='Zip Code' 
                            type="number" 
                            min='1000' 
                            max='9999' 
                            name='zipCode' 
                            id='zipCode' 
                            onChange={this.handleChange} 
                            onBlur={this.handleBlur}
                        />
                    </div>
                </form>
            </div>
        )
    }
}

export default ShippingForm;