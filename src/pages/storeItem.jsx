import React, { useEffect, useState } from "react";

import common from "../styles/Common/buttons.module.css";
import style from "../styles/StoreItem/storeItem.module.css";

import Navbar from "../Components/Navbar";
import Stocks from "../Components/Stocks";
import { formatUTCDateTime } from "../utils/functions";
import { fetchImage, handleFetchItem } from "../utils/productAPI";

const StoreItem = () => {
  const [state, setState] = useState();
  const [image_1, setImage_1] = useState();
  const [size, setSize] = useState([]);
  const [color, setColor] = useState([]);

  useEffect(() => {
    let id = window.location.pathname.split("/")[2];
    handleFetchItem(id).then((response) => {
      setState(response);
    });
  }, []);

  useEffect(() => {
    const stock_items = state?.stock_items;
    let availableSizes = [];
    let availableColor = [];

    if (stock_items !== undefined && stock_items[0] !== "") {
      for (let i = 1; i <= Object.keys(stock_items).length; i++) {
        for (let j = 1; j <= Object.keys(stock_items[i].items).length; j++) {
          let sizeIndex = availableSizes.findIndex(
            (item) => item === stock_items[i].items[j]?.size
          );
          let colorIndex = availableColor.findIndex(
            (item) => item === stock_items[i].items[j]?.color
          );

          if (sizeIndex < 0) {
            availableSizes.push(stock_items[i].items[j]?.size);
          }
          if (colorIndex < 0) {
            availableColor.push(stock_items[i].items[j]?.color);
          }
        }
      }
    }
    setSize(availableSizes);
    setColor(availableColor);

    if (state?.image_1) {
      fetchImage(state.image_1).then((response) => {
        setImage_1(response);
      });
    }
  }, [state]);

  return (
    <>
      <Navbar></Navbar>
      {state ? (
        <div className={style.PageContainer}>
          <div className={style.PageHolder}>
            <div className={style.Container}>
              <div className={style.section_1}>
                {image_1 ? (
                  <div className={style.ImgContainer}>
                    <img
                      src={`data:image/jpeg;base64,${image_1}`}
                      alt="img"
                      id={`img-preview-${state.image_1}`}
                    ></img>
                  </div>
                ) : (
                  <p>Loading...</p>
                )}
              </div>
              <div className={style.section_2}>
                <div className={style.title}>{state.title}</div>
                <div className={style.created_on}>
                  Uploaded on: {formatUTCDateTime(state.created)}
                </div>
                <h4 className={style.style_code}>
                  Style code : {state.style_code}
                </h4>
                <div className={style.prices}>
                  <div className={style.mrp}>
                    MRP : <span>₹ {state.mrp}</span>
                  </div>
                  <div className={style.wsp}>
                    WSP : <span>₹ {state.wsp}</span>
                  </div>
                </div>
                <div className={style.size}>
                  <h4>Available Sizes</h4>
                  {size ? (
                    size?.map((size, idx) => (
                      <span key={idx}>{size.toUpperCase()}</span>
                    ))
                  ) : (
                    <span>Loading sizes...</span>
                  )}
                </div>
                <div className={style.color}>
                  <h4>Available Colors</h4>
                  {color ? (
                    color?.map((color, idx) => (
                      <span key={idx} style={{ background: color }}></span>
                    ))
                  ) : (
                    <span>Loading colors...</span>
                  )}
                </div>
                <div className={style.Buttons}>
                  <button className={common.Primary}>Check stocks</button>
                </div>
              </div>
            </div>
            <Stocks
              item={state}
              img_1={image_1}
              size={size}
              color={color}
            ></Stocks>
          </div>
        </div>
      ) : null}
    </>
  );
};

export default StoreItem;
