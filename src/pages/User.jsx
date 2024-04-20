import React, {useEffect, useState} from 'react';

const User = () => {
    const [userName, setUserName] = useState()
    const [item, setItem] = useState("")

    useEffect(() => {
        setItem(localStorage.getItem("token"))
        fetchContent()
    }, []);

    async function fetchContent() {
        try {
            const res = await fetch("http://localhost:8080/api/auth/user", {
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": "Bearer " + localStorage.getItem("token")
                }
            });

            if (res.ok) {
                const json = await res.text();
                setUserName(json);
            } else {
                console.error(`Failed to fetch: ${res.status} - ${res.statusText}`);
            }
        } catch (error) {
            console.error("Error fetching content:", error);
        }
    }

    return (
        <div style={{marginTop: "50px"}}>
            {
                item !== null ?
                    <p>sign in as: {userName}</p>
                    : <p>UNAUTHORIZED</p>
            }
        </div>
    );
};

export default User;