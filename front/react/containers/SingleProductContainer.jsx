import React from "react";
import SingleProduct from "../components/SingleProduct";
import { connect } from "react-redux";
import { setCart, remCart, addUserCart } from "../../store/actions/getCarrito";
import axios from "axios";
import Reviews from "../components/Reviews";

class SingleProductContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      review: ""
    };
    this.addToCarrito = this.addToCarrito.bind(this);
    this.remFromCarrito = this.remFromCarrito.bind(this);
    this.handleReviewChange = this.handleReviewChange.bind(this);
    this.handleSubmitChange = this.handleSubmitChange.bind(this);
  }

  addToCarrito(product) {
    var arr = this.props.carrito.filter(prod => prod.id === product.id);
    if (!arr.length) {
      if (this.props.user.id > 0) {
        axios.post(`/api/carrito/${this.props.user.id}`, { product: product });
      }
      this.props.setCart(product);
      alert("Producto agregado al carrito");
    } else alert("Modifique la cantidad desde el carrito.");
  }

  remFromCarrito(product) {
    const newArr = this.props.carrito.filter(prod => prod.id !== product.id);
    this.props.remCart(newArr);
    sessionStorage.setItem("product", JSON.stringify(newArr));
  }
  handleReviewChange(e) {
    var input = e.target.value;
    this.setState({ review: input });
  }
  handleSubmitChange(e) {
    e.preventDefault();
    let review = this.state.review;
    let productId = this.props.product.id;
    if (this.state.review) {
      Axios.post("/api/reviews/addreview", { review, productId })
        .then(data => console.log("Esta la data:", data))
        .catch(err => console.log("Este es el error que recibe:", err));
    }
  }

  render() {
    return (
      <div>
        <SingleProduct
          product={this.props.product}
          setCart={this.addToCarrito}
          remCart={this.remFromCarrito}
          handleReviewChange={this.handleReviewChange}
          handleSubmitChange={this.handleSubmitChange}
        />
        <Reviews reviews={this.props.product.reviews} />
      </div>
    );
  }
}

const mapStateToProps = ({ products, carrito, user }) => ({
  product: products.product,
  carrito: carrito.products,
  user: user.user
});

const mapDispatchToProps = dispatch => ({
  setCart: product => dispatch(setCart(product)),
  remCart: product => dispatch(remCart(product))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SingleProductContainer);
