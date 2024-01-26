import React, { useState } from "react";
import {useNavigate } from "react-router-dom";

export const Signin = (props) => {
    const navigate = useNavigate();
    const [credentials, setCredentials] = useState({email: "", password: ""})
    const handleSubmit= async (e) => {
        e.preventDefault();
        const response = await fetch('https://keepnotesbackend-d8ye.onrender.com/api/auth/login', {
            method: "POST",  
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({email: credentials.email, password: credentials.password}),
          });
          const json = await response.json();
          console.log(json.success);

          if(json.success){
            // redirect
            localStorage.setItem('token', json.authtoken);
            navigate("/");
            props.showAlert("Logged in Successfully", "success")
        } 
          else{
            props.showAlert("Invalid Credentials", "danger")
          }

    }

    const handleChange = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value })
    }


    return (
        <div className="container border mt-4 p-4">
            <form onSubmit={handleSubmit}>
                <div className="form-group p-4">
                    <label htmlFor="email">Email address</label>
                    <input type="email" className="form-control" id="email" name="email" aria-describedby="emailHelp" value={credentials.email} placeholder="Enter email" onChange={handleChange}/>
                </div>
                <div className="form-group p-4">
                    <label htmlFor="password">Password</label>
                    <input type="password" className="form-control" id="password" name="password" placeholder="Password" value={credentials.password} onChange={handleChange}/>
                </div>
                <button type="submit" className="btn btn-warning m-4" >Submit</button>
            </form>
        </div>

    )
}