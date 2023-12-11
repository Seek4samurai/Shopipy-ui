import { toast } from "react-hot-toast";
import { refreshAccessToken } from "./authenticationAPI";
import { getCookie } from "./functions";

const base_url = "http://localhost:8000";

// async function getCSRFToken() {
//   const response = await fetch(`${base_url}/get-csrf-token/`);
//   const data = await response.json();
//   return data;
// }

export const addToCart = async (itemID, stock_id, volume) => {
  const csrfToken = getCookie("csrftoken");
  let accessToken = localStorage.getItem("access_token");

  const res = await fetch(`${base_url}/customers/cart/save/`, {
    method: "POST",
    headers: {
      HTTP_X_CSRFTOKEN: csrfToken,
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      stock_id: stock_id,
      post_id: itemID,
      volume: volume,
    }),
    // mode: "same-origin",
  });

  const jsonResponse = await res.json();

  // this just invokes toast
  if (jsonResponse.Message === "Item already in cart") {
    toast.success("Item already in cart");
  } else if (jsonResponse.Message === "Item added") {
    toast.success("Item added");
  }

  // if token is expired we call refreshAccessToken to get the new access token
  // and then again make the same request
  if (jsonResponse.error === "Token expired") {
    await refreshAccessToken();

    const accessToken = localStorage.getItem("access_token");
    const updatedRes = await fetch(`${base_url}/customers/cart/save/`, {
      method: "POST",
      headers: {
        HTTP_X_CSRFTOKEN: csrfToken,
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        stock_id: stock_id,
        post_id: itemID,
      }),
      // mode: "same-origin",
    });

    const updatedJsonResponse = updatedRes.json();

    // this just invokes toast
    if (updatedJsonResponse.Message === "Item already in cart") {
      toast.success("Item already in cart");
    } else if (updatedJsonResponse.Message === "Item added") {
      toast.success("Item added");
    }

    return updatedRes;
  }

  return res;
};

export const fetchCart = async () => {
  const csrfToken = getCookie("csrftoken");
  let accessToken = localStorage.getItem("access_token");

  const res = await fetch(`${base_url}/customers/cart/`, {
    method: "GET",
    headers: {
      HTTP_X_CSRFTOKEN: csrfToken,
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json",
    },
  });

  let jsonResponse = await res.json();

  // if token is expired we call refreshAccessToken to get the new access token
  // and then again make the same request
  if (jsonResponse.error === "Token expired") {
    await refreshAccessToken();
    accessToken = localStorage.getItem("access_token");

    const updatedRes = await fetch(`${base_url}/customers/cart/save/`, {
      method: "GET",
      headers: {
        HTTP_X_CSRFTOKEN: csrfToken,
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
    });

    jsonResponse = await updatedRes.json();

    return jsonResponse;
  }

  return jsonResponse;
};

export const fetchCartData = async () => {
  const csrfToken = getCookie("csrftoken");
  let accessToken = localStorage.getItem("access_token");

  const res = await fetch(`${base_url}/customers/cart_data/`, {
    method: "GET",
    headers: {
      HTTP_X_CSRFTOKEN: csrfToken,
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json",
    },
  });

  let jsonResponse = await res.json();

  // if token is expired we call refreshAccessToken to get the new access token
  // and then again make the same request
  if (jsonResponse.error === "Token expired") {
    await refreshAccessToken();
    accessToken = localStorage.getItem("access_token");

    const updatedRes = await fetch(`${base_url}/customers/cart_data/`, {
      method: "GET",
      headers: {
        HTTP_X_CSRFTOKEN: csrfToken,
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
    });

    jsonResponse = await updatedRes.json();

    return jsonResponse;
  }

  return jsonResponse;
};

export const updateCardData = async (id) => {
  const csrfToken = getCookie("csrftoken");
  let accessToken = localStorage.getItem("access_token");

  const res = await fetch(`${base_url}/customers/cart/update/`, {
    method: "POST",
    headers: {
      HTTP_X_CSRFTOKEN: csrfToken,
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      stock_id: id,
    }),
  });

  let jsonResponse = await res.json();

  // if token is expired we call refreshAccessToken to get the new access token
  // and then again make the same request
  if (jsonResponse.error === "Token expired") {
    await refreshAccessToken();
    accessToken = localStorage.getItem("access_token");

    const updatedRes = await fetch(`${base_url}/customers/cart/update/`, {
      method: "POST",
      headers: {
        HTTP_X_CSRFTOKEN: csrfToken,
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        stock_id: id,
      }),
    });

    jsonResponse = await updatedRes.json();

    return jsonResponse;
  }

  return jsonResponse;
};

export const placeOrder = async () => {
  const csrfToken = getCookie("csrftoken");
  let accessToken = localStorage.getItem("access_token");

  const res = await fetch(`${base_url}/customers/order/`, {
    method: "GET",
    headers: {
      HTTP_X_CSRFTOKEN: csrfToken,
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json",
    },
  });

  let response = res;

  // if token is expired we call refreshAccessToken to get the new access token
  // and then again make the same request
  if (response.error === "Token expired") {
    await refreshAccessToken();
    accessToken = localStorage.getItem("access_token");

    const updatedRes = await fetch(`${base_url}/customers/order/`, {
      method: "GET",
      headers: {
        HTTP_X_CSRFTOKEN: csrfToken,
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
    });

    response = updatedRes;

    return response;
  }

  return response;
};
