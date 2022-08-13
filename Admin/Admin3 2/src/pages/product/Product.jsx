import { Link } from "react-router-dom";
import "./product.css";
import Chart from "../../components/chart/Chart"
import {productData} from "../../dummyData"
import { Height, Publish } from "@material-ui/icons";
import { useEffect,useState } from "react";
import axios from "../axios"
import { useParams } from 'react-router-dom';
import { Select } from "@material-ui/core";
import { Snackbar, MuiAlert, Alert, Stack} from '@mui/material';

export default function Product() {
    let id = useParams();
    const [product,setProduct]=useState({});
    const [name, setName]=useState("");
    const [category, setCategory]=useState("");
    const [price, setPrice]=useState("");
    const [size, setSize]=useState("");
    const [quantity, setQuantity]=useState(0);
    const [recent, setRecent]=useState(false);


const [open,setOpen] = useState(false)

    useEffect(()=>{
        
        
      const getProduct=async()=>{
        const data= await axios.get('/admin/product/' + id.productId);
        setProduct(data.data);
      };
      getProduct();
      setName(product.name)
      setCategory(product.category)
      setPrice(product.price)
      setSize(product.size)
      setQuantity(product.quantities)
      setRecent(product.recent)
    },[])

    function updateProdudct(){

        var availability = quantity == 0 ? false : true


        var body = {
            "category": category,
            "name": name,
            "price": price,
            "size": size,
            "quantities": quantity,
            "recent": recent
        }

        const url = 'https://luminous-liquor.herokuapp.com/admin/product/' + id.productId
        
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

  

    <div className="product">



<Stack spacing={2} sx={{width: '100%'}}>

<Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
    <Alert onClose={handleClose} severity="success" sx={{width: '100%', Height: '20vh'}}>
        <div className="text">
       Updated
       </div>
    </Alert>
</Snackbar>

</Stack>



      <div className="productTitleContainer">
        <h1 className="productTitle">Product</h1>
        <Link to="/newproduct">
          <button className="productAddButton">Create</button>
        </Link>
      </div>
      <div className="productTop">
          {/* <div className="productTopLeft">
              <Chart data={productData} dataKey="Sales" title="Sales Performance"/>
          </div> */}
          <div className="productTopRight">
              <div className="productInfoTop">
                  
                  <span className="productName">{product.name}</span>
              </div>
              <div className="productInfoBottom">
                  <div className="productInfoItem">
                      <span className="productInfoKey">id:</span>
                      <span className="productInfoValue">{product.prodId}</span>
                  </div>
                  <div className="productInfoItem">
                      <span className="productInfoKey">category:</span>
                      <span className="productInfoValue">{product.category}</span>
                  </div>
                  <div className="productInfoItem">
                      <span className="productInfoKey">price:</span>
                      <span className="productInfoValue">{product.price}</span>
                  </div>
                  <div className="productInfoItem">
                      <span className="productInfoKey">size:</span>
                      <span className="productInfoValue">{product.size}</span>
                  </div>
                  <div className="productInfoItem">
                      <span className="productInfoKey">in stock:</span>
                      <span className="productInfoValue">{product.stock == true ? "Yes" : "No"}</span>
                  </div>
                  <div className="productInfoItem">
                      <span className="productInfoKey">recent:</span>
                      <span className="productInfoValue">{product.recent == true ? "Yes" : "No"}</span>
                  </div>
              </div>
          </div>
      </div>
      <div className="productBottom">
          <form className="productForm">
              <div className="productFormLeft">
                  <label>Product Name</label>
                  <input type="text" placeholder={product.name}
                  onChange={(e)=> setName(e.target.value)}
                  value={name}/>
                  <label>Category</label>
                  <input type="text" placeholder={product.category}
                  onChange={(e)=> setCategory(e.target.value)}
                  value={category}/>
                  <label>Price</label>
                  <input type="text" placeholder={product.price}
                  onChange={(e)=> setPrice(e.target.value)}
                  value={price}/>
                  <label>Size</label>
                  <input type="text" placeholder={product.size}
                  onChange={(e)=> setSize(e.target.value)}
                  value={size}/>
                  <label>Quantity</label>
                  <input type="number" 
                  onChange={(e)=> setQuantity(e.target.value)}
                  value={product.quantities}/>
                    <label>Recent</label>
                  <select onChange={(e)=> setRecent(e.target.value)}>
                    <option value="true" >True</option>
                    <option value="false">False</option>
                  </select >
              </div>
              <div className="productFormRight">
                  <button className="productButton" onClick={updateProdudct}>Update</button>
              </div>
          </form>
      </div>
    </div>
  ); 
}
