import "../css/homepage.css";
import Header from "../components/header";
import { useEffect, useRef, useState } from "react";

function Homepage() {

  let user_info=useRef(JSON.parse(localStorage.getItem("user_info")));
  let [posts,setposts]=useState([]);
  let [singlePost,setSinglePost]=useState({});
  let[commentModel,setCommentModel]=useState(false);
  let commentfield=useRef();
  let comment={};
  comment["user_id"]=user_info.current.userid;

  useEffect(()=>{
    fetch(`http://localhost:3001/instaposts/posts/${user_info?.current.userid}`)
    .then((response)=>response.json())
    .then((data)=>{
      if(data.success===true)
      {
        setposts(data.posts);      }
    })
    .catch((err)=>{
      
      console.log(err);
    })
  },[])

  function likePost(postid)
  {
    let like={user_id:user_info.current.userid,post_id:postid};
    fetch("http://localhost:3001/instaposts/like",{
      headers:{
        'Content-Type':'application/json',
      },
      method:"POST",
      body:JSON.stringify(like)  
    })
    .then((response)=>response.json())
    .then((data)=>{
      if(data.success===true)
      {
        
        let tempPosts=[...posts];
        let post=tempPosts.find((singlepost,index)=>{
          return singlepost._id===postid;
        })
        post.likes.push(data.likes);
        setposts(tempPosts);


          // or 
      //   let tempPosts=[...posts];
      //   tempPosts.forEach((post,index)=>{
      //     if(post._id===postid)
      //     {
      //       post.likes.push(like);
      //     }
      //   })
      //  setposts(tempPosts);
      }
      
    })
    .catch((err)=>{
      console.log(err);
    })
  }


  function Unlike(likedocumentid,postid)
  {
    
    fetch(`http://localhost:3001/instaposts/unlike/${likedocumentid}`,{
      method:"DELETE"
    })
    .then((response)=>response.json())
    .then((data)=>{
       if(data.success===true)
       {
      
          let tempPosts=[...posts];
        
          let post=tempPosts.find((po,index)=>{
            return po._id===postid;
          })
          let index=post?.likes?.findIndex((eachlikedoc)=>{
               return eachlikedoc._id===likedocumentid;
          })
          post?.likes?.splice(index,1);
          setposts(tempPosts);
       }

    })
    .catch((err)=>{
      console.log(err);
    })
  }

  function commentMsg(postid)
  {
    comment['post_id']=postid;
    if(comment.comment!==undefined && comment.comment.length!==0)
    {
 
      fetch('http://localhost:3001/instaposts/comment',{
        method:"POST",
        headers:{
          'Content-Type':'application/json',
        },
        body:JSON.stringify(comment)
      })
      .then((response)=>response.json())
      .then((data)=>{
        if(data.success===true)
        {
          console.log(data);
          console.log(commentfield.current.value);
          commentfield.current.value='';
          console.log(commentfield.current.value);

        }
      })
      .then((err)=>{
        console.log(err);
      })

  }

  }


  function postTime(presenttime,postcreatedtime)
  {
    let difference=presenttime-postcreatedtime; // by default the difference is in milliseconds
    let secondsdifference=Math.floor(difference/1000); // converted to seconds
    let minutesdifference=Math.floor(difference/1000/60); //converted to  minutes
    let hoursdifference=Math.floor(difference/1000/60/60); // converted to hours
    let daysdifference=Math.floor(difference/1000/60/60/24); // converted to days

    if(daysdifference<1)
    {
       if(hoursdifference<1)
       {
          if(minutesdifference<1)
          {
              return secondsdifference+"seconds Ago";
          } 
          else
          {
            return minutesdifference+"minutes Ago";
          }
       }  
       else
       {
        return hoursdifference+"hours Ago";
       }
    }
    else
    {
      return daysdifference+"days Ago";
    }

  }
let singlepostliked=null;
  function loadSinglepost(post)
  {
    setCommentModel(true);
    setSinglePost(post);
 
       singlepostliked=posts?.likes?.find((post,index)=>{
        return (post?.likes?.user_id===user_info?.current?.userid);
      })
 
    
  }




  return (
    <>
    <Header/>
    {
      commentModel===true?(
        <div className="comment-model" onClick={()=>{
          setCommentModel(false);
        }}>

          <div className='single-post-details' onClick={(e)=>{
            e.stopPropagation();
          }}>
            <div className="single-post-img">
               <img src={singlePost.contents[0]}/>
            </div>
            
            <div className="single-post-detail">

                 <div className="single-post-header-container">
                     <div className="single-post-header">
                          <img src="https://th.bing.com/th/id/OIP.ho7hCKNowRHh7u5wu1aMWQHaF9?w=242&h=194&c=7&r=0&o=5&dpr=1.5&pid=1.7" alt='profile pic of searched resulst'/>
                          <p>Username</p>
                     </div>
                     <i class="fa-solid fa-ellipsis"></i>
                 </div>

                 <div className="single-post-comments-area">

                 </div>

                 <div className="single-post-icons">
                     <div className="single-post-icons-parent">
                         <div className="single-post-first-icons">
                            {
                              singlepostliked===undefined?(
                                 <i className="fa-regular fa-heart" onClick={()=>{
                              likePost(singlePost._id);
                            }}></i>
                              ):(
                                <i className="fas fa-solid fa-heart red-heart" onClick={()=>{
                                  Unlike(singlePost._id);
                                }}></i>
                              )
                            }
                            
                            <i className="fa-regular fa-comment"></i>
                            <i className="fa-regular fa-paper-plane"></i>
                         </div>
                         <i className="fa-solid fa-bookmark"></i>
                     </div>

                     <p className="single-post-likes-count">{singlePost.likes.length} likes</p>
                     <p className="single-post-likes-time">2 days Ago</p>
                 </div>

                 <div className="comment-wrapper single-post-comment-section">
                   <i className="fa-regular fa-face-smile"></i>
                    <input type="text" placeholder="Add a comment..."></input>
                    <button className="post-btn" >post</button>
                 </div>


            </div>

          </div>

        </div>
      ):null
    }
    <div className="homepage-container">
      <div className="sidebar">
        <div className="home-logo">
          <img src="./images/instaname.png" alt="#" />
        </div>
        <div className="sidebar-icons">
          <div className="link">
            <i className="fa-solid fa-house"></i>
            <a href="#" alt=''>Home</a>
          </div>

          <div className="link">
            <i className="fa-solid fa-magnifying-glass"></i>
            <a href="#" >Search</a>
          </div>

          <div className="link">
            <i className="fa-solid fa-compass"></i>
            <a href="#">Explore</a>
          </div>

          <div className="link">
            <i className="fa-solid fa-clapperboard"></i>
            <a href="#">Reels</a>
          </div>

          <div className="link">
            <i className="fa-regular fa-paper-plane"></i>
            <a href="#">Messages</a>
          </div>

          <div className="link">
            <i className="fa-regular fa-heart"></i>
            <a href="#">Notifications</a>
          </div>

          <div className="link">
            <i className="fa-solid fa-plus"></i>
            <a href="#">Create</a>
          </div>
        </div>
        <div className="sidebar-more">
          <a href="#">More...</a>
        </div>
      </div>

      {/* story and post section  */}

      <div className="home-container">
        <div className="story-post-section">
          <div className="stories">
            
            <div className="story">
              <div className="story-overlay">
                <img src="./images/raviteja.webp" alt="" />
              </div>
              <p>Vasu_nayudu</p>
            </div>
            <div className="story">
              <div className="story-overlay">
                <img src="./images/raviteja.webp" alt="" />
              </div>
              <p>Vasu_nayudu</p>
            </div>
            <div className="story">
              <div className="story-overlay">
                <img src="./images/raviteja.webp" alt="" />
              </div>
              <p>Vasu_nayudu</p>
            </div>
            <div className="story">
              <div className="story-overlay">
                <img src="./images/raviteja.webp" alt="" />
              </div>
              <p>Vasu_nayudu</p>
            </div>
            <div className="story">
              <div className="story-overlay">
                <img src="./images/raviteja.webp" alt="" />
              </div>
              <p>Vasu_nayudu</p>
            </div>
            <div className="story">
              <div className="story-overlay">
                <img src="./images/raviteja.webp" alt="" />
              </div>
              <p>Vasu_nayudu</p>
            </div>
            <div className="story">
              <div className="story-overlay">
                <img src="./images/raviteja.webp" alt="" />
              </div>
              <p>Vasu_nayudu</p>
            </div>
            <div className="story">
              <div className="story-overlay">
                <img src="./images/raviteja.webp" alt="" />
              </div>
              <p>Vasu_nayudu</p>
            </div>
            <div className="story">
              <div className="story-overlay">
                <img src="./images/raviteja.webp" alt="" />
              </div>
              <p>Vasu_nayudu</p>
            </div>
            <div className="story">
              <div className="story-overlay">
                <img src="./images/raviteja.webp" alt="" />
              </div>
              <p>Vasu_nayudu</p>
            </div>
            <div className="story">
              <div className="story-overlay">
                <img src="./images/raviteja.webp" alt="" />
              </div>
              <p>Vasu_nayudu</p>
            </div>
          </div>

          {/* stories end  */}
          <div className="posts-container">


            {
               posts?.map((post,index)=>{

                let liked=post?.likes?.find((like,index)=>{
                  return like?.user_id===user_info?.current?.userid;
                })
                
                return(
                    
                  <div className="post" key={index}>
                    <div className="post-header-flex">
                      <div className="profile-info">
                            <img src={post?.user?.profilepic}/>
                            <p>{post?.user?.username}</p>
                            <ul>
                                <li></li>
                            </ul>
                              <p>{postTime(new Date(),new Date(post.createdAt))}</p>
                        </div>
                        <div className="three-dots">
                            <p>. . .</p>
                        </div>
                      </div>
                      <img src={post?.contents[0]} className="post-image"/>
                      <div className="post-icons-flex">
                        <div className="post-icons">
                          {
                            liked===undefined?(
                              <i className="fa-regular fa-heart" onClick={()=>{likePost(post?._id)}}></i>
                            ):(
                              <i className="fas fa-solid fa-heart red-heart" onClick={()=>{
                                Unlike(liked._id,post?._id)
                              }}></i>       
                             )
                          }
                          <i className="fa-regular fa-comment" onClick={()=>{
                            loadSinglepost(post);
                          }}></i>
                          <i className="fa-regular fa-paper-plane"></i>
                        </div>
                        <div className="bookmark">
                        <i className="fa-solid fa-bookmark"></i>
                        </div>
                      </div>
                      <p className="likes">{post?.likes?.length} likes</p>
                      <p className="caption"><span>{post?.user?.username}</span> {post?.caption}</p>
                     {
                      post.commentscount!==0?(
                        <>

                          <p className="comments" onClick={()=>{
                           loadSinglepost(post);
                          }}>View all {post?.commentscount} comments</p>
                          {
                             post.comments.map((comment,index)=>{
                              return(
                                <div className="comment-msg" key={index}>
                                   <p><span>{comment.user_id.username}</span> {comment.comment}</p>
                                </div>
                              )
                             })
                          }
                          
                        </>

                        
                      ):null
                     }

                      <div className="comment-wrapper">
                        <i className="fa-regular fa-face-smile"></i>
                        <input type="text" placeholder="Add a comment.." ref={commentfield} onChange={(e)=>{
                          comment["comment"]=e.target.value;
                        }}/>
                        <button className="post-btn" onClick={()=>{
                          commentMsg(post?._id);
                        }}>post</button>
                      </div>
   
               </div>

                )
               })
            }

         
         
          </div>
          

       
        </div>

        {/* posts and stories end here  */}

        <div className="suggestions">
          
          <div className="profile-switch-flex">
              <div className="our-profile-sugg">
                   <img src="./images/raviteja.webp" alt=""/>
                    <span>Vasu_nayudu</span>
              </div>
              <div className="switch">
                <a>Switch</a>
              </div>
          </div>

          <div className="suggested-foru">
            <span>Suggested for you</span>
            <span>See All</span>
          </div>

          <div className="profile-switch-flex">
              <div className="our-profile-sugg">
                   <img src="./images/raviteja.webp" alt=""/>
                    <span>Vasu_nayudu</span>
              </div>
              <div className="switch">
                <a href='#'>Follow</a>
              </div>
          </div>
          <div className="profile-switch-flex">
              <div className="our-profile-sugg">
                   <img src="./images/raviteja.webp" alt=""/>
                    <span>Vasu_nayudu</span>
              </div>
              <div className="switch">
                <a href="#">Follow</a>
              </div>
          </div>
          <div className="profile-switch-flex">
              <div className="our-profile-sugg">
                   <img src="./images/raviteja.webp" alt=""/>
                    <span>Vasu_nayudu</span>
              </div>
              <div className="switch">
                <a href="#">Follow</a>
              </div>
          </div>
          <div className="profile-switch-flex">
              <div className="our-profile-sugg">
                   <img src="./images/raviteja.webp" alt=""/>
                    <span>Vasu_nayudu</span>
              </div>
              <div className="switch">
                <a href="#">Follow</a>
              </div>
          </div>
          <div className="profile-switch-flex">
              <div className="our-profile-sugg">
                   <img src="./images/raviteja.webp" alt=""/>
                    <span>Vasu_nayudu</span>
              </div>
              <div className="switch">
                <a href="#">Follow</a>
              </div>
          </div>

          
        <div className="links">
           <ul>
             <li>About</li>
             <li>Help</li>
             <li>Press</li>
             <li>Api</li>
             <li>Jobs</li>
             <li>Privacy</li>
             <li>Terms</li>
             <li>Locations</li>
             <li>Languages</li>
             <li>Meta Verified</li>
           </ul>
        </div>

        <div className="meta">
          <span>2023 INSTAGRAM FROM META</span>
        </div>

        </div>


      </div>
    </div>

    </>
  );
}

export default Homepage;
