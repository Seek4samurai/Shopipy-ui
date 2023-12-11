import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import Navbar from "../Components/Navbar";
import style from "../styles/Auth/login.module.css";
import common from "../styles/Common/buttons.module.css";

import { signupAPI } from "../utils/authenticationAPI";
import { useAuth } from "../utils/useAuth";

const Signup = () => {
  const navigate = useNavigate();
  const isLoggedIn = useAuth();

  useEffect(() => {
    if (isLoggedIn) {
      navigate("/");
    }
  }, [isLoggedIn, navigate]);

  const [firstName, setFirstName] = useState();
  const [lastName, setLastName] = useState();
  const [email, setEmail] = useState();
  const [pass, setPass] = useState();

  const handleSubmit = async () => {
    const credentials = [firstName, lastName, email, pass];
    signupAPI(credentials).then((res) => console.log(res));
  };

  return (
    <>
      {isLoggedIn ? null : (
        <>
          <Navbar></Navbar>
          <div className={style.Container}>
            <h1>Sign up</h1>
            <div className={style.Center}>
              <div className={style.Field}>
                <label htmlFor="firstName">Enter first name</label>
                <input
                  type="text"
                  id="firstName"
                  onChange={(e) => setFirstName(e.target.value)}
                ></input>
              </div>
              <div className={style.Field}>
                <label htmlFor="lastName">Enter last name</label>
                <input
                  type="text"
                  id="lastName"
                  onChange={(e) => setLastName(e.target.value)}
                ></input>
              </div>
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
              <button className={common.Primary} onClick={() => handleSubmit()}>
                Submit
              </button>
              <p>
                Already did?{" "}
                <b
                  onClick={() => navigate("/login")}
                  style={{ cursor: "pointer" }}
                >
                  Sign in here
                </b>
              </p>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default Signup;
