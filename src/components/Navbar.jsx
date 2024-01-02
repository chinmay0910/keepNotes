import React from "react";
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Logo from '../assets/note_logo.png'
import SearchLogo from '../assets/Search_Icon.png'
import SettingsLogo from '../assets/settings_logo.png'
import { Link, useNavigate } from "react-router-dom";

export const NavigationBar = () => {
    const navigate = useNavigate();
    const handleLogout = () => {
        localStorage.removeItem('token');
        navigate('/signin')
    }

    return (
        <>
            <div className="bg-body-secondary">
                <Navbar expand="lg" className=" mx-4">
                    <div className="nav-container navbar-brand d-flex flex-row align-items-center">
                        <img className="brand" src={Logo} alt="" style={{ width: "40px" }} />
                        <Navbar.Brand className="ms-2" href="/">keepNotes</Navbar.Brand>
                    </div>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav ">
                        <Nav className="ms-auto">
                            <form className="form-inline w-100 my-2 my-lg-0  d-flex flex-row align-items-center">
                                <input className="form-control mr-lg-2" type="search" placeholder="Search" aria-label="Search" />
                                <button className="btn btn-outline-warning my-2 my-sm-0" type="submit"><img style={{ width: "20px" }} src={SearchLogo} alt="SearchLogo" /></button>
                            </form>
                            <button className="btn btn-outline-warning my-2 my-sm-0" type="submit"><img style={{ width: "20px" }} src={SettingsLogo} alt="SettingsLogo" /></button>
                            
                            {
                                !localStorage.getItem('token')?
                                <div className="d-flex flex-row">
                                    <Link className="btn btn-outline-warning my-2 my-sm-0" to='/signin' role="button">signin</Link>
                                    <Link className="btn btn-outline-warning my-2 my-sm-0" to='/signup' role="button">signup</Link>
                                </div>: 
                                <div>
                                    <button className="btn btn-outline-warning my-2 my-sm-0" onClick={handleLogout}>Logout</button>
                                </div>
                            }
                            

                        </Nav>
                    </Navbar.Collapse>
                </Navbar>
            </div>

        </>
    )

}