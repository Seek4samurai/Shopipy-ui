import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import Navbar from "../Components/Navbar";
import style from "../styles/Auth/login.module.css";
import common from "../styles/Common/buttons.module.css";

import { loginAPI } from "../utils/authenticationAPI";
import { useAuth } from "../utils/useAuth";

const Login = () => {
  const navigate = useNavigate();
  const isLoggedIn = useAuth();

  useEffect(() => {
    if (isLoggedIn) {
      navigate("/");
    }
  }, [isLoggedIn, navigate]);

  const [email, setEmail] = useState();
  const [pass, setPass] = useState();

  const handleSubmit = async () => {
    const credentials = [email, pass];
    const res = await loginAPI(credentials);
    if (res.ok) {
      navigate("/");
    }
  };

  return (
    <>
      {isLoggedIn ? null : (
        <>
          <Navbar></Navbar>
          <div className={style.Container}>
            <h1>Sign in</h1>
            <div className={style.Center}>
              <div className={style.Field}>
                <label htmlFor="email">Enter email</label>
                <input
                  type="email"
                  id="email"
                  onChange={(e) => setEmail(e.target.value)}
                ></input>
              </div>
              <div className={style.Field}>
                <label htmlFor="pass">Password</label>
                <input
                  type="password"
                  id="pass"
                  onChange={(e) => setPass(e.target.value)}
                ></input>
              </div>
              <br></br>
              <button
                className={common.Primary}
                id={"submitBtn"}
                onClick={() => handleSubmit()}
              >
                Submit
              </button>
              <p>
                First time?{" "}
                <b
                  onClick={() => navigate("/signup")}
                  style={{ cursor: "pointer" }}
                >
                  Sign up here
                </b>
              </p>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default Login;
