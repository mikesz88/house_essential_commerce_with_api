import React from "react";
import style from './Navbar.module.css';

class Navbar extends React.Component {
    render() {
        return (
            <div className={style.navbarContainer}>
                <div className="btn round-pill">House Essentials</div>
                <ul className={`ul-defaults-none`}> {/* These should be buttons with click events */}
                    <li className={`btn round-pill ${style.fontSize}`}>Login</li>
                    <li className={`btn round-pill ${style.fontSize}`}>Create an Account</li>
                    <li className={`btn round-pill ${style.fontSize}`}>Cart Icon</li> {/* This must include a state variable to show the number of items in the cart */}
                </ul>
            </div>
        )
    }
}

export default Navbar;