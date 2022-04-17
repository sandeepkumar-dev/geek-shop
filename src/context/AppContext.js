import React from 'react'
import SortedBrands from '../utils/SortedBrands'
import filtersReducer from './filtersReducer'
import wishListReducer from './wishListReducer'
import { data } from './initialData'
import combineReducers from 'react-combine-reducers';

const AppContext = React.createContext(null)
export function useAppContext() {
    return React.useContext(AppContext)
}

const [rootReducer, initialData] = combineReducers({
    filters: [filtersReducer, data],
    wishlist: [wishListReducer, []]
});

function AppCnxtProvider({ children }) {
    const [theme, setTheme] = React.useState('light')
    const handleThemeChange = () => {
        setTheme(theme === 'light' ? 'dark' : 'light');
    };

    // reducer for filters and products
    const [reducer, dispatch] = React.useReducer(rootReducer, initialData)

    const store = {
        filters: reducer.filters.filters,
        products: reducer.filters.products,
        filteredProducts: reducer.filters.filteredProducts,
        wishList: reducer.wishlist
    }

    React.useEffect(() => {
        fetch("./MOCK_DATA.json")
            .then((res) => res.json())
            .then((data) => {
                dispatch({ type: 'INITIAL_DATA', payload: data })
            });
    }, []);

    // sort the brands name
    const brandsName = SortedBrands({ arr: store.products })

    return (
        <AppContext.Provider value={{ theme, handleThemeChange, brandsName, store, dispatch }}>
            {children}
        </AppContext.Provider>
    )
}

export default AppCnxtProvider