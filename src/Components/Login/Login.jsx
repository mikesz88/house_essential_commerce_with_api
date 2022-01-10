import React from "react";
import style from './Login.module.css'

const NEW_USER = {
    password: '',
    confirmPassword: '',
    firstName: '',
    lastName: '',
    email: '',
}

class Login extends React.Component {
    constructor() {
        super();
        this.state = {
            eye: true,
            revealPassword: 'password',
            newUser: NEW_USER,
            error: {},
            generalError: false
        }
    }

    generalError = () => {
        const errorObject = this.state.error;
        const errors = Object.keys(errorObject);
        this.setState({ generalError: false })

        if (!errors.length) { this.setState({ generalError: true })};

        if (errors.length) {
            errors.forEach(errorKey => {
                if (errorObject[errorKey] !== undefined) { this.setState({ generalError: true })};
            });
        };
    }

    checkErrorBeforeSave = () => {
        const { newUser, error } = this.state;
        let errorValue = {};
        let isError = false;
        Object.keys(newUser).forEach(val => {
            let checkError = val;
            if (!newUser[checkError].length || error[checkError]) {
              error[checkError] 
              ? errorValue = { ...errorValue, [checkError]: error[checkError]}
              : errorValue = { ...errorValue, [checkError]: 'Required'};
              isError = true;
            }
        })
        this.setState({ error: errorValue }, this.generalError);
        return isError;
    }

    loginSuccessful = () => {
        this.props.updateLoginDisplay(false);
        const { cart } = this.props
        const cartCount = Object.keys(cart).length !== 0 ? Object.keys(cart).length : 0; 
        if (cartCount) {
            this.props.updateCartDisplay(true);
        } else {
            this.props.updateHomeDisplay(true)
        }
    }

    handleSubmit = e => {
        e.preventDefault();
        const errorCheck = this.checkErrorBeforeSave();
        const { newUser } = this.state;
        if (!errorCheck) {
            this.props.updateUserList({[newUser.firstName]: newUser})
            this.props.updateCurrentUser(newUser)
            this.setState({
                newUser: NEW_USER,
            }, () => {
                this.setState({
                    generalError: false
                })
            });
            this.loginSuccessful();
        }
      }

    handleInputData = ({target: {name, value}}) => {
        if (name === 'password' || name === 'confirmPassword') {
            this.setState(prevState => ({
                newUser: {
                    ...prevState.newUser,
                    [name]: value
                }
            }))
        } else {
            this.setState(prevState => ({
                newUser: {
                    ...prevState.newUser,
                    [name]: value.toLowerCase()
                }
            }))
        } 
    }

    eyeFlip = () => { 
        if (!this.state.eye) {
            this.setState({
              eye: true,
              revealPassword: 'password',
            });
          } else {
            this.setState({
              eye: false,
              revealPassword: 'text',
            });
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

    passwordMatchCheck = value => 
    !(value === this.state.newUser.password) 
    ? 'This does not match your password above.' 
    : undefined;

    passwordValidationCheck = value => {
        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[-#$^+_!*()@%&]).{8,20}$/gm;
        const error = passwordRegex.test(value);
        return !error ? 'This does not fit the requirement. Try again!' : undefined;
    }

    emailAlreadyTaken = value => {
        const users = Object.keys(this.props.users);
        const alreadyTaken = users.some(user => this.props.users[user]['email'] === value);
        return alreadyTaken ? 'This email is already used. Try another one.' : undefined;
    }
    
    emailCheck = value => {
        const emailRegex = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/; 
        const error = emailRegex.test(value);
        return !error ? 'This is not a proper email. Try again!' : this.emailAlreadyTaken(value);
    }
    
    handleValidations = (target, value) => {
        let errorText;
        switch (target) {
            case 'email':
            errorText = this.emailCheck(value);
            this.setState(prevState => ({  error: { ...prevState.error, email: errorText }}))
            break;
            case 'password':
            errorText = this.passwordValidationCheck(value);
            this.setState(prevState => ({  error: { ...prevState.error, password: errorText }}))
            break;
            case 'confirmPassword':
            errorText = this.passwordMatchCheck(value);
            this.setState(prevState => ({  error: { ...prevState.error, confirmPassword: errorText }}))
            break;    
            case 'firstName':
            errorText = this.firstNameCheck(value);
            this.setState(prevState => ({  error: { ...prevState.error, firstName: errorText }}))
            break;      
            case 'lastName':
            errorText = this.lastNameCheck(value);
            this.setState(prevState => ({  error: { ...prevState.error, lastName: errorText }}))
            break;
            default:
            break;
        }
    }

    handleBlur = ({target: {name, value}}) => this.handleValidations(name, value);

    render() {
    const { generalError, error, eye, revealPassword} = this.state;

        return (
            <form onSubmit={this.handleSubmit} className={style.flexContainer}>
                <div className={style.loginHeader}>
                    <h2 className="header-sm">Create an Account</h2>
                    {generalError 
                    ? <div id='generalError' className={`${style.generalError}`}>We're sorry, but one or more fields are incomplete or incorrect. <u>Find error(s)</u>.</div> 
                    : null}
                </div>
                <div className={`${style.inputContainer}`}>
                    <input 
                        type="text" 
                        name="firstName" 
                        id="firstName" 
                        autoComplete="none" 
                        /* value */
                        onChange={this.handleInputData} 
                        onBlur={this.handleBlur}
                        placeholder="First Name"
                    />
                    {error.firstName && <div className={style.error}>{error.firstName}</div>}
                </div>
                <div className={`${style.inputContainer}`}>
                    <input
                        type="text" 
                        name="lastName" 
                        id="lastName" 
                        autoComplete="none" 
                        /* value */ 
                        onChange={this.handleInputData} 
                        onBlur={this.handleBlur}
                        placeholder="Last Name"
                    />
                    {error.lastName && <div className={style.error}>{error.lastName}</div>}
                </div>
                <div className={`${style.inputContainer}`}>
                    <input 
                        type="email" 
                        name="email" 
                        id="email" 
                        autoComplete="none" 
                        /* value */ 
                        onChange={this.handleInputData} 
                        onBlur={this.handleBlur}
                        placeholder="E-Mail Address"
                    />
                    {error.email && <div className={style.error}>{error.email}</div>}
                </div>
                <div className={`${style.inputContainer}`}>
                    <div className={style.passwordWithEye}>
                        <input
                            className={style.deleteBorder} 
                            type={revealPassword}
                            name="password" 
                            id="revealPassword" 
                            autoComplete="off" 
                            /*value*/ 
                            onChange={this.handleInputData} 
                            onBlur={this.handleBlur}
                            placeholder="Create Password" 
                        />
                        {eye 
                            ? <button className={style.eyeButton} id="userPassword" type="button" onClick={this.eyeFlip}><i className="fas fa-eye-slash"></i></button> 
                            : <button className={style.eyeButton} id="userPassword" type="button" onClick={this.eyeFlip}><i className="fas fa-eye"></i></button>
                        }
                    </div>
                    {error.password && <div className={style.error}>{error.password}</div>}
                    <p className={`${style.finePrint}`}>
            Password must be 8-20 characters, including: at least one capital
            letter, at least one small letter, one number and one special
            character - ! @ # $ % ^ & * ( ) _ +
                    </p>
                </div>
                <div className={`${style.inputContainer}`}>
                    <input 
                        type="password" 
                        name="confirmPassword" 
                        id="confirmPassword" 
                        autoComplete="off" 
                        /*value*/ 
                        onChange={this.handleInputData} 
                        onBlur={this.handleBlur}
                        placeholder="Confirm Password" 
                    />
                    {error.confirmPassword && <div className={style.error}>{error.confirmPassword}</div>}
                </div>
                <button className={`btn round-pill ${style.submitBtn}`} type="submit">Submit</button>
            </form>
        )
    }
}

export default Login;