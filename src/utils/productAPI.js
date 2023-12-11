import { GetObjectCommand, S3Client } from "@aws-sdk/client-s3";
import { getCookie, imageByteArrayToBase64 } from "./functions";

const base_url = "http://localhost:8000";

const global_S3Client = new S3Client({
  credentials: {
    accessKeyId: process.env.REACT_APP_AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.REACT_APP_AWS_SECRET_ACCESS_KEY,
  },
  apiVersion: "2006-03-01",
  region: process.env.REACT_APP_AWS_REGION,
});

export const fetchImage = async (imageKey) => {
  const command = new GetObjectCommand({
    Bucket: process.env.REACT_APP_AWS_S3_BUCKET_NAME,
    Key: imageKey,
  });

  try {
    const response = await global_S3Client.send(command);
    const str = await response.Body.transformToByteArray();
    const base64EncodedImage = imageByteArrayToBase64(str);
    return base64EncodedImage;
  } catch (err) {
    console.log("Something went wrong in loading images");
    return "Failed";
  }
};

// This API is for Authenticated Users
export const handleFetchProducts = async () => {
  const csrfToken = getCookie("csrftoken");
  let accessToken = localStorage.getItem("access_token");

  const res = await fetch(`${base_url}/products/`, {
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
  if (jsonResponse.error === "Error occured") {
    return "Logout";
  }
  return jsonResponse;
};

// This API is for unAuthenticated Users
export const handleFetchProductsGuest = async () => {
  const res = await fetch(`${base_url}/products/guest/`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  return await res.json();
};

export const handleFetchItem = async (id) => {
  const res = await fetch(`${base_url}/products/item/${id}/`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  return res.json();
};

export const handleFetchFilters = async (
  itemType,
  category,
  gender,
  sortBy
) => {
  let param1 = itemType ? itemType : "Any";
  let param2 = category ? category : "Any";
  let param3 = gender ? gender : "Any";
  let param4 = sortBy ? sortBy : "Any";

  const res = await fetch(
    `${base_url}/products/filter/${param1}/${param2}/${param3}/${param4}/search/`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }
  );

  return await res.json();
};
