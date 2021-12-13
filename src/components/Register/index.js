import React from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import GoogleLogin from "react-google-login";
const Register = () => {
    const navigate=useNavigate();
  const register = async (e) => {
    e.preventDefault();
    console.log(e.target.email.value);
    const result = await axios.post("http://localhost:4000/createUser", {
      email: e.target.email.value,
      password: e.target.password.value,
      userName: e.target.userName.value,
    });
    const email=result.data.email
    navigate(`/confirmAccount/${email}`);
    console.log(result.data.email, "  ", result);
  };
  const successResponseGoogle = async (response) => {
    console.log(response);
    const token = response.tokenId;
    const result = await axios.post("http://localhost:4000/googleSignIn", {
      token,
    });
    console.log(result.data.result.email, "hi this is from backend");
  };
  const errorResponseGoogle = (response) => {
    console.log(response);
  };
  return (
    <div className="container">
      <form onSubmit={register}>
        <label>Sign up</label>
        <input type="email" name="email" placeholder="email" required />
        <input
          type="password"
          name="password"
          placeholder="password"
          required
        />
        <input type="text" name="userName" placeholder="userName" required />
        <button type="submit">sign up</button>
      </form>
      <GoogleLogin
          clientId="389990397434-ap6i1btg0ubfc79meg74hrt23msjf8ua.apps.googleusercontent.com"
          buttonText="Login"
          onSuccess={successResponseGoogle}
          onFailure={errorResponseGoogle}
          cookiePolicy={"single_host_origin"}
        />
        <span>Already have an account ? <Link to="/login">login</Link></span>
    </div>
  );
};

export default Register;
