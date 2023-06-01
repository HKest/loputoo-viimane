import React from "react";
import Button from "@mui/material/Button";
import { useTranslation } from "react-i18next";

function SortButtons(props) {
  const { t } = useTranslation();

  const sortPriceAsc = () => {
    props.products.sort((a, b) => a.price - b.price);
    props.setProducts(props.products.slice());
  };

  const sortPriceDesc = () => {
    props.products.sort((a, b) => b.price - a.price);
    props.setProducts(props.products.slice());
  };

  return (
    <div>
      <Button onClick={sortPriceAsc}>{t("lowerPriceFirst")}</Button>
      <Button onClick={sortPriceDesc}>{t("higherPriceFirst")}</Button>
    </div>
  );
}

export default SortButtons;
