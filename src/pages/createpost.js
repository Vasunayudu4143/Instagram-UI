import '../css/createpost.css';
import Header from '../components/header.js';
import { useRef } from 'react';
function Createpost()
{
 
   let UserLoggedIn=useRef(JSON.parse(localStorage.getItem("user_info")));

    let post=new FormData();
    post.append("user",UserLoggedIn.current.userid);

    function getValues(property,value)
    {
       post.append(property,value);   
    }

    function CreatePost()
    {
        fetch("http://localhost:3001/instaposts/createpost",{
         method:"POST",
         body:post
        })
        .then(res=>res.json())
        .then((data)=>{
         console.log(data);
        })
        .catch((err)=>{
         console.log(err);
        })
    
    }
    return(

        <>
          <Header/>
           <div className="createform">

            <form className='create-post'>
                 <div>
                     <h3>Select files</h3>
                     <input type='file' onChange={(event)=>{
                        getValues("contents",event.target.files[0]);
                     }}/>
                 </div>
                 <input type='text ' placeholder='Caption' className='cr-input' onBlur={(event)=>{
                    getValues("caption",event.target.value);
                 }} />
                 <input type='text' placeholder='Location' className='cr-input' onBlur={(event)=>{
                    getValues("location",event.target.value);
                 }}/>
                 <button className='cr-btn' onClick={()=>{CreatePost()}}>Upload</button>
            </form>

           </div>
        </>

       

    )
}


export default Createpost;