import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router";
import { logout } from "./../../reducers/login";
import "./style.css";
const Logout = () => {
  const state = useSelector((state) => state);
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
