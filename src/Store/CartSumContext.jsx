import React, { createContext, useState } from "react";

// Create a new context
const CartSumContext = createContext();

// Create a provider component
const CartSumContextProvider = ({ children }) => {
  const [cartSum, setCartSum] = useState(calculateSum());

  function calculateSum() {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];

    let sum = 0;
    cart.forEach(
      (element) => (sum = sum + element.product.price * element.quantity)
    );
    return sum.toFixed(2);
  }

  return (
    <CartSumContext.Provider value={{ cartSum, setCartSum }}>
      {children}
    </CartSumContext.Provider>
  );
};

export { CartSumContext, CartSumContextProvider };
