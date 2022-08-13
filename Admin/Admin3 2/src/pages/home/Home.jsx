import Chart from "../../components/chart/Chart";
import FeaturedInfo from "../../components/featuredInfo/FeaturedInfo";
import "./home.css";
import { Sales } from "../../dummyData";
import WidgetSm from "../../components/widgetSm/WidgetSm";
import WidgetLg from "../../components/widgetLg/WidgetLg";
import { useEffect } from "react";
import { useState } from "react";
import axios from "axios";
import Sidebar from "../../components/sidebar/Sidebar";
 
export default function Home() {

        
 
        // useEffect(() => {
        //   let x = sessionStorage.getItem('user')
          
        //   if(x === null){
        //   const queryParams = new URLSearchParams(window.location.search);
        //   const key = queryParams.get('key');
        //   const mail = queryParams.get('email');
        //   if (key === null || mail === null){
        //     window.location.replace('http://localhost:3001/login') 
        //   }
        
          
         
        
    
        //   axios.get("https://luminous-liquor.herokuapp.com/loginAdmin/"+ mail + "/" + key).then((res) => {
        //     if(res.data.message !== 'Login Success'){
        //       window.location.replace('http://localhost:3001/login') 
        //     }
        //     else{
              
        //       sessionStorage.setItem('user', mail)
        //       let x = sessionStorage.getItem('user')
        //     }
        //   })
        // }
        //     //alert(res.data.user.password);
            
        // }, [])

        
 
  
  return (
    <div className="home">
      <FeaturedInfo />
      <Chart data={Sales} title="User Analytics" grid dataKey="Sales"/>
      {/* <div className="homeWidgets">
        <WidgetSm/>
        <WidgetLg/>
      </div> */}
    </div>
  );
}
