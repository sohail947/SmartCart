import "./Cart.css";
import { useContext } from "react";
import { CartContext } from "../context/CartContext";

function Cart() {
 const {
  cart,
  increaseQuantity,
  decreaseQuantity,
  removeFromCart
} = useContext(CartContext);

  const totalItems = cart.reduce((sum, item) => {
    return sum + item.quantity;
  }, 0);

  const totalPrice = cart.reduce((sum, item) => {
    return sum + item.price * item.quantity;
  }, 0);
  return (
    <div className="cart-section">
      <h1>My Shopping Cart</h1>

      {cart.length === 0 ? (
        <p>Your cart is empty!</p>
      ) : (
        cart.map((product) => (
         
<div className="cart-item" key={product.id}>
  <h3>{product.name}</h3>

  <p>Price: ₹{product.price}</p>

  <div className="quantity-controls">
    <button onClick={() => decreaseQuantity(product.id)}>
      -
    </button>

    <span>{product.quantity}</span>

    <button onClick={() => increaseQuantity(product.id)}>
      +
    </button>
  </div>

  <p>
    Subtotal: ₹{product.price * product.quantity}
  </p>

  <button
    className="remove-btn"
    onClick={() => removeFromCart(product.id)}
  >
    Remove
  </button>
</div>
        ))
      )}

      <div className="cart-total">
        <h3>Total Items: {totalItems}</h3>
        <h3>Total Price: ₹{totalPrice}</h3>
      </div>
    </div>
  );
}

export default Cart;
