import React from "react";

class CartSummary extends React.Component {
    render() {
        const shipping =
            this.props.shipping["delivery"] === "express"
                ? this.props.totalPrice() * 0.05
                : this.props.totalPrice() >= 250
                ? 0
                : 50;

        return (
            <table style={{ margin: "0 auto" }}>
                <tbody>
                    <tr>
                        <th>Cart Subtotal: </th>
                        <td>
                            <span>
                                {this.props.moneyDenomination(
                                    this.props.totalPrice()
                                )}
                            </span>
                        </td>
                    </tr>
                    <tr>
                        <th>Taxes (5.5%): </th>
                        <td>
                            <span>
                                {this.props.moneyDenomination(
                                    +(this.props.totalPrice() * 0.055).toFixed(
                                        2
                                    )
                                )}
                            </span>
                        </td>
                    </tr>
                    <tr>
                        <th>Shipping: </th>
                        <td>
                            <span>
                                {this.props.moneyDenomination(shipping)}
                            </span>
                        </td>
                    </tr>
                    <tr>
                        <th>Total: </th>
                        <td>
                            <span>
                                {this.props.moneyDenomination(
                                    +(
                                        this.props.totalPrice() * 1.055 +
                                        shipping
                                    ).toFixed(2)
                                )}
                            </span>
                        </td>
                    </tr>
                </tbody>
            </table>
        );
    }
}

export default CartSummary;
