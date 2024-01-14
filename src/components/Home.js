import { useEffect } from "react";
import UserHome from "./UserHome";
import { useNavigate } from "react-router-dom";

export default function Home() {
const navigate=useNavigate()
  useEffect(()=>{
    if(!localStorage.getItem("token")){
      navigate('/login')
    }
  },[])
  return (
    <div className=" container my-3 " style={{marginTop:'400px'}}>

      <UserHome/>
    </div>
  );
}
