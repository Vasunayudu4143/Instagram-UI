import { Link, Navigate, useNavigate } from 'react-router-dom';
import '../css/signup.css';
import { useRef } from 'react';
function Signup()
{

    let form=useRef();
    let navigate=useNavigate();

    var user={};

    function getData(property,value)
    {
        user[property]=value;
    }

    function register()
    {
        fetch("http://localhost:3001/users/register",{
            body:JSON.stringify(user),
            method:"POST",
            headers:{
                "Content-Type":"application/json"
            }
        })
        
        .then(response=>response.json())
        .then((doc)=>{

            if(doc.success===true)
            {
                
                form.current.reset();
                alert('registered successfully');
                navigate('/login');

            }
            else
            {
                console.log(doc);
            }
         
        })
        .catch((err)=>{
            console.log(err);
        })
    }


    
    
    return(
        <>
            <div className='signup-container'>

               <div className='signup-content'>
                      <div className='signup'>
                            <div className='logo'><img src='https://gamingstreet.com/wp-content/uploads/2019/10/Instagram_logo_wordmark_logotype-1200x675.png' alt='descript'/></div>
                            <div className='signup-about'>
                                <p>Sign up to see photos and videos from your friends </p>
                            </div>
                                <button className='signup-fb-btn'><span className='fa-brands fa-square-facebook'></span>Login With Facebook</button>
                            <div className='form-fields'>
                                <form ref={form} >
                                <input type='text' className='signup-inp' placeholder='Fullname' onKeyUp={(event)=>{getData("name",event.target.value);}}/>
                                <input type='email' className='signup-inp' placeholder='Email or Mobile number' onKeyUp={(event)=>{
                                    getData("email",event.target.value);
                                }}/>
                                <input type='username' className='signup-inp' placeholder=' Username' onKeyUp={(event)=>{
                                    getData("username",event.target.value);
                                }}/>
                                <input type='password' className='signup-inp' placeholder='Password' onKeyUp={(event)=>{
                                    getData("password",event.target.value);
                                }}/>
                                <button type='button' className='signup-btn' onClick={()=>{register();}}>Sign up</button>
                                </form>
                            </div>

                            <div className='service-content'>
                                <p>People who use our service may have uploaded your contact information to Instagram. Learn More</p>
                            </div>
                            <div className='service-content'>
                                By signing up, you agree to our <a href='/'>Terms</a> , <a href='/'>Privacy Policy</a> and <a href='/'>Cookies Policy</a> .
                            </div>
                        </div>

                        <div className='login-section'>
                            <div><p>Have an account ?<Link to='/login'>Log in</Link></p></div>
                        </div>

                        <div className='app-store'>
                            <div>
                                <span>Get the app</span>
                            </div>
                            <div className='store-img'>
                               <a href='a'><img className='google-play' src='https://res.cloudinary.com/ds57cmzxo/image/upload/f_auto,q_80/Webseite/grafiken/play-store-logo' alt='a'/></a>
                               <a href='a'><img className='microsoft-store' src='https://res.cloudinary.com/practicaldev/image/fetch/s--f3JQvV-P--/c_limit%2Cf_auto%2Cfl_progressive%2Cq_auto%2Cw_880/https://raw.githubusercontent.com/spikespaz/search-deflector/master/assets/store.png' alt='b'/></a>
                            </div>
                        </div>
                </div>

                <div className='footer-section'>
                       <div className='footer-types'>
                           <ol>
                            <li>Meta</li>
                            <li>About</li>
                            <li>Blogs</li>
                            <li>Jobs</li>
                            <li>Api</li>
                            <li>Help</li>
                            <li>Privacy</li>
                            <li>Terms</li>
                            <li>Locations</li>
                            <li>Instagram lite</li>
                            <li>Treads</li>
                            <li>Contact</li>
                            <li>Uploading&non-users</li>
                            <li>Meta verified</li>
                           </ol>
                       </div>

                       <div className='language'>
                         <div>
                            <span>English</span>
                            <select>
                               <option value=""></option>
                                <option>Telugu</option>
                                <option value="हिंदी">हिंदी</option>
                            </select>
                         </div>
                         <span>2023 Instagram form Meta</span>
                       </div>
                </div>

                
            </div>
        </>
    )
}

export default Signup;