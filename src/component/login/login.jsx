import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Input } from "../../ui";
import { loginUserStart } from "../../slice/Auth";

const Login = () => {
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth); // ✅

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(loginUserStart());
  };

  return (
    <div className="text-center">
      <main className="form-signin w-25 m-auto container">
        <form className="mx-auto" onSubmit={handleSubmit}>
          <h1 className="h3 mb-3 fw-normal">Login</h1>

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
            disabled={auth?.isLoading} // ✅ endi to‘g‘ri ishlaydi
          >
            {auth.isLoading ? "Loading..." : "Login"}
          </button>
        </form>
      </main>
    </div>
  );
};

export default Login;
