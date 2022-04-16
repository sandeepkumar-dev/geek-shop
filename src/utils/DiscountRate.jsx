import React from "react";

function DiscountRate({ originalPrice, price }) {
  const [discount, setDiscount] = React.useState(0);
  React.useEffect(() => {
    let percentOff = ((originalPrice - price) * 100) / originalPrice;
    setDiscount(Math.ceil(percentOff));
  }, [originalPrice, price]);

  return discount;
}

export default DiscountRate;
