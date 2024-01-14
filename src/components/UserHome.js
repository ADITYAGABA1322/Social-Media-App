import React, { useEffect, useState } from 'react'
import InstagramChannelPage from './InstaChannelPage.js';
export default function UserHome() {
    const [data,setData]=useState("");
    const [invalid,setInvalid]=useState(false);
    const getUserInfo=async()=>{
        const response = await fetch(`http://localhost:4000/api/auth/user/${localStorage.getItem('name')}`, {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              "auth-token": localStorage.getItem("token"),
            },
          });
            const json = await response.json();
            console.log("GET",json);
            if(json==="")setInvalid(true);
            setData(json);
    }
    useEffect(()=>{
        getUserInfo()
    },[])
  return (
    <div  style={{marginTop:'100px'}}>
     {data===""&&!invalid ? "Wait":
     invalid?"invalid":<InstagramChannelPage data={data} getUserInfo={getUserInfo}/> }
    </div>
  )
}
