import Button from "geeky-ui/core/Button";
import Typography from "geeky-ui/core/Typography";
import React from "react";
import { useAppContext } from "../../context/AppContext";
import CheckExist from "../../utils/CheckExistOrNot";
import DiscountRate from "../../utils/DiscountRate";
import RatingStars from "../RatingStars";
import "./cartCard.scss";

const CartCard = ({ product }) => {
  const {
    product_name,
    originalPrice,
    price,
    product_img,
    rating,
    rating_users,
  } = product;
  const { dispatch, store } = useAppContext();
  const { wishList } = store;

  //calculate the discount rate
  const discount = DiscountRate({ originalPrice, price });

  const MoveToWishList = () => {
    const isExist = CheckExist({ arr: wishList, id: product.id })
    if (isExist) {
      console.log("Product already exists")
    } else {
      dispatch({ type: "moveToWishList", payload: product })
    }
  }

  return (
    <div className="GsCartCard">
      <div className="GsCartCard__image">
        <img src={product_img} alt={product_name} />
      </div>
      <div className="GsCartCard__info">
        <div className="GsCartCard__name">
          <Typography variant="h6">{product_name}</Typography>
        </div>
        <div className="GsCartCard__rating">
          <RatingStars rating={rating} />
          <Typography variant={"subtitle1"}>{rating_users}</Typography>
        </div>
        <div className="GsCartCard__price">
          <Typography variant="h6">₹{price}</Typography>
          <Typography variant="subtitle1">₹{originalPrice}</Typography>
          <Typography variant="subtitle1">({discount}% off)</Typography>
        </div>
      </div>
      <Button
        variant="contained"
        className="GsPrimaryBtn--light"
        onClick={MoveToWishList}
      >
        Move to WishList
      </Button>
      <Button
        variant="outlined"
        color="secondary"
        onClick={() => dispatch({ type: "removeFromCart", payload: product.id })}
      >
        Remove from Cart
      </Button>
    </div>
  );
};

export default CartCard;
