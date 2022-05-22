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
    const [user, setUser] = React.useState(null)

    // user handler
    const handleUser = (user) => {
        if (user === null) {
            setUser(null)
            localStorage.removeItem("user");
            window.location.reload();
        } else {
            setUser(user)
        }
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
            setUser(JSON.parse(user))
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