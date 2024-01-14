import React, { useContext, useRef, useState } from 'react'
import PostContext from '../context/posts/PostContext';

export default function CreatePost({refOpen,refClose,handleTabClick}) {
  
    const context = useContext(PostContext);
    const { addpost } = context;
  const handleClick = async(e) => {
    e.preventDefault();
    await addpost(post.title,post.image).then(
     setpost({ title: "", image:"" }),
    alert("Post Added Successfully"),

    refClose.current.click(),
    window.location.reload()
   )
  };
    const [post, setpost] = useState({ title: "",image:"" });
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

<button type="button" ref={refOpen} hidden={true} class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModaladdpost">
  Launch demo modal
</button>

<div class="modal fade" id="exampleModaladdpost" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div class="modal-dialog modal-dialog-centered">
    <div class="modal-content">
      <div class="modal-header">
        <h1 class="modal-title fs-5" id="exampleModalLabel">Create new Post</h1>
        <button type="button" ref={refClose} onClick={()=>{setpost({ title: "",image:"" });handleTabClick('home')}} class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div class="modal-body" style={{height:'400px'}}>
        <div >
            {post.image!==null&& post.image!==""?<>
            <div style={{display:'flex',justifyContent:'center'}}>
              <img src={post.image} style={{height:'300px',width:'250px'}} alt="image"/>
              
            </div>
            <div className="d-flex mt-4" >
          <label htmlFor="title" className="form-label">
            Add Caption
          </label>
          <input
            type="text"
            minLength={5}
            style={{maxWidth:'250px'}}
            value={post.title}
            required
            className="form-control mx-4"
            id="title"
            onChange={onChange}
            placeholder='add caption of min 5 character'
            name="title"
            aria-describedby="emailHelp"
          />
           <button
          disabled={post.title.length < 5}
          type="submit"
          className="btn btn-primary"
          onClick={(e)=>{handleClick(e)}}
        >
         Post
        </button>
        </div>
            </>:<>
            <div style={{display:'flex',alignItems:'center',justifyContent:'center', fontSize:'30px',fontWeight:'bolder',marginBottom:'30px'}}>Select From Computer</div>
        <div className="mb-3" style={{display:'flex',justifyContent:'center'}}>
          <label htmlFor="image" className="btn btn-primary " style={{cursor:'pointer', border:'1px solid black',borderRadius:'10px', padding:'10px' ,}}>
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
           
        </div></>}
        </div>
      </div>
  
    </div>
  </div>
</div>
    </div>
  )
}
