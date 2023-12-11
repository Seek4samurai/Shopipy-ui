import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { MdRemoveCircleOutline, MdViewInAr } from "react-icons/md/";

import style from "../styles/Cart/cart.module.css";
import common from "../styles/Common/buttons.module.css";

import Navbar from "../Components/Navbar";
import {
  fetchCart,
  fetchCartData,
  placeOrder,
  updateCardData,
} from "../utils/customerAPI";
import { fetchImage } from "../utils/productAPI";

const Cart = () => {
  const [itemID, setItemID] = useState([]);
  const [items, setItems] = useState([]);
  const [imageDataMap, setImageDataMap] = useState({});
  const [subTotal, setSubTotal] = useState(0);
  const [shippingCost, setShippingCost] = useState(0);
  const [tax, setTax] = useState(0);
  const [total, setTotal] = useState(0);

  const handleRemoveItem = async (item) => {
    const res = await updateCardData(item.stock_items["id"]);
    setItemID(res?.cart_data);
    window.location.reload();
  };

  const handlePlaceOrder = () => {
    placeOrder().then((response) => {
      if (response.ok) {
        toast.success("Order Placed!");
        window.location.reload();
      } else {
        toast.error("Some problem occured!");
      }
    });
  };

  useEffect(() => {
    fetchCart().then((response) => {
      setItemID(response["cart_data"]);
    });
  }, []);

  useEffect(() => {
    if (itemID?.length > 0) {
      fetchCartData(itemID).then((response) => {
        setItems(response?.cart_data);
      });
    }
  }, [itemID]);

  useEffect(() => {
    if (items.length > 0) {
      const fetchData = async () => {
        const newDataMap = {};
        for (const item of items) {
          const image_1 = item.image_1;
          const imageData = await fetchImage(image_1);
          newDataMap[image_1] = imageData;
        }
        setImageDataMap(newDataMap);
      };
      fetchData();

      // handling total cost
      let cost = 0;
      for (let i = 0; i < items.length; i++) {
        cost = cost + parseFloat(items[i]["stock_items"]["mrp"]);
      }
      setSubTotal(cost.toFixed(2));
    }
  }, [items]);

  // Calculating all total cost
  useEffect(() => {
    setTotal(parseFloat(subTotal + shippingCost + tax).toFixed(2));
  }, [subTotal, shippingCost, tax]);

  return (
    <>
      <Navbar></Navbar>
      <div className={style.Center}>
        <div className={style.Container}>
          <div className={style.Left}>
            <div className={style.Heading}>My Cart</div>
            <div className={style.ItemContainer}>
              {items?.length > 0 ? (
                items.map((item, idx) => {
                  return (
                    <div className={style.ItemBox} key={idx}>
                      <div className={style.ImgContainer}>
                        {imageDataMap[item.image_1] ? (
                          <img
                            src={`data:image/jpeg;base64,${
                              imageDataMap[item.image_1]
                            }`}
                            alt="img"
                            id={`img-preview-${item.image_1}`}
                          ></img>
                        ) : (
                          <>Loading...</>
                        )}
                      </div>
                      <div className={style.Desc}>
                        <div className={style.ItemTitle}>
                          <div>
                            <b>
                              {item.brand} {item.title} | Vol:{" "}
                              {itemID[idx]?.volume}
                            </b>
                            <br></br>
                            <i>{item.stock_items["title"]}</i>
                          </div>
                          <div className={style.Price}>
                            <b>
                              MRP: {item.stock_items["mrp"]}
                              {/* WSP: {item.stock_items["wsp"]} */}
                            </b>
                          </div>
                        </div>
                        <div>Available after: {item.go_live_date}</div>
                        <div className={style.tableSection}>
                          <div className={style.table}>
                            <Table
                              aria-label="simple table"
                              style={{ overflow: "scroll" }}
                            >
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
                                {Object.values(item.stock_items.items).map(
                                  (data, idx) => {
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
                                  }
                                )}
                              </TableBody>
                            </Table>
                          </div>
                          <div className={style.btnSection}>
                            <button
                              className={common.Primary}
                              onClick={() => handleRemoveItem(item)}
                            >
                              Remove
                              <MdRemoveCircleOutline
                                size={22}
                              ></MdRemoveCircleOutline>
                            </button>
                            <a
                              href={`/store/${item.id}`}
                              className={common.Primary}
                            >
                              View Item
                              <MdViewInAr size={22}></MdViewInAr>
                            </a>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })
              ) : (
                <h3>Your cart is empty.</h3>
              )}
            </div>
          </div>
          <div className={style.Right}>
            <div className={style.Heading}>Summary</div>
            <div className={style.ItemContainer2}>
              <div className={style.ThirdTitle}>
                <span>Subtotal:</span>
                <span>₹{subTotal}</span>
              </div>
              <div className={style.ThirdTitle}>
                <span>Estimated Shipping & Handling:</span>
                <span>₹{shippingCost}</span>
              </div>
              <div className={style.ThirdTitle}>
                <span>Estimated Tax:</span>
                <span>₹{tax}</span>
              </div>
              <div className={style.Total}>
                <span>Total:</span>
                <span>{total}</span>
              </div>
            </div>
            <div className={style.Checkout}>
              <button
                className={common.Primary}
                onClick={() => handlePlaceOrder()}
              >
                Place Order
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Cart;
