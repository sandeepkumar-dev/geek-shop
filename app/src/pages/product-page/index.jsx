import { Typography } from "geeky-ui";
import React, { useEffect } from "react";
import Filters from "../../components/Filters/Filters";
import MobieViewFilters from "../../components/Filters/MobieViewFilters";
import "./product-page.scss";
import ProductCard from "../../components/ProductCard";
import AppBar from "../../components/Appbar";
import { useAppContext } from "../../context/AppContext";
import { useParams } from "react-router-dom";

function ProductPage() {
  const { dispatch, store } = useAppContext();
  const { filteredProducts } = store;

  let { category } = useParams();

  useEffect(() => {
    if (store.products) {
      dispatch({ type: "GET_PRODUCTS", payload: { category } });
    }
  }, [category, dispatch, store.products]);

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
                {category}{" : "}{filteredProducts?.length} results
              </Typography>

              {/* shows featured filter and mobile-view filters  */}
              <MobieViewFilters />
            </div>
            <div className="GsProducts__productsList">
              {filteredProducts?.map((product) => (
                <ProductCard product={product} key={product._id} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default ProductPage;
