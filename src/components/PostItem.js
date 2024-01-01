import React, { useContext } from "react";
import PostContext from "../context/posts/PostContext";
import heart from './heart.png'
export default function PostItem(props) {
  const context = useContext(PostContext);
  const { deletepost } = context;
  const { post, updatepost } = props;
  return (
    <>
    

      <div class="card my-3 mx-3" style={{ width: "18rem" }}>
        <img class="card-img-top" src={post.image} alt="Card image cap" />
        <div class="card-body">
          <div className="d-flex align-items-center">
            <h5 className="card-title"> {post.title}</h5>
            <i
              className="fa-solid fa-trash mx-2"
              onClick={() => deletepost(post._id)}
            ></i>
            <i
              className="fa-regular fa-pen-to-square mx-3"
              onClick={() => updatepost(post)}
            ></i>
          </div>
          <p class="card-text">{post.description}</p>
          <p className="card-text"> 
          <img className="" style={{marginRight:'4px'}} src={heart} width={20} height={20}/>
          {post.reaction}</p>
        </div>
      </div>
    </>
  );
}
