import React from "react";
import styles from "./Input.module.css";

const Input = (props) => {
  //   console.log("INPUT PROPS", props.errorMessage);
  const { inputtype, htmlFor, label, name } = props.inputInfo;
  let inputElement = null;
  switch (inputtype) {
    case "input":
      inputElement = (
        <input
          minLength={name === "password:" && "6"}
          {...props}
          onChange={(e) => props.handleChange(name, e)}
        />
      );
      break;
    case "text-area":
      inputElement = <textarea />;
      break;
    default:
      <input />;
  }
  return (
    <>
      <div className={styles.Input} style={{ marginBottom: "0px" }}>
        <label htmlFor={htmlFor}>{label}</label>
        {inputElement}
      </div>

      {props.errorMessage ? (
        <p
          className={
            props.errorMessage.type === "success"
              ? styles.success
              : styles.error
          }
        >
          {props.errorMessage.msg}
        </p>
      ) : (
        <p></p>
      )}
    </>
  );
};

export default Input;
