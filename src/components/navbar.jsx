import { useContext } from "react";
import { CartContext } from "../context/CartContext";
import { Link } from "react-router-dom";
import "./Navbar.css";

function Navbar() {

    const { cart } = useContext(CartContext);

const totalItems = cart.reduce((sum, item) => {
  return sum + item.quantity;
}, 0);
  return (
    <nav className="navbar">
      <h2>SmartCart</h2>

      <div className="nav-links">
        <Link to="/">Home</Link>
        <Link to="/products">Products</Link>
        <Link to="/cart">
  Cart ({totalItems})
</Link>
      </div> 
    </nav>
  );
}

export default Navbar;
