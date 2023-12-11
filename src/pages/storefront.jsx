import React, { useEffect, useState } from "react";

import Banner from "../Components/Banner";
import Filters from "../Components/Filters";
import ItemCard from "../Components/ItemCard";
import Navbar from "../Components/Navbar";
import style from "../styles/Storefront/storefront.module.css";

import {
  handleFetchProducts,
  handleFetchProductsGuest,
} from "../utils/productAPI";
import { isUrlParamEmpty } from "../utils/functions";
import { useAuth } from "../utils/useAuth";
import { logoutAPI } from "../utils/authenticationAPI";

const Storefront = () => {
  const isLoggedIn = useAuth();
  const [products, setProducts] = useState();
  const [callFilters, setCallFilters] = useState(false);

  useEffect(() => {
    if (isUrlParamEmpty() === true) {
      if (isLoggedIn) {
        handleFetchProducts().then((response) => {
          // console.log(response);
          response === "Logout" ? logoutAPI(isLoggedIn) : setProducts(response);
          // setProducts(response);
        });
      } else {
        handleFetchProductsGuest().then((response) => {
          setProducts(response);
        });
      }
    } else {
      setCallFilters(true);
    }
  }, [isLoggedIn]);

  return (
    <>
      <Navbar></Navbar>
      <Banner></Banner>
      <div className={style.Container}>
        <Filters callFilters={callFilters} setProducts={setProducts}></Filters>
        <div className={style.ItemGrid}>
          {products !== undefined ? (
            products?.map((item, index) => {
              return (
                <div key={index}>
                  <ItemCard details={item}></ItemCard>
                </div>
              );
            })
          ) : (
            <h2>Loading...</h2>
          )}
        </div>
      </div>
    </>
  );
};

export default Storefront;
