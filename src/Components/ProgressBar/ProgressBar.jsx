import React from "react";

class ProgressBar extends React.Component {
    constructor() {
        super();
        this.state = {
            completed: 0,
        };
    }

    progressStatus = () => {
        const { displayScreens } = this.props;
        const displayKeys = Object.keys(displayScreens);
        let percentage;
        for (const display of displayKeys) {
            const currentDisplay = displayScreens[display];

            if (display === "cart" && currentDisplay) {
                percentage = 25;
            } else if (display === "shipping" && currentDisplay) {
                percentage = 50;
            } else if (display === "payment" && currentDisplay) {
                percentage = 75;
            } else if (display === "confirmed" && currentDisplay) {
                percentage = 100;
            }
        }
        return percentage;
    };

    render() {
        const containerStyles = {
            height: 50,
            width: "100%",
            backgroundColor: "#e0e0de",
            borderRadius: 50,
            marginTop: "1rem",
            marginBottom: "1rem",
        };

        const fillerStyles = {
            height: "100%",
            width: `${this.progressStatus()}%`,
            backgroundColor: "black",
            borderRadius: "inherit",
            textAlign: "right",
        };

        const labelStyles = {
            height: 50,
            padding: 5,
            color: "white",
            fontWeight: "bold",
            display: "flex",
            justifyContent: "flex-end",
            alignItems: "center",
        };

        const flexSections = {
            display: "flex",
            justifyContent: "space-evenly",
            alignItems: "center",
            marginBottom: "1rem",
        };

        const backgroundColor = {
            backgroundColor: "transparent",
            paddingTop: "1rem",
            paddingBottom: "1rem",
            borderRadius: 8,
            marginBottom: "1rem",
        };

        return (
            <div style={{ marginTop: "1rem", marginBottom: "1rem" }}>
                <div style={backgroundColor}>
                    <div style={containerStyles}>
                        <div style={fillerStyles}>
                            <span style={labelStyles}>
                                {this.progressStatus()}%
                            </span>
                        </div>
                    </div>
                    <div style={flexSections}>
                        <span>Cart</span>
                        <span>Shipping</span>
                        <span>Payment</span>
                        <span>Confirmation</span>
                    </div>
                </div>
            </div>
        );
    }
}

export default ProgressBar;
