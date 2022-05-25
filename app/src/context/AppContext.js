import React from 'react'
import storeReducer from './storeReducer'
import { initialStore } from './initialData'
import SortedCatetory from '../utils/SortedCategory'

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
    const [user, setUser] = React.useState({ token: null, userInfo: null })

    // user handler
    const handleUser = (user) => {
        setUser(user)
    }

    React.useEffect(() => {
        const location = window.location.origin
        fetch(`${location}/MOCK_DATA.json`)
            .then((res) => res.json())
            .then((data) => {
                dispatch({ type: 'INITIAL_DATA', payload: data })
            });
    }, []);

    React.useEffect(() => {
        // get user from local storage
        const user = localStorage.getItem('user')
        if (user) {
            const data = JSON.parse(user)
            // set user
            setUser({
                token: data.token,
                userInfo: data.userInfo
            })

            // get cart from api
            fetch("/cart/list", {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": data.token
                }
            })
                .then((res) => res.json())
                .then((data) => {
                    dispatch({ type: "updateCart", payload: data.data })
                })
                .catch((err) => { dispatch({ type: "updateCart", payload: [] }) })

            // get wishlist from api
            fetch("/wishlist/list", {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": data.token
                }
            })
                .then((res) => res.json())
                .then((data) => {
                    dispatch({ type: "updateWishList", payload: data.data })
                })
                .catch((err) => { dispatch({ type: "updateWishList", payload: [] }) })
        } else {
            setUser({ token: null, userInfo: null })
        }
    }, [])

    // sort the producys by category
    const categoryName = SortedCatetory({ arr: store.products })

    return (
        <AppContext.Provider value={{ user, handleUser, theme, handleThemeChange, categoryName, store, dispatch }}>
            {children}
        </AppContext.Provider>
    )
}

export default AppCnxtProvider