import Typography from 'geeky-ui/core/Typography';
import React from 'react'
import AppBar from "../../components/Appbar"
import CartCard from '../../components/CartCard';
import { useAppContext } from '../../context/AppContext';
import "./cart-page.scss"
import CheckOutCard from './checkOutCard';

function CartPage() {
    const { store } = useAppContext();
    const { cart } = store;

    return (
        <>
            <AppBar />
            <div className="GsContainer">
                <div className="GsCartPage__header">
                    <Typography variant="subtitle2">{cart?.length} items</Typography>
                </div>

                <div className="GsCartPage">
                    <div id="GsCartItems" className="GsCartPage__items">
                        {cart?.map(product => (
                            <CartCard product={product} key={product.id} />
                        ))}
                    </div>

                    <div id="GsCheckout" className="GsCartPage__checkout">
                        {cart.length > 0 && <CheckOutCard />}
                    </div>
                </div>
            </div>
        </>
    )
}

export default CartPage
