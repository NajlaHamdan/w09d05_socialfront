import React from 'react'
import { useSelector, useDispatch } from "react-redux";
const Home = () => {
    const state = useSelector((state) => {
    return state;
  });
  const token = state.tokenReducer.token;
  const id = state.tokenReducer.id;
  const createPost = async (e) => {
    e.preventDefault();
    console.log(e.target.email.value);
    const result = await axios.post("http://localhost:4000/createPost", {
      emailORuserName: e.target.email.value,
      password: e.target.password.value,
    });
    const data = {
      id: result.data.result._id,
      token: result.data.token,
    };
    dispatch(signIn(data));
    console.log(result.data.result._id, "  ", result.data.token);
    navigate("/home");
  };
    return (
        <div>
            
        </div>
    )
}

export default Home
