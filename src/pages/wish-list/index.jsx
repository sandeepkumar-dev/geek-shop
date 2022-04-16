import Typography from 'geeky-ui/core/Typography';
import React from 'react'
import AppBar from "../../components/Appbar"
import WishListCard from '../../components/WishListCard';
import { useAppContext } from '../../context/AppContext';
import "./wishList-page.scss"

function WishList() {
  const { reducer } = useAppContext();
  const { wishList } = reducer;
  return (
    <>
      <AppBar />
      <div className="GsContainer">
        <div className="GswishList">
          <Typography variant="subtitle2">{wishList?.length} items</Typography>
        </div>

        <div className="GsWishList__items">
          {wishList?.map(product => (
            <WishListCard product={product} key={product.id} />
          ))}
        </div>
      </div>
    </>
  )
}

export default WishList
