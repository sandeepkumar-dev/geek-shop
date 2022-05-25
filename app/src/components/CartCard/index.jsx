import Button from "geeky-ui/core/Button";
import Typography from "geeky-ui/core/Typography";
import React from "react";
import { useAppContext } from "../../context/AppContext";
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
    quantity
  } = product;
  const { dispatch, user } = useAppContext();

  //calculate the discount rate
  const discount = DiscountRate({ originalPrice, price });

  const RemoveFromCart = () => {
    fetch(`/cart/remove/${product._id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "Authorization": user.token
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          dispatch({ type: "updateCart", payload: data.data });
          console.log(data.message)
        } else {
          console.log(data.message);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }

  const MoveToWishList = () => {
    fetch("/wishlist/move", {
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

  const increaseQuantity = () => {
    fetch(`/cart/increase-quantity/${product._id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "Authorization": user.token
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          dispatch({ type: "updateCart", payload: data.data });
          console.log(data.message)
        } else {
          console.log(data.message);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }

  const decreaseQuantity = () => {
    fetch(`/cart/decrease-quantity/${product._id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "Authorization": user.token
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          dispatch({ type: "updateCart", payload: data.data });
          console.log(data.message)
        } else {
          console.log(data.message);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }

  return (
    <div className={`GsCartCard `}>
      <div className="GsCartCard--container">
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
          <div className="GsCartCard__quantity">
            <Typography variant="subtitle1">Quantity: </Typography>
            <button onClick={increaseQuantity}>+</button>
            <Typography variant="subtitle1">{quantity}</Typography>
            <button onClick={decreaseQuantity} disabled={quantity === 1 && true}>-</button>
          </div>
        </div>
      </div>
      <div className="GsCartCard__action--bottom">
        <Button
          variant="contained"
          className="GsPrimaryBtn--light"
          onClick={MoveToWishList}
          size="small"
        >
          Move to WishList
        </Button>
        <Button
          variant="outlined"
          color="secondary"
          size="small"
          onClick={RemoveFromCart}
        >
          Remove from Cart
        </Button>
      </div>
    </div>
  );
};

export default CartCard;
