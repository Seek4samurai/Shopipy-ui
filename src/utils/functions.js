import { Buffer } from "buffer";

export function imageByteArrayToBase64(imageByteArray) {
  // Convert the byte array to a Base64 string
  const buffer = Buffer.from(imageByteArray);
  const base64String = buffer.toString("base64");

  return base64String;
}

export function formatUTCDateTime(date) {
  const dateTime = new Date(date);
  return dateTime.toString();
}

export function removeSpaces(str) {
  if (str) {
    return str.replace(/ /g, "");
  }
}

export function getCookie(name) {
  let cookieValue = null;
  if (document.cookie && document.cookie !== "") {
    const cookies = document.cookie.split(";");
    for (let i = 0; i < cookies.length; i++) {
      const cookie = cookies[i].trim();
      // Does this cookie string begin with the name we want?
      if (cookie.substring(0, name.length + 1) === name + "=") {
        cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
        break;
      }
    }
  }
  return cookieValue;
}

export function isUrlParamEmpty() {
  const searchParamsString = window.location.search;
  if (searchParamsString === "") return true;

  const searchParams = searchParamsString.split("&");

  for (let params of searchParams) {
    let paramsValue = params.split("=")[1];
    if (paramsValue !== "") return false;
  }

  return true;
}
