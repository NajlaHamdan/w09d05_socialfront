import React from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import "./style.css";
const ForgetPassword = () => {
  let data;
  const navigate = useNavigate();
  const resetPass = async (e) => {
    e.preventDefault();
    console.log(e.target.email.value);
    const result = await axios.post("http://localhost:4000/forgetPassword", {
      email: e.target.email.value,
      password: e.target.password.value,
      confirmPass: e.target.confirmPassword.value,
    });
    data = result.data;
    console.log(result.data, "  ", data);
    if (result.data === true) {
      Swal.fire({
        position: "center",
        icon: "success",
        title: "Your account has been confirmed",
        showConfirmButton: false,
        timer: 1500,
      });
      navigate(`/login`);
    } else {
      Swal.fire({
        title: "Oops",
        text: "Your password does not reset try it again!",
        icon: "warning",
        showCancelButton: false,
        confirmButtonColor: "red",
        confirmButtonText: "ok",
      });
    }
  };
  return (
    <div className="container">
      <form onSubmit={resetPass}>
        <span> Reset your password </span>
        <input type="email" name="email" placeholder="email" />
        <input type="password" name="password" placeholder="password" />
        <input
          type="password"
          name="confirmPassword"
          placeholder="confirm password"
        />
        <button type="submit">reset</button>
      </form>
      <button className="backBtn">back</button>
    </div>
  );
};

export default ForgetPassword;
