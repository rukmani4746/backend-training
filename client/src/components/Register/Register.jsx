import React from 'react'
import { Link, useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
// import "../mix.css"             //import nhi karne par bhe css properwork kar raha
import { useState } from 'react';
import axios from "axios"
import { toast, ToastContainer } from "react-toastify"
import 'react-toastify/dist/ReactToastify.css';

export default function Register() {

    const redirect = useNavigate()
    const [show, setShow] = useState(false)
    const [input, setInput] = useState({
        title: "Mr",
        name: "",
        email: "",
        password: "",
        address: "",
        city: "",
        pincode: "",
        phone: ""
    })
    // console.log(input);
    const setinput = (e) => {
        let { name, value } = e.target
        setInput({ ...input, [name]: value })
    }
    const Register = async (e) => {
        e.preventDefault()
        let { name, email, password, address, city, pincode, phone } = input

        if (name === "") {
            toast.error("name is required!", {
                position: "top-right"
            });
        }
        else if (email === "") {
            toast.error("email is required!", {
                position: "top-right"
            });
        } else if (!email.includes("@")) {
            toast.warning("includes @ in your email!", {
                position: "top-right"
            });
        } else if (password === "") {
            toast.error("password is required!", {
                position: "top-right"
            });
        } else if (password.length < 6) {
            toast.error("password must be 6 char!", {
                position: "top-right"
            });
        } else if (address === "") {
            toast.error("address is required!", {
                position: "top-right"
            });
        }
        else if (city === "") {
            toast.error("address is required!", {
                position: "top-right"
            })
        }
        else if (pincode === "") {
            toast.error("pincode is required!", {
                position: "top-right"
            })
        }
        else if (pincode.length !== 6) {
            toast.error("Invalid pincode !", {
                position: "top-right"
            })
        }
        else if (phone === "") {
            toast.error("phone number is required ", {
                position: "top-right"
            })
        }
        else if (phone.length !== 10) {
            toast.error("Invalid phone number", {
                position: "top-right"
            })
        }
        else {
            await axios.post("http://localhost:3001/register", input)

                .then((res) => {
                    // toast.success("Registred Successfully !")
                    // redirect("/")    aaise karne se direct redirect ho ja raha tha message print nhi ho raha tha

                    if (res.status === 201) {
                        toast.success("Registred Successfully !")
                        setTimeout(() => {
                            redirect("/")
                        }, 1000)

                    }

                }).catch((err) => {
                    toast.error(err.response.data.msg);
                })// error aane pe  catch run hona chaheya then bhe run ho raha hai   
            //catch se error bhejne pe bhe console pe error dhek raha hai kya ye sahi hai
        }
    }
    return (
        <>
            <section>
                <div className="form_data" >
                    <div className="form_heading">
                        <h1>Register</h1>
                        <p>Hi, we are glad you back. Please Register.</p>
                    </div>
                    <form >
                        <Container>
                            <Row>
                                <Col>
                                    <div className="form_input ">
                                        <label htmlFor="title" >Title</label>
                                        <select type="title" name='title' id='title'
                                            value={input.title} onChange={setinput}
                                        ><option href="#/action-1">Mr</option>
                                            <option href="#/action-2">Mrs</option>
                                            <option href="#/action-3">Miss</option>
                                        </select>

                                    </div>

                                    <div className="form_input">
                                        <label htmlFor="Name">Name</label>
                                        <input type="Name" name='name' id='Name'
                                            value={input.name} onChange={setinput}
                                            placeholder='Enter Your Name ' />
                                    </div>

                                    <div className="form_input">
                                        <label htmlFor="email">Email</label>
                                        <input type="email" name='email' id='email'
                                            value={input.email} onChange={setinput}
                                            placeholder='Enter Your Email Address' />
                                    </div>
                                    <div className="form_input">
                                        <label htmlFor="password">Password</label>
                                        <div className="two">
                                            <input type={!show ? "password" : "text"}
                                                name='password' id='password'
                                                value={input.password} onChange={setinput}
                                                placeholder='Enter Your Password' />
                                            <div className="showpass_register" onClick={() => {
                                                setShow(!show)
                                            }}>{!show ? "Show" : "Hide"}</div>
                                        </div>
                                    </div>


                                </Col>
                                <Col><div className="form_input">
                                    <label htmlFor="Phone">Phone</label>
                                    <input type="Phone" name='phone' id='Phone'
                                        value={input.phone} onChange={setinput}
                                        placeholder='Enter Your Phone Number' />
                                </div>

                                    <div className="form_input">
                                        <label >Address</label>
                                        <div className="two">
                                            <input type="address"
                                                name='address' id='address'
                                                value={input.address} onChange={setinput}
                                                placeholder='Enter Your Address' />
                                        </div>
                                    </div>
                                    <div className="form_input">
                                        <label >City</label>
                                        <div className="two">
                                            <input type="city"
                                                name='city' id='city'
                                                value={input.city} onChange={setinput}
                                                placeholder='Enter Your City' />

                                        </div>
                                    </div>
                                    <div className="form_input">
                                        <label >Pincode</label>
                                        <div className="two">
                                            <input type="pincode"
                                                name='pincode' id='pincode'
                                                value={input.pincode} onChange={setinput}
                                                placeholder='Enter Your Pincode' />

                                        </div>
                                    </div>
                                </Col>
                            </Row>
                            <button className="btn" onClick={Register} >Register</button>
                            <Link to={"/"}>
                                <p>Already Member? Sign In</p>
                            </Link>

                        </Container>
                    </form>
                </div>
            </section>
            <ToastContainer position='top-right' />
        </>
    )
}
