import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Input } from "../../ui";
import {
  signUserStart,
  signUserSuccess,
  signUserFailure,
} from "../../slice/Auth";
import AuthService from "../../service/auth";

const Login = () => {
  const dispatch = useDispatch();
  // const auth = useSelector((state) => state.auth); // ✅

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch(signUserStart());
    const user = { email, password };
    try {
      const response = await AuthService.userLogin(user);
      dispatch(signUserSuccess(response.user));
    } catch (error) {
      console.log(error?.response?.data?.errors);
      dispatch(signUserFailure(error.response.data.errors));
    }
  };


  const { isLoading, error } = useSelector((state) => state.auth);

  console.log(error);

  return (
    <div className="text-center">
      <main className="form-signin w-25 m-auto container">
        <form className="mx-auto" onSubmit={handleSubmit}>
          <h1 className="h3 mb-3 fw-normal">Login</h1>

          {error && <div class="alert alert-danger p-1 mb-1" role="alert">
            Email Or Password        </div>}
          <Input
            label="Email address"
            type="email"
            state={email}
            setState={setEmail}
          />

          <Input
            label="Password"
            type="password"
            state={password}
            setState={setPassword}
          />

          <button
            className="btn btn-primary w-100 py-2 mt-2"
            type="submit"
            disabled={isLoading} // ✅ endi to‘g‘ri ishlaydi
          >
            {isLoading ? "Loading..." : "Login"}
          </button>
        </form>
      </main>
    </div>
  );
};

export default Login;
