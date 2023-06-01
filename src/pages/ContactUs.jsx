import React, { useRef, useState } from "react";
import emailjs from "@emailjs/browser";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import styles from "../../src/css/HomePage.module.css";

export const ContactUs = ({ title }) => {
  const form = useRef();
  const [isError, setIsError] = useState(false);

  const sendEmail = (e) => {
    e.preventDefault();

    const name = form.current.elements.name.value;
    const email = form.current.elements.email.value;
    const message = form.current.elements.message.value;

    if (!email || !message || !email.includes("@")) {
      setIsError(true);
      return;
    }

    emailjs
      .sendForm(
        "service_wq8wzbz",
        "template_nas2unb",
        form.current,
        "SWlS6s23jWYMozQgS"
      )
      .then(
        (result) => {
          console.log(result.text);
        },
        (error) => {
          console.log(error.text);
        }
      );

    form.current.reset();
    setIsError(false);
  };

  return (
    <div className="center">
      <h3 className="text-gray-900 font-semibold text-2xl">{title}</h3>
      <form ref={form} onSubmit={sendEmail}>
        <br />
        <TextField id="name" label="Name" variant="outlined" />
        <br />
        <br />

        <TextField id="email" label="Email" variant="outlined" />
        <br />
        <br />

        <TextField id="message" label="Message" variant="outlined" />
        <br />
        <br />

        {isError && (
          <p className="text-red-500">Please enter both email and message.</p>
        )}

        <Button
          variant="contained"
          onClick={sendEmail}
          className="orangeButton"
        >
          Send
        </Button>
      </form>
    </div>
  );
};
