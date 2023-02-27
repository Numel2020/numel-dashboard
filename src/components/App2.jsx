import "./css/app.css";
import FormInput from "./FormInput.jsx";
import { useState } from "react";

function App2() {
  const [values, setValues] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const inputs = [
    {
      id: 1,
      name: "username",
      type: "text",
      label: "Username",
      placeholder: "Username",
      errorMessage:"must be a username",
      required: true,
      pattern: "^[A-z][A-z0-9-_]{3,23}$",
    },
    {
      id: 2,
      name: "email",
      type: "email",
      label: "Email",
      placeholder: "Email",
      errorMessage:"must be an email",
      required: true,
      pattern: "^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$",

    },
    {
      id: 3,
      name: "password",
      type: "password",
      label: "Password",
      placeholder: "Password",
      errorMessage:"must be secure",
      required: true,
      pattern: "^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$",
    },
    {
      id: 4,
      name: "confirmPassword",
      type: "password",
      label: "confirm Password",
      placeholder: "Confirm Password",
      errorMessage:"not the same as before",
      required: true,
      pattern: values.password,
    },
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  const onChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  console.log(values)

  return (
    <div className="app">

      <form onSubmit={handleSubmit}>
        <h1>Register</h1>
        {inputs.map((input) => (
          <FormInput
              key={input.id}
              value={values[input.name]}
              onChange={onChange}
              {...input}
          />
        ))}

        <button>Submit</button>
      </form>
    </div>
  );
}

export default App2;
