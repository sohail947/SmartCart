
import "./Productdetails.css";
import { Link, useParams } from "react-router-dom";
import { useContext, useState, useEffect } from "react";
import { products } from "../data/product";
import { CartContext } from "../context/CartContext";

function ProductDetails() {
  const { id } = useParams();

  const { addToCart } = useContext(CartContext);

  const product = products.find(
    (item) => item.id === Number(id)
  );

  const [selectedRating, setSelectedRating] = useState(0);
  const [reviewText, setReviewText] = useState("");

  const [reviewsList, setReviewsList] = useState(() => {
    try {
      const savedReviews = localStorage.getItem(`reviews-${id}`);
      return savedReviews ? JSON.parse(savedReviews) : [];
    } catch {
      return [];
    }
  });

  // Save reviews in localStorage
  useEffect(() => {
    localStorage.setItem(
      `reviews-${id}`,
      JSON.stringify(reviewsList)
    );
  }, [reviewsList, id]);

  // Submit a new review
  function handleReviewSubmit() {
    if (selectedRating === 0) {
      alert("Please select a star rating!");
      return;
    }

    if (reviewText.trim() === "") {
      alert("Please write a review!");
      return;
    }

    const newReview = {
      rating: selectedRating,
      comment: reviewText.trim(),
      date: new Date().toLocaleDateString()
    };

    setReviewsList((previousReviews) => [
      ...previousReviews,
      newReview
    ]);

    setSelectedRating(0);
    setReviewText("");
  }

  // Delete a review
  function handleDeleteReview(index) {
    const updatedReviews = reviewsList.filter(
      (review, i) => i !== index
    );

    setReviewsList(updatedReviews);
  }

  // Check whether product exists
  if (!product) {
    return <h2>Product not found!</h2>;
  }

  // Calculate average rating
  const totalReviews = reviewsList.length;

  const averageRating =
    totalReviews === 0
      ? product.rating
      : (
          reviewsList.reduce(
            (total, review) => total + review.rating,
            0
          ) / totalReviews
        ).toFixed(1);

  return (
    <div className="product-details">

      {/* Product Information */}
      <div className="product-info">
        <img src={product.image} alt={product.name} />

        <div className="product-content">
          <h1>{product.name}</h1>

          <h2>Price: ₹{product.price}</h2>

          <p>Category: {product.category}</p>

          <p>{product.description}</p>

          <p className="product-rating">
            ⭐ {averageRating} (
            {totalReviews === 0
              ? product.reviews
              : totalReviews} reviews)
          </p>

          <button onClick={() => addToCart(product)}>
            Add to Cart
          </button>

          <br />

          <Link to="/products">
            ← Back to Products
          </Link>
        </div>
      </div>

      {/* Write Review Section */}
      <div className="review-section">
        <h2>Write a Review</h2>

        <p>Select Rating:</p>

        <div className="star-rating">
          {[1, 2, 3, 4, 5].map((star) => (
            <span
              key={star}
              onClick={() => setSelectedRating(star)}
              style={{
                color:
                  star <= selectedRating ? "orange" : "gray",
                cursor: "pointer",
                fontSize: "28px"
              }}
            >
              ★
            </span>
          ))}
        </div>

        <textarea
          placeholder="Write your review..."
          value={reviewText}
          onChange={(e) => setReviewText(e.target.value)}
        />

        <button onClick={handleReviewSubmit}>
          Submit Review
        </button>
      </div>

      {/* Customer Reviews Section */}
      <div className="customer-reviews">
        <h2>Customer Reviews</h2>

        {reviewsList.length === 0 ? (
          <p>No reviews yet. Be the first to review!</p>
        ) : (
          reviewsList.map((review, index) => (
            <div className="review-card" key={index}>
              <p className="review-stars">
                {"★".repeat(review.rating)}
                {"☆".repeat(5 - review.rating)}
              </p>

              <p>{review.comment}</p>

              <small>{review.date}</small>

              <button
                onClick={() => handleDeleteReview(index)}
              >
                Delete Review
              </button>
            </div>
          ))
        )}
      </div>

    </div>
  );
}

export default ProductDetails;


