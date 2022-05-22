import React from "react";
import Typography from "geeky-ui/core/Typography";
import Button from "geeky-ui/core/Button";
import Badge from "geeky-ui/core/Badge";
import "./appbar.scss";
import IconButton from "geeky-ui/core/IconButton";
import { useAppContext } from "../../context/AppContext";
import { Link } from "react-router-dom";

function AppBar() {
  const { user, handleUser, theme, handleThemeChange, store } = useAppContext();
  const { wishList, cart } = store;

  return (
    <div className="GuiAppbar">
      <div className="GuiAppbar__container GuiContainer">
        <Link to="/" className="GuiAppbar__brand">
          <Typography variant="h5">Geek-Shop</Typography>
        </Link>

        <div className="GuiAppbar__searchBar">
          <i className="fa fa-search" aria-hidden="true"></i>
          <input type="text" placeholder="Search" />
        </div>

        <div className="GuiAppbar__menu">
          {user ? (
            <div className="GuiAppbar__menu__user">
              <div className="GuiAppbar__user">
                <Typography variant="subtitle2">Hi,</Typography>
                <Typography variant="subtitle1">{user?.user?.name}</Typography>
              </div>
              <div className="GuiAppbar__dropDown">
                <Typography variant="subtitle1">Profile</Typography>
                <Button variant="outlined" size="small" onClick={() => handleUser(null)}>
                  Log Out
                </Button>
              </div>
            </div>
          ) : (
            <Link to="/sign-in">
              <Button variant="contained" size="small">
                Log In
              </Button>
            </Link>
          )}

          <Link to="/wish-list">
            <Badge badgeContent={wishList?.length} color="secondary">
              <i className="far fa-heart"></i>
            </Badge>
          </Link>
          <Link to="/my-cart">
            <Badge badgeContent={cart?.length} color="secondary">
              <i className="far fa-shopping-cart" aria-hidden="true"></i>
            </Badge>
          </Link>
          <IconButton onClick={() => handleThemeChange()}>
            <i className={`fa fa-${theme === "light" ? "moon" : "sun"}`}></i>
          </IconButton>
        </div>
      </div>
      <div className="GuiAppbar__searchBar--bottom">
        <i className="fa fa-search" aria-hidden="true"></i>
        <input type="text" placeholder="Search" />
      </div>
    </div>
  );
}

export default AppBar;
