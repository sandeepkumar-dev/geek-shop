import React from 'react';
import { ThemeProvider, LightTheme, DarkTheme } from 'geeky-ui/core/styles';
import './App.css';
import ProductPage from './pages/product-page';
import { useAppContext } from './context/AppContext';
import { BrowserRouter, useRoutes } from 'react-router-dom';
import WishList from './pages/wish-list';

const AppRoutes = () => {
  let routes = useRoutes([
    { path: "/products", element: <ProductPage /> },
    { path: "/wish-list", element: <WishList /> }
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
