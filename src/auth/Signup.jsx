import React, { useContext, useRef, useState } from "react";
import { AuthContext } from "../../src/Store/AuthContext";
import { useNavigate } from "react-router-dom";
import styles from "../../src/css/Login.module.css";
import { Button } from "react-bootstrap";

function Signup() {
  const url =
    "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyATV4bB_syjT2DfJZwfz7d4VFfcQPac3is";
  const { setLoggedIn } = useContext(AuthContext);
  const navigate = useNavigate();
  const emailRef = useRef();
  const passwordRef = useRef();
  const [message, setMessage] = useState("");

  const signup = () => {
    const data = {
      email: emailRef.current.value,
      password: passwordRef.current.value,
      returnSecureToken: true,
    };
    fetch(url, { method: "POST", body: JSON.stringify(data) })
      .then((res) => res.json())
      .then((json) => {
        if (json.error === undefined) {
          setLoggedIn(true);
          navigate("/admin");
          sessionStorage.setItem("token", json.idToken);
        } else {
          setMessage(json.error.message);
        }
      });
  };

  return (
    <div className={styles.login}>
      <div className={styles.message}>{message}</div>
      <div className={styles.formGroup}>
        <label>Email</label>
        <input ref={emailRef} type="text" className={styles.input} />
      </div>
      <div className={styles.formGroup}>
        <label>Password</label>
        <input ref={passwordRef} type="password" className={styles.input} />
      </div>
      <Button variant="contained" onClick={signup} className={styles.button}>
        Signup
      </Button>
    </div>
  );
}

export default Signup;
