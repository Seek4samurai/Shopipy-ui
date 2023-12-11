import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import style from "../styles/Components/item.module.css";
import { fetchImage } from "../utils/productAPI";

const Item = (props) => {
  const [image_1, setImage_1] = useState();

  // Check if image doesn't loads
  useEffect(() => {
    fetchImage(props.details.image_1).then((response) => {
      setImage_1(response);
    });

    let image_1 = document.getElementById(`img-${props.details.image_1}`);
    image_1?.addEventListener("error", function handleFailedImage() {
      image_1.src = "./assets/template_image.jpg";
    });
  }, [props.details.image_1]);

  return (
    <div className={style.Container}>
      <Link
        to={`/store/${props.details.id}`}
        state={{ item: props.details, image_1: image_1 }}
      >
        {image_1 ? (
          <div className={style.imgContainer}>
            <img
              src={`data:image/jpeg;base64,${image_1}`}
              alt="img"
              id={`img-${props.details.image_1}`}
            ></img>
          </div>
        ) : (
          <p>Loading...</p>
        )}
        <div className={style.Metadata}>
          <h2 className={style.Title}>{props.details.title}</h2>
          <div className={style.details}>
            <div className={style.Brand}>
              Brand: {props.details.brand__name}
            </div>
            <div className={style.Price}>
              MRP: <b>{props.details.mrp}</b> INR
            </div>
            <div className={style.Price}>
              WSP: <b>{props.details.wsp}</b> INR
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default Item;
