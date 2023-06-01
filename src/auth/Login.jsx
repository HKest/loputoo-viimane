import React, { useContext, useRef, useState } from "react";
import { AuthContext } from "../../src/Store/AuthContext";
import { useNavigate } from "react-router-dom";
import styles from "../../src/css/Login.module.css";
import { Button } from "react-bootstrap";

function Login() {
  const url =
    "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyATV4bB_syjT2DfJZwfz7d4VFfcQPac3is";
  const { setLoggedIn } = useContext(AuthContext);
  const navigate = useNavigate();
  const emailRef = useRef();
  const passwordRef = useRef();
  const [message, setMessage] = useState("");

  const login = () => {
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
          navigate("/admin"); // Redirect
          sessionStorage.setItem("token", "SUVALISED_TÄHED_JA_NUMBRID");
        } else {
          setMessage(json.error.message);
        }
      });
  };

  return (
    <div>
      <div className={styles.login}>
        <div className={styles.message}>{message}</div>
        <label>Email</label>
        <br />
        <input ref={emailRef} type="text" className={styles.input} />
        <br />
        <label>Password</label>
        <br />
        <input ref={passwordRef} type="password" className={styles.input} />
        <br />
        <Button variant="contained" onClick={login} className={styles.button}>
          Login
        </Button>
      </div>
    </div>
  );
}

export default Login;
