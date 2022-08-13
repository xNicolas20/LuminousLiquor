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
      const res = axios.post("https://luminious-liquor.herokuapp.com/googleLogin", {tokenId: response.credential}).then((res) => {
        if(res.data.message != "Login Success"){
          setOpen2(true);
          }
      
      const convo = {
        senderId: res.data.user._id,
        receiverId: '62d1de891f770f0cd301ac00',
      }
      axios.put('http://localhost:9005/api/convo/', convo)


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
        if(res.data.message != "Login Success"){
          setOpen3(true);
          }

      const convo = {
        senderId: res.data.user._id,
        receiverId: '62d1de891f770f0cd301ac00',
      }

      axios.put('http://localhost:9005/api/convo/', convo)
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
        const convo = {
          senderId: res.data.user._id,
          receiverId: '62d1de891f770f0cd301ac00',
        }
        axios.put('http://localhost:9005/api/convo/', convo)
  
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
  const [open2, setOpen2] = React.useState(false);
  const [open3, setOpen3] = React.useState(false);

  const handleClick = () => {
    setOpen(true);
  };

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };

  const handleClose2 = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen2(false);
  };

  const handleClose3 = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen3(false);
  };
  return (
   
    <div className="login-input">
       {/* <CustomizedSnackbars /> */}

      <div id="xyzzz"></div>
      <h1>Luminous Liquor</h1>
      <h3>Sign in with your account</h3>


      <Stack spacing={2} sx={{ width: '100%' }}>
     
      <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="error" sx={{ width: '100%' }}>
         Invalid Credentials. Please try again!
        </Alert>
      </Snackbar>

      <Snackbar open={open2} autoHideDuration={6000} onClose={handleClose2}>
        <Alert onClose={handleClose2} severity="info" sx={{ width: '100%' }}>
         User is already registered. Please enter your password to log in.
        </Alert>
      </Snackbar>

      <Snackbar open={open3} autoHideDuration={6000} onClose={handleClose3}>
        <Alert onClose={handleClose3} severity="error" sx={{ width: '100%' }}>
         Error while logging in. Please try again
        </Alert>
      </Snackbar>
      
    </Stack>



      <form>

<FloatingLabel
        controlId="floatingInput"
        label="Email address"

        
      >
          <Form.Control
          type="email"
          name="email"
          placeholder="name@example.com"
          onChange={handleChange} />
      </FloatingLabel>
      
      <FloatingLabel controlId="floatingPassword" label="Password"
      >
        <Form.Control  type="password"
          name="password"
          placeholder="Enter Password"
          onChange={handleChange} />
      </FloatingLabel> 

       
        <input type="button" onClick={login} value="LOG IN" /><br></br>
     
        <div className="needyou">
      <label >
        Forgot your password? Click <a href="/forgot_password">Here</a>
      </label>
      </div>
    
    
   
      
      </form>
  
      <p id="lo">Or Login With</p>
      
      <div id='sign'>
      </div>
    
      <div className="social">
      <FacebookLogin
            appId="1133581337227819"
            autoLoad={false}
            fields="name,email,picture"
            callback={responseFacebook}
            textButton="Login with Facebook" />
      </div>

<div className="needyou">
      <label>
        Need an account? Please <a href="/register">Register</a>
      </label>
      </div>

      <div className="backtohome">
        <a href="/">
          Skip to Homepage
        </a>
      </div>



      
    </div>
  );
};

export default LoginInput;