import "./newProduct.css";
import axios from "../axios"
import { useState } from "react";
export default function NewProduct() {
  const [productId,setProductId]=useState(0);
  const [category,setCategory]=useState("");
  const [price,setPrice]=useState(0);
  const [name,setName]=useState("");
  const [description,setDescription]=useState("");
  const [size,setSize]=useState("");
  const [image,setImage]=useState("");
  
  const addProduct=(e)=>
  {
    e.preventDefault();
    axios.post("/admin/product",{productId, category, name, description, size, image, price}).then(()=>
    {
      alert("Product Added Successfully");
      setProductId(0)
      setCategory("")
      setPrice("")
      setName("")
      setDescription("")
      setSize("")
      setImage("")
    }).catch((error)=>alert(error.message));
  }
  return (
    <div className="newProduct">
      <h1 className="addProductTitle">New Product</h1>
      <form className="addProductForm">
        <div className="addProductItem">
          <label>Id</label>
          <input type="number" placeholder="Product Id" onChange={(e)=> setProductId(e.target.value)} 
          value={productId}/>
        </div>
        <div className="addProductItem">
          <label>Category</label>
          <input type="text" placeholder="Category" onChange={(e)=> setCategory(e.target.value)} 
          value={category}/>
        </div>
        <div className="addProductItem">
          <label>New Price</label>
          <input type="text" placeholder="PRice" onChange={(e)=> setPrice(e.target.value)} 
          value={price}/>
        </div>
        <div className="addProductItem">
          <label>Name</label>
          <input type="text" placeholder="Name" onChange={(e)=> setName(e.target.value)} 
          value={name}/>
        </div>
        <div className="addProductItem">
          <label>Description</label>
          <input type="text" placeholder="Description" onChange={(e)=> setDescription(e.target.value)} 
          value={description}/>
        </div>
        <div className="addProductItem">
          <label>Image Url</label>
          <input type="text" placeholder="URL" onChange={(e)=> setImage(e.target.value)} 
          value={image}/>
        </div>
        <div className="addProductItem">
          <label>Size</label>
          <input type="text" placeholder="Size" onChange={(e)=> setSize(e.target.value)} 
          value={size}/>
        </div>
        
        <button className="addProductButton" onClick={addProduct}>Add Product</button>
      </form>
    </div>
  );
}
