import React, { useContext, useState } from "react";
import postContext from "../context/posts/PostContext";
export default function AddPost() {
  const context = useContext(postContext);
  const { addpost } = context;
  const handleClick = (e) => {
    e.preventDefault();
    addpost(post.title, post.description, post.reaction,post.image);
    setpost({ title: "", description: "", reaction: "",image:"" });
  };
  const [post, setpost] = useState({ title: "", description: "", reaction: "",image:"" });
  const onChange = (e) => {
    setpost({ ...post, [e.target.name]: e.target.value });
  };
  const ConvertToBase64=(file)=>{
    const reader=new FileReader();
    reader.readAsDataURL(file);
    reader.onload=()=>{
      // console.log(reader.result);
      setpost({...post,image:reader.result});
    }
  }
  return (
    <div>
      {/* <h1 className="my-3">Welcome {localStorage.getItem("name")} </h1> */}
      <h1 className="my-3">Welcome Aditya </h1>
      <h3>Add a Post</h3>
      <form className=" container my-3">
        <div className="mb-3">
          <label htmlFor="title" className="form-label">
            Post Title
          </label>
          <input
            type="text"
            minLength={5}
            value={post.title}
            required
            className="form-control"
            id="title"
            onChange={onChange}
            name="title"
            aria-describedby="emailHelp"
          />
        </div>
        <div className="mb-3">
          <label htmlFor="description" className="form-label">
            Post Description
          </label>
          <input
            type="text"
            minLength={5}
            value={post.description}
            required
            className="form-control"
            name="description"
            onChange={onChange}
            id="description"
          />
        </div>
        <div className="mb-3">
          <label htmlFor="image" className="btn btn-primary " style={{cursor:'pointer', border:'1px solid black',borderRadius:'10px', padding:'10px'}}>
           Add Image
          </label>
          <input
          style={{display:'none'}}
            type="file"
            accept="image/*"
            onChange={(e) => {ConvertToBase64(e.target.files[0])}}
            name="image"
            id="image"
          
          />
          {post.image!==null&& post.image!==""?<img src={post.image} alt="image" style={{width:'100px',height:'100px',marginLeft:'10px'}}/>:''}
        </div>
        <div className="mb-3">
          <label htmlFor="reaction" className="form-label">
            Number of Reaction
          </label>
          <input
            type="text"
            className="form-control"
            name="reaction"
            value={post.reaction}
            onChange={onChange}
            id="reaction"
          />
        </div>
        <button
          disabled={post.title.length < 5 || post.description.length < 5}
          type="submit"
          className="btn btn-primary"
          onClick={handleClick}
        >
          Add Post
        </button>
      </form>
    </div>
  );
}
