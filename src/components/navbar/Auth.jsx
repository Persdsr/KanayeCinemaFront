import React, {useEffect, useState} from 'react';
import {useNavigate} from "react-router-dom";

const Auth = () => {
    const router = useNavigate();

    const [item, setItem] = useState("")
    useEffect(() => {
        setItem(localStorage.getItem("token"))
        fetchContent()
    }, [item]);

    function logout() {
        localStorage.removeItem("token")
        setItem(null)
        router("/")
        window.location.reload()
    }

    const [userName, setUserName] = useState()

    async function fetchContent() {
            try {
                const res = await fetch("http://localhost:8080/api/auth/userinfo", {
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": "Bearer " + localStorage.getItem("token")
                    }
                });

                if (res.ok) {
                    const json = await res.json();
                    setUserName(json.username);
                    localStorage.setItem("username", json.username)
                    localStorage.setItem("roles", json.roles)
                } else {
                    console.error(`Failed to fetch: ${res.status} - ${res.statusText}`);
                }
            } catch (error) {
                console.error("Error fetching content:", error);

        }
    }

    return (
        <div className="profile-container">
            {
                item !== null ?
                    <h2>{userName}</h2>
                    : null
            }

            {
                item !== null ?
                    <h2 style={{color: "#4dbf00", cursor: "pointer", fontSize: "20px", marginLeft: "10px"}}
                        onClick={logout}>Logout</h2>
                    : null
            }
            {
                item == null ?
                    <h2><a href="/register">Регистрация</a></h2>
                    : null
            }
            {
                item == null ?
                    <h2><a style={{color: "#4dbf00"}} href="/signin">Войти</a></h2>
                    : null
            }
        </div>
    );
};

export default Auth;