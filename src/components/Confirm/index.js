import React from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
const Confirm = () => {
  const navigate = useNavigate();
  const email = useParams();
  const checkCode = async (e) => {
    e.preventDefault();
    const result = await axios.post("http://localhost:4000/checkCode", {
      code: e.target.code.value,
      email,
    });
    console.log(result);
    if (result.data) {
      Swal.fire({
        position: "center",
        icon: "success",
        title: "Your account has been confirmed",
        showConfirmButton: false,
        timer: 1500,
      });
      navigate("/login");
    } else {
      Swal.fire({
        title: "Are you sure?",
        text: "Your confirmation code is wrong check it again!",
        icon: "warning",
        showCancelButton: false,
        confirmButtonColor: "red",
        confirmButtonText: "ok",
      });
    }
  };
  return (
    <div className="container">
      <h1>HI FINNALY</h1>
      <p>please confirm your account</p>
      <form onSubmit={checkCode}>
        <input type="text" name="code" />
        <button type="submit">go</button>
      </form>
    </div>
  );
};

export default Confirm;
