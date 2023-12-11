import React, { useEffect, useState } from "react";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { useNavigate } from "react-router-dom";

import common from "../styles/Common/buttons.module.css";
import style from "../styles/Components/navbar.module.css";

import { logoutAPI } from "../utils/authenticationAPI";
import { fetchCart } from "../utils/customerAPI";
import { useAuth } from "../utils/useAuth";

const Navbar = () => {
  const isLoggedIn = useAuth();
  const navigate = useNavigate();
  const [cartCount, setCartCount] = useState();

  const handleLogout = async () => {
    await logoutAPI(isLoggedIn);
    navigate("/login");
  };

  useEffect(() => {
    if (isLoggedIn) {
      fetchCart().then((response) => {
        setCartCount(response.cart_data?.length);
      });
    }
  }, [isLoggedIn]);

  return (
    <>
      <div className={style.Container}>
        <div className={style.navbar_heading}>Ajio Prebook plus</div>
        {isLoggedIn ? (
          <>
            <div className={style.Cart} onClick={() => navigate("/cart")}>
              <AiOutlineShoppingCart
                size={28}
                color="black"
              ></AiOutlineShoppingCart>
              &nbsp;
              <span>{cartCount}</span>
            </div>
            <button className={common.Secondary} onClick={() => handleLogout()}>
              Logout
            </button>
          </>
        ) : (
          <>
            <button
              className={common.Secondary}
              onClick={() => navigate("/login")}
            >
              Login
            </button>
          </>
        )}
      </div>
    </>
  );
};

export default Navbar;
