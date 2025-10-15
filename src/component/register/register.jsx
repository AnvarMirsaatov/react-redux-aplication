import React, { useState } from "react";
import { Input } from "../../ui";
import { useDispatch, useSelector } from "react-redux";
import {
  registerUserFailure,
  registerUserStart,
  registerUserSuccess,
} from "../../slice/Auth";
import AuthService from "../../service/auth";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  console.log(name);
  console.log(email);
  console.log(password);

  const dispatch = useDispatch();
  const { isLoading } = useSelector((state) => state.auth);

  const handleChange = async (e) => {
    e.preventDefault();
    dispatch(registerUserStart());
    const user = { username: name, email: email, password: password };
    try {
      const response = await AuthService.userRegister(user);
      console.log(user);
      console.log(response);

      dispatch(registerUserSuccess());
    } catch (error) {
      dispatch(registerUserFailure());
    }
  };
  return (
    <div className="text-center">
      <main className="form-signin w-25 m-auto container">
        <form className="mx-auto" onSubmit={handleChange}>
          <img
            className="mb-4 "
            src="/docs/5.3/assets/brand/bootstrap-logo.svg"
            alt=""
            width="72"
            height="57"
          />
          <h1 className="h3 mb-3 fw-normal">Register</h1>
          <Input
            label={"username"}
            type={"text"}
            state={name}
            setState={setName}
          />
          <Input
            label={"Email address"}
            type={"email"}
            state={email}
            setState={setEmail}
          />
          <Input
            label={"Password"}
            type={"Password"}
            state={password}
            setState={setPassword}
          />

          <button className="btn btn-primary w-100 py-2 mt-2" type="submit">
            {isLoading ? "Loading..." : "Register"}
          </button>
        </form>
      </main>
    </div>
  );
};

export default Register;
