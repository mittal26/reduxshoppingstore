import React, { Component } from "react";

class Cart extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <button
        // disabled={this.props.quantitycount <= 0 ? true : false}
        className="btn btn-primary btn-sm"
        onClick={() => {
          this.props.onAddtoCart();
        }}
      >
        AddToCart
      </button>
    );
  }
}

export default Cart;
