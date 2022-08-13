import React, { useEffect, useState } from "react";
import "./searchbar.css";
import * as BsIcons from 'react-icons/bs';
import * as AiIcons from 'react-icons/ai';
import axios from "./axios";
//import recent from "./recent";

//use State for searchbar
const Searchbar = () => {
  //const [text, setText] = useState("");
  const [products, setProducts] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [searched, setSearched] = useState("");

  useEffect(() => {
    const loadUsers = async () => {
      const response = await axios.get("/admin/product");
      //console.log(response.data);
      setProducts(response.data);
    };
    loadUsers();
  },[]);

  console.log(products)

  const handleFilter = (event) => {
    const searchWord = event.target.value;
    setSearched(searchWord);
    const newFilter = products.filter((value) => {
      return value.name.toLowerCase().includes(searchWord.toLowerCase());
    });


    if (searchWord === "") {
      setFilteredData([]);
    } else {
      setFilteredData(newFilter);
    }
  }

  const clearInput = () => {
    setFilteredData([]);
    setSearched("");
  };

  return (
    <div class="col-md-8">
    <div class="d-flex form-inputs">
        <input type="text" class="form-control" placeholder="Search Drinks" value={searched} onChange={handleFilter}/>
        {/* <div className="searchicons">
        {searched.length === 0 ? (
            <BsIcons.BsSearch />
          ) : (
            <AiIcons.AiOutlineClose id="clearBtn" onClick={clearInput} />
          )}</div> */}
      </div>
      <div className="dataResult">
        {filteredData.slice(0, 10).map((pm) => (

          <a className="dataItem" href={"/product/" + pm.prodId}><p>{pm.name}</p></a>
         
        ))}
      </div>
    </div>
  );
};
export default Searchbar;
