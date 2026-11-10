
import { useContext } from "react";
import { CartContext } from "../context/CartContext";
import { products } from "../data/product";
import ProductCard from "../components/productcard";
import "./product.css";

function Products() {
  const { addToCart } = useContext(CartContext);

  return (
    <div className="products-page">
      <h1>Our Products</h1>

      <div className="products-container">
        {products.map((product) => (
          <ProductCard
            key={product.id}
            id={product.id}
            name={product.name}
            price={product.price}
            category={product.category}
            image={product.image}
            rating={product.rating}
            reviews={product.reviews}
            onAdd={() => addToCart(product)}
          />
        ))}
      </div>
    </div>
  );
}

export default Products;


