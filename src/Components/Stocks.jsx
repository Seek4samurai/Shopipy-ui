import React, { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@mui/material";

import common from "../styles/Common/buttons.module.css";
import style from "../styles/Components/stocks.module.css";

import { addToCart } from "../utils/customerAPI";

const Stocks = (props) => {
  const [count, setCount] = useState([]);
  const state = Object.values(props.item.stock_items);

  const handleAddToCart = (idx) => {
    const addToCartDiv = document.getElementById(`addToCart-${idx}`);
    const confirmDiv = document.getElementById(`confirm-${idx}`);
    const quantitySelectionDiv = document.getElementById(`qty-select-${idx}`);

    addToCartDiv.style.display = "none";
    confirmDiv.style.display = "flex";
    quantitySelectionDiv.style.display = "flex";
  };

  const confirmAddToCart = (stock_id, idx) => {
    const volume = count[idx];
    const itemID = props.item?.id;

    if (volume > 0) addToCart(itemID, stock_id, volume);
    else return;
  };

  const handleIncrement = (idx, volume) => {
    const activeCount = [...count];
    if (activeCount[idx] >= volume) return;

    activeCount[idx] =
      activeCount[idx] !== undefined ? activeCount[idx] + 1 : 1;
    setCount(activeCount);
  };

  const handleDecrement = (idx) => {
    const activeCount = [...count];
    if (activeCount[idx] <= 0) return;

    activeCount[idx] =
      activeCount[idx] !== undefined ? activeCount[idx] - 1 : 0;
    setCount(activeCount);
  };

  return (
    <>
      <div className={style.Container}>
        <h2>Available stocks:</h2>
        {state[0] !== "" ? (
          <div className={style.MainContainer}>
            {state.map((item, idx) => {
              if (item.volume > 0) {
                return (
                  <div key={idx} className={style.CardContainer}>
                    <div className={style.Holder}>
                      <div className={style.Left}>
                        <div className={style.Img}>
                          {props.img_1 ? (
                            <img
                              src={`data:image/jpeg;base64,${props.img_1}`}
                              alt="img"
                              id={`img-preview`}
                            ></img>
                          ) : (
                            <p>Loading...</p>
                          )}
                        </div>
                        <button
                          className={common.Primary}
                          id={`addToCart-${idx}`}
                          onClick={() => handleAddToCart(idx)}
                        >
                          Add to cart
                        </button>
                        <button
                          className={common.Primary}
                          id={`confirm-${idx}`}
                          style={{ display: "none", justifyContent: "center" }}
                          onClick={() => confirmAddToCart(item.id, idx)}
                        >
                          Confirm
                        </button>
                        <div
                          className={style.QuantitySelection}
                          id={`qty-select-${idx}`}
                        >
                          <button
                            className={common.Primary}
                            onClick={() => handleDecrement(idx)}
                          >
                            -
                          </button>
                          <div
                            id={`item-qty-${idx}`}
                            style={{ fontSize: "1.5rem", fontWeight: "bold" }}
                          >
                            {count[idx]}
                          </div>
                          <button
                            className={common.Primary}
                            onClick={() => handleIncrement(idx, item.volume)}
                          >
                            +
                          </button>
                        </div>
                      </div>
                      <div className={style.Desc}>
                        {parseInt(item.discount) > 0 ? (
                          <div className={style.Discount}>
                            {item.discount} Discount
                          </div>
                        ) : null}
                        <div className={style.Title}>{item.title}</div>
                        <div className={style.semiTitle}>
                          Item: {props.item.brand} {props.item.brick}
                        </div>
                        <div className={style.Quantity}>
                          Includes{" "}
                          {item.total > 1
                            ? `${item.total} items`
                            : `${item.total} item`}
                        </div>
                        <div className={style.Price}>
                          <b>
                            MRP: {item.mrp}, WSP: {item.wsp}
                          </b>
                        </div>
                        <div className={style.table}>
                          <Table aria-label="simple table">
                            <TableHead>
                              <TableRow>
                                <TableCell>Color</TableCell>
                                <TableCell align="right">Size</TableCell>
                                <TableCell align="right">MRP</TableCell>
                                <TableCell align="right">WSP</TableCell>
                                <TableCell align="right">QTY</TableCell>
                              </TableRow>
                            </TableHead>
                            <TableBody>
                              {Object.values(item.items).map((data, idx) => {
                                return (
                                  <TableRow key={idx}>
                                    <TableCell component="th" scope="row">
                                      {data.color}
                                    </TableCell>
                                    <TableCell align="right">
                                      {data.size.toUpperCase()}
                                    </TableCell>
                                    <TableCell align="right">
                                      {data.mrp}
                                    </TableCell>
                                    <TableCell align="right">
                                      {data.wsp}
                                    </TableCell>
                                    <TableCell align="right">
                                      {data.qty}
                                    </TableCell>
                                  </TableRow>
                                );
                              })}
                            </TableBody>
                          </Table>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              } else {
                return (
                  <div key={idx} className={style.outofstockCardContainer}>
                    <div className={style.outofstockHolder}>
                      <div className={style.Left}>
                        <div className={style.Img}>
                          {props.img_1 ? (
                            <img
                              src={`data:image/jpeg;base64,${props.img_1}`}
                              alt="img"
                              id={`img-preview`}
                            ></img>
                          ) : (
                            <p>Loading...</p>
                          )}
                        </div>
                        <button className={common.Primary}>
                          Out Of Stock!
                        </button>
                      </div>
                      <div className={style.Desc}>
                        {parseInt(item.discount) > 0 ? (
                          <div className={style.Discount}>
                            {item.discount} Discount
                          </div>
                        ) : null}
                        <div className={style.Title}>{item.title}</div>
                        <div className={style.semiTitle}>
                          Item: {props.item.brand} {props.item.brick}
                        </div>
                        <div className={style.Quantity}>
                          Includes{" "}
                          {item.total > 1
                            ? `${item.total} items`
                            : `${item.total} item`}
                        </div>
                        <div className={style.Price}>
                          <b>
                            MRP: {item.mrp}, WSP: {item.wsp}
                          </b>
                        </div>
                        <div className={style.table}>
                          <Table aria-label="simple table">
                            <TableHead>
                              <TableRow>
                                <TableCell>Color</TableCell>
                                <TableCell align="right">Size</TableCell>
                                <TableCell align="right">MRP</TableCell>
                                <TableCell align="right">WSP</TableCell>
                                <TableCell align="right">QTY</TableCell>
                              </TableRow>
                            </TableHead>
                            <TableBody>
                              {Object.values(item.items).map((data, idx) => {
                                return (
                                  <TableRow key={idx}>
                                    <TableCell component="th" scope="row">
                                      {data.color}
                                    </TableCell>
                                    <TableCell align="right">
                                      {data.size.toUpperCase()}
                                    </TableCell>
                                    <TableCell align="right">
                                      {data.mrp}
                                    </TableCell>
                                    <TableCell align="right">
                                      {data.wsp}
                                    </TableCell>
                                    <TableCell align="right">
                                      {data.qty}
                                    </TableCell>
                                  </TableRow>
                                );
                              })}
                            </TableBody>
                          </Table>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              }
            })}
          </div>
        ) : (
          <>No available data...</>
        )}
      </div>
    </>
  );
};

export default Stocks;
