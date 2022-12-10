import React, { useState } from 'react'
import "./register.css"
import axios from "axios"
import { Link } from 'react-router-dom'
function Register() {
    const [user, setUser] = useState({
        name: "",
        email: "",
        password: "",
        reEnterPassword: ""
    })
    const handleChange = (e) => {
        const { name, value } = e.target
        setUser({
            ...user,
            [name]: value,
        })
    }
    const register = () => {
        const { name, email, password, reEnterPassword } = user
        if (name && email && password && reEnterPassword) {
            if (password !== reEnterPassword) {
                alert("Password is not same")
            }
            axios.post("http://localhost:3001/register", user)
            // .then(res => console.log(res))
        } else {
            alert("All fields are required")
        }
    }
    return (
        <>
            <div className='register'>
                {console.log(user)}
                <h1>Register</h1>

                <div className="mb-3">

                    <input type="text"
                        name="name" value={user.name}
                        onChange={handleChange}
                        className="form-control" id="exampleInputEmail1"
                        placeholder='Your Name'
                        aria-describedby="emailHelp" />

                </div>
                <div className="mb-3">

                    <input type="email"
                        name="email" value={user.email}
                        onChange={handleChange} className="form-control" id="exampleInputEmail1"
                        placeholder='Your Email'
                        aria-describedby="emailHelp" />

                </div>
                <div className="mb-3">

                    <input type="password"
                        name="password" value={user.password}
                        onChange={handleChange}
                        placeholder='Password'
                        className="form-control" id="exampleInputPassword1" />
                </div>
                <div className="mb-3">

                    <input type="password"
                        name="reEnterPassword" value={user.reEnterPassword}
                        onChange={handleChange}
                        placeholder='Re-enter Password'
                        className="form-control" id="exampleInputPassword1" />
                </div>

                <button type="submit" className="button"
                    onClick={register} >Register</button>
                <div>OR</div>
                <button type="submit" className="button"><Link to="/login">Login</Link></button>

            </div>
        </>
    )
}

export default Register