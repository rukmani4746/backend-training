import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import "../mix.css"
import axios from 'axios'
import 'react-toastify/dist/ReactToastify.css';
import { toast, ToastContainer } from 'react-toastify'

export default function Login() {
    const [showpass, setShowpass] = useState(false)
    const [inp, setInp] = useState({
        email: "",
        password: ""
    })
    // console.log(inp);
    const changeinp = (e) => {
        let { name, value } = e.target
        setInp({ ...inp, [name]: value })
    }
    const onlogin = async (e) => {
        e.preventDefault()
        let { email, password } = inp
        if (email === "") {
            toast.error("email is required!", {
                position: "top-right"
            });
        }
        else if (password === "") {
            toast.error("password is required!", {
                position: "top-right"
            });
        }
        else {
            // console.log(inp);
            await axios.post("http://localhost:3001/login", inp)
                .then((res) => {
                    console.log(res.data.data);
                    if (res.status === 200) {
                        toast.success("Login successfull !", {
                            position: "top-right"
                        });
                        localStorage.setItem("userdatatoken", res.data.data)
                    }
                })
                .catch((err) => {
                    console.log(err.response.data.message);
                    toast.error(err.response.data.message, {
                        position: "top-right"
                    })
                })
        }
    }

    return (
        <>
            <section>
                <div className="form_datalogin">
                    <div className="form_heading">
                        <h1>Welcome Back, Log In</h1>
                        <p>Hi, we are glad you back. Please login.</p>
                    </div>
                    <form >
                        <div className="form_input">
                            <label htmlFor="email">Email</label>
                            <input type="email" name="email" id='email'
                                value={inp.email}
                                onChange={changeinp}
                                placeholder='Enter Your Email Address' />
                        </div>
                        <div className="form_input">
                            <label htmlFor="password">Password</label>
                            <div className="two">
                                <input type={!showpass ? "password" : "text"}
                                    name= "password"  id='password'
                                    value={inp.password}
                                    onChange={changeinp}
                                    placeholder='Enter Your Password' />
                                <div className="showpass" onClick={() => {
                                    setShowpass(!showpass)
                                }}>{(!showpass) ? "Show" : "Hide"}</div>

                            </div>
                        </div>
                        <button className="btn" onClick={onlogin} >Login</button>
                        <Link to={"/register"}>
                            <p>Don't have an accout? Sign Up</p>
                        </Link>
                    </form>
                </div>
            </section >
            <ToastContainer position='top-right' />

        </>
    )
}
