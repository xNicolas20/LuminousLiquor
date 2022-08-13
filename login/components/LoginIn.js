import React, { useState } from "react";
import { useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import jwtDecode from "jwt-decode";
import "./LoginInput.css";
import FacebookLogin from 'react-facebook-login';
import Homepage from "../../homepage/page/Homepage.js";
// import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Toast from 'react-bootstrap/Toast';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import Input from 'react-toolbox/lib/input';
import CustomizedSnackbars from "../../components/CustomizedSnackbars";
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import { CDBFooter, CDBFooterLink, CDBBox, CDBBtn, CDBIcon } from 'cdbreact';






const LoginInput = ({ setLogInUser }) => {




  const navigate = useNavigate();

  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    setUser({
      ...user,

      [name]: value,
    });
  };

  useEffect(() => {
    /* global google */
     google.accounts.id.initialize({
      client_id: "414670761774-ftj5v3ksdicj08pgq778bef8k1e5fm9f.apps.googleusercontent.com",
      callback: handleCallback
     });
  
     google.accounts.id.renderButton(
      document.getElementById("sign"),
      { type: "standard", theme: "filled_blue", size: "large", shape: "rectangular", width: "280", logo_alignment: "left"}
     );
   }, []);
  

   function handleCallback(response){
    console.log(response)
    try {
      axios.post("https://luminious-liquor.herokuapp.com/googleLogin", {tokenId: response.credential}).then((res) => {
      alert(res.data.message);

     



      if(res.data.user !== undefined){
        sessionStorage.setItem('myUser', JSON.stringify(res.data.user))
        let x = sessionStorage.getItem('myUser')
        x = JSON.parse(x)
        console.log(x.email)
        setLogInUser(res.data.user);
      }
      navigate("/");
    }); 
    } catch (err) {
      console.log(err)
    }
    }

    const responseFacebook = async (response) => 
    {
    try {
      const {accessToken, userID} = response
      axios.post("https://luminious-liquor.herokuapp.com/facebookLogin", {accessToken, userID}).then((res) => {
      document.getElementById("xyzzz").innerHTML = res.data.message;
      if(res.data.user !== undefined){
        sessionStorage.setItem('myUser', JSON.stringify(res.data.user))
        let x = sessionStorage.getItem('myUser')
        x = JSON.parse(x)
        console.log(x.email)
        setLogInUser(res.data.user);
      }
      navigate("/");
    }); 
    } catch (err) {
      console.log(err)
    }
    }

    useEffect(()=> {
      let data = sessionStorage.getItem('myUser')
      data = JSON.parse(data)
      console.log(data)
      if(data==null){
        navigate("/login")
      }else{
        navigate("/homepage")
      }
  }, [user])

  const login = () => {
    axios.post("https://luminious-liquor.herokuapp.com/login", user).then((res) => {
      // alert(res.data.message);
      if(res.data.message != "success"){
      setOpen(true);
      }
      setLogInUser(res.data.user);
      if(res.data.user.email === user.email){
        sessionStorage.setItem('myUser', JSON.stringify(res.data.user))
        let x = sessionStorage.getItem('myUser')
        x = JSON.parse(x)
        console.log(x.email)
      }
      navigate("/")
    });
  };

  const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
  });

  const [showA, setShowA] = useState(true);
  const [showB, setShowB] = useState(true);

  const toggleShowA = () => setShowA(!showA);
  const toggleShowB = () => setShowB(!showB);

  const [open, setOpen] = React.useState(false);

  const handleClick = () => {
    setOpen(true);
  };

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };

  return (
   
    <div className="login-input">
      <section class="vh-100">
  <div class="container-fluid">
    <div class="row">
      <div class="col-sm-6 text-black">

        <div class="px-5 ms-xl-4">
          <i class="fas fa-crow fa-2x me-3 pt-5 mt-xl-4"></i>
          <span class="h1 fw-bold mb-0">Logo</span>
        </div>

        <div class="d-flex align-items-center h-custom-2 px-5 ms-xl-4 mt-5 pt-5 pt-xl-0 mt-xl-n5">

          <form >

            <h3 class="fw-normal mb-3 pb-3" >Log in</h3>

            <div class="form-outline mb-4">
              <input type="email" id="form2Example18" class="form-control form-control-lg" />
              <label class="form-label" for="form2Example18">Email address</label>
            </div>

            <div class="form-outline mb-4">
              <input type="password" id="form2Example28" class="form-control form-control-lg" />
              <label class="form-label" for="form2Example28">Password</label>
            </div>

            <div class="pt-1 mb-4">
              <button class="btn btn-info btn-lg btn-block" type="button">Login</button>
            </div>

            <p class="small mb-5 pb-lg-2"><a class="text-muted" href="#!">Forgot password?</a></p>
            <p>Don't have an account? <a href="#!" class="link-info">Register here</a></p>

          </form>

        </div>

      </div>
      <div class="col-sm-6 px-0 d-none d-sm-block">
        <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/img3.webp"
          alt="Login image" class="w-100 vh-100" ></img>
      </div>
    </div>
  </div>
</section>

      
    </div>
  );
};

export default LoginInput;