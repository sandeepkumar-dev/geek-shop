import Button from "geeky-ui/core/Button";
import IconButton from "geeky-ui/core/IconButton";
import Typography from "geeky-ui/core/Typography";
import React from "react";
import DiscountRate from "../../utils/DiscountRate";
import RatingStars from "../RatingStars";
import "./productCard.scss";

const ProductCard = ({ product }) => {
  const {
    product_name,
    originalPrice,
    price,
    product_img,
    rating,
    rating_users,
  } = product;

  //calculate the discount rate
  const discount = DiscountRate({ originalPrice, price });

  return (
    <div className="GsProductCard">
      <div className="GsProductCard__image">
        <img src={product_img} alt={product_name} />
      </div>
      <IconButton color="primary" className="addToWishList">
        <i className="far fa-heart"></i>
      </IconButton>
      <div className="GsProductCard__info">
        <div className="GsProductCard__name">
          <Typography variant="h6">{product_name}</Typography>
        </div>
        <div className="GsProductCard__rating">
          <RatingStars rating={rating} />
          <Typography variant={"subtitle1"}>{rating_users}</Typography>
        </div>
        <div className="GsProductCard__price">
          <Typography variant="h6">₹{price}</Typography>
          <Typography variant="subtitle1">₹{originalPrice}</Typography>
          <Typography variant="subtitle1">({discount}% off)</Typography>
        </div>
      </div>
      <Button
        variant="contained"
        color="primary"
        fullWidth
        className="addToCartBtn"
      >
        Add to Cart
      </Button>
    </div>
  );
};

export default ProductCard;
