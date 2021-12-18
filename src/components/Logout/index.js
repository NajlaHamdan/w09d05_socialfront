import React from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router";
import { logout } from "./../../reducers/login";
import "./style.css";
const Logout = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const signout = () => {
    dispatch(logout({ token: "", id: "" }));
    navigate("/");
  };
  return (
    <div>
      <button onClick={signout} class="logOutBtn">
        logOut
      </button>
    </div>
  );
};

export default Logout;
