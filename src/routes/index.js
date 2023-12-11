import React from "react";
import { Route, Routes, useLocation } from "react-router-dom";

// import App from "../App";
import Cart from "../pages/cart";
import Login from "../pages/login";
import Signup from "../pages/signup";
import StoreItem from "../pages/storeItem";
import Storefront from "../pages/storefront";

import { AuthProvider } from "../utils/useAuth";

const RoutesHandler = () => {
  const location = useLocation();

  return (
    <>
      <AuthProvider>
        <Routes location={location} key={location.pathname}>
          {/* <Route path="/" element={<App></App>}></Route> */}
          <Route path="/" element={<Storefront></Storefront>}></Route>
          <Route path="/signup" element={<Signup></Signup>}></Route>
          <Route path="/login" element={<Login></Login>}></Route>
          <Route path="/store/:id" element={<StoreItem></StoreItem>}></Route>
          <Route path="/cart" element={<Cart></Cart>}></Route>
        </Routes>
      </AuthProvider>
    </>
  );
};

export default RoutesHandler;
