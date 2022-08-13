
import "./newUser.css";
import axios from "../axios"
import { useState } from "react";
export default function NewUser() {
  const [userName,setUserName]=useState("");
  const [name,setName]=useState("");
  const [email,setEmail]=useState("");
  const [password,setPassword]=useState("");
  const [phone,setPhone]=useState("");
  const [address,setAddress]=useState("");
  const [biWeeklyHours,setbiWeeklyHours]=useState(0);
  const [totalHours,settotalHours]=useState(0);
  const [rate,setRate]=useState(15);
  const [role,setRole]=useState("Employee");
  const [age,setAge]=useState("");
  
  const addEmployee=(e)=>
  {
    var body = {
      "userName": userName,
      "name": name,
      "email": email,
      "password": password,
      "phone": phone,
      "age": age,
      "role": role,
      "totalHours": totalHours,
      "biWeeklyHours": biWeeklyHours,
      "rate": rate,
      "address": address
    }

    console.log(body)
    e.preventDefault();
    axios.post("/admin/employee", body).then(()=>
    {
      alert("Employee created Successfully");
      setName("")
      setUserName("")
      setEmail("")
      setPassword("")
      setPhone("")
      setAddress("")
      setbiWeeklyHours(0)
      settotalHours(0)
      setRate(15)
      setRole("Employee")
      setAge("")
    }).catch((error)=>alert(error.message));
  }
  return (
    <div className="newUser">
      <h1 className="newUserTitle">New Employee</h1>
      <form className="newUserForm">
        <div className="newUserItem">
          <label>Username</label>
          <input type="text" onChange={(e)=> setUserName(e.target.value)} value={userName}
          />
        </div>
        <div className="newUserItem">
          <label>Full Name</label>
          <input type="text"  onChange={(e)=> setName(e.target.value)} value={name}
          />
        </div>
        <div className="newUserItem">
          <label>Email</label>
          <input type="email" onChange={(e)=> setEmail(e.target.value)} value={email}
          />
        </div>
        <div className="newUserItem">
          <label>Password</label>
          <input type="password" onChange={(e)=> setPassword(e.target.value)} value={password}
          />
        </div>
        <div className="newUserItem">
          <label>Phone</label>
          <input type="text" onChange={(e)=> setPhone(e.target.value)} value={phone}
          />
        </div>
        {/* <div className="newUserItem">
          <label>biWeeklyHours Hours</label>
          <input type="text" placeholder="0" onChange={(e)=> setbiWeeklyHours(e.target.value)} 
          value={biWeeklyHours}/>
        </div>
        <div className="newUserItem">
          <label>Total totalHours</label>
          <input type="text" placeholder="0" onChange={(e)=> settotalHours(e.target.value)} 
          value={totalHours}/>
        </div>
        <div className="newUserItem">
          <label>Pay Rate</label>
          <input type="text" placeholder="15" onChange={(e)=> setRate(e.target.value)} 
          value={rate}/>
        </div> */}
        <div className="newUserItem">
          <label>Role</label>
          <input type="text" onChange={(e)=> setRole(e.target.value)} value={role}
          />
        </div>
        <div className="newUserItem">
          <label>Age</label>
          <input type="text"  onChange={(e)=> setAge(e.target.value)} value={age}/>
        </div>
        <div className="newUserItem">
          <label>Address</label>
          <input type="text" onChange={(e)=> setAddress(e.target.value)} value={address}/>
        </div>
        <button className="newUserButton" onClick={addEmployee}>Create</button>
      </form>
    </div>
  );
}
