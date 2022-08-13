import "./userList.css";
import { DataGrid } from "@material-ui/data-grid";
import { DeleteOutline } from "@material-ui/icons";
import { userRows } from "../../dummyData";
import { Link } from "react-router-dom";
import { useState } from "react";
import { useEffect } from "react";
import axios from "../axios";

export default function UserList() {
  const [employee,setEmployee]=useState([]);
  
  useEffect(()=>{
    const getEmployee=async()=>{
      const data= await axios.get('/admin/employee');
      setEmployee(data.data);
    };
    getEmployee();
  },[])

  const [data, setData] = useState(userRows);
  const handleDelete = (_id) => {
    axios.delete('/admin/employee/' + _id).catch((err) => {
        console.log(err)
    })
  };

  console.log(data)
  console.log(employee)
  
  const columns = [
    
    {
      field: "name",
      headerName: "Name",
      width: 200,
      // renderCell: (params) => {
      //   return (
      //     <div className="userListUser">
      //       {/* <img className="userListImg" src={params.row.avatar} alt="" /> */}
      //       {params.row.name}
      //     </div>
      //   );
      // },
    },
    { field: "email", headerName: "Email", width: 200 },
    {
      field: "biWeeklyHours",
      headerName: "Bi Weekly Hours",
      width: 200,
    },
    {
      field: "action",
      headerName: "Action",
      width: 150,
      renderCell: (params) => {
        return (
          <>
            <Link to={"/user/" + params.row._id}>
              <button className="userListEdit">Edit</button>
            </Link>
            <DeleteOutline
              className="userListDelete"
              onClick={() => handleDelete(params.row._id)}
            />
          </>
        );
      },
    },
  ];

  return (
    <div className="userList">
      <div className="productTitleContainer">
        <h1 className="productTitle">Employee</h1>
        <Link to="/newUser">
          <button className="productAddButton">Create</button>
        </Link>
      </div>
      <DataGrid
        rows={employee}
        disableSelectionOnClick
        columns={columns}
        pageSize={8}
        checkboxSelection
        getRowId ={(row) => row._id}
      />
      {/* <div>
        {employee.map((em) => ( 
          <div className="userListUser">
            {em._id}
            {em.name}
            {em.email}
            {em.name}
            <Link to={"/user/" + em._id}>
              <button className="userListEdit">Edit</button>
            </Link>
            <DeleteOutline
              className="userListDelete"
              onClick={() => handleDelete()}
            />
          </div>
        ))}
      </div> */}
    </div>
  );
}
