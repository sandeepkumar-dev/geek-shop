import Button from "geeky-ui/core/Button";
import Typography from "geeky-ui/core/Typography";
import React from "react";
import { useAppContext } from "../../context/AppContext";
import DiscountRate from "../../utils/DiscountRate";
import RatingStars from "../RatingStars";
import "./wishListCard.scss";

const WishListCard = ({ product }) => {
  const {
    product_name,
    originalPrice,
    price,
    product_img,
    rating,
    rating_users,
  } = product;
  const { dispatch, user } = useAppContext();

  //calculate the discount rate
  const discount = DiscountRate({ originalPrice, price });

  const MoveToCart = () => {
    fetch(`/cart/move`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": user.token
      },
      body: JSON.stringify(product),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          dispatch({ type: "updateWishList", payload: data.data.wishlist });
          dispatch({ type: "updateCart", payload: data.data.cart });
          console.log(data.message)
        } else {
          console.log(data.message);
        }
      })
      .catch((err) => console.log(err));
  }

  const RemoveFromWishList = () => {
    fetch(`/wishlist/remove/${product._id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "Authorization": user.token
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          dispatch({ type: "updateWishList", payload: data.data });
          console.log(data.message)
        } else {
          console.log(data.message);
        }
      })
      .catch((err) => console.log(err));
  }

  return (
    <div className="GsWishListCard">
      <div className="GsWishListCard__image">
        <img src={product_img} alt={product_name} />
      </div>
      <div className="GsWishListCard__info">
        <div className="GsWishListCard__name">
          <Typography variant="h6">{product_name}</Typography>
        </div>
        <div className="GsWishListCard__rating">
          <RatingStars rating={rating} />
          <Typography variant={"subtitle1"}>{rating_users}</Typography>
        </div>
        <div className="GsWishListCard__price">
          <Typography variant="h6">₹{price}</Typography>
          <Typography variant="subtitle1">₹{originalPrice}</Typography>
          <Typography variant="subtitle1">({discount}% off)</Typography>
        </div>
      </div>
      <Button
        variant="contained"
        className="GsPrimaryBtn--light"
        onClick={MoveToCart}
      >
        Move to Cart
      </Button>
      <Button
        variant="outlined"
        color="secondary"
        onClick={RemoveFromWishList}
      >
        Remove from wishList
      </Button>
    </div>
  );
};

export default WishListCard;
