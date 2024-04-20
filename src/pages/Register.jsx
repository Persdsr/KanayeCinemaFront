import React, {useState} from 'react';
import {useNavigate} from "react-router-dom";
import app from "../App";

const Register = () => {
    const router = useNavigate()
    const [state, setState] = useState({
        username: "",
        email: "",
        password: ""
    })


    async function handle(e) {
        e.preventDefault()

        const res = await fetch("http://localhost:8080/api/auth/signup", {
            method: "POST",
            body: JSON.stringify(state),
            headers: {
                "Content-Type": "application/json"
            }
        })
        if (res.ok) {
            alert("success")
            router("/signin")
        } else {
            console.log(res.statusText)
        }
    }

    function extract(e) {
        const copy = {...state}
        copy[e.target.name] = e.target.value
        setState(copy)
    }

    return (
        <div>
            <form onSubmit={(e) => handle(e)} style={{marginTop: "50px"}} method="POST">
                <div>
                    <input type="text" name="username" placeholder="Имя пользователя" value={state.username} onChange={extract} autoComplete="off"/>
                </div>
                <div>
                    <input type="email" name="email" placeholder="email" value={state.email} onChange={extract} autoComplete="off"/>
                </div>
                <div>
                    <input type="password" name="password" placeholder="Пароль" value={state.password} autoComplete="off" onChange={extract}/>
                </div>
                <button type="submit">Зарегистрироваться</button>
            </form>
        </div>
    );
};

export default Register;