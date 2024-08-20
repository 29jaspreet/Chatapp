import React ,{useState ,useEffect} from 'react'
import { Link, useNavigate } from 'react-router-dom';
import styled from "styled-components"
import {ToastContainer , toast} from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { loginRoute } from '../Utils/APIRoutes';

const Login = () => {
  const navigate =useNavigate();
  const [value,setValue]= useState({
    username:"",
    password:"",
  })

  useEffect(()=>{
    if(localStorage.getItem('chat-app-user')){
      navigate('/')
    }
  })
  const handleSubmit = async(event)=>{
  event.preventDefault();

 if( handleValidation()){
  const {password , username }= value;
const{data} =await axios.post(loginRoute,{
  username  , password,
});
if(data.status === false){

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
    const{password , username }= value;
    if(password===""){
      toast.error("Username and Password is required", ToastOptions);

      return false;
    }else if(username.length===""){
      toast.error("Username and Password is required", ToastOptions);
      return false;
    }
    return true;
  };

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
      onChange={(e)=> handleChange(e)} min="3"/>

       
      
      <input type="password" placeholder='Password' name='password'
      onChange={(e)=> handleChange(e)} />

       

      <button type = "submit">Login</button>

      <span>
      Don't have an account ? <Link to="/register">Register</Link>
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

export default Login;

