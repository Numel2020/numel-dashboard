import "./css/app2.css";
import FormInput from "./FormInput2.jsx";
import { useRef, useState } from "react";
import axios from "./../api/axios";

function RegisterForm() {
  const REGISTER_URL = "authenticate/register";

  const [values, setValues] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [validInputs, setValidInputs] = useState({
    username: false,
    email: false,
    password: false,
    confirmPassword: false,
  });

  // set error focus and error msgs
  const errRef = useRef();
  const [errMsg, setErrMsg] = useState("");

  const [success, setSuccess] = useState(false);
  const [payload, setPayload] = useState(null);

  const inputs = [
    {
      key_id: 1,
      name: "username",
      type: "text",
      label: "Username",
      placeholder: "Username",
      errorMessage: "must be a username",
      required: true,
      pattern: "^[A-z][A-z0-9-_]{3,23}$",
      id: "uid_note",
      "aria-describedby": "uid_note",
      autoComplete: "off",
    },
    {
      key_id: 2,
      name: "email",
      type: "email",
      label: "Email",
      placeholder: "Email",
      errorMessage: "must be an email",
      required: true,
      pattern: "^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$",
      id: "email_note",
      "aria-describedby": "email_note",
      autoComplete: "off",
    },
    {
      key_id: 3,
      name: "password",
      type: "password",
      label: "Password",
      placeholder: "Password",
      errorMessage: "must be secure",
      required: true,
      pattern: "^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$",
      id: "pwd_note",
      "aria-describedby": "pwd_note",
    },
    {
      key_id: 4,
      name: "confirmPassword",
      type: "password",
      label: "confirm Password",
      placeholder: "Confirm Password",
      errorMessage: "not the same as before",
      required: true,
      pattern: values.password,
      id: "confirm_pwd_note",
      "aria-describedby": "confirm_pwd_note",
    },
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        REGISTER_URL,
        JSON.stringify({
          username: values.username,
          email: values.email,
          password: values.password,
        }),
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );

      const data = await response?.data;

      console.log(response?.data);

      setPayload(data);
      setSuccess(true);
    } catch (err) {
      console.log(err?.response?.data);
      const {
        error,
        message,
        success,
        validationErrors: { email },
      } = err?.response?.data;
      if (!err?.response) {
        setErrMsg("No Server Response");
      } else if (success === false && email) {
        setErrMsg(email);
      } else {
        setErrMsg("Registration Failed");
      }
      errRef.current.focus();
    }
  };

  /**
   * Updates the values state with the new input value
   * and validates it based on input name
   * @param {React.ChangeEvent<HTMLInputElement>} e - The input event
   */
  const onChange = (e) => {
    // Extract the input name and value from the event object
    const { name, value } = e.target;

    // Update the values state with the new input value
    setValues({ ...values, [name]: value });

    // Validate the input based on its name
    if (name === "username") {
      // Validate username input against a regular expression
      setValidInputs({
        ...validInputs,
        username: /^[A-z][A-z0-9-_]{3,23}$/.test(value),
      });
    } else if (name === "email") {
      // Validate email input against a regular expression
      setValidInputs({
        ...validInputs,
        email: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(value),
      });
    } else if (name === "password") {
      // Validate password input against a regular expression
      // and update confirmPassword validation accordingly
      const validPassword =
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/.test(value);
      setValidInputs({
        ...validInputs,
        password: validPassword,
        confirmPassword: validPassword && values.confirmPassword === value,
      });
    } else if (name === "confirmPassword") {
      // Validate confirmPassword input against password value
      setValidInputs({
        ...validInputs,
        confirmPassword: value === values.password && value !== "",
      });
    }
  };

  return (
    <>
      <section>
        {success ? (
          <section className={"confirmation"}>
            <h1>Success!</h1>
            <p>
              <a href="#">Sign In</a>
            </p>
            <p>{payload.message}</p>
          </section>
        ) : (
        <form onSubmit={handleSubmit}>
          <h1>Register</h1>
          <p
            ref={errRef}
            className={errMsg ? "errmsg" : "offscreen"}
            aria-live="assertive"
          >
            {errMsg}
          </p>
          {inputs.map((input) => (
            <FormInput
              key={input.key_id}
              value={values[input.name]}
              onChange={onChange}
              validInput={validInputs[input.name]}
              inputState={values[input.name]}
              {...input}
            />
          ))}
          <button
            disabled={
              !validInputs.username ||
              !validInputs.email ||
              !validInputs.confirmPassword
            }
          >
            Submit
          </button>
        </form>
        )
        }
      </section>
    </>
  );
}

export default RegisterForm;
