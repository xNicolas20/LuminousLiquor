import React, { useState, useEffect } from 'react';
import * as FaIcons from 'react-icons/fa';
import * as AiIcons from 'react-icons/ai';
import './leftcomp.css';
import { Link } from 'react-router-dom';
import { SidebarData } from './SidebarData';
import { SidebarData_loggedout } from './SidebarData_loggedout';

import Menu from '../images/menu.png'

const Leftcomp = () =>{

  const [check, setCheck] = useState(false);


  useEffect(()=> {
    let data = sessionStorage.getItem('myUser')
    data = JSON.parse(data)
    if(data!=null){
    setCheck(true);
   
    }
    else{
      setCheck(false);
    }
  
  
  })


    const [sidebar, setSidebar] = useState(false);

    const showSidebar = () => setSidebar(!sidebar);



    return(
        <>
        <div className='leftbar'>

             
          <Link to='#' className='leftmenu-bars'>
            <FaIcons.FaBars onClick={showSidebar} />
          </Link>
        </div>


        
        {check?(
        <nav className={sidebar ? 'nav-men active' : 'nav-men'}>
          
          <ul className='nav-menu-items' onClick={showSidebar}>
            {SidebarData.map((item, index) => {
              return(
                <li key={index} className={item.cName}>
                  
                  <Link to={item.path}>
                    <span>{item.title}</span>
                  </Link>
                </li>
              )
            })}
            <li className='navbar-toggle'>
              <Link to='#' className='menu-bars-closing'>
                <AiIcons.AiOutlineClose />
              </Link>
            </li>
          </ul>
        </nav>
        ):(
          <nav className={sidebar ? 'nav-men active' : 'nav-men'}>
          
          <ul className='nav-menu-items' onClick={showSidebar}>
            {SidebarData_loggedout.map((item, index) => {
              return(
                <li key={index} className={item.cName}>
                  
                  <Link to={item.path}>
                    <span>{item.title}</span>
                  </Link>
                </li>
              )
            })}
            <li className='navbar-toggle'>
              <Link to='#' className='menu-bars-closing'>
                <AiIcons.AiOutlineClose />
              </Link>
            </li>
          </ul>
        </nav>
        )
          }
        </>
    )
}
export default Leftcomp;