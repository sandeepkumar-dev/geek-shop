import { Typography } from "geeky-ui";
import React from "react";
import Filters from "../../components/Filters/Filters";
import MobieViewFilters from "../../components/Filters/MobieViewFilters";
import "./product-page.scss";
import ProductCard from "../../components/ProductCard";
import AppBar from "../../components/Appbar";
import { useAppContext } from "../../context/AppContext";
import { useParams } from "react-router-dom";

function ProductPage() {
  const { store } = useAppContext();
  const { filteredProducts } = store;

  let { category } = useParams();
  const filteredProductsByCategory = filteredProducts.filter(
    (product) => product.category === category
  );

  return (
    <>
      <AppBar />
      <div className="GsContainer">
        <div className="GsProductPage">
          <div id="GsFilters" className="GsProductPage__filters">
            <Filters />
          </div>

          <div id="GsProducts">
            <div className="GsProducts__header">
              <Typography variant="subtitle1">
                {category}{" : "}{filteredProductsByCategory?.length} results
              </Typography>

              {/* shows featured filter and mobile-view filters  */}
              <MobieViewFilters />
            </div>
            <div className="GsProducts__productsList">
              {filteredProductsByCategory?.map((product) => (
                <ProductCard product={product} key={product.id} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default ProductPage;
