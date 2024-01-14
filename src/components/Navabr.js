import React, { useRef, useState } from "react";
import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";

export default function Navabr() {
  const location = useLocation();
  const [username,setUsername]=useState("");
  const [data,setData]=useState('');
  const open=useRef(null);
  const close=useRef(null);
  const navigate=useNavigate();
//   useEffect(() => {console.log(location.pathname)}, [location]);
const search=async()=>{
  const response = await fetch(`http://localhost:4000/api/auth/user/${username}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "auth-token": localStorage.getItem("token"),
    },
  });
  open.current.click();
    const json = await response.json();
    setData(json);
    setUsername("")
    console.log(json);
}
  return (
    <div >
    
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark fixed-top">
        <div className="container-fluid">
          <Link className="navbar-brand" to="/">
            Instagram
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link className={`nav-link ${location.pathname==='/'?'active':""}`} aria-current="page" to="/">
                  Home
                </Link>
              </li>
              <li className="nav-item">
                <Link className={`nav-link ${location.pathname==='/about'?'active':""}`} to="/about">
                  About
                </Link>
              </li>
            </ul>
            <div>
              <input  className='mx-2'
          type="text" style={{borderRadius:'10px',padding:'10px'}} value={username} onChange={(e)=>{setUsername(e.target.value)}} placeholder="search by username"/>
              <button className="btn btn-danger mx-4" onClick={search}>
                Search
              </button>
            </div>
           {localStorage.getItem('token')? <button className="btn btn-primary mx-2" onClick={()=>{localStorage.removeItem('token');alert('LoggedOut');navigate('/login')}} >
                LogOut
              </button>: <form className="d-flex" role="search">
              <Link className="btn btn-primary mx-2"  to='/login'>
                Login
              </Link>
              <Link className="btn btn-primary mx-2" to='/signup'>
                SignUp
              </Link>
            </form>}
          </div>
        </div>
      </nav>
        <Modal open={open} close={close} data={data}/>
        <Outlet />
    </div>
  );
}


const Modal=({open,close,data})=>{
  const navigate=useNavigate();
 return(
  <>
  <button type="button" hidden={true}  ref={open} class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal12">
    Launch demo modal
  </button>
  

  <div class="modal fade" id="exampleModal12" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered">
      <div class="modal-content">
        <div class="modal-header">
          <h1 class="modal-title fs-5" id="exampleModalLabel">Users</h1>
          <button type="button" ref={close} class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
         { !data ?<div className="user-info">No user found</div>:
         <>
           <div className="user-info">
        <img onClick={()=>{navigate(data.name);close.current.click();}} style={{cursor:'pointer'}}  src={"https://media.istockphoto.com/id/1131164548/vector/avatar-5.jpg?s=612x612&w=0&k=20&c=CK49ShLJwDxE4kiroCR42kimTuuhvuo2FH5y_6aSgEo="} alt="User Avatar" />
          <div onClick={()=>{navigate(data.name);close.current.click();}} style={{border:'1px black solid',borderRadius:'20px',padding:'20px',cursor:'pointer'}}>{data.name}</div>
        </div>
         </>
          }
        </div>
      
      </div>
    </div>
  </div></>
 )
}
