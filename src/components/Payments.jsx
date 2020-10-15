import React, { Component } from "react";
import { Link } from "react-router-dom";
import formatCurrency from "./../utils/formatCurrency";
import { removeFromCart } from "../store/cart";
import { connect } from "react-redux";

class Payments extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  totalPrice = () => {
    const cartItems = this.props.cartItems;
    return formatCurrency(
      cartItems.reduce((a, c) => a + c.price * c.quantitycount, 0)
    );
  };

  render() {
    const { cartItems } = this.props;
    return (
      <div>
        {cartItems.length !== 0 ? (
          <div>
            <table className="table">
              <thead>
                <tr>
                  <th scope="col">#</th>
                  <th scope="col">Name</th>
                  <th scope="col">Price</th>
                  <th scope="col">Quantity Count</th>
                  <th scope="col">Remove</th>
                </tr>
              </thead>
              <tbody>
                {cartItems.map((item, i) => (
                  <tr key={item._id}>
                    <td>{i + 1}</td>
                    <td>{item.title}</td>
                    <td>{item.price}</td>
                    <td>{item.quantitycount}</td>
                    <td>
                      <button
                        onClick={() => this.props.removeFromCart(item)}
                        className="btn btn-danger btn-sm"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <Link
              to="checkout/finalpayment"
              className="btn btn-warning"
              style={{ float: "right", marginTop: "57px" }}
            >
              Checkout
            </Link>
            <div
              style={{
                float: "right",
                marginTop: "60px",
                marginRight: "39px",
              }}
            >
              <h4>Total Price: {this.totalPrice()}</h4>
            </div>
          </div>
        ) : (
          <div>
            <h3>No Items in Cart</h3>
          </div>
        )}
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  cartItems: state.entities.cart.cartItems,
});

const mapDispatchToProps = (dispatch) => ({
  removeFromCart: (item) => dispatch(removeFromCart(item)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Payments);
