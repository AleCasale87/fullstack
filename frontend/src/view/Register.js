import React, { useState } from 'react'
import axios from "axios";
import { useNavigate } from "react-router-dom";
 
const Register = () => {
    const [user, setUser] = useState({"username":"", "email":"", "password":"", "confPassword":""});
    const [msg, setMsg] = useState('');
    const [alert, setAlert] = useState(false)
    const history = useNavigate();
 
    const Register = async (e) => {
        e.preventDefault();
        let success = true
        try {
            await axios.post('http://localhost:5000/users', {
                username: user.username,
                email: user.email,
                password: user.password,
                confPassword: user.confPassword,
                subscription: new Date().toJSON().slice(0,10)
            });
        } catch (error) {
            success = false
            if (error.response) {
                if(typeof error.response.data.msg === "string"){
                    setMsg(error.response.data.msg);
                }
                else{
                    setMsg(error.response.data.msg.original.sqlMessage);
                }
            }
        }
        if(success)
            setAlert(true); 
    }

    const handleConfirm = () => {
        setAlert(false); 
        history("/");
    }
 
    return (
        <section className="hero has-background-grey-light is-fullheight is-fullwidth">
            <div className="hero-body">
                <div className="container">
                    <div className="columns is-centered">
                        <div className="column is-4-desktop">
                            <form onSubmit={Register} className="box">
                                <p className="has-text-centered">{msg}</p>
                                <div className="field mt-5">
                                    <label className="label">Userame</label>
                                    <div className="controls">
                                        <input type="text" className="input" placeholder="Name"
                                            value={user.username} onChange={(e) => setUser((prev) => {return {...prev, "username":e.target.value}})} />
                                    </div>
                                </div>
                                <div className="field mt-5">
                                    <label className="label">Email</label>
                                    <div className="controls">
                                        <input type="text" className="input" placeholder="Email" value={user.email} onChange={(e) => setUser((prev) => {return {...prev, "email":e.target.value}})} />
                                    </div>
                                </div>
                                <div className="field mt-5">
                                    <label className="label">Password</label>
                                    <div className="controls">
                                        <input type="password" className="input" placeholder="******" value={user.password} onChange={(e) => setUser((prev) => {return {...prev, "password":e.target.value}})} />
                                    </div>
                                </div>
                                <div className="field mt-5">
                                    <label className="label">Confirm Password</label>
                                    <div className="controls">
                                        <input type="password" className="input" placeholder="******" value={user.confPassword} onChange={(e) => setUser((prev) => {return {...prev, "confPassword":e.target.value}})} />
                                    </div>
                                </div>
                                <div className="field mt-5">
                                    <button className="button is-success is-fullwidth">Register</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
            {alert && 
            <div class="notification is-primary" style={{position:"absolute", width:"-webkit-fill-available"}}>
                <button class="delete" onClick={handleConfirm}></button>
                Registration Successful
            </div>}
        </section>
    )
}
 
export default Register