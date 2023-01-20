import React, { useState } from 'react'
import axios from 'axios'

const EmailAllUsers = () => {
    const [isLoading, setIsLoading] = useState(false)
    const [status, setStatus] = useState("")

    const handleClick = () => {
        setIsLoading(true)
        axios.post(`http://localhost:5000/users/email`)
            .then(res => {
                setIsLoading(false)
                setStatus("success")
            })
            .catch(err => {
                setIsLoading(false)
                setStatus("error")
                console.log(err)
            })
    }

    return (
        <div>
            <h1>Sending Email to all Users.</h1>
            {isLoading ? (
                <div>Sending Emails...</div>
            ) : (
                <button onClick={handleClick}>Email all users</button>
            )}
            {status === "success" ? (
                <div>Emails sent to all users!</div>
            ) : null}
            {status === "error" ? (
                <div>An error occurred while sending emails.</div>
            ) : null}
        </div>
    )
}

export default EmailAllUsers