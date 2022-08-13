import React from 'react';
import SignupHeader from '../components/SignupHeader';
import SignupInput from '../components/SignupInput';
import './Signup.css';

const Signup = () =>{
    return <div className='signup-page'>
        <SignupHeader/>
        <SignupInput/>
    </div>;
}

export default Signup;