import React from 'react'
import SortedBrands from '../utils/SortedBrands'
import storeReducer from './storeReducer'
import { initialStore } from './initialData'

const AppContext = React.createContext(null)
export function useAppContext() {
    return React.useContext(AppContext)
}

function AppCnxtProvider({ children }) {
    const [theme, setTheme] = React.useState('light')
    const handleThemeChange = () => {
        setTheme(theme === 'light' ? 'dark' : 'light');
    };

    // reducer for filters and products
    const [store, dispatch] = React.useReducer(storeReducer, initialStore)

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