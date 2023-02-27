import "./css/app2.css";
import FormInput from "./FormInput2.jsx";
import { useState } from "react";

function App2() {
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

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  const onChange = (e) => {
    const { name, value } = e.target;
    setValues({ ...values, [name]: value });

    if (name === "username") {
      setValidInputs({
        ...validInputs,
        username: /^[A-z][A-z0-9-_]{3,23}$/.test(value),
      });
    } else if (name === "email") {
      setValidInputs({
        ...validInputs,
        email: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(value),
      });
    } else if (name === "password") {
      setValidInputs({
        ...validInputs,
        password:
          /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/.test(value),
      });
    } else if (name === "confirmPassword") {
      setValidInputs({
        ...validInputs,
        confirmPassword: value === values.password && value !== "",
      });
    }
  };


  return (
    <div className="app">
      <form onSubmit={handleSubmit}>
        <h1>Register</h1>
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

        <button disabled={!validInputs.username || !validInputs.email || !validInputs.confirmPassword} >Submit</button>
      </form>
    </div>
  );
}

export default App2;
