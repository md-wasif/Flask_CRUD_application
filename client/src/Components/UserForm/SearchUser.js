import React, { useState } from 'react'
import axios from 'axios'

const SearchUsers = () => {
    const [searchResults, setSearchResults] = useState([])
    const [searchTerm, setSearchTerm] = useState("")
    const [fields, setFields] = useState([])

    const handleSubmit = (event) => {
        event.preventDefault()
        if(searchTerm !== ""){
            let queryString = ""
            queryString += `${fields}=${searchTerm}&`
    
            axios.get(`http://localhost:5000/users?${queryString}`)
            .then(res => {
                setSearchResults(res.data)
                console.log(res)
            })
            .catch(err => {
                console.log(err)
            })
        } else{
            alert('Please enter a search term.')
        }
    }

    return (
        <div>
            <h1>Search Users</h1>
            <select onChange={(event)=>setFields(event.target.value)}>
                <option value="first_name">First Name</option>
                <option value="last_name">Last Name</option>
                <option value="email">Email</option>
                <option value="phone">Phone</option>
            </select>
            <form onSubmit={handleSubmit}>
                <input type="text" placeholder="Name, Phone, or Email" onChange={e => setSearchTerm(e.target.value)} />
                <button type="submit">Search</button>
            </form>
            <div>
                {searchResults.length > 0 ? (searchResults.map(user => (
                    <div key={user._id}>
                        <h2>{user.first_name} {user.last_name}</h2>
                        <p>{user.email}</p>
                        <p>{user.phone}</p>
                    </div>
                ))): <p>No Data Found..</p>}
            </div>
        </div>
    )
}

export default SearchUsers