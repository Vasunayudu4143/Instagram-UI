import { Link } from "react-router-dom";
import "../css/login.css";
import Signup from "./signup";
import { useNavigate } from "react-router-dom";

function Login() {

  let navigate=useNavigate();

  var loginInfo={};
  function getValues(property,value)
  {
      loginInfo[property]=value;
  }

  function login()
  {
    fetch("http://localhost:3001/users/login",{
      method:"POST",
      headers:{
        "Content-Type":"application/json"
      },
      body:JSON.stringify(loginInfo)
    })
    .then((response)=>response.json())
    .then((info)=>{
      if(info.success===true)
      {
         localStorage.setItem("user_info",JSON.stringify(info));
         alert('login successful');
         navigate("/homepage");
      }
      else
      {
        alert('login failed');
        console.log(info);
      }
    })
    .catch((err)=>{
      console.log("some problem occured while login");
    })
  }

 

  return (
    <div className="login">
      <div className="login-mobileimg">
        <img src="./images/mobileimage.jpeg" alt="" />
      </div>

      <div className="login-container">
        {/* block 1 */}
        <div className="login-sec">
          <div className="logo-section">
            <img src="./images/instagramname.jpg" />
          </div>

          <div className="login-form">
            <input type="text" placeholder="username or email" onKeyUp={(event)=>{
              getValues("email_username",event.target.value);
            }} />
            <input type="password" placeholder="password" onKeyUp={(event)=>{
              getValues("password",event.target.value);
            }}/>
            <div className="forgot-password">
              <a href="hkh">
                forgot password ?
              </a>
            </div>
            <button className="sub-btn" onClick={()=>{login()}}>Submit</button>
          </div>

          <div className="line-section">
            <div className="line1"></div>
            <div>OR</div>
            <div className="line2"></div>
          </div>

          <button className="log-btn">
            <i className="fa-brands fa-square-facebook"></i>
            <span>Login with facebook</span>
          </button>
        </div>

        <div className="already-account">
          <span>
            Dont Have an Account ?{" "}
            <Link className="something" to="/register">
              
                Sign Up
            
            </Link>
          </span>
        </div>
      </div>
    </div>
  );
}

export default Login;
