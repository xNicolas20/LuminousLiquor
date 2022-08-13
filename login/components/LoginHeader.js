import React from 'react';

import './LoginHeader.css'

const LoginHeader = () =>{
    return <header className='login-header'>
        {/* <div className='contentLogin'>
        <a href='/login'className='login-login'>Log In</a>
        <a href='/register'className='login-signup'>Sign Up</a>
        </div> */}


<nav class="navbar navbar-dark navbar-expand p-0 bg-dark">
<div class="container-fluid">
    <ul class="navbar-nav d-none d-md-flex mr-auto">
		<li class="nav-item"><a class="nav-link" href="#" data-abc="true">Summer Sale is on. Get 25% discount on all products.</a></li>
	 </ul>
   
  </div> 

</nav> 



    </header>;
} 

export default LoginHeader;