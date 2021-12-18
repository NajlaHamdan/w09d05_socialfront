import React from "react";
import { useSelector } from "react-redux";
import { storage } from "./../firebase";
import axios from "axios";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import Logout from "../Logout";
import "./../../App.css";
import "./style.css";
const Home = () => {
  const state = useSelector((state) => {
    return state;
  });
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
      desc: text,
    },{
      headers: { Authorization: `Brearer ${token}` },
    });
    console.log(result, "  ", result.data);
    getPosts();
  };
  useEffect(() => {
    getPosts();
  }, []);
  const getPosts = async () => {
    const result = await axios.get(`http://localhost:4000/getPosts/${id}`,{
      headers: { Authorization: `Brearer ${token}` },
    });
    if (result.data === "no posts for this user") {
      setPosts([]);
    } else {
      setPosts(result.data);
    }
    console.log(result.data);
  };
  const uploadfile = () => {
    console.log("img", src);
    const bucket = "images";
    const ref = storage.ref(`/${bucket}/${src.name}`);
    const uploadPost = ref.put(src);
    console.log(src);
    uploadPost.on("state_changed", console.log, console.error, () => {
      ref
        .getDownloadURL()
        .then((url) => {
          // setFile(null);
          console.log(url);
          setImg(url);
          // setUrl(url)
          createPost();
        })
        .catch((err) => {
          console.log(err);
        });
    });
  };
  const handelChange = (e) => {
    console.log(e.target.files[0].name);
    console.log(e.target.files[0]);
    if (e.target.files[0]) {
      setSrc(e.target.files[0]);
    }
  };
  const handelText = (e) => {
    console.log(e.target.value);
    if (e.target.value) setText(e.target.value);
  };
  const toggleLike = async (postId) => {
    console.log(postId);
    const like = await axios.post("http://localhost:4000/toggleLike", {
      id,
      postId,
    },{
      headers: { Authorization: `Brearer ${token}` },
    });
    setLike(like.data);
    console.log(like.data);
  };
  const deletePost = async (postId) => {
    const deleted = await axios.delete(
      `http://localhost:4000/deletePost/${id}/${postId}`,{
        headers: { Authorization: `Brearer ${token}` },
      }
    );
    console.log(deleted.data);
    if (deleted.data === "already deleted") {
      setPosts([]);
    } else {
      getPosts();
    }
  };
  const details = async (postId) => {
    navigate(`/description/${postId}`);
    const detailes = await axios.get(`http://localhost:4000/getPost/${postId}`,{
      headers: { Authorization: `Brearer ${token}` },
    });
    console.log(detailes.data);
  };
  const update = async (postId) => {
    Swal.fire({
      title: "Submit your post here",
      input: "file",
      inputAttributes: {
        onChange: { handelChange },
      },
      showCancelButton: true,
      confirmButtonText: "Save",
      showLoaderOnConfirm: true,
      preConfirm: (login) => {
        const bucket = "images";
        const ref = storage.ref(`/${bucket}/${src.name}`);
        const uploadPost = ref.put(src);
        console.log(src);
        uploadPost.on("state_changed", console.log, console.error, () => {
          ref
            .getDownloadURL()
            .then((url) => {
              console.log(url);
              setImg(url);
              createPost();
            })
            .catch((err) => {
              console.log(err);
            });
        });
      },
      allowOutsideClick: () => !Swal.isLoading(),
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
          title: `${result.value.login}'s avatar`,
          imageUrl: result.value.avatar_url,
        });
      }
    });
    // const updated = await axios.post(`http://localhost:4000/updateById/${postId}`);
    // console.log(updated.data);
    // getPosts();
  };
  return (
    <div>
      <Logout />
      <div className="uploadDate">
        <p>Do you have a new post ? upload it here </p>
        <input type="file" name="file" onChange={handelChange} />
        <input
          type="text"
          name="desc"
          onChange={handelText}
          placeholder="write description for your post"
        />
        <button type="submit" onClick={uploadfile}>
          Save
        </button>
      </div>
      <div className="App">
        <header className="App-header"></header>
        <div className="content">
          <div className="cards">
            {posts.length
              ? posts.map((item) => {
                  return (
                    <div key={item._id}>
                      <img src={item.img} alt={item.desc} />
                      <p style={{ color: "black", textAlign: "center" }}>
                        {item.desc}
                      </p>
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
                      <button
                        onClick={() => {
                          update(item._id);
                        }}
                      >
                        update
                      </button>
                    </div>
                  );
                })
              : "no posts for this user"}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
