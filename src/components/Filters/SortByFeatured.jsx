import Typography from "geeky-ui/core/Typography";
import React from "react";
import { useAppContext } from "../../context/AppContext";

function SortByFeatured() {
  const { dispatch, reducer } = useAppContext();
  const filters = reducer.filters;

  const updateFilters = (value) => {
    dispatch({ type: "APPLY_FILTERS", payload: value });
  };
  return (
    <>
      <Typography variant="subtitle1">
        <span className="sortBy__dropdown">Sort by: { filters.lowToHigh ? 'Price: Low to High' : filters.highToLow ? 'Price: High to Low' : filters.newestArrivals ? 'Newest Arrivals' : 'Featured' }</span>
      </Typography>
      <div className="GsProducts__sortBy__options">
        <Typography
          variant="subtitle1"
          onClick={() =>
            updateFilters({
              newestArrivals: false,
              lowToHigh: true,
              highToLow: false,
            })
          }
        >
          Price: Low to High
        </Typography>
        <Typography
          variant="subtitle1"
          onClick={() =>
            updateFilters({
              newestArrivals: false,
              highToLow: true,
              lowToHigh: false,
            })
          }
        >
          Price: High to Low
        </Typography>
        <Typography
          variant="subtitle1"
          onClick={() =>
            updateFilters({
              newestArrivals: true,
              lowToHigh: false,
              highToLow: false,
            })
          }
        >
          Newest Arrivals
        </Typography>
      </div>
    </>
  );
}

export default SortByFeatured;
