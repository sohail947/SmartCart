import { Link } from "react-router-dom";
import "./productcard.css";

function ProductCard(props) {
  return (
    <div className="product-card">
      <img src={props.image} alt={props.name} />
      <h3>{props.name}</h3> 

      <p>Price: ₹{props.price}</p>

      <p>Category: {props.category} </p>

      <p className="product-rating">
  ⭐ {props.rating} ({props.reviews} reviews)
</p> 

      <button onClick={props.onAdd}>
        Add to Cart
      </button>

     <Link to={`/products/${props.id}`}>
  <button>View Details</button>
</Link> 
      
    </div>
  );
}

export default ProductCard;
