import React, {useState} from 'react';
import {json, useNavigate} from "react-router-dom";

const Login = () => {
    const router = useNavigate()
    const [state, setState] = useState({
        username: "",
        password: "",

    })

    async function handle(e) {
        e.preventDefault()
        localStorage.clear()
        const res = await fetch("http://localhost:8080/api/auth/signin", {
            method: "POST",
            body: JSON.stringify(state),
            headers: {
                "Content-Type": "application/json"
            }
        })
        if (res.ok) {
            const json = await res.text()
            console.log(json)
            localStorage.setItem("token", json)
            localStorage.setItem("username", state.username)
            router("/")
            window.location.reload()
        }
    }

    function fill(e) {
        const copy = {...state}
        copy[e.target.name] = e.target.value
        setState(copy)
    }

    return (
        <div>
            <form onSubmit={(e) => handle(e)} style={{marginTop: "50px"}} method="POST">
                <div>
                    <input type="text" name="username" placeholder="Имя пользователя" value={state.username} onChange={fill} autoComplete="off"/>
                </div>
                <div>
                    <input type="password" name="password" placeholder="Пароль" value={state.password} autoComplete="off" onChange={fill}/>
                </div>
                <button style={{width: "200px"}} type="submit">Войти</button>
            </form>
        </div>
    );
};

export default Login;