import React from "react";
import Button from "@mui/material/Button";

function FilterButtons({ dbProducts, setProducts, categories }) {
  const filterProductsByCategory = (categoryClicked) => {
    const filteredProducts = dbProducts.filter(
      (product) => product.category === categoryClicked
    );

    setProducts(filteredProducts);
  };

  return (
    <div>
      {categories.map((element) => (
        <Button onClick={() => filterProductsByCategory(element.name)}>
          {element.name}
        </Button>
      ))}
    </div>
  );
}

export default FilterButtons;
