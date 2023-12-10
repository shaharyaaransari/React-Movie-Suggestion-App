import React, { useState } from 'react'
import styles from "../component/styles/Login.module.css"
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
export const Login = () => {
  const intailValue = { username: "", email: "", password: "" }
  const [details, setDetails] = useState(intailValue);
  const [formErorr, setFormError] = useState({})
  const [show, setShow] = useState(false);
  const handleChange = (e) => {
    const { name, value } = e.target;
    setDetails({ ...details, [name]: value })
  }

  const handleRegister = () => {
   
    setFormError(validate(details))
    localStorage.setItem("userDetails", JSON.stringify(details))
    if (details.email && details.username && details.password) {
      setShow(!show)
    }
    setDetails(intailValue)

  }

  const validate = (value) => {
    const error = {};
    const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    if (!value.username) {
      error.username = "username is required!"
    }
    if (!value.email) {
      error.email = "email is required!"
    }
    if (!value.password) {
      error.password = "password is required!"
    } else if (!regex.test(value.password)) {
      error.password = "please enter valid password!"
    }
    return error
  }
  const handleChangeLogin = (e) => {
    const { name, value } = e.target;
    setDetails({ ...details, [name]: value })
  }

  const handleLogin = () => {
    let storedDetails = localStorage.getItem("userDetails");
    if (storedDetails) {
      storedDetails = JSON.parse(storedDetails);
      setFormError(validate(details));

      if (storedDetails.email === details.email && storedDetails.password === details.password) {
        withReactContent(Swal).fire({
          title: <i>Login successfull.</i>,
      
        })
        console.log("Success");
      } else {
        withReactContent(Swal).fire({
          title: <i>Invalid email or password.</i>, 
        })
       
      }
    } else {
      withReactContent(Swal).fire({
        title: <i>User not found. Please register.</i>, 
      })
     
    }
    setDetails(intailValue)
  }
  return (
    <div >  
      <div className={`${styles.back}`}>
        {show ? <>
          <h2>Sign Up</h2>
          <img src="https://www.bonanzaonline.com/images/img_avatar.png" alt="avatar" />
          <label htmlFor="uname"><b>Username</b></label>
          <input type="text" name='username' value={details.username} onChange={(e) => handleChange(e)} placeholder='Enter Username' />
          <p>{formErorr.username}</p>
          <label htmlFor="emai"><b>Email</b></label>
          <input type="email" name='email' value={details.email} onChange={(e) => handleChange(e)} placeholder='Enter Email' />
          <p>{formErorr.email}</p>
          <label htmlFor="psw"><b>Password</b></label>
          <input type="password" name='password' value={details.password} onChange={(e) => handleChange(e)} placeholder='Enter password' />
          <p>{formErorr.password}</p>
          <button onClick={handleRegister}>Register</button>
        </> : <>

          <h2>Login</h2>
          <img src="https://www.bonanzaonline.com/images/img_avatar.png" alt="avatar" />
          <label htmlFor="emai"><b>Email</b></label>
          <input type="email" name='email' value={details.email} onChange={(e) => handleChangeLogin(e)} placeholder='Enter Email' />
          <p>{formErorr.email}</p>
          <label htmlFor="psw"><b>Password</b></label>
          <p>{formErorr.password}</p>
          <input type="password" name='password' value={details.password} onChange={(e) => handleChangeLogin(e)} placeholder='Enter password' />
          <button onClick={handleLogin}>Login</button>
          <button onClick={() => setShow(!show)}>Register</button>

        </>}

      </div>


    </div>
  )
}
