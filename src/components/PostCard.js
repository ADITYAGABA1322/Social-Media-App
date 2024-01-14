// PostCard.js
import React, { useContext, useEffect, useRef, useState } from 'react';
import { FaHeart } from 'react-icons/fa';
import './Igchannel.css'; // Import the CSS file for styling
import PostContext from '../context/posts/PostContext';
import { useNavigate } from 'react-router-dom';

const PostCard = ({ post, getUserInfo,data,setPost,refOpen,refClose,refOpen2 }) => {
  const [likesCount, setLikesCount] = useState(post.reaction);
  const [isLiked, setIsLiked] = useState(false);
  const [comment, setComment] = useState('');
  const context = useContext(PostContext);
  const { deletepost, editpost, editLike, addComment } = context;
  const handleCommentChange = (e) => {
    setComment(e.target.value);
  };

  const handleAddComment = () => {
    if(localStorage.getItem("token")){
    // Handle adding comments (e.g., make an API call)
    console.log(`Added comment: ${comment}`);
    let data = post.comment;
    data.push(comment);
    addComment(post._id, data);
    setComment(''); // Clear the comment input after adding
    getUserInfo();
    post.comment.push(comment)
    }
    else navigate('/login')
  };

  const [toggle, setFlag] = useState(false);
  const navigate=useNavigate();
  const togglelike = () => {
    if(localStorage.getItem("token")){
    console.log(post._id, post.title, post.reaction);
    if (!toggle) {
      editLike(post._id, post.reaction + 1);
      // localStorage.setItem('like', 1);
      setLikesCount(likesCount + 1);
    } else {
      editLike(post._id, post.reaction - 1);
      // localStorage.setItem('like', 0);
      setLikesCount(likesCount - 1);
    }
    setFlag(!toggle);
  }
  else{
    navigate('/login')
  }
  };

  // useEffect(() => {
  //   setFlag(localStorage.getItem('like') === '1' ? true : false);
  // }, []);

  return (
    <>
     {/* <Update post={post} refOpen={refOpen} refClose={refClose} /> */}
   
    <div className="post-card">
      <img style={{ height: '350px' }} src={post.image} alt={`Post ${post.id}`} />
      <div className="caption">
        <p className="caption-text " style={{marginBottom:'60px',textAlign:'center'}}>{post.title}</p>
      </div>
      <div className="post-actions">
        <div className="" style={{ display: 'flex', flexDirection: 'column' }}>
          <i
            onClick={togglelike}
            className="fa-solid fa-heart"
            style={{ color: `${toggle ? 'red' : 'grey'}` }}
          ></i>
          <span style={{ fontSize: '15px' }} className="">
            {' '}
            {likesCount} Likes
          </span>
        </div>
        <i
          style={{ marginTop: '-25px', marginLeft: '-25px',  }}
          className="fa-regular fa-comment"
          onClick={()=>{refOpen2.current.click();setPost(post)}}
        ></i>
        {
        data.isOwner?<><i
        style={{ marginTop: '-25px',  }}
      className="fa-solid fa-trash mx-1"
      onClick={() =>{ deletepost(post._id); getUserInfo();alert("Deleted successfully");window.location.reload()}}
    ></i>
    <i
     style={{ marginTop: '-25px',  }}
      className="fa-regular fa-pen-to-square  "
      onClick={() => {refOpen.current.click();setPost(post)}}
    ></i></>:<div className='mx-2'></div>
        }
        <input
        className='mx-2'
          type="text"
          placeholder="Add a comment..."
          value={comment}
          onChange={handleCommentChange}
        />
        <button onClick={handleAddComment}>Post</button>
      </div>
     
    </div>
    </>
  );
};

export default PostCard;
