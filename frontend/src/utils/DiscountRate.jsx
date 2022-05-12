function DiscountRate({ originalPrice, price }) {
  const discountRate = ((originalPrice - price) * 100) / originalPrice;
  return Math.ceil(discountRate);
}

export default DiscountRate;
