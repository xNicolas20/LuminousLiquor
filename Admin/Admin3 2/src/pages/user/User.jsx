import {
  CalendarToday,
  LocationSearching,
  MailOutline,
  PermIdentity,
  PhoneAndroid,
  Publish,
} from "@material-ui/icons";
import { Link } from "react-router-dom";
import "./user.css";
import { useState } from "react";
import { useEffect } from "react";
import axios from "../axios";
import { useParams } from 'react-router-dom';
import { Snackbar, MuiAlert, Alert, Stack} from '@mui/material';

export default function User() {
  let id = useParams();
  const [editEmployee, setEditEmployee]=useState({});
  const [userName, setUserName]=useState("");
  const [fullName, setFullName]=useState("");
  const [phone, setPhone]=useState("");
  const [email, setEmail]=useState("");
  const [address, setAddress]=useState("");
  const [open,setOpen] = useState(false)

  useEffect(()=>{
    const getEmployee=async()=>{
      const data= await axios.get('/admin/employee/' + id.userId);
      setEditEmployee(data.data);
    };
    getEmployee();
    setUserName(editEmployee.userName)
    setFullName(editEmployee.name)
    setPhone(editEmployee.phone)
    setEmail(editEmployee.email)
    setAddress(editEmployee.address)
  },[])

  console.log(fullName)

  function updateInfo(){

    var body = {
      "name": fullName,
      "email": email,
      "phone": phone,
      "address": address,
    }

    const url = 'https://luminous-liquor.herokuapp.com/admin/employee/' + id.userId
    axios.put(url, body).catch((err) => {
        console.log(err)
    })
    setOpen(true);
  }

  const handleClose = (event, reason) => {
    if(reason === 'clickaway'){
        return;
    }
    setOpen(false)
}

  return (
    <div className="user">

<Stack spacing={2} sx={{width: '100%'}}>

<Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
    <Alert onClose={handleClose} severity="success" sx={{width: '100%', Height: '20vh'}}>
        <div className="text">
       Updated
       </div>
    </Alert>
</Snackbar>

</Stack>
      <div className="userTitleContainer">
        <h1 className="userTitle">Edit Employee</h1>
        <Link to="/newUser">
          <button className="userAddButton">Create</button>
        </Link>
      </div>
      <div className="userContainer">
        <div className="userShow">
          
            <div className="userShowTopTitle">
              <span className="userShowUsername">{editEmployee.name}</span>
              <span className="userShowUserTitle">{editEmployee.role}</span>
            
          </div>
          <div className="userShowBottom">
            {/* <span className="userShowTitle">Account Details</span> */}
            {/* <div className="userShowInfo">
              <PermIdentity className="userShowIcon" />
              <span className="userShowInfoTitle">annabeck99</span>
            </div> */}
            {/* <div className="userShowInfo">
              <CalendarToday className="userShowIcon" />
              <span className="userShowInfoTitle">10.12.1999</span>
            </div> */}
            <span className="userShowTitle">Contact Details</span>
            <div className="userShowInfo">
              <PermIdentity className="userShowIcon" />
              <span className="userShowInfoTitle">{editEmployee.userName}</span>
            </div>
            <div className="userShowInfo">
              <PhoneAndroid className="userShowIcon" />
              <span className="userShowInfoTitle">{editEmployee.phone}</span>
            </div>
            <div className="userShowInfo">
              <MailOutline className="userShowIcon" />
              <span className="userShowInfoTitle">{editEmployee.email}</span>
            </div>
            {/* <div className="userShowInfo">
              <LocationSearching className="userShowIcon" />
              <span className="userShowInfoTitle">New York | USA</span>
            </div> */}
          </div>
        </div>
        <div className="userUpdate">
          <span className="userUpdateTitle">Edit</span>
          <form className="userUpdateForm">
            <div className="userUpdateLeft">
              {/* <div className="userUpdateItem">
                <label>Username</label>
                <input
                  type="text"
                  placeholder={editEmployee.name}
                  className="userUpdateInput"
                />
              </div> */}
              <div className="userUpdateItem">
                <label>Full Name</label>
                <input
                  type="text"
                  placeholder={editEmployee.name}
                  className="userUpdateInput"
                  onChange={(e)=> setFullName(e.target.value)}
                  value={fullName}
                />
              </div>
              <div className="userUpdateItem">
                <label>Email</label>
                <input
                  type="text"
                  placeholder={editEmployee.email}
                  className="userUpdateInput"
                  onChange={(e)=> setEmail(e.target.value)}
                  value={email}
                />
              </div>
              <div className="userUpdateItem">
                <label>Phone</label>
                <input
                  type="text"
                  placeholder={editEmployee.phone}
                  className="userUpdateInput"
                  onChange={(e)=> setPhone(e.target.value)}
                  value={phone}
                />
              </div>
              <div className="userUpdateItem">
                <label>Address</label>
                <input
                  type="text"
                  placeholder={editEmployee.address}
                  className="userUpdateInput"
                  onChange={(e)=> setAddress(e.target.value)}
                  value={address}
                />
              </div>
            </div>
            <div className="userUpdateRight">
              {/* <div className="userUpdateUpload">
                <img
                  className="userUpdateImg"
                  src="https://images.pexels.com/photos/1152994/pexels-photo-1152994.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500"
                  alt=""
                />
                <label htmlFor="file">
                  <Publish className="userUpdateIcon" />
                </label>
                <input type="file" id="file" style={{ display: "none" }} />
              </div> */}
              <button className="userUpdateButton" onClick={updateInfo}>Update</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
