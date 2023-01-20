import React, { useState } from 'react'
import axios from 'axios'

const UpdateUser = () => {
    const [userId, setUserId] = useState("")
    const [updateField, setUpdateField] = useState("")
    const [updateValue, setUpdateValue] = useState("")

    const handleSubmit = (event) => {
        event.preventDefault()
        axios.patch(`http://localhost:5000/users/${userId}`, { [updateField]: updateValue })
            .then(res => {
                setTimeout(() => {
                    if(res.data && res.status === 200){
                        alert("User updated Successfully...")
                        setUserId("")
                        setUpdateField("")
                        setUpdateValue("")
                    }
                }, 400)
                console.log(res)
            })
            .catch(err => {
                console.log(err)
            })
    }

    return (
        <div>
            <h1>Update User</h1>
            <form onSubmit={handleSubmit}>
                <input type="text" placeholder="User ID" onChange={e => setUserId(e.target.value)} />
                <input type="text" placeholder="Field to update (e.g. first_name, last_name, email, phone)" onChange={e => setUpdateField(e.target.value)} />
                <input type="text" placeholder="New value" onChange={e => setUpdateValue(e.target.value)} />
                <button type="submit">Update</button>
            </form>
        </div>
    )
}

export default UpdateUser