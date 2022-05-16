import { initialStore } from "./initialData";
import CheckExist from "../utils/CheckExistOrNot";
import DiscountRate from "../utils/DiscountRate";

const storeReducer = (state, action) => {
    const category = action.payload.category
    var filteredProducts = state.products[category];
    switch (action.type) {
        case 'APPLY_FILTERS':
            let filters = { ...state.filters, ...action.payload.filters };

            let obj = state.products[category];

            if (filters.payOnDelivery) {
                obj = obj.filter((product) => product.payOnDelivery);
            }

            if (filters.minPrice >= 0 && filters.maxPrice) {
                obj = obj.filter(
                    (product) =>
                        product.price >= filters.minPrice && product.price <= filters.maxPrice
                );
            } else if (filters.minPrice && !filters.maxPrice) {
                obj = obj.filter((product) => product.price >= filters.minPrice);
            }

            if (filters.rating === 4) {
                obj = obj.filter((product) => product.rating >= 4);
            } else if (filters.rating === 3) {
                obj = obj.filter((product) => product.rating >= 3);
            } else if (filters.rating === 2) {
                obj = obj.filter((product) => product.rating >= 2);
            } else if (filters.rating === 1) {
                obj = obj.filter((product) => product.rating >= 1);
            }

            if (filters.discount) {
                obj = obj.filter((product) => {
                    const discount = DiscountRate({ originalPrice: product.originalPrice, price: product.price });
                    return discount >= filters.discount
                });
            }

            if (filters.brand !== "all" && filters.brand !== null) {
                obj = obj.filter((product) => product.brand === filters.brand);
            }

            if (filters.highToLow) {
                obj = obj.sort((a, b) => b.price - a.price);
            }
            if (filters.lowToHigh) {
                obj = obj.sort((a, b) => a.price - b.price);
            }
            if (filters.newestArrival) {
                obj = obj.sort((a, b) => b.timestamp - a.timestamp);
            }

            return { ...state, filters, filteredProducts: obj };

        case 'CLEAR_FILTERS':
            return { ...state, filters: { ...initialStore.filters }, filteredProducts };

        case 'INITIAL_DATA':
            return { ...state, products: action.payload };

        case 'GET_PRODUCTS':
            return { ...state, filteredProducts };

        case "addToWishList":
            const isExist = CheckExist({ arr: state.wishList, id: action.payload.id })
            return isExist ? { ...state, wishList: state.wishList.filter(wishList => wishList.id !== action.payload.id) } : { ...state, wishList: [...state.wishList, action.payload] };

        case "removeFromWishList":
            return { ...state, wishList: state.wishList.filter(wishList => wishList.id !== action.payload) }

        case "moveToWishList":
            return { ...state, wishList: [...state.wishList, action.payload], cart: state.cart.filter(item => item.id !== action.payload.id) };

        case "addToCart":
            return { ...state, cart: [...state.cart, action.payload] };

        case "removeFromCart":
            return { ...state, cart: state.cart.filter(item => item.id !== action.payload) }

        case "moveToCart":
            return { ...state, cart: [...state.cart, action.payload], wishList: state.wishList.filter(item => item.id !== action.payload.id) };

        case "increaseQuantity":
            return { ...state, cart: state.cart.map(item => (item.id === action.payload ? { ...item, quantity: item.quantity + 1 } : item)) }

        case "decreaseQuantity":
            return { ...state, cart: state.cart.map(item => (item.id === action.payload ? { ...item, quantity: item.quantity - 1 } : item)) }

        default:
            return state
    }
}

export default storeReducer