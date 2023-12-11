import React from "react";
import style from "../styles/Components/banner.module.css";

const Banner = () => {
  return (
    <div className={style.Container}>
      <span>End of Season Sale - Up to 50% Off</span>
      <img src="./assets/banner.jpg" alt="banner.jpg"></img>
    </div>
  );
};

export default Banner;
