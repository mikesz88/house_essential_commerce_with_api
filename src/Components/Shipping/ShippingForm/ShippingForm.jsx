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
                phoneNumber: '',
                delivery: ''
            },
            error: {},
            generalError: false,
        }
    }

    generalError = () => {
        const errorObject = this.state.error;
        const errors = Object.keys(errorObject);
        this.setState({ generalError: false })
    
        if (!errors.length) { this.setState({ generalError: true }) };
    
        if (errors.length) {
          errors.forEach(errorKey => {
            if (errorObject[errorKey] !== undefined) { this.setState({ generalError: true }) };
          });
        };
      }

    handleChange = ({target: {name, value}}) => {
        if (name === 'phoneNumber' & value.length < 10) {
            this.setState(prevState => ({
                shippingInfo: {
                    ...prevState['shippingInfo'],
                    [name]: value,
                }
            }))
        } else if (name === 'phoneNumber') {
            let cleaned = ('' + value).replace(/\D/g, '');
            let match = cleaned.match(/^(\d{3})(\d{3})(\d{4})$/);
            if (match) {
                this.setState(prevState => ({
                    shippingInfo: {
                        ...prevState['shippingInfo'],
                        [name]: '(' + match[1] + ') ' + match[2] + '-' + match[3]
                    }
                }))
            } else {
                this.setState(prevState => ({
                    shippingInfo: {
                        ...prevState['shippingInfo'],
                        [name]: value,
                    }
                })) 
            }
        } else if (name === 'delivery') {
            // I am here
        } else {
            this.setState(prevState => ({
                shippingInfo: {
                    ...prevState['shippingInfo'],
                    [name]: value.toUpperCase(),
                }
            }))
        }
    }

    firstNameCheck = value => {
        const letterRegex = /^[A-Za-z]+((\s)?((\'|\-|\.)?([A-Za-z])+))*$/gi;
        const error = letterRegex.test(value);
        return !error ? 'Please enter a valid First Name' : undefined;
    }
    
    lastNameCheck = value => {
        const letterRegex = /^[A-Za-z]+((\s)?((\'|\-|\.)?([A-Za-z])+))*$/gi;
        const error = letterRegex.test(value);
        return !error ? 'Please enter a valid Last Name' : undefined;
    }

    zipCodeCheck = value => {
        const zipCodeRegex = /^d{5}$/;
        const error = zipCodeRegex.test(value);
        return !error ? 'Must be a 5 digit ZIP Code' : undefined;
    }

    phoneCheck = value => {
        const phoneNumberRegex = /^\(\d{3}\)\s\d{3}-\d{4}/;
        const error = phoneNumberRegex.test(value);
        return !error ? 'Please enter a valid Phone Number' : undefined;
    }

    otherFieldCheck = value => !value ? 'Required' : undefined;

    handleValidations = (name, value) => {
        let errorText;
        switch (name) {
            case 'firstName':
                errorText = this.firstNameCheck(value);
                this.setState(prevState => ({  error: { ...prevState.error, firstName: errorText }}))
                break;  
            case 'lastName':
                errorText = this.lastNameCheck(value);
                this.setState(prevState => ({  error: { ...prevState.error, lastName: errorText }}))
            break;
            case 'zipCode':
                errorText = this.zipCodeCheck(value);
                this.setState(prevState => ({  error: { ...prevState.error, zipCode: errorText }}))
            break;
            case 'phoneNumber':
                errorText = this.phoneCheck(value);
                this.setState(prevState => ({  error: { ...prevState.error, phoneNumber: errorText }}))
            break;
            default:
                errorText = this.otherFieldCheck(value);
                this.setState(prevState => ({  error: { ...prevState.error, [name]: errorText }}))
            break;
        }
    }

    handleBlur = ({target: {name, value}}) => this.handleValidations(name, value)

    render() {
        const {
            firstName,
            lastName,
            zipCode,
            phoneNumber,
            street,
            country,
            city,
            state,
            delivery,
          } = this.state.error;
        const { generalError } = this.state;

        const standardDelivery = <span> Standard Delivery in 5-10 business days - Free ($250 min.)</span>
        const expressDelivery = <span>Express Delivery in 3-5 business days - 5% of Subtotal</span>
        const deliveryDesc = <div className={style.deliveryDescription}>{standardDelivery}{expressDelivery}</div>

        return (
            <div className={style.formContainer}>
                <form className={style.flexForm} id='shippingForm' onSubmit={this.handleSubmit}>
                    <div className='header-sm'>
                        <span>Shipping Information</span>
                        {generalError 
                            ? <div 
                                id='generalError' 
                                className={`${style.error} ${style.generalError}`}>
                                We're sorry, but one or more fields are incomplete or incorrect. <u>Find error(s)</u>.
                            </div> 
                            : null}
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
                        {firstName ? (<div className={style.errorMessage}>{firstName}</div>) : null}
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
                        {lastName ? (<div className={style.errorMessage}>{lastName}</div>) : null}
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
                        {street ? (<div className={style.errorMessage}>{street}</div>) : null}
                    </div>
                    <div>
                        <input 
                            className={style.inputContainer} 
                            placeholder='City/Town' 
                            type="text" 
                            name='city' 
                            id='city' 
                            value={this.state.shippingInfo.city}
                            onChange={this.handleChange} 
                            onBlur={this.handleBlur}
                        />
                        {city ? (<div className={style.errorMessage}>{city}</div>) : null}
                    </div>
                    <div>
                        <input 
                            className={style.inputContainer} 
                            placeholder='State/Province' 
                            type="text" 
                            name='state' 
                            id='state' 
                            value={this.state.shippingInfo.state}
                            onChange={this.handleChange} 
                            onBlur={this.handleBlur}
                        />
                        {state ? (<div className={style.errorMessage}>{state}</div>) : null}
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
                            {countryList.map((country, index) => {
                                if (country === 'Country') {
                                    return <option key={index} disabled value=''>Country</option>
                                } else {
                                    return <option key={index} value={country}>{country}</option>
                                }
                            })}
                        </select>
                        {country ? (<div className={style.errorMessage}>{country}</div>) : null}
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
                            value={this.state.shippingInfo.zipCode}
                            onChange={this.handleChange} 
                            onBlur={this.handleBlur}
                        />
                        {zipCode ? (<div className={style.errorMessage}>{zipCode}</div>) : null}
                    </div>
                    <div>
                        <input 
                            className={style.inputContainer} 
                            placeholder='Phone Number' 
                            type="tel" 
                            maxLength='14'
                            name='phoneNumber' 
                            id='phoneNumber' 
                            value={this.state.shippingInfo.phoneNumber}
                            onChange={this.handleChange} 
                            onBlur={this.handleBlur}
                        />
                        {phoneNumber ? (<div className={style.errorMessage}>{phoneNumber}</div>) : null}
                    </div>
                    <div >
                        <div className={style.deliveryContainer}>
                            <div>
                                <input type="radio" name="delivery" id="delivery" value='standard' onBlur={this.handleBlur} onChange={this.handleChange}/>
                                <label>Standard</label>
                            </div>
                            <div>
                                <input type="radio" name="delivery" id="delivery" value='express' onBlur={this.handleBlur} onChange={this.handleChange}/>
                                <label>Express</label>
                            </div>
                        </div>
                        <div>
                            {deliveryDesc}
                            {delivery ? (<div className={style.errorMessage}>{delivery}</div>) : null}
                        </div>

                    </div>
                </form>
            </div>
        )
    }
}

export default ShippingForm;