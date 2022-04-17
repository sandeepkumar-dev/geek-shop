import { data } from "./initialData";

const filtersReducer = (state, action) => {
    switch (action.type) {
        case 'APPLY_FILTERS':
            let filters = { ...state.filters, ...action.payload };

            let obj = [...state.products];

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
                obj = obj.filter((product) => product.discount >= filters.discount);
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
            return { ...state, filters: { ...data.filters }, filteredProducts: [...state.products] };

        case 'INITIAL_DATA':
            return { ...state, products: action.payload, filteredProducts: action.payload };

        default:
            return state
    }
}

export default filtersReducer