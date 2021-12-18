import React from "react";
import Logout from "../Logout";
import axios from "axios";
import { useSelector } from "react-redux";
import { useState, useEffect } from "react";
import "./style.css";
const Admin = () => {
  const state = useSelector((state) => {
    return state;
  });
  const [counters, setCounters] = useState("");
  useEffect(() => {
    getCounters();
  }, []);
  const token = state.tokenReducer.token;
  const id = state.tokenReducer.id;
  const getCounters = async () => {
    const result = await axios.get('http://localhost:4000/dashboard',{
      headers: { Authorization: `Brearer ${token}` },
    });
    console.log(result.data);
    setCounters(result.data);
  };
  return (
    <div className="content">
      <Logout />
      <div className="counters">
        <div className="counter">
          <div>
            <p>Users</p>
            <p>{counters.users}</p>
          </div>
          <div>
            <p>posts</p>
            <p>{counters.posts}</p>
          </div>
          <div>
            <p>comments</p>
            <p>{counters.comments}</p>
          </div>
          <div>
            <p>likes</p>
            <p>{counters.likes}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Admin;
