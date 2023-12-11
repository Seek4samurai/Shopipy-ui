import React from "react";

import style from "./styles/app.module.css";

const App = () => {
  return (
    <>
      <div className={style.Container}>
        <button
          className={style.Btn}
          onClick={() => (window.location.href = "/store")}
        >
          View Inventory
        </button>
      </div>
    </>
  );
};

export default App;

