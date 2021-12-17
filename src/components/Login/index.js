import React from "react";
import axios from "axios";
import { signIn } from "../../reducers/login";
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
const Login = () => {
  // const state = useSelector((state) => {
  //   return state;
  // });
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const login = async (e) => {
    e.preventDefault();
    console.log(e.target.email.value);
    const result = await axios.post("http://localhost:4000/login", {
      emailORuserName: e.target.email.value,
      password: e.target.password.value,
    });
    const data = {
      id: result.data.result._id,
      token: result.data.token,
    };
    dispatch(signIn(data));
    console.log(result.data.result._id, "  ", result.data.token);
    if (result.data.result.role == "61a75918e9839777023d716d") {
      navigate("/home");
    } else {
      navigate("/admin");
    }
  };
  return (
    <div className="container">
      <form onSubmit={login}>
        <span> Sign in </span>
        <input type="email" name="email" placeholder="user name or email" />
        <input type="password" name="password" placeholder="password" />
        <button type="submit">sign in</button>
      </form>
      <span>
        forget password ?<Link to="/forgetPassword">reset</Link>
      </span>
    </div>
  );
};

export default Login;
