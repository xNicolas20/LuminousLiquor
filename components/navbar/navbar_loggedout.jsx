import Heart from "../images/heart.png";
import Cart from "../images/cart2.png";
import Bag from "../images/bag.png";
import User from "../images/user.png";
import "./navbar.css";
import {useState, useEffect} from "react";
import Axios from 'axios'
import { Link } from "react-router-dom";
import * as BsIcons from 'react-icons/bs';
import * as AiIcons from 'react-icons/ai';
import Sidebar from '../../homepage/components/Sidebar'

import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';

import Avatar from '@mui/material/Avatar';
import Stack from '@mui/material/Stack';
import { deepOrange, deepPurple } from '@mui/material/colors';
import edit from '../../editUser/page/EditUser'
import { useNavigate } from "react-router-dom";
import Sidebar_loggedout from "../../homepage/components/Sidebar_loggedout";
import Button from '@mui/material/Button';
import Searchbar from "../../homepage/components/searchbar";






const Navbar_loggedout = () => {

    const [text, setText] = useState("");
    const [suggestions, setSuggestions] = useState([]);
    const [userName, setuserName] = useState('');

    const [favList, setFavList] = useState([]);
    const [productInfoList, setproductInfo] = useState([]);

    const [productNamesList, setproductNames] = useState([]);

    const [cartList, setCartList] = useState([]);
    const favId = ["1", "4"];

    const[prodId, setProdId] = useState({id: "1"});
    const id = "1";
    const [favInfoList, setFavInfoList] = useState([]);

    const [filteredData, setFilteredData] = useState([]);
    const [searched, setSearched] = useState("");

    


  
  const navigate = useNavigate();

    useEffect(()=> {
        Axios.get("http://localhost:9005/read").then((response)=>{
        setFavList(response.data);
        

        // {favList.map((val,key) => {
        //     favId =  val.productID;
        //    })}
        })
    }, [favList])



    useEffect(()=> {

        
        {favId.map((val) => {
            Axios.get("http://localhost:9005/readFav/" + 2).then((response)=>{
                setFavInfoList(response.data);
                setFilteredData(response.data);
               
                })
             


           })}
       
    }, [favInfoList])




    useEffect(()=> {
        Axios.get("http://localhost:9005/readCart").then((response)=>{
        setCartList(response.data);
        console.log(response.data);
        console.log(cartList);
        })
    }, [cartList])



    useEffect(()=> {
        Axios.get("http://localhost:9005/productInfo", {id: 1}).then((response)=>{
        setproductInfo(response.data);
        console.log(response.data);
        console.log(productInfoList);
        })
    }, [productInfoList])

    // useEffect(()=> {
    //     Axios.get("http://localhost:4010/productNames").then((response)=>{
    //     setproductNames(response.data);
    //     console.log(response.data);
    //     console.log(productNamesList);
    //     })
    // }, [productNamesList])

    useEffect(() => {
        const loadUsers = async () => {
          const response = await Axios.get("http://localhost:9005/productNames");
          //console.log(response.data);
          setproductNames(response.data);
        };
        loadUsers();
      });


      function logout(){
        sessionStorage.removeItem('myUser');
        navigate("/");  
      }

    const onChangeHandler = (text) => {
        console.log("hey ");
        // alert(text);

        const searchWord = text;
    setproductNames(searchWord);

    const newFilter = productNamesList.filter((value) => {
        return value.name.toLowerCase().includes(searchWord.toLowerCase());
      });

      if (searchWord === "") {
        setFilteredData([]);
      } else {
        setFilteredData(newFilter);
      }


      };

    

      const clearInput = () => {
        setFilteredData([]);
        setSearched("");
      };


      function loginMe(){
        navigate("/login");
      }


    return (

        // <div className="navbar">

 
// <nav class="navbar navbar-expand-lg navbar-light bg-light">

//   <div class="container-fluid">
 
//     <button
//       class="navbar-toggler"
//       type="button"
//       data-mdb-toggle="collapse"
//       data-mdb-target="#navbarSupportedContent"
//       aria-controls="navbarSupportedContent"
//       aria-expanded="false"
//       aria-label="Toggle navigation"
//     >
//       <i class="fas fa-bars"></i>
//     </button>


//     <div class="collapse navbar-collapse" id="navbarSupportedContent">

//       <a class="navbar-brand mt-2 mt-lg-0" href="#">
//         <img
//           src="https://mdbcdn.b-cdn.net/img/logo/mdb-transaprent-noshadows.webp"
//           height="15"
//           alt="MDB Logo"
//           loading="lazy"
//         />
//       </a>

//       <ul class="navbar-nav me-auto mb-2 mb-lg-0">
//         <li class="nav-item">
//           <a class="nav-link" href="#">Dashboard</a>
//         </li>
//         <li class="nav-item">
//           <a class="nav-link" href="#">Team</a>
//         </li>
//         <li class="nav-item">
//           <a class="nav-link" href="#">Projects</a>
//         </li>
//       </ul>

//     </div>
 


//     <div class="d-flex align-items-center">
 
//       <a class="text-reset me-3" href="#">
//         <i class="fas fa-shopping-cart"></i>
//       </a>


//       <div class="dropdown">
//         <a
//           class="text-reset me-3 dropdown-toggle hidden-arrow"
//           href="#"
//           id="navbarDropdownMenuLink"
//           role="button"
//           data-mdb-toggle="dropdown"
//           aria-expanded="false"
//         >
//           <i class="fas fa-bell"></i>
//           <span class="badge rounded-pill badge-notification bg-danger">1</span>
//         </a>
//         <ul
//           class="dropdown-menu dropdown-menu-end"
//           aria-labelledby="navbarDropdownMenuLink"
//         >
//           <li>
//             <a class="dropdown-item" href="#">Some news</a>
//           </li>
//           <li>
//             <a class="dropdown-item" href="#">Another news</a>
//           </li>
//           <li>
//             <a class="dropdown-item" href="#">Something else here</a>
//           </li>
//         </ul>
//       </div>
      
//       <div class="dropdown">
//         <a
//           class="dropdown-toggle d-flex align-items-center hidden-arrow"
//           href="#"
//           id="navbarDropdownMenuAvatar"
//           role="button"
//           data-mdb-toggle="dropdown"
//           aria-expanded="false"
//         >
//           <img
//             src="https://mdbcdn.b-cdn.net/img/new/avatars/2.webp"
//             class="rounded-circle"
//             height="25"
//             alt="Black and White Portrait of a Man"
//             loading="lazy"
//           />
//         </a>
//         <ul
//           class="dropdown-menu dropdown-menu-end"
//           aria-labelledby="navbarDropdownMenuAvatar"
//         >
//           <li>
//             <a class="dropdown-item" href="#">My profile</a>
//           </li>
//           <li>
//             <a class="dropdown-item" href="#">Settings</a>
//           </li>
//           <li>
//             <a class="dropdown-item" href="#">Logout</a>
//           </li>
//         </ul>
//       </div>
//     </div>
 
//   </div>

// </nav>








 
          // </div> 




          <div class="section-header">

<nav class="navbar navbar-dark navbar-expand p-0 bg-dark">
<div class="container-fluid">
    <ul class="navbar-nav d-none d-md-flex mr-auto">
		<li class="nav-item"><a class="nav-link" href="/login" data-abc="true">Sign in to add favourites, view cart and many more!</a></li>
		{/* <li class="nav-item"><a class="nav-link" href="#" data-abc="true">Free Delivery</a></li>
		<li class="nav-item"><a class="nav-link" href="#" data-abc="true">Cash Backs</a></li> */}
    </ul>
    {/* <ul class="navbar-nav d-flex align-items-center">
        <li class="nav-item">
		    <div class="d-flex flex-row">
		        <img src="https://i.imgur.com/EYFtR83.jpg" class="rounded-circle" width={30}></img>
		    </div>
		</li>
		<li class="nav-item">
		    <a href="#" class="nav-link d-flex align-items-center" data-abc="true"><span>Nantano M</span><i class='bx bxs-chevron-down'></i></a>
		</li>
		
	</ul>  */}
  </div> 

</nav> 

<section class="header-main border-bottom bg-white">
	<div class="container-fluid">
       <div class="row p-2 pt-3 pb-3 d-flex align-items-center">
           <div class="col-md-2">
            {/* <h5>Luminous Liquor</h5>
             */}
              <div id="hideseek">
              <Sidebar_loggedout />
             </div>
               </div>
          
<Searchbar/>

           <div class="col-md-2">
               <div class="d-flex d-none d-md-flex flex-row align-items-center">
                   

               <div class="d-flex flex-column ms-2">
                    <span class="shop-bag">
                    
                   
                    <div className="dropdown">
                    <div className="dropbtn">
                      <a href="/favguest">
                    <img src={Heart} className="iconImg" alt="" />
                    </a>
                    {/* <Link to="/fav"> </Link> */}
                   
               
                    </div>
               
                </div>
                 </span>
                 </div>
                   {/* <img src={Bag} height={50} width={10}></img> */}
                   
                   <div class="d-flex flex-column ms-2">
                        <span class="shop-bag">

                        <div className="dropdown">
                        <div className="dropbtn">
                          <a href="/cartguest">
                    <img src={Bag} className="iconImg" alt="" />
                    </a>
                    </div>
                  
                    </div>
         </span>
                   </div>    


                   <div class="d-flex flex-column ms-2">
                        <span class="shop-bag">

                        <div className="dropdown">
                        <div className="dropbtn">
                       
                          <Button className="changethis" onClick={()=>loginMe()}><img src={User} className="iconImg" alt="" /></Button>
                        
                        
                        </div>
                       
                        </div>



         </span>
                   </div>   

                   
               </div>      
               
                    
           </div>

        
       </div>
	</div> 
</section>








</div>
     
       



    )
}

export default Navbar_loggedout