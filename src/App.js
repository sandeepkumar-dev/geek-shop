import React from 'react';
import { ThemeProvider, LightTheme, DarkTheme } from 'geeky-ui/core/styles';
import ProductPage from './pages/product-page';
import { useAppContext } from './context/AppContext';
import { BrowserRouter, useRoutes } from 'react-router-dom';
import WishList from './pages/wish-list';
import './App.css';
import CartPage from './pages/cart-page';
import HomePage from './pages/Home-page';

const AppRoutes = () => {
  let routes = useRoutes([
    { path: '/', element: <HomePage /> },
    { path: "/products", element: <ProductPage /> },
    { path: "/wish-list", element: <WishList /> },
    { path: "/my-cart", element: <CartPage /> },
  ])

  return routes
}

function App() {
  const { theme } = useAppContext()

  return (
    <ThemeProvider theme={theme === 'light' ? LightTheme : DarkTheme}>

      <BrowserRouter>
        <AppRoutes />
      </BrowserRouter>

    </ThemeProvider>
  );
}

export default App;
