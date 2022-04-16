import CheckExist from "../utils/CheckExistOrNot";

const wishListReducer = (state, action) => {
    switch (action.type) {
        case "addToWishList":
            const isExist = CheckExist({ arr: state, id: action.payload.id })
            return isExist ? [...state.filter(wishList => wishList.id !== action.payload.id)] : [...state, action.payload];

        case "removeFromWishList":
            return state.filter(wishList => wishList.id !== action.payload)

        default:
            return state
    }
}

export default wishListReducer