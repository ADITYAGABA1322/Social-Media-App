// InstagramChannelPage.js
import React, { useContext, useEffect, useRef, useState } from 'react';
import PostCard from "./PostCard.js"
import './Igchannel.css'; // Import the CSS file for styling
import { useNavigate } from 'react-router-dom';
import PostContext from '../context/posts/PostContext.js';
const InstagramChannelPage = ({data, getUserInfo}) => {
  const [followersCount, setFollowersCount] = useState(data?.followersCount);
  const [followingCount, setFollowingCount] = useState(data?.followingToCount);
  const [isFollowing,setisFollowing]=useState(data.isFollowing);
  const refOpen = useRef(null);
  const refOpen2 = useRef(null);
  const refClose = useRef(null);
  const [post,setPost]=useState({_id:'',title:''});
  const navigate=useNavigate();
  const handleFollowToggle =async () => {
  if(localStorage.getItem("token")){
    console.log("dataid",data._id)
    if(isFollowing ){
      // console.log("Inside If")
     // DO UNFOLLOW
        
     await fetch("http://localhost:4000/api/follow/unfollow",
     {
       method: "DELETE",
       headers: {
         "Content-Type": "application/json",
         "auth-token": localStorage.getItem("token"),
       },
       body: JSON.stringify({ page_id: data._id }),
     }
   )
   .then(
    setisFollowing(false),
    setFollowersCount(followersCount-1),
    //  getUserInfo(),
     alert( "UnFollowed Successfully")
   )
   .catch((err)=>alert("Failed TO UnFolllow"))
    }
    else{
      //DO FOLLOW 
      console.log("Inside else")

    await fetch("http://localhost:4000/api/follow/dofollow",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "auth-token": localStorage.getItem("token"),
        },
        body: JSON.stringify({ page_id: data._id }),
      }
    )
    .then(
      setisFollowing(true),
      setFollowersCount(followersCount+1),
      // getUserInfo(),
      alert( "Followed Successfully")
    )
    .catch((err)=>alert("Failed TO Folllow"))

    }
  }
  else{
    navigate('/login')
  }
  };
useEffect(()=>{
 
},[])
let imgSrc="https://media.istockphoto.com/id/1131164548/vector/avatar-5.jpg?s=612x612&w=0&k=20&c=CK49ShLJwDxE4kiroCR42kimTuuhvuo2FH5y_6aSgEo="
const ConvertToBase64=(file)=>{
  const reader=new FileReader();
  reader.readAsDataURL(file);
  reader.onload=async()=>{
    console.log(reader.result);
    imgSrc=reader.result
    await fetch("http://localhost:4000/api/auth/avatar",
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "auth-token": localStorage.getItem("token"),
        },
        body: JSON.stringify({avatar:reader.result  }),
      }
    ).then(window.location.reload())
  }
}
  return (
    <div className="channel-page" style={{paddingBottom:'100px'}}>
      <div className="user-info">
        <div>
        {/* <img  src={imgSrc} alt="User Avatar" />    */}
        <label htmlFor="image1" className="btn btn-primary " style={{cursor:'pointer', border:'none' ,background:'none'}}>
        <img  src={data.avatar?data.avatar:imgSrc} alt="User Avatar" /> 
          </label>
          {
             localStorage.getItem('token') && data.isOwner?
          <input
          style={{display:'none'}}
            type="file"
            accept="image/*"
            onChange={(e) => {ConvertToBase64(e.target.files[0])}}
            name="image"
            id="image1"
          
            />     :''
          }
        </div>
       
        <div className="username" style={{marginTop:'-40px',}}>{data?.name}
       {data?.isOwner?<button className='mx-3 unfollow-button'>Edit Profile</button>:<button className={ isFollowing ? 'mx-3 unfollow-button' : 'mx-3 follow-button'} onClick={handleFollowToggle}>
          {isFollowing ? 'Unfollow' : 'Follow'}
        </button>}
        </div>

      </div>
        <div className="counts" style={{display:'flex',marginLeft:'100px',marginTop:'-50px'}}>
          <div className="count">Posts: {data?.allpost.length}</div>
          <div className="count">Followers: {followersCount}</div>
          <div className="count">Following: {followingCount}</div>
        </div>
        
      <div className="posts my-4">
        {data?.allpost.map((post,i) => (
          <PostCard key={i} post={post} refOpen2={refOpen2} data={data}  getUserInfo={ getUserInfo} refOpen={refOpen} refClose={refClose} setPost={setPost} />
        ))}
      </div>
   <Update post={post} refOpen={refOpen}  refClose={refClose} setPost={setPost}/>
   <ViewCmnt refOpen={refOpen2} post={post} />
    </div>
  );
};

export default InstagramChannelPage;

const Update=({post,refOpen,refClose,setPost})=>{
  const context = useContext(PostContext);
  const {  editpost } = context;
  const handleClick = (e) => {
    editpost(post?._id, post.title);
    refClose.current.click();
    window.location.reload()
  };

  const setTitle=(e)=>{
    setPost({...post,[e.target.name]:e.target.value});
  }
return(
  <>
    <button
        type="button"
        ref={refOpen}
        className="btn btn-primary d-none"
        data-bs-toggle="modal"
        data-bs-target="#exampleModalmy1"
      >
        Launch demo modal
      </button>
      <div
        className="modal fade"
        id="exampleModalmy1"
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
                  onChange={setTitle}
                  value={post.title}
                  name="title"
                  aria-describedby="emailHelp"
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
                disabled={post.title?.length < 5 }
                onClick={handleClick}
                className="btn btn-primary"
              >
                Update post
              </button>
            </div>
          </div>
        </div>
      </div>
  </>
)
}
const ViewCmnt=({post,refOpen})=>{

return(
  <>
    <button
        type="button"
        ref={refOpen}
        className="btn btn-primary d-none"
        data-bs-toggle="modal"
        data-bs-target="#exampleModalcmnt"
      >
        Launch demo modal
      </button>
      <div class="modal fade" id="exampleModalcmnt" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div class="modal-dialog modal-lg">
    <div class="modal-content">
      <div class="modal-header">
        <h1 class="modal-title fs-5" id="exampleModalLabel" style={{textAlign:'center'}}>View Post</h1>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div class="modal-body">
        <div className='d-flex ' style={{display:'flex',justifyContent:''}}>
          <div >
           <img  style={{height:'400px',width:'350px'}} src={post.image}/>
          </div>
          <div style={{display:'flex',flexDirection:'column', marginLeft:'10px' }}>
             <h1 style={{textAlign:'center',marginLeft:'100px'}}>Comments</h1>
             {
              post?.comment?.length>0?post.comment.map((item,i)=>{
                return(
                  <>
                  <div style={{border:'1px slate solid', background:'#b3bec8', borderRadius:'20px', marginBottom:'10px',marginLeft:'100px',display:'flex',justifyContent:'space-evenly'}}>
                      <img style={{width:'30px',height:'30px', borderRadius:'50px',marginTop:'5px'}}src={"https://media.istockphoto.com/id/1131164548/vector/avatar-5.jpg?s=612x612&w=0&k=20&c=CK49ShLJwDxE4kiroCR42kimTuuhvuo2FH5y_6aSgEo="}/>
                    <h3 style={{textAlign:'center'}}>
                      {item}</h3>  
                  </div>
                  </>
                )
              }):<div style={{display:'flex'}}>No Comments to display</div>
             }
          </div>  
        </div>
      </div>
      <div class="modal-footer">
        {/* <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button> */}
        {/* <button type="button" class="btn btn-primary">Save changes</button> */}
      </div>
    </div>
  </div>
</div>
  </>
)
}