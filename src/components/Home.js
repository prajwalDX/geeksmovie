import React, { useEffect, useState } from 'react'
import axios from 'axios'
import cookie from 'react-cookies'
import Card from './Card'
import Header from './Header'

export default function Home() {

    const [data , setdata] = useState([])

    const fetchdata = async() => {
        let parameter = {
            category: "movies",
            language: "kannada",
            genre: "all",
            sort: "voting"
        }
        const res_data = await axios.post("https://hoblist.com/movieList",parameter)
        localStorage.setItem("data",JSON.stringify(res_data.data.result))
    }

    useEffect(() => {
        if(!localStorage.getItem("data"))
        {
            fetchdata()
        }
        else (
            setdata(JSON.parse(localStorage.getItem("data")))
        )
    }, [])


    const [login, setlogin] = useState(true)

    const [name, setname] = useState()
    const [email, setemail] = useState()
    const [password, setpassword] = useState()
    const [phoneno, setphoneno] = useState()
    const [profession, setprofession] = useState()

    const [auth, setauth] = useState(false)

    const [error, seterror] = useState("")

    const toggleHandler = () => {
        if(login) {
            setlogin(false)
            seterror("")
        }
        else {
            setlogin(true)
            seterror("")
        }
    }

    const nameHandler = (e) => {
        setname(e.target.value)
    }

    const emailHandler = (e) => {
        setemail(e.target.value)
    }

    const passwordHandler = (e) => {
        setpassword(e.target.value)
    }

    const phonenoHandler = (e) => {
        setphoneno(e.target.value)
    }

    const professionHandler = (e) => {
        setprofession(e.target.value)
    }

    const signupHandler = () => {
        if(name | email | password | phoneno | profession) {
            let data = {name,email,password,phoneno,profession}
            localStorage.setItem("userdata", JSON.stringify(data))
            setname("")
            setpassword("")
            setphoneno("")
            setemail("")
            setprofession("")
            seterror("account created successfully!")
            setTimeout(toggleHandler, 2000)
        }
 
  
    }

    const loginHandler = () => {
        let data = JSON.parse(localStorage.getItem('userdata'))
        if(email === data.email && password === data.password)
        {    
            cookie.save("auth", true) 
            setauth(true)
            setpassword("")
            setemail("")
            seterror("succesfull authenticated:)")
        }
        else {
            seterror("invalid credentials!")
        }

    

    }

    const logoutHandler = () => {
        seterror("")
        setTimeout(() => {
            cookie.remove('auth')
            setauth(false)
        }, 1000)
        
    }


    useEffect(() => {
        if(cookie.load('auth'))
        {
            setauth(true)
        }

    }, [error, data])

    return (
        <>
        <Header auth={auth} logout={logoutHandler}/>
            <div className="wrapper">
                <div className="container">
                    {
                    auth ?
                    <>
                    <div>
                        <div className="container">
                            {
                                data.map(info => 
                                    <Card info={info}/>
                                )
                            }
                           
                        </div>
                    </div>
                    </>
                    :
                    <>
                    <div className="form fl-column">
                            {
                                login ? 
                                <>
                                <h2 className="msg">{error}</h2>
                                <label className="label" htmlFor="">Email</label>
                                <input onChange={(e) => emailHandler(e)} className="input" value={email} type="email" name="" id=""  required/>

                                <label className="label" htmlFor="">Password</label>
                                <input onChange={(e) => passwordHandler(e)} className="input" value={password} type="password" name="" id="" required/>
                                <input type="submit" onClick={() => loginHandler()}  className="btn btn-cta bk-blue" value="Login" />
                                <h2 onClick={() => toggleHandler()} className="links">Sign up ?</h2>
                                </>
                                :
                                <>
                                <h2 className="msg">{error}</h2>
                                <label className="label" htmlFor="">Name</label>
                                <input onChange={(e) => nameHandler(e)} className="input" value={name} type="text" name="" id="" required/>

                                <label className="label" htmlFor="">Email</label>
                                <input onChange={(e) => emailHandler(e)} className="input" value={email} type="email" name="" id="" required/>

                                <label className="label" htmlFor="">Password</label>
                                <input onChange={(e) => passwordHandler(e)} className="input" value={password} type="password" name="" id="" required/>

                                <label className="label" htmlFor="">Phone No</label>
                                <input onChange={(e) => phonenoHandler(e)} className="input" value={phoneno} type="tel" name="" id="" maxLength="10" pattern="[0-9]{10}" required/>
                                <label className="label" htmlFor="">Profession</label>
                                <select onChange={(e) => professionHandler(e)} className="select" value={profession} name="" id="" required>
                                    <option value="" disabled selected >select profession</option>
                                    <option value="Frontend Developer">Frontend Developer</option>
                                    <option value="Backend Developer">Backend Developer</option>
                                    <option value="UI/UX Designer">UI/UX Designer</option>
                                </select>
                                <input onClick={() => signupHandler()} type="submit" className="btn btn-cta bk-blue" value="Sign up" />
                                <h2 onClick={() => toggleHandler()} className="links">Login ?</h2>
                                
                                </>
                            }

                            

                    </div>
                    </>
                    
                    }
                </div>

            </div>
        </>
    )
}
