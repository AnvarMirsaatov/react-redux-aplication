import { useState } from "react";
import { Input } from "../../ui";
import { useDispatch, useSelector } from "react-redux";
import {
  signUserStart,
  signUserSuccess,
  signUserFailure,
} from "../../slice/Auth";
import AuthService from "../../service/auth";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();
  const { isLoading, error } = useSelector((state) => state.auth);

  const handleChange = async (e) => {
    e.preventDefault();
    dispatch(signUserStart());

    const user = { username: name, email, password };

    try {
      const response = await AuthService.userRegister(user);
      dispatch(signUserSuccess(response.user));
    } catch (err) {
      console.log(err?.response?.data?.errors);
      dispatch(signUserFailure(err.response.data.errors));
    }
  };

  return (
    <div className="text-center">
      <main className="form-signin w-25 m-auto container">
        <form className="mx-auto" onSubmit={handleChange}>
          <h1 className="h3 mb-3 fw-normal">Register</h1>

          <Input
            label="Username"
            type="text"
            state={name}
            setState={setName}
            validate={error?.username ? error.username[0] : ""}
          />

          <Input
            label="Email address"
            type="email"
            state={email}
            setState={setEmail}
            validate={error?.email ? error.email[0] : ""}
          />

          <Input
            label="Password"
            type="password"
            state={password}
            setState={setPassword}
            validate={error?.password ? error.password[0] : ""}
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
