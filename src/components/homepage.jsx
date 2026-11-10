import { useState, useContext } from 'react';
import { CartContext } from '../context/CartContext'; 
import './homepage.css';
import ProductCard from './productcard.jsx';
import { products } from "../data/product"; 


function Home() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [sortOrder, setSortOrder] = useState("default");
  const [selectedProduct, setSelectedProduct] = useState(null); 
  const {
  cart,
  addToCart,
  increaseQuantity,
  decreaseQuantity,
  removeFromCart
} = useContext(CartContext);





 const totalItems = cart.reduce((sum, product) => {
  return sum + product.quantity;
}, 0);




const totalPrice = cart.reduce((sum, product) => {
  return sum + product.price * product.quantity;
}, 0);  





const filteredProducts = products.filter((product) => {
  const matchesSearch = product.name
    .toLowerCase()
    .includes(searchTerm.toLowerCase());

  const matchesCategory =
    selectedCategory === "All" ||
    product.category === selectedCategory;

  return matchesSearch && matchesCategory;
});

const sortedProducts = [...filteredProducts];

if (sortOrder === "low-high") {
  sortedProducts.sort((a, b) => a.price - b.price);
} else if (sortOrder === "high-low") {
  sortedProducts.sort((a, b) => b.price - a.price);
}


function viewProductDetails(product) {
  setSelectedProduct(product);
}

return (
  <div className="home">

    {/* Home Section */}
    <h1>Welcome to SmartCart</h1>
    <p>Discover amazing products at the best prices.</p>
    <button>Shop Now</button>

    {/* Products Section */}
    <h2>Our Products</h2>

    <input className="search-input"
  type="text"
  placeholder="Search products..."
  value={searchTerm}
  onChange={(e) => setSearchTerm(e.target.value)}
/>

<select
  value={sortOrder}
  onChange={(e) => setSortOrder(e.target.value)}
  className="category-select"
>
  <option value="default">Sort By: Default</option>
  <option value="low-high">Price: Low to High</option>
  <option value="high-low">Price: High to Low</option>
</select>

<select className="category-select"
  value={selectedCategory}
  onChange={(e) => setSelectedCategory(e.target.value)}
>
  <option value="All">All Categories</option>
  <option value="Electronics">Electronics</option>
  <option value="Fashion">Fashion</option>
  <option value="Accessories">Accessories</option>
</select>

    <div className="products-container">

      {sortedProducts.map((product) => (
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
  onViewDetails={() => viewProductDetails(product)}
/>
))}
    </div>

    {selectedProduct && (
  <div className="product-details">
    <h2>Product Details</h2>

    <h3>{selectedProduct.name}</h3>

    <p>Price: ₹{selectedProduct.price}</p>

    <p>Category: {selectedProduct.category}</p>

    <p>Product ID: {selectedProduct.id}</p>

    <button
      onClick={() =>
        addToCart({
          ...selectedProduct,
          quantity: 1
        })
      }
    >
      Add to Cart
    </button>

    <button onClick={() => setSelectedProduct(null)}>
      Back to Shopping
    </button>
  </div>
)}

    {/* Shopping Cart Section */}
    <div className="cart-section">

      <h2>Your Shopping Cart</h2>

      {cart.length === 0 ? (
        <h3 className="empty-cart">Your cart is empty</h3>
      ) : (
        cart.map((product, index) => (
          <div className="cart-item" key={index}>


            <h4>{product.name}</h4>

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

  </div>
);

}

export default Home;