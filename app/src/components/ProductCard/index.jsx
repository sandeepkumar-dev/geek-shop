import Button from "geeky-ui/core/Button";
import IconButton from "geeky-ui/core/IconButton";
import Typography from "geeky-ui/core/Typography";
import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAppContext } from "../../context/AppContext";
import CheckExist from "../../utils/CheckExistOrNot";
import DiscountRate from "../../utils/DiscountRate";
import RatingStars from "../RatingStars";
import "./productCard.scss";

const ProductCard = ({ product }) => {
  const navigate = useNavigate();
  const {
    product_name,
    originalPrice,
    price,
    product_img,
    rating,
    rating_users,
  } = product;
  const [existInCart, setExistInCart] = React.useState(false);
  const [existInWishlist, setExistInWishList] = React.useState(false);
  const [discount, setDiscount] = React.useState(0);

  const { dispatch, store, user } = useAppContext();
  const { wishList, cart } = store;

  // add to cart handler
  const addToCartHandler = () => {
    if (user.token === null) {
      // redirect to login page
      navigate('/sign-in');
    } else {
      fetch("/cart/add", {
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
            dispatch({ type: "updateCart", payload: data.data });
            console.log(data.message)
          } else {
            console.log(data.message);
          }
        })
        .catch((err) => console.log(err));
    }
  };

  // add to wishlist vise versa
  const addToWishListHandler = () => {
    if (user.token === null) {
      // redirect to login page
      navigate('/sign-in');
    } else {
      fetch("/wishlist/add", {
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
            dispatch({ type: "updateWishList", payload: data.data });
            console.log(data.message)
          } else {
            console.log(data.message);
          }
        })
        .catch((err) => console.log(err));
    }
  }

  //calculate the discount rate
  useEffect(() => {
    const discountRate = DiscountRate({ originalPrice, price });
    setDiscount(discountRate);
  }, [originalPrice, price]);

  React.useEffect(() => {
    // check if the product is already in the wish list
    setExistInWishList(CheckExist({ arr: wishList, _id: product._id }))
    setExistInCart(CheckExist({ arr: cart, _id: product._id }))
  }, [cart, product._id, wishList])

  return (
    <div className="GsProductCard">
      <div className="GsProductCard__image">
        <img src={product_img} alt={product_name} />
      </div>
      <IconButton color="primary" className="addToWishList" onClick={addToWishListHandler}>
        <i className={`${existInWishlist ? 'fa' : 'far'} fa-heart`}></i>
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
      {existInCart ? <Link to="/my-cart">
        <Button
          variant="contained"
          fullWidth
          color="primary"
          className="addToCartBtn"
        >
          Go to Cart
        </Button>
      </Link> :

        <Button
          variant="contained"
          fullWidth
          className="GsPrimaryBtn--light addToCartBtn"
          onClick={addToCartHandler}
        >
          Add to Cart
        </Button>
      }
    </div>
  );
};

export default ProductCard;
