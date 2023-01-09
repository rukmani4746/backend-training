import React, { useState } from 'react'
import { toast, ToastContainer } from "react-toastify"
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';

export default function Createbook() {
    const location = useLocation()
    const redirect = useNavigate()
    const [input, setInput] = useState({
        authorname: "",
        title: "",
        excerpt: "",
        ISBN: "",
        category: "",
        subcategory: ""
    })
    const changeval = (e) => {
        let { name, value } = e.target
        setInput({ ...input, [name]: value })
    }

    const submit = (e) => {
        e.preventDefault()
        const { name, title, excerpt, ISBN, category, subcategory } = input
        let obj = {}
        for (let el in input) {
            if (input[el] !== "")
                obj[el] = input[el]
        }
        if (location.state.heading === "Update Book") {
            console.log(input);
            //Update Book
            axios.put(`http://localhost:3001/books/${location.state._id}`, obj)
                .then((res) => {
                    if (res.status === 200)
                        setTimeout(() => {
                            redirect("/home")
                        }, 700)
                    toast.success("Book Updated Successfully !")
                })
                .catch((err) => {
                    toast.error(err.response.data.message)

                })

        } else {
            //Create Book
            console.log("create book called");

            if (name === "") {
                toast.error("Author Name is required!", {
                    position: "top-right"
                });
            }
            else if (title === "") {
                toast.error("title is required!", {
                    position: "top-right"
                });
            } else if (excerpt === "") {
                toast.error("excerpt is required!", {
                    position: "top-right"
                });
            } else if (ISBN === "") {
                toast.error("ISBN is required!", {
                    position: "top-right"
                });
            }
            else if (category === "") {
                toast.error("category is required!", {
                    position: "top-right"
                })
            }
            else if (subcategory === "") {
                toast.error("subcategory is required!", {
                    position: "top-right"
                })
            } else {
                axios.post("http://localhost:3001/books", input)
                    .then((res) => {
                        if (res.status === 201)
                            setTimeout(() => {
                                toast.success("Book created Successfully !")
                            }, 500)
                        redirect("/home")

                    })
                    .catch((err) => {
                        toast.error(err.response.data.message)

                    })
            }
        }



    }
    return (
        <>
            <section>
                <div className="form_data">
                    <h1>{location.state ? location.state.heading : "Register Your Book"}</h1>
                    <form action="">

                        <div className="form_input">
                            <label htmlFor="name">AUTHOR NAME
                            </label>
                            <input type="text" name='authorname' placeholder='Enter Your Name '
                                value={input.authorname}
                                onChange={changeval} />
                        </div>
                        <div className="form_input">
                            <label htmlFor="name">TITLE
                            </label>
                            <input type="name" name='title' placeholder='Enter Your Name ' value={input.title}
                                onChange={changeval} />
                        </div>
                        <div className="form_input">
                            <label htmlFor="excertp">EXCERPT
                            </label>
                            <input type="text" name='excerpt' placeholder='Enter excerpt ' value={input.excerpt}
                                onChange={changeval} />
                        </div>
                        <div className="form_input">
                            <label htmlFor="ISBN">ISBN
                            </label>
                            <input type="number" name='ISBN' placeholder='Enter isbn number ' value={input.ISBN}
                                onChange={changeval} />
                        </div>
                        <div className="form_input">
                            <label htmlFor="category">CATEGORY
                            </label>
                            <input type="text" name='category' placeholder='Enter Category' value={input.category}
                                onChange={changeval} />
                        </div>
                        <div className="form_input">
                            <label htmlFor="subcategory">SUBCATEGORY
                            </label>
                            <input type="text" name='subcategory' placeholder='Enter SubCategory' value={input.subcategory}
                                onChange={changeval} />
                        </div>
                        <button className="btn" onClick={submit} >SUBMIT</button>
                    </form>
                </div>
            </section>
            <ToastContainer position='top-right' />
        </>
    )
}
