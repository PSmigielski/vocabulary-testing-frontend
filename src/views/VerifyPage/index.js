import React, { useEffect, useState } from "react"
import "./index.scss"
import axios from "axios"
import Nav from "../../components/Nav";
import Loader from "../../components/Loader"

const VerifyPage = ({routerProps}) => {
    const [isLoading, setIsLoading] = useState(true)
    const [error, setError] = useState('użytkownik został zweryfikowany')
    useEffect(()=>{
        const login = routerProps.match.params.login;
        axios.put(`http://localhost:4000/v1/api/user/verify/${login}`).then(res => {
            setIsLoading(false)
        }).catch(err => {
            setError(`${err.response.status} - użytkownika nie odnaleziono`)
            setIsLoading(false)
        })
    })
    return(
        <div className="VerifyContainer">
            <Nav />
            <div className="container">
                {isLoading? <Loader /> : <p className="info">{error}</p>}
            </div>
        </div>
    )
}

export default VerifyPage;