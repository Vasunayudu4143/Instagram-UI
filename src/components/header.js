import { Link } from 'react-router-dom';
import '../css/header.css';
import { useState ,useRef} from 'react';


function Header()
{
    let user_info=useRef(JSON.parse(localStorage.getItem("user_info")));

    let[searchResults,setSearchResults]=useState();

    function SearchUsers(username)
    {
        if(username!=='')
        {
            fetch(`http://localhost:3001/users/search/${username}`)
            .then((response)=>response.json())
            .then((data)=>{
                if(data.success===true)
                {
                    setSearchResults(data.users);
                }
            })
            .catch((err)=>{
                console.log(err);
            })
        }
        else
        {
            setSearchResults([]);
        }
     
    }

    return(
       <div className="header-container">
            
            <Link to={'/homepage'}>            <img src='../images/instagramname.jpg' className='header-logo' alt='insstagram logo'/> 
</Link>
            <div className='header-search-container'>
                <div className='header-search-input'>
                <i className="fa-solid fa-magnifying-glass"></i>
                    <input placeholder='Enter username' type='text' onChange={(event)=>{
                        SearchUsers(event.target.value);
                    }}/>
                </div>
                <div className='header-search-results'>
                    
                    {

                        searchResults?.length!==0?(
                            searchResults?.map((user,index)=>{
                            return(
                               
                             <div className='header-search-result' key={index}>
                                <img src="https://th.bing.com/th/id/OIP.ho7hCKNowRHh7u5wu1aMWQHaF9?w=242&h=194&c=7&r=0&o=5&dpr=1.5&pid=1.7" alt='profile pic of searched resulst'/>
                                <Link to={'/profile/'+user.username}>  <p className='search-results-details'>
                                 <span>{user.username}</span>
                                 <span>{user.name}</span>
                               </p>
                               </Link>
                            </div>
                            )
                        })
                        ):null


                    }
                      
                    
                </div>
            </div>
           <div className='header-icons'> 
          <Link to='/homepage'> <i className="fa-solid fa-house"></i></Link>
           <i className="fa-brands fa-facebook-messenger"></i>
           <i className="fa-solid fa-compass"></i>
           <i className="fa-regular fa-heart"></i>
           <div className='header-profile'>
               <Link to={`/profile/${user_info.current.username}`}>
               <img src={user_info.current.profilepic} alt='profilepic is amazing'/>
              </Link>
           </div>
            </div>
       </div>
    )
}

export default Header;