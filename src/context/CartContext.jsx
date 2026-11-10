import { createContext, useState, useEffect } from "react";

export const CartContext = createContext();

export function CartProvider({ children }) {
  const [cart, setCart] = useState(() => {
  try {
    const savedCart = localStorage.getItem("smartcart-cart");

    return savedCart ? JSON.parse(savedCart) : [];
  } catch {
    return [];
  }
});
useEffect(() => {
  localStorage.setItem("smartcart-cart", JSON.stringify(cart));
}, [cart]);

  function addToCart(product) {
    const existingProduct = cart.find(
      (item) => item.id === product.id
    );

    if (existingProduct) {
      setCart(
        cart.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      );
    } else {
      setCart([...cart, { ...product, quantity: 1 }]);
    }
  }

   
function increaseQuantity(productId) {  
  setCart(
    cart.map((item) =>
      item.id === productId
        ? { ...item, quantity: item.quantity + 1 }
        : item 
    )      
  );        
}     

function decreaseQuantity(productId) {    
  setCart(
    cart   
      .map((item) =>
        item.id === productId
          ? { ...item, quantity: item.quantity - 1 }
          : item
      )
      .filter((item) => item.quantity > 0)
  );
}   

function removeFromCart(productId) {
  setCart(
    cart.filter((item) => item.id !== productId)
  );
}
  return (
    <CartContext.Provider
  value={{
    cart,
    addToCart,
    increaseQuantity,
    decreaseQuantity,
    removeFromCart
  }}
>
      {children}
    </CartContext.Provider>
  );
}
