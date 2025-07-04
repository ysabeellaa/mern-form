import React, { useEffect, useState } from 'react'
import "./updateUser.css"
import { Link, useNavigate, useParams } from 'react-router-dom'
import axios from 'axios'
import toast from "react-hot-toast"

const DeleteUser = () => {
    const users = {
        name: "",
        email: "",
        address: ''
    }

    const [user, setUser] = useState(users)
    const navigate = useNavigate();
    const { id } = useParams();

    const inputHandler = (e) => {
        const { name, value } = e.target;
        console.log(name, value)
        setUser({ ...user, [name]: value })
    }

    useEffect(() => {
        axios.get(`http://localhost:8000/api/user/${id}`)
            .then((response) => {
                setUser(response.data)
            })
            .catch((error) => {
                console.log(error)
            })
    }, [id]);

    const submitForm = async (e) => {
        e.preventDefault();
        await axios
            .put(`http://localhost:8000/api/update/user/${id}`, user)
            .then((response) => {
                console.log("User created with success")
                toast.success(response.data.message, { position: "top-right" })
                navigate("/");
            })
            .catch((error) => {
                console.log(error)
            })
    }

    return (
        <div className='addUser'>
            <Link to="/" type='button' class='btn btn-secondary'>
                <i class="fa-solid fa-backward"></i> Back
            </Link>

            <h3>Update User</h3>
            <form action="" className="addUserForm" onSubmit={submitForm}>
                <div className="inputGroup">
                    <label htmlFor="name">Name:</label>
                    <input value={user.name} name="name" onChange={inputHandler} type="text" id="name" autoComplete='off' placeholder='Enter your Name' />
                </div>
                <div className="inputGroup">
                    <label htmlFor="email">Email:</label>
                    <input value={user.email} name="email" onChange={inputHandler} type="text" id="email" autoComplete='off' placeholder='Enter your Email' />
                </div>
                <div className="inputGroup">
                    <label htmlFor="address">Address:</label>
                    <input value={user.address} name="address" onChange={inputHandler} type="text" id="address" autoComplete='off' placeholder='Enter your Address' />
                </div>
                <div className="inputGroup">
                    <button type='submit' class='btn btn-primary'>Submit</button>
                </div>
            </form>
        </div>
    )
}

export default DeleteUser;
