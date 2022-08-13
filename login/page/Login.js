import React from 'react';
import LoginInput from '../components/LoginInput';
import LoginHeader from '../components/LoginHeader';
import './Login.css';

const Login = ({setLogInUser}) =>{
    return <div className='login-page'>
        <LoginHeader/>
        <LoginInput setLogInUser={setLogInUser} />
    </div>;
}

export default Login;