// import "./productRequest.css";
// import { DataGrid } from "@material-ui/data-grid";
// import { DeleteOutline } from "@material-ui/icons";
// import { productRows } from "../../dummyData";
// import { Link } from "react-router-dom";
// import { useEffect, useState } from "react";
// import axios from "../axios";
// export default function ProductRequest() {
//   const [product,setProduct]=useState([]);
//   useEffect(()=>{
//     const getProduct=async()=>{
//       const data= await axios.get('/test/feedbacks');
//       console.log("Product:",data.data)
//       setProduct(data.data);
      
//     };
//     getProduct();
//   },[])

//   console.log(product)

//   const [data, setData] = useState(productRows);
//   console.log(data);
//   const handleDelete = (_id) => {
//     axios.delete('/test/feedbacks/' + _id).then(alert("Request Deleted")).catch((err) => {

//       console.log(err)
//   })
//   };



//   const columns = [
    
//     {
//       field: "username",
//       headerName: "User Name",
//       width: 200,
      
//     },
//     { field: "feedback", headerName: "Product Request", width: 400 },
//     // {
//     //   field: "status",
//     //   headerName: "Status",
//     //   width: 120,
//     // },
    
//     {
//       field: "action",
//       headerName: "Action",
//       width: 250,
//       renderCell: (params) => {
//         return (
//           <>
            
//             <DeleteOutline
//               className="productListDelete"
//               onClick={() => handleDelete(params.row._id)}
//             />
//           </>
//         );
//       },
//     },
//   ];

//   return (
//     <div className="productList">
//       <div className="productTitleContainer">
//         <h1 className="productTitle">Product Request</h1>
        
//       </div>
//       <DataGrid
//         rows={product}
//         disableSelectionOnClick
//         columns={columns}
//         pageSize={8}
//         getRowId ={(row) => row._id}
//       />
//     </div>
//   );
// }
