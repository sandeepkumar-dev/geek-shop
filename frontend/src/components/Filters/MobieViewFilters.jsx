import { Button } from "geeky-ui";
import React from "react";
import Filters from "./Filters";
import "./mobileViewFilters.scss";
import SortByFeatured from "./SortByFeatured";

function MobieViewFilters() {
  const [show, setShow] = React.useState(false);

  return (
    <>
      <div className="GsProducts__sortBy">
        <SortByFeatured />
      </div>

      <div className="GsMobileFilters">
        <Button variant="contained" size="small" onClick={() => setShow(!show)}>
          Filters
        </Button>

        <FiltersModel show={show} setShow={setShow} />
      </div>
    </>
  );
}

const FiltersModel = ({ show, setShow }) => {
  return (
    <div className={`GsFiltersModel ${show && "GsModel--Show"}`}>
      <Filters />
      <Button
        variant="contained"
        color="secondary"
        size="small"
        onClick={() => setShow(false)}
        className="GsFiltersModel__close"
      >
        Close
      </Button>
    </div>
  );
};

export default MobieViewFilters;
