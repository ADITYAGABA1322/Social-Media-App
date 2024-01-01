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
  const addpost = async (title, description, reaction,image) => {
    //Backend Update
    await fetch(`${host}/api/posts/addpost`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem("token"),
      },
      body: JSON.stringify({ title, description,base64:image , reaction,}), // body data type must match "Content-Type" header
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
  const editpost = async (id, title, description, reaction) => {
    //Backend Update
    await fetch(`${host}/api/posts/updatepost/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem("token"),
      },
      body: JSON.stringify({ title, description, reaction }), // body data type must match "Content-Type" header
    });
    //Frontend Update
    getposts();
  };

  return (
    <PostContext.Provider
      value={{ posts, addpost, deletepost, editpost, getposts }}
    >
      {props.children}
    </PostContext.Provider>
  );
};

export default PostState;
