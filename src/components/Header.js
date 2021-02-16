import React, { useState,useEffect } from 'react'
import logo from './geeksynergy.svg'

export default function Header({auth, logout}) {

    const [popup, setpopup] = useState(false)

    const toggleHandler = () =>
    {
        if(popup)
            setpopup(false)
        else
            setpopup(true)
    }

    useEffect(() => {
        if(popup){}
    }, [popup])

    return (
        <>
            <div className="wrapper bk-grey ">
                <div className="container fl-row">
                    <div className="fl-1">
                        <img src={logo} alt="geeksynergy" />
                    </div>
                    <div className="fl-row">
                        <h2 onClick={()=> toggleHandler()} className="links">Company Info</h2>
                        <div className={popup ? "c-info" : "hide"}>
                            <ul>
                                <li className="list">Company: Geeksynergy Technologies Pvt Ltd</li>
                                <li className="list">Address:  Sanjayanagar, Bengaluru-56</li>
                                <li className="list">Phone:XXXXXXXXX09</li>
                                <li className="list">Email: XXXXXX@gmail.com</li>
                            </ul>
                            
                        </div>
                        {
                            console.log(auth),
                            auth ?
                            <button onClick={logout} className="btn bk-yellow">logout</button>
                            : 
                            " "
                        }
                        
                    </div>
                </div> 
            </div>
        </>
    )
}
