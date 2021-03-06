import React from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Logout from "./../Logout";
import "./style.css";
const Description = () => {
  const state = useSelector((state) => {
    return state;
  });
  const token = state.tokenReducer.token;
  const id = state.tokenReducer.id;
  const postId = useParams();
  const [post, setPost] = useState("");
  const [comment, setComment] = useState("");
  useEffect(() => {
    details();
  }, []);
  const details = async () => {
    const detailes = await axios.get(`http://localhost:4000/getPost/${postId}`,{
      headers: { Authorization: `Brearer ${token}` },
    });
    console.log(detailes.data);
    setPost(detailes.data);
    getComments();
  };
  const getComments = async () => {
    const comments = await axios.get(
      `http://localhost:4000/getComment/${postId.postId}`,{
        headers: { Authorization: `Brearer ${token}` },
      }
    );
    console.log(comments.data[0].desc);
    console.log(comments);
    if (comments.data == "there is no comment with this id") {
      setComment([]);
    } else {
      setComment(comments.data);
    }
  };
  const addComment = async (e) => {
    e.preventDefault();
    const desc = e.target.textComment.value;
    console.log(desc);
    console.log(id, postId.postId, desc);
    const post = postId.postId;
    const detailes = await axios.post(`http://localhost:4000/createComment `, {
      id,
      postId: post,
      desc,
    },{
      headers: { Authorization: `Brearer ${token}` },
    });
    console.log(detailes);
    getComments();
  };
  const deleteComment = async (commentId) => {
    const deleted = await axios.delete(
      `http://localhost:4000/deleteComment/${id}/${commentId}`,{
        headers: { Authorization: `Brearer ${token}` },
      }
    );
    if (deleted.data == "no comment with this id") {
      setComment([]);
    } else {
      getComments();
    }
  };
  const update = async (commentId) => {
    const desc = prompt("Enter your comment");
    const updated = await axios.post(`http://localhost:4000/UpdateComment`, {
      id,
      commentId,
      desc,
    },{
      headers: { Authorization: `Brearer ${token}` },
    });
    console.log(updated.data);
    getComments();
  };
  return (
    <div>
      <Logout />
      {/* <form onSubmit={uploadfile}> */}
      {/* <input type="file" name="file" onChange={handelChange} />
      <input type="description" onChange={handelText} />
      <button type="submit" onClick={uploadfile}>
        Save
      </button> */}
      {/* </form> */}
      {/* {posts.length
        ? posts.map((item) => { */}
        <div className="App">
        <header className="App-header"></header>
        <div className="content">
          <div className="cards">
      <div key={post._id}>
        <p color="white">{post.desc}</p>
        <img src={post.img} alt={post.desc} />
        </div></div></div>
        <form on onSubmit={addComment}>
          <input type="text" name="textComment" />
          <button type="submit">add comment</button>
        </form>
        {comment.length
          ? comment.map((item) => {
              return (
                <>
                  <div key={item.id}></div>
                  <p>{item.desc}</p>
                  <button
                    onClick={() => {
                      deleteComment(item._id);
                    }}
                  >
                    delete
                  </button>
                  <button
                    onClick={() => {
                      update(item._id);
                    }}
                  >
                    update
                  </button>
                </>
              );
            })
          : "no comments"}
        {/* <button onClick={()=>{deletePost(item._id)}}>delete</button> */}
        {/* <button onClick={()=>{details(item._id)}}>details</button> */}
      </div>
      {/* })
        : "no todos for this user"} */}
    </div>
  );
};

export default Description;
