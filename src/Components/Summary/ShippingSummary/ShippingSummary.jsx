import React from "react";

class ShippingSummary extends React.Component {
    render() {
        const { shippingInfo } = this.props.shipping;

        return (
            <div>
                <hr />
                <h3 className={`header-sm`}>Shipping Address</h3>
                <p>
                    {shippingInfo.firstName} {shippingInfo.lastName}
                </p>
                <p>{shippingInfo.address}</p>
                <p style={{ display: "flex", flexWrap: "wrap" }}>
                    <span>
                        {shippingInfo.city}, {shippingInfo.state}
                    </span>
                    <span>{shippingInfo.country}</span>
                    <span>{shippingInfo.zipCode}</span>
                </p>
                <p>Phone: {shippingInfo.phoneNumber}</p>
                <hr />
                <h3 className={`header-sm`}>Shipping Method</h3>
                {shippingInfo.delivery === "standard" ? (
                    <p>Delivery in 5-10 Business Days</p>
                ) : (
                    <p>Delivery in 3-5 Business Days</p>
                )}
            </div>
        );
    }
}

export default ShippingSummary;
