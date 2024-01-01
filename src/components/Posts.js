import React, { useContext, useEffect, useRef, useState } from "react";
import PostContext from "../context/posts/PostContext";
import PostItem from "./PostItem";
import AddPost from "./AddPost";
import { useNavigate } from "react-router-dom";

export default function Posts() {
  let navigate = useNavigate();
  const context = useContext(PostContext);
  const { posts, getposts, editpost } = context;
  const refOpen = useRef(null);
  const refClose = useRef(null);
  const [post, setPost] = useState({
    _id: "",
    title: "",
    description: "",
    reaction: "",
  });
  const updatepost = (currentpost) => {
    refOpen.current.click();
    setPost(currentpost);
  };
  const handleClick = (e) => {
    console.log(post);
    editpost(post._id, post.title, post.description, post.reaction);
    e.preventDefault();
    refClose.current.click();
  };
  const onChange = (e) => {
    setPost({ ...post, [e.target.name]: e.target.value });
  };
  useEffect(() => {
    if (localStorage.getItem("token")) getposts();
    else navigate("/login");
    //eslint-disable-next-line
  }, []);
  return (
    <>
      <AddPost />
      <button
        type="button"
        ref={refOpen}
        className="btn btn-primary d-none"
        data-bs-toggle="modal"
        data-bs-target="#exampleModal"
      >
        Launch demo modal
      </button>
      <div
        className="modal fade"
        id="exampleModal"
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="container  d-flex justify-content-center my-2">
              <h5>Edit post</h5>
            </div>
            <form className=" container my-3">
              <div className="mb-3">
                <label htmlFor="title" className="form-label">
                  Title
                </label>
                <input
                  type="text"
                  minLength={5}
                  required
                  className="form-control"
                  id="title"
                  onChange={onChange}
                  value={post.title}
                  name="title"
                  aria-describedby="emailHelp"
                />
              </div>
              <div className="mb-3">
                <label htmlFor="description" className="form-label">
                  Description
                </label>
                <input
                  type="text"
                  minLength={5}
                  required
                  className="form-control"
                  name="description"
                  onChange={onChange}
                  value={post.description}
                  id="description"
                />
              </div>
              <div className="mb-3">
                <label htmlFor="reaction" className="form-label">
                  reaction
                </label>
                <input
                  type="text"
                  className="form-control"
                  name="reaction"
                  onChange={onChange}
                  value={post.reaction}
                  id="reaction"
                />
              </div>
            </form>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
                ref={refClose}
              >
                Close
              </button>
              <button
                type="button"
                disabled={post.title.length < 5 || post.description.length < 5}
                onClick={handleClick}
                className="btn btn-primary"
              >
                Update post
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="row my-3">
        <h3>Your Post</h3>

        {posts.length === 0 ? (
          <div className="container">No Post to display</div>
        ) : (
          posts.map((post, i) => {
            return (
              <PostItem key={post._id} post={post} updatepost={updatepost} />
            );
          })
        )}
      </div>
    </>
  );
}
