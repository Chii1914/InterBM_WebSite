import React from 'react'
import {useState} from 'react'
import axios from "axios"

const Register = () => {

  const [inputs, setInputs] = useState({
    username: "",
    password: "",
  })

  const handleChange = e =>{
    setInputs(prev=>({...prev, [e.target.name]: e.target.value}))
  }

  const handleSubmit = async e =>{
    e.preventDefault()
    try{
      let res = await axios.post("/auth/register", inputs)
      console.log(res)
    } catch(err){
      console.log(err)
    }
    
  }
  console.log(inputs)
  return (
    <div>Register
    <input required type = "text" placeholder='RUN' name='username' onChange={handleChange} />
    <input required type = "password" placeholder='password' name='password' onChange={handleChange} />
    <button onClick={handleSubmit}>Registrate!!</button>
    </div>
  )
}

export default Register