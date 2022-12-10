import React, { useState } from 'react'
import "./login.css"
import axios from 'axios'
import { Link } from 'react-router-dom'

function Login() {

    const [data, setData] = useState({
        email: "",
        password: ""
    })
    const handleChange = (e) => {
        const { name, value } = e.target
        setData({
            ...data,
            [name]: value
        })
    }
    const login = () => {
        axios.post("http://localhost:3001/login", data)
    }
    return (
        <>
            {console.log(data)}
            <div className='login'>
                <h1>Login</h1>

                <div className="mb-3">
                    <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
                    <input type="email" className="form-control" name='email' value={data.email}
                        placeholder="example@gmail.com" onChange={handleChange} id="exampleInputEmail1"
                        aria-describedby="emailHelp" />

                </div>
                <div className="mb-3">
                    <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
                    <input type="password" className="form-control" name='password' value={data.password}
                        placeholder="Password" onChange={handleChange} id="exampleInputPassword1" />
                </div>

                <button type="submit" className="button" onClick={login}>Login</button>
                <div>OR</div>
                <button type="submit" className="button" > <Link to="/register">Register</Link></button>

            </div>
        </>
    )
}

export default Login