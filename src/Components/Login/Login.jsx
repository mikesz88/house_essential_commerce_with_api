import React from "react";
import style from './Login.module.css'

class Login extends React.Component {
    constructor() {
        super();
        this.state = {
            eye: true,
            checkUser: {
                email: '',
                password: '',
            },
            revealPassword: 'password',
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
        const { checkUser ,error } = this.state;
        let errorValue = {};
        let isError = false;
        Object.keys(checkUser).forEach(val => {
            let checkError = val;
            if (!checkUser[checkError].length || error[checkError]) {
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
        const { checkUser } = this.state;
        if (!errorCheck) {
            this.props.updateCurrentUser(checkUser)
            this.setState({
                checkUser: {
                    email: '',
                    password: '',
                }
            }, () => {
                this.setState({
                    generalError: false
                })
            });
            this.loginSuccessful();
        }
    }

    handleInputData = ({target: {name, value}}) => {
        if (name === 'confirmPassword') {
            this.setState(prevState => ({
                checkUser: {
                    ...prevState.checkUser,
                    [name]: value
                }
            }))
        } else {
            this.setState(prevState => ({
                checkUser: {
                    ...prevState.checkUser,
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

    verifyPassword = value => {
        const users = Object.keys(this.props.users);
        const passwordCheck = users.find(user => this.props.users[user]['password'] === value);
        if (passwordCheck) {
          this.setState({
            checkUser: this.props.users[passwordCheck]
          })
          return undefined;
        } else {
          return 'The password did not match. Try again';
        }
      }
    
      verifyEmail = value => {
        const users = Object.keys(this.props.users);
        const emailConfirm = users.find(user => this.props.users[user]['email'] === value);
        return emailConfirm ? undefined : 'There is no account with that email.';
      }
    
      handleValidations = (target, value) => {
        let errorText;
        switch (target) {
          case 'email':
            errorText = this.verifyEmail(value);
            this.setState(prevState => ({  error: { ...prevState.error, email: errorText }}))
            break;
          case 'password':
            errorText = this.verifyPassword(value);
            this.setState(prevState => ({  error: { ...prevState.error, password: errorText }}))
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
                    <h2 className="header-sm">Sign In</h2>
                    {generalError 
                    ? <div id='generalError' className={`${style.generalError}`}>We're sorry, but one or more fields are incomplete or incorrect. <u>Find error(s)</u>.</div> 
                    : null}
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
                            placeholder="Type your Password" 
                        />
                        {eye 
                            ? <button className={style.eyeButton} id="userPassword" type="button" onClick={this.eyeFlip}><i className="fas fa-eye-slash"></i></button> 
                            : <button className={style.eyeButton} id="userPassword" type="button" onClick={this.eyeFlip}><i className="fas fa-eye"></i></button>
                        }
                    </div>
                    {error.password && <div className={style.error}>{error.password}</div>}
                </div>
                <button className={`btn round-pill ${style.submitBtn}`} type="submit">Submit</button>
            </form>

        )
    }
}

export default Login;