import React from "react";
import style from "./Confirmed.module.css";
import ConfirmedPayment from "./ConfirmedPayment/ConfirmedPayment";
import ConfirmedSummary from "./ConfirmedSummary/ConfirmedSummary";

class Confirmed extends React.Component {
    render() {
        const { resetState, currentUser } = this.props;
        return (
            <div className={`${style.gridContainer}`}>
                <ConfirmedPayment resetState={resetState} />
                <ConfirmedSummary currentUser={currentUser} />
            </div>
        );
    }
}

export default Confirmed;
