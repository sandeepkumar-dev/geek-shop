import { Typography } from "geeky-ui";
import React from "react";
import Filters from "../../components/Filters/Filters";
import MobieViewFilters from "../../components/Filters/MobieViewFilters";
import "./product-page.scss";
import ProductCard from "../../components/ProductCard";
import AppBar from "../../components/Appbar";
import { useAppContext } from "../../context/AppContext";

function ProductPage() {
  const { reducer } = useAppContext();
  const { filteredProducts } = reducer;

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
                {filteredProducts?.length} results
              </Typography>

              {/* shows featured filter and mobile-view filters  */}
              <MobieViewFilters />
            </div>
            <div className="GsProducts__productsList">
              {filteredProducts?.map((product) => (
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
