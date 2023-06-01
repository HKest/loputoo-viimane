import React, { useContext, useState } from "react";
// import cartFromFile from "../../data/cart.json";
import { Link } from "react-router-dom";
import styles from "../../css/Cart.module.css";
import Button from "@mui/material/Button";

import Payment from "../../components/cart/Payment";
import { CartSumContext } from "../../Store/CartSumContext";

import { AuthContext } from "../../Store/AuthContext";

function Cart() {
  const [cart, setCart] = useState(
    JSON.parse(localStorage.getItem("cart")) || []
  );
  const { setCartSum } = useContext(CartSumContext);
  const { loggedIn, setLoggedIn } = useContext(AuthContext);

  const emptyCart = () => {
    setCart([]); // uuendab HTMLi
    localStorage.setItem("cart", JSON.stringify([])); // see uuendab localStorage-t
    setCartSum("0.00");
  };

  const decreaseQuantity = (index) => {
    if (cart[index].quantity === 1) {
      return;
    }
    cart[index].quantity = cart[index].quantity - 1;
    setCart(cart.slice());
    localStorage.setItem("cart", JSON.stringify(cart));
    setCartSum(totalSum());
  };

  const increaseQuantity = (index) => {
    cart[index].quantity = cart[index].quantity + 1;
    setCart(cart.slice());
    localStorage.setItem("cart", JSON.stringify(cart));
    setCartSum(totalSum());
  };

  const removeFromCart = (index) => {
    cart.splice(index, 1);
    setCart(cart.slice());
    localStorage.setItem("cart", JSON.stringify(cart));
    setCartSum(totalSum());
  };

  const totalSum = () => {
    let sum = 0;
    cart.forEach(
      (element) => (sum = sum + element.product.price * element.quantity)
    );
    return sum.toFixed(2);
  };

  return (
    <div>
      {cart.length > 0 && (
        <div className={styles["cart-top"]}>
          <Button variant="outlined" onClick={emptyCart}>
            Empty all
          </Button>
          <div>Products in cart: {cart.length}</div>
        </div>
      )}
      {/* {cart.length > 0 && } */}
      {cart.map((element, index) => (
        <div className={styles["product-wrapper"]}>
          <div className={styles.product} key={index}>
            <img className={styles.image} src={element.product.image} alt="" />
            <div className={styles.name}>{element.product.name}</div>
            <div className={styles.price}>
              {element.product.price.toFixed(2)}
            </div>
            <div className={styles.quantity}>
              <img
                src="/minus.png"
                className={element.quantity === 1 ? "disabled" : "button"}
                onClick={() => decreaseQuantity(index)}
                alt=""
              />
              <div>{element.quantity}</div>
              <img
                src="/plus.png"
                className={styles.button}
                onClick={() => increaseQuantity(index)}
                alt=""
              />
            </div>
            <div className={styles.total}>
              {(element.product.price * element.quantity).toFixed(2)}
            </div>
            <img
              src="/remove.png"
              className={styles.button}
              onClick={() => removeFromCart(index)}
              alt=""
            />
          </div>
          <div className={styles["mobile-view"]}>
            <img
              src="/minus.png"
              className={element.quantity === 1 ? "disabled" : "button"}
              onClick={() => decreaseQuantity(index)}
              alt=""
            />
            <div>{element.quantity}</div>
            <img
              src="/plus.png"
              className={styles.button}
              onClick={() => increaseQuantity(index)}
              alt=""
            />
          </div>
        </div>
      ))}
      {cart.length > 0 && (
        <div className={styles["cart-bottom"]}>
          <div className={styles.sum}>Total: {totalSum()} €</div>
          {loggedIn === false && (
            <div>Log in or register to make a payment</div>
          )}
          {/* {loggedIn === false && (
            <a href="login">
              <img
                src="/login.png"
                alt="login picture"
                className="w-20 h-10 ml-10 mr-10"
              />
            </a>
          )} */}

          <br />
          {loggedIn === true && <Payment sum={totalSum()} />}
        </div>
      )}

      {cart.length === 0 && (
        <div className="center">
          <br />
          Basket is empty. <Link to="/">Go shopping</Link>
        </div>
      )}
    </div>
  );
}

export default Cart;
