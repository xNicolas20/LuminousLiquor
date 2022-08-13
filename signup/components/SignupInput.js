import React, { useEffect, useState } from "react";
import "./SignupInput.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import LoadingSpinner from "../../LoadingSpinner";
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';

const SignupInput = () => {


  function password_validate(p) {
    const strongRegex = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})");
    return strongRegex.test(p)
}

  const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
  });
  const navigate = useNavigate();

  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
    phone: "",
    age: "",
  });
  const [loading, load] = useState(true);
  //
  const [newcovo, setNewcovo] = useState(true);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setUser({
      ...user,

      [name]: value,
    });
  };

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



  const [openAge, setOpenAge] = React.useState(false);

  const handleClickAge = () => {
    setOpenAge(true);
  };

  const handleCloseAge = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpenAge(false);
  };



  const [openSent, setOpenSent] = React.useState(false);
  const [openPass, setOpenPass] = React.useState(false);

  const handleClickSent = () => {
    setOpenSent(true);
  };

  const handleCloseSent = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpenSent(false);
  };

  const handleClosePass = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpenPass(false);
  };

  const registerMe = () => {
    const { name, email, password, phone, age } = user;
    
    if (name && email && password && phone && age) {
      if(age>=18){
        if(password_validate(password)){
      load(false);
      axios.post("https://luminious-liquor.herokuapp.com/register", user).then((res) => {
        load(true);
        setOpenSent(true);
   alert(res.data.user_id)
        const convo = {
          senderId: res.data.user_id,
          receiverId: '62d1de891f770f0cd301ac00',
        }
        axios.put('http://localhost:9005/api/convo/', convo)
        // alert(res.data.message);
        // navigate("/login");
      });

      
        } else{
          setOpenPass(true)
        }

    } else{
      setOpenAge(true);
    }  }
    else {
      // alert("not posted");
      setOpen(true);
  
  }
  };

  return loading ? (
    <div className="login-input">
      <h1>Luminous Liquor</h1>
      <h3>Create an account</h3>
      <form>
        
<FloatingLabel
        controlId="floatingInput"
        label="Full Name" >
          <Form.Control
          type="text"
          name="name"
          placeholder="name"
          onChange={handleChange} />
      </FloatingLabel>
      
     
        {/* <input
          type="text"
          name="name"
          placeholder="Enter Name"
          onChange={handleChange}
        /> */}
        {/* <br /> */}

        <FloatingLabel
        controlId="floatingInput"
        label="Email" >
          <Form.Control
          type="text"
          name="email"
           placeholder="Eamil"
          onChange={handleChange} />
      </FloatingLabel>


        {/* <input
          type="email"
          name="email"
          placeholder="Enter email"
          onChange={handleChange}
        />
        <br /> */}
        <FloatingLabel
        controlId="floatingInput"
        label="Phone Number" >
          <Form.Control
          type="number"
          name="phone"
          placeholder="Phone Number"
          onChange={handleChange} />
      </FloatingLabel>

        {/* <input
          type="text"
          name="phone"
          placeholder="Enter Phone Number"
          onChange={handleChange}
        />
        <br /> */}


<FloatingLabel
        controlId="floatingInput"
        label="Password" >
          <Form.Control
          type="password"
          name="password"
          placeholder="passsword"
          onChange={handleChange} />
      </FloatingLabel>

      
        {/* <input
          type="password"
          name="password"
          placeholder="Enter Password"
          onChange={handleChange}
        />
        <br /> */}

<FloatingLabel
        controlId="floatingInput"
        label="Age" >
          <Form.Control
          type="number"
          name="age"
          placeholder="age"
          onChange={handleChange} />
      </FloatingLabel>


        {/* <input
          type="number"
          name="age"
          placeholder="Enter Age"
          onChange={handleChange}
        />
        <br /> */}
        <input type="button" value="CREATE ACCOUNT" onClick={registerMe} />
        <br />
      </form>
      <div className="needyou">
      <label >
        You have an account? Login <Button onClick={()=>navigate("/login")}>Here</Button>
      </label>
      </div>
    
      <div className="backtohome">
        <a href="/">
          Skip to Homepage
        </a>
      </div>
      <Stack spacing={2} sx={{ width: '100%' }}>
     
     <Snackbar open={open} autoHideDuration={2000} onClose={handleClose}>
       <Alert onClose={handleClose} severity="error" sx={{ width: '100%' }}>
        Invalid Data
       </Alert>
       
     </Snackbar>

     <Snackbar open={openAge} autoHideDuration={2000} onClose={handleCloseAge}>
       <Alert onClose={handleCloseAge} severity="error" sx={{ width: '100%' }}>
        You must be atleast 18 years old!
       </Alert>
       
     </Snackbar>

     <Snackbar open={openSent} autoHideDuration={3000} onClose={handleCloseSent}>
       <Alert onClose={handleCloseSent} severity="info" sx={{ width: '100%' }}>
        An email has been sent. Please verify to login.
       </Alert>
       
     </Snackbar>
     
     <Snackbar open={openPass} autoHideDuration={3000} onClose={handleClosePass}>
       <Alert onClose={handleClosePass} severity="warning" sx={{ width: '100%' }}>
        Password must be a mixture of special characters.
       </Alert>
       
     </Snackbar> 
   </Stack>

    </div>
  ) : (
    <LoadingSpinner />
  );
};

export default SignupInput;
