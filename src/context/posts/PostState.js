import { useState } from "react";
import PostContext from "./PostContext";

const PostState = (props) => {
  const host = "http://localhost:4000";
  const postsData = [];
  const [posts, setposts] = useState(postsData);
  //Get all posts
  const getposts = async () => {
    //Backend Update
    const response = await fetch(`${host}/api/posts/fetchallposts`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem("token"),
      },
    });
    const json = await response.json();
    setposts(json);
  };
  //Add a post
  const addpost = async (title, image) => {
    //Backend Update
    await fetch(`${host}/api/posts/addpost`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem("token"),
      },
      body: JSON.stringify({ title, base64:image  }), // body data type must match "Content-Type" header
    });

    //Frontend Update
    getposts();
  };
  //Delete a post
  const deletepost = async (id) => {
    //Backend Update
    await fetch(`${host}/api/posts/deletepost/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem("token"),
      },
    });
    //Frontend Update
    let newpost = posts.filter((post) => {
      return post._id !== id;
    });
    setposts(newpost);
  };
  //Edit a post
  const editpost = async (id, title) => {
    //Backend Update
    await fetch(`${host}/api/posts/updatepost/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem("token"),
      },
      body: JSON.stringify({ title}), // body data type must match "Content-Type" header
    });
    //Frontend Update
    getposts();
  };
  const addComment = async (id, comment) => {
    //Backend Update
    await fetch(`${host}/api/posts//addcomment/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem("token"),
      },
      body: JSON.stringify({comment}), // body data type must match "Content-Type" header
    });
    //Frontend Update
    getposts();
  };
  const editLike = async (id, reaction) => {
    //Backend Update
    await fetch(`${host}/api/posts//addreaction/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem("token"),
      },
      body: JSON.stringify({ reaction}), // body data type must match "Content-Type" header
    });
    //Frontend Update
    getposts();
  };

  return (
    <PostContext.Provider
      value={{ posts, addpost, deletepost, editpost, getposts,addComment,editLike }}
    >
      {props.children}
    </PostContext.Provider>
  );
};

export default PostState;
