import React from "react";
import Home from "../Home/home";
import Navbar from '../Navbar/Navbar';

class Commerce extends React.Component {
    render() {
        return (
            <>
                <div className="background">
                    <div className="container">
                        <Navbar />
                    </div>
                </div>
                <div className="container">
                    <Home />
                </div>
            </>
        )
    }
}

export default Commerce;