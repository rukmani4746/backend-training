import axios from 'axios'
import React, { useState } from 'react'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import Button from 'react-bootstrap/Button';
import Model from "../Model/Model"
import "./home.css"
import { toast, ToastContainer } from 'react-toastify';
// import Createbook from '../Createbook/createbook'
export default function Home() {
    const [data, setData] = useState([])
    const redirect = useNavigate()
    const [modalShow, setModalShow] = React.useState(false);
    //get all books data
    const GetData = async () => {
        await axios.get("http://localhost:3001/books")
            .then((res) => {

                if (res.status === 200) {
                    setData(res.data)
                }
            })
    }
    // console.log(data);
    //Delete Data


    useEffect(() => {
        GetData()
    }, [])
    return (
        <>
            <div className="container-fluid  text-center">
                <div className="row mt-4" >
                    {
                        data.map((curElem) => {

                            const { title, _id, excerpt, reviews, category } = curElem;
                            return (
                                <div className="col-md-4 mx-6 my-3" key={_id} onClick={() => {
                                    redirect("/reviewbook", { state: { title, _id } })
                                }}  >

                                    <div className="box">
                                        <h5>Book Name : {title}</h5>
                                        <h5>excerpt: {excerpt}</h5>
                                        <h5>category: {category}</h5>
                                        <h5>reviews: {reviews}</h5>
                                        <div>
                                            <div className="container d-flex justify-content-between my-3">
                                                <button type="button" className="btn btn-dark mx-1" >
                                                    Update</button>
                                                <>
                                                    <Button variant="btn btn-dark mx-1" onClick={() => setModalShow(!modalShow)}>
                                                        Delete
                                                    </Button>

                                                    {modalShow && <Model
                                                        show={modalShow}
                                                        onHide={async () => {

                                                            setModalShow(false)
                                                        }}
                                                        Flose={async () => {

                                                            await axios.put(`http://localhost:3001/deletebook/${_id}`)
                                                                .then((res) => {
                                                                    if (res.status === 200) {
                                                                        toast.success("Data deleted Successfully !")
                                                                    }

                                                                })
                                                            setModalShow(false)
                                                        }}

                                                    />}
                                                </>
                                                <button type="button" className="btn btn-dark mx-1" onClick={() => {
                                                    redirect("/createbook", { state: { title, _id } })
                                                }}>View</button>
                                            </div>
                                        </div>
                                    </div>

                                </div>)
                        })}

                </div>
            </div>
            <ToastContainer position='top-right' />
        </>
    )
}

