import Button from 'geeky-ui/core/Button';
import Typography from 'geeky-ui/core/Typography'
import React from 'react'
import { useAppContext } from '../../context/AppContext';
import DiscountRate from '../../utils/DiscountRate';

function CheckOutCard() {
    const { store } = useAppContext();
    const { cart } = store;

    const [originalPrice, setTotalPrice] = React.useState(0)
    const [price, setFinalPrice] = React.useState(0)

    //calculate the discount rate
    const discount = DiscountRate({ originalPrice, price });

    React.useEffect(() => {
        setTotalPrice(cart?.reduce((acc, item) => acc + item.originalPrice * item.quantity, 0))
        setFinalPrice(cart?.reduce((acc, item) => acc + item.price * item.quantity, 0))
    }, [cart])

    return (
        <div className="CheckOutCard">
            <div className="single_row">
                <Typography variant="subtitle1">Total items</Typography>
                <Typography variant="subtitle2">{cart?.length}</Typography>
            </div>
            <div className="single_row">
                <Typography variant="subtitle1">Total Price</Typography>
                <Typography variant="subtitle2">{originalPrice}</Typography>
            </div>
            <div className="single_row">
                <Typography variant="subtitle1">Total Discount</Typography>
                <Typography variant="subtitle2">{discount} %</Typography>
            </div>
            <hr />
            <div className="single_row">
                <Typography variant="h6">Final Price</Typography>
                <Typography variant="h6">{price}</Typography>
            </div>

            <Button variant="contained" color="primary" fullWidth>Place Order</Button>
        </div>
    )
}

export default CheckOutCard
