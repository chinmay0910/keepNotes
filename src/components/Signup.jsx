import React, { useState } from "react";
import { useNavigate } from "react-router-dom";



export const Signup = (props) => {
    const navigate = useNavigate();
    const [credentials, setCredentials] = useState({name: "", email: "", password: "", cpassword: ""})
    const handleSubmit= async (e) => {
        e.preventDefault();
        const response = await fetch('http://localhost:5000/api/auth/createuser', {
            method: "POST",  
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({name: credentials.name, email: credentials.email, password: credentials.password}),
          });
          const json = await response.json();
          console.log(json);

          if(json.success){
            // redirect
            localStorage.setItem('token', json.authtoken);
            navigate("/");
            props.showAlert("Account Created Succesfully", "success")
        } 
          else{
            // alert(json.error)
            props.showAlert("User Already Exists", "danger")
          }

    }

    const handleChange = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value })
    }

    return (
        <div className="container border mt-4 p-4">
            <form onSubmit={handleSubmit}>
                <div className="form-group p-4">
                    <label htmlFor="name">Name</label>
                    <input type="text" className="form-control" id="name" name="name" aria-describedby="emailHelp" value={credentials.name} placeholder="Enter Name" onChange={handleChange}/>
                </div>
                <div className="form-group p-4">
                    <label htmlFor="email">Email address</label>
                    <input type="email" className="form-control" id="email" name="email" aria-describedby="emailHelp" value={credentials.email} placeholder="Enter email" onChange={handleChange}/>
                </div>
                <div className="form-group p-4">
                    <label htmlFor="password">Password</label>
                    <input type="password" className="form-control" id="password" name="password" placeholder="Password" value={credentials.password} onChange={handleChange} minLength={3} required/>
                </div>
                <div className="form-group p-4">
                    <label htmlFor="cpassword">Confirm Password</label>
                    <input type="password" className="form-control" id="cpassword" name="cpassword" placeholder="Confirm Password" value={credentials.con_pass} onChange={handleChange} minLength={3} required/>
                </div>
                <button type="submit" className="btn btn-warning m-4" >Submit</button>
            </form>
        </div>

    )
}