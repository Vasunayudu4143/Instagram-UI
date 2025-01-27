import { useEffect, useState } from "react";
import Header from "../components/header";
import { useParams } from "react-router-dom";
import '../css/profile.css';
import { useRef } from "react";

function Profile()
{
   let params=useParams();
  

   let[ProfileInfo,setProfileInfo]=useState();
   console.log(ProfileInfo);

   let user_info=useRef(JSON.parse(localStorage.getItem("user_info")));
   

   useEffect(()=>{
     fetch(`http://localhost:3001/users/profile/${params?.username}/${user_info.current.userid}`)
     .then(response=>response.json())
     .then((data)=>{
      setProfileInfo(data);
     })
     .catch((err)=>{
      console.log(err);
     })
   },[params])


   function follow()
   {
      fetch(`http://localhost:3001/connect/connections`,{
         method:'POST',
         headers:{
            'Content-Type':'application/json',
         },
         body:JSON.stringify({follower_id:user_info.current.userid,following_id:ProfileInfo.userinfo._id})
      })
      .then((response)=>response.json())
      .then((data)=>{
         

         let tempprofile={...ProfileInfo};
         tempprofile.connection=data.connection;
         tempprofile.followers.push(data.connection);
         setProfileInfo(tempprofile);
      })
      .catch((err)=>{
         console.log(err);
      })
   }


   function unfollow()
   {
      fetch(`http://localhost:3001/connect/unfollow/${ProfileInfo.connection._id}`,{
         method:"DELETE"
      })
      .then((response=>response.json()))
      .then((data)=>{
         let tempprofile={...ProfileInfo};
         let index=tempprofile?.followers?.findIndex((connectionData,index)=>{
            return connectionData?.follower_id===tempprofile.connection.follower_id&&connectionData?.following_id===tempprofile.connection.following_id;
         })
        tempprofile.followers.splice(index,1);
        tempprofile.connection=data;
        setProfileInfo(tempprofile);
      })
      .catch((err)=>{
         console.log(err);
      })
   }


   function profileButtons()
   {
        if(ProfileInfo?.connection?.status==='accepted')
        {
         return(
            <div className="user-btns">
               <button className="user-btn"onClick={unfollow}>Following</button>
               <button className="user-btn">Message</button>
               <button className="user-btn"> <i className="fa-solid fa-user-plus"></i></button>
            </div>
         )
        }
        else if(ProfileInfo?.connection?.status==='pending')
        {
            return(
               <div className="user-btns">
               <button className="user-btn">Requesting</button>
               <button className="user-btn"> <i className="fa-solid fa-user-plus"></i></button>
            </div>
            )
        }
        else if(ProfileInfo?.connection?.status==='same')
        {
          return(
            <div className="user-btns">
            <button className="user-btn">EditProfile</button>
            <button className="user-btn"> <i className="fa-solid fa-user-plus"></i></button>
         </div>
          )
        }
        else
        {
          return(
            <div className="user-btns">
               <button className="user-btn" onClick={follow}>Follow</button>
               <button className="user-btn">Message</button>
               <button className="user-btn"> <i className="fa-solid fa-user-plus"></i></button>
            </div>
          )
        }
   }




    return(
        <>
         <Header/>
         <div className="profile-area">
           <div className="profile-section">
             <div className="user-details">
                <div className="user-profilepic">
                  <div className="profile-pic">
                  <img alt="userprofile" src="https://tse1.mm.bing.net/th?id=OIP.wU2TNRxk68paPBwCZ_MWNAHaHa&pid=Api&P=0&h=180"/>

                  </div>
                </div>
                <div className="user-info">
                   <div className="row-1">
                      <div className="username">
                        <h2>{ProfileInfo?.userinfo?.username}</h2>
                      </div>

                    {
                     profileButtons()
                    }

                    



                      <div className="more">
                      <i className="fa-solid fa-ellipsis"></i>
                      </div>
                   </div>
                   <div className="row-2">
                      <p><span>{ProfileInfo?.posts?.length}</span>posts</p>
                      <p><span>{ProfileInfo?.followers?.length}</span>followers</p>
                      <p><span>{ProfileInfo?.following?.length}</span>following</p>
                   </div>
                   <div className="row-3">
                         <h4>{ProfileInfo?.userinfo?.name}</h4>
                         <p>Looser of My own World</p>
                         <p>Me vs World</p>
                         <p>No Concept of Marriage</p>
                   </div>
                </div>
             </div>
             <div className="profile-posts">
              
             {
               ProfileInfo?.posts?.map((post,index)=>{
                  return (
                     <div className="profile-post" key={index}>
                        <img src={post.contents[0]} alt=""/>
                     </div>
                  )
               })
              }
              
    
           </div>
           </div>
         </div>
        </>
    )

}
export default Profile;