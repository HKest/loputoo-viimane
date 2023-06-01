import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Button from "@mui/material/Button";
import { ToastContainer, toast } from "react-toastify";
import styles from "../../src/css/HomePage.module.css";
import config from "../../src/data/config.json";
import { Spinner } from "react-bootstrap";
import SortButtons from "../../src/Store/SortButtons";
import FilterButtons from "../../src/Store/FilterButtons";
import { CartSumContext } from "../../src/Store/CartSumContext";
import "react-toastify/dist/ReactToastify.css";
import { useTranslation } from "react-i18next";

const ProductsPage = () => {
  const { t } = useTranslation();
  const [products, setProducts] = useState([]);
  const [dbProducts, setDbProducts] = useState([]);
  const [isLoading, setLoading] = useState(true);
  const [categories, setCategories] = useState([]);
  const { setCartSum } = useContext(CartSumContext);
  const [visibleProducts, setVisibleProducts] = useState(6);

  useEffect(() => {
    fetch(config.productsDbUrl)
      .then((res) => res.json())
      .then((json) => {
        setProducts(json || []);
        setDbProducts(json || []);
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    fetch(config.categoriesDbUrl)
      .then((res) => res.json())
      .then((json) => {
        setCategories(json || []);
      });
  }, []);

  const addToCart = (clickedProduct) => {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];

    const index = cart.findIndex(
      (element) => element.product.id === clickedProduct.id
    );
    if (index >= 0) {
      cart[index].quantity = cart[index].quantity + 1;
    } else {
      cart.push({ product: clickedProduct, quantity: 1 });
    }
    let sum = 0;
    cart.forEach(
      (element) => (sum = sum + element.product.price * element.quantity)
    );
    setCartSum(sum.toFixed(2));
    localStorage.setItem("cart", JSON.stringify(cart));
    toast.success(t("successfullyAddedToCart"));
  };

  const loadMoreProducts = () => {
    setVisibleProducts(visibleProducts + 6);
  };

  if (isLoading) {
    return (
      <div className="center">
        <br />
        <br />
        <Spinner />
      </div>
    );
  }

  return (
    <div className="text-center bg-gray-50 rounded-lg flex flex-col flex-1 gap-3 py-5 px-5">
      <SortButtons
        products={products}
        setProducts={setProducts}
        higherPriceButtonStyle={styles.orangeText}
        lowerPriceButtonStyle={styles.orangeText}
      />

      <FilterButtons
        dbProducts={dbProducts}
        setProducts={setProducts}
        categories={categories}
      />
      <div
        className={`grid grid-cols-3 gap-10 py-25 px-10 ${styles.productGrid}`}
      >
        {products.slice(0, visibleProducts).map((product) => (
          <div className={styles.product} key={product.id}>
            <Link to={"/product/" + product.id}>
              <img src={product.image} alt="" className={styles.productImage} />
              <div>{product.name}</div>
              <div>${product.price.toFixed(2)}</div>
            </Link>
            <Button
              variant="contained"
              onClick={() => addToCart(product)}
              className={styles.buyButton}
            >
              {t("buyProduct")}
            </Button>
          </div>
        ))}
      </div>
      {visibleProducts < products.length && (
        <div className="text-center  bg-gray-50 rounded-lg flex flex-col flex-1 gap-3 py-10 px-5">
          <Button
            variant="contained"
            onClick={loadMoreProducts}
            className={`orangeButton ${styles.showMoreButton}`}
          >
            {t("showMore")}
          </Button>
        </div>
      )}
      <ToastContainer
        className={styles.toastIcon}
        position="bottom-right"
        theme="dark"
      />
    </div>
  );
};

export default ProductsPage;
