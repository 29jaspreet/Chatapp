import React ,{useState , useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import styled from "styled-components"
import {ToastContainer , toast} from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { registerRoute } from '../Utils/APIRoutes';

const Register = () => {
  const navigate =useNavigate();
  const [value,setValue]= useState({
    username:"",
    email:"",
    password:"",
    confirmPassword:"",
  })

  useEffect(()=>{
    if(localStorage.getItem('chat-app-user')){
      navigate('/')
    }
  })

  const handleSubmit = async(event)=>{
  event.preventDefault();

 if( handleValidation()){
  const {password , username , email}= value;
const{data} =await axios.post(registerRoute,{
  username , email , password
});
if(data.status===false){
  toast.error(data.msg , ToastOptions)
}
if(data.status===true){
  localStorage.setItem('chat-app-user',JSON.stringify(data.user))
navigate("/");

}
};
 
  };

const ToastOptions={
  position:"bottom-right",
  autoClose:8000,
  pauseOnHover:true,
  draggable:true,
  theme:"dark",
}

  const handleValidation=()=>{
    const{password , confirmPassword , username , email}= value;
    if(password!==confirmPassword){
      toast.error("password and confirm password should be same.", ToastOptions);
      return false;
    }else if(username.length<=3){
      toast.error("Username should be greater than 3 characters", ToastOptions);
      return false;
    }else if(password.length<8){
      toast.error("Password should be equal and greater than 8 characters", ToastOptions);
      return false;
    }else if(email===""){
      toast.error("Email is required", ToastOptions);
      return false;
    }
    return true;
  }

  const handleChange=(event)=>{
    setValue({...value,[event.target.name]:event.target.value})
  }
  return (
  <>
  <FormContainer>
    <form onSubmit={(event)=>handleSubmit(event)}>
      <div className="brand">
        <img src="" alt="logo" />
        <h1>GupShup</h1>
      </div>
      <input type="text" placeholder='Username' name='username'
      onChange={(e)=> handleChange(e)} />

       <input type="email" placeholder='Email' name='email'
      onChange={(e)=> handleChange(e)} /> 
      
      <input type="password" placeholder='Password' name='password'
      onChange={(e)=> handleChange(e)} />

       <input type="password" placeholder='Confirm Password' name='confirmPassword'
      onChange={(e)=> handleChange(e)} />

      <button type = "submit"> Create User</button>

      <span>
        Already have an account ? <Link to="/login">Log in</Link>
      </span>
    </form>
  </FormContainer>
  <ToastContainer/>
  </>
  )
}
// Styled-components is a library that allows you to write CSS in JS while building custom components in Reactjs . 

const FormContainer = styled.div`
height :100vh;
width:100vw;
display:flex;
flex-direction:column;
justify-content:center;
gap:1rem;
align-items:center;
background-color:#fbfcf8;


.brand{
display:flex;
align-items:center;
gap:1rem;
justify-content:center;

.img{
height:5rem;
}

h1{
color: #FF4500;
text-transform:uppercase;
}
}
form{
display:flex;
flex-direction:column;
gap:1rem;
background-color:;
border-radius:2rem;
padding:0.5rem 5rem;


input{
background-color:#D3D3D3;
padding:1rem;
border:0.1rem solid #D3D3D3;
border-radius:0.4rem;
color:black;
width:100%;
font-size:1rem;
&:focus{
border: 0.1rem solid black ;
outline:none; }
}

}
button{
background-color:#FF4500;
color:white;
padding:1rem 2rem;
border:none;
font-weight: bold;
cursor:pointer;
border-radius:0.4rem;
font-size:1rem;
text-transform:uppercase;
transition:0.5s ease-in-out;
&:hover{
background-color:orange;}}

span{
color:black;
text-transform:uppercase;
a{
color:#FF4500;

text-decoration:none;
font-weight:bold;
}}
`;

export default Register
