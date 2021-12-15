import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { storage } from "./../firebase";
import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Logout from "../Logout";
const Home = () => {
  const state = useSelector((state) => {
    return state;
  });
  let data = [];
  const navigate = useNavigate();
  const [src, setSrc] = useState("");
  const [img, setImg] = useState("");
  const [posts, setPosts] = useState("");
  const [text, setText] = useState("");
  const [like, setLike] = useState("");
  const token = state.tokenReducer.token;
  const id = state.tokenReducer.id;
  console.log(id, token);
  const createPost = async () => {
    const result = await axios.post("http://localhost:4000/createPost", {
      id,
      img,
      desc: "e.target.password.value",
    });
    console.log(result, "  ", result.data);
    getPosts();
  };
  useEffect(() => {
    getPosts();
  }, []);
  const getPosts = async () => {
    const result = await axios.get(`http://localhost:4000/getPosts/${id}`);
    if(result.data == "no posts for this user"){
      setPosts([]);
    }else{
      setPosts(result.data);
    }
    console.log(result.data);
  };
  const uploadfile = (e) => {
    e.preventDefault();
    // const file = e.target.file;
    console.log("img", src);
    const bucket = "images";
    const ref = storage.ref(`/${bucket}/${src.name}`);
    const uploadPost = ref.put(src);
    console.log(src);
    console.log(e.target.test);
    uploadPost.on("state_changed", console.log, console.error, () => {
      ref.getDownloadURL().then((url) => {
        // setFile(null);
        console.log(url);
        setImg(url);
        // setUrl(url)
        createPost();
      });
    });
  };
  const handelChange = (e) => {
    console.log(e.target.files[0].name);
    if (e.target.files[0]) {
      setSrc(e.target.files[0]);
    }
  };
  const handelText = (e) => {
    console.log(e.target);
  };
  const toggleLike = async (postId) => {
    console.log(postId);
    const like = await axios.post("http://localhost:4000/toggleLike", {
      id,
      postId,
    });
    setLike(like.data);
    console.log(like.data);
  };
  const deletePost = async (postId) => {
    const deleted = await axios.delete(
      `http://localhost:4000/deletePost/${id}/${postId}`
    );
    getPosts();
  };
  const details = async (postId) => {
    navigate(`/description/${postId}`);
    const detailes = await axios.get(`http://localhost:4000/getPost/${postId}`);
    console.log(detailes.data);
  };
  return (
    <div>
      <Logout/>
      {/* <form onSubmit={uploadfile}> */}
      <input type="file" name="file" onChange={handelChange} />
      <input type="description" onChange={handelText} />
      <button type="submit" onClick={uploadfile}>
        Save
      </button>
      {/* </form> */}
      <div className="content">
        <div className="cards">
          {posts.length
            ? posts.map((item) => {
                return (
                  <div key={item._id}>
                    <p color="white">{item.desc}</p>
                    <img src={item.img} alt={item.desc} />
                    <button
                      onClick={() => {
                        toggleLike(item._id);
                      }}
                    >
                      {like ? like : "unlike"}
                    </button>
                    <button
                      onClick={() => {
                        deletePost(item._id);
                      }}
                    >
                      delete
                    </button>
                    <button
                      onClick={() => {
                        details(item._id);
                      }}
                    >
                      details
                    </button>
                  </div>
                );
              })
            : "no posts for this user"}
        </div>
      </div>
    </div>
  );
};

export default Home;
