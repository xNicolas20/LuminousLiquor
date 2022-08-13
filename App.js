import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import Signup from "./signup/page/Signup";
import Login from "./login/page/Login";
//import Welcome from "./Welcome/welcome";
import ActivationEmail from "./ActivationEmail";
import ForgotPassword from "./ForgotPassword";
import ResetPassword from "./ResetPassword";
import Homepage from "./homepage/page/Homepage";
import EditUser from "./editUser/page/EditUser";
import Home from './pages/home/home';
import Cart2 from './pages/cart/cart2';
import Checkout from './pages/checkout/checkout';
import Pay from './pages/pay/pay';
import Description from './components/description/description';
import Navbar2 from './pages/navbar2/navbar';
import Fav from './pages/fav/fav';
import Fav_loggedout from './pages/fav/fav_loggedout';
import Cart_loggedout from './pages/cart/cart_loggedout';
import Homepage2 from "./homepage/page/homepage2";
// import About from "./pages/about/about"
import Confirmation from "./pages/confirmation/confirmation";
import Questions from "./pages/questions/questions";


const App = () => {
  const [user, setLogInUser] = useState({});
  return (
    <div className="App">
      <Router>
        <Routes>

        <Route exact path="/product/:id" element={<Home />}>
      
        
      </Route>
      <Route exact path="/fav" element={<Fav />}>
      
        
      </Route>

      <Route exact path="/favguest" element={<Fav_loggedout />}>
      
        
      </Route>


      <Route exact path="/cartguest" element={<Cart_loggedout />}>
      
        
      </Route>



      <Route exact path="/cart" element={<Cart2 />}>
      
        
    
      </Route>

      <Route exact path="/checkout" element={<Checkout />}>
      </Route>

      <Route exact path="/confirmation" element={<Confirmation />}>
      </Route>


      <Route exact path="/description" element={<Description />}>
      
        
      </Route>

      <Route exact path="/pay" element={<Pay />}>
      
        
      </Route>

      <Route exact path="/questions" element={<Questions />}>
      
        
      </Route>



          <Route
            exact
            path="/login"
            element={<Login setLogInUser={setLogInUser} />}
          />
          <Route path="/register" element={<Signup />} />
          <Route
            exact
            path="/"
            element={
              
                <Homepage2 />
            }
          />
          {/* <Route
            exact
            path="/"
            element={
              user && user._id ? (
                <Homepage />
              ) : (
                <Login setLogInUser={setLogInUser} />
              )
            }
          /> */}
           <Route path="/activate/:activation_token" element={<ActivationEmail />} />
          <Route
            exact
            path="/forgot_password"
            element={<ForgotPassword />}
          />
          <Route path="/reset/:token" element={<ResetPassword />} />
          <Route path="/edituser" element={<EditUser />} />
          <Route path="/homepage" element={<Homepage />} />
        </Routes>
      </Router>
    </div>
  );
};

export default App;