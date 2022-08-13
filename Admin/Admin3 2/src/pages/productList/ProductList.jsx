import "./productList.css";
import { DataGrid } from "@material-ui/data-grid";
import { DeleteOutline } from "@material-ui/icons";
import { productRows } from "../../dummyData";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "../axios";
export default function ProductList() {
  const [product,setProduct]=useState([]);
  useEffect(()=>{
    const getProduct=async()=>{
      const data= await axios.get('/admin/product');
      console.log("Product:",data.data)
      setProduct(data.data);
      
    };
    getProduct();
  },[])

  console.log(product)

  const [data, setData] = useState(productRows);
  console.log(data);
  const handleDelete = (_id) => {
    axios.delete('/admin/product/' + _id).catch((err) => {
      console.log(err)
  })
  };



  const columns = [
    { field: "prodId", headerName: "Product Id", width: 150  
  },
    {
      field: "category",
      headerName: "Category",
      width: 200,
      renderCell: (params) => {
        return (
          <div className="productListItem">
            {params.row.name}
          </div>
        );
      },
    },
    { field: "quantities", headerName: "Quantities", width: 200 },
    // {
    //   field: "status",
    //   headerName: "Status",
    //   width: 120,
    // },
    {
      field: "price",
      headerName: "Price",
      width: 160,
    },
    {
      field: "action",
      headerName: "Action",
      width: 150,
      renderCell: (params) => {
        return (
          <>
            <Link to={"/product/" + params.row._id}>
              <button className="productListEdit">Edit</button>
            </Link>
            <DeleteOutline
              className="productListDelete"
              onClick={() => handleDelete(params.row._id)}
            />
          </>
        );
      },
    },
  ];

  return (
    <div className="productList">
      <div className="productTitleContainer">
        <h1 className="productTitle">Product</h1>
        <Link to="/newproduct">
          <button className="productAddButton">Create</button>
        </Link>
      </div>
      <DataGrid
        rows={product}
        disableSelectionOnClick
        columns={columns}
        pageSize={8}
        getRowId ={(row) => row._id}
      />
    </div>
  );
}
