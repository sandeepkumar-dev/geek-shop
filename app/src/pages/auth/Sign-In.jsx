import Typography from 'geeky-ui/core/Typography'
import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import AppBar from '../../components/Appbar'
import { useAppContext } from '../../context/AppContext'
import "./auth.scss"

function SignIn() {
    const navigate = useNavigate()
    const [email, setEmail] = React.useState('')
    const [password, setPassword] = React.useState('')
    const { handleUser, dispatch } = useAppContext();

    const handleSubmit = (e) => {
        e.preventDefault()

        if (email === '' || password === '') {
            console.log('Please fill in all the fields')
        } else {
            fetch("signin", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    email,
                    password
                })
            })
                .then(res => res.json())
                .then(data => {
                    if (data.success) {
                        dispatch({ type: "updateCart", payload: data.data.cart ? data.data.cart : [] })
                        dispatch({ type: "updateWishList", payload: data.data.wishList ? data.data.wishList : [] })
                        let token = data.data.token
                        let userInfo = data.data.userInfo
                        localStorage.setItem('user', JSON.stringify({ token, userInfo }))
                        handleUser({ token, userInfo })
                        navigate(-1)
                    } else {
                        handleUser({ token: null, userInfo: null })
                        console.log(data.message)
                    }
                })
                .catch(err => console.log(err))
        }
    }

    return (
        <>
            <AppBar />

            <div className="GuiContainer">
                <div className='GsCenterDiv'>
                    <div className="GsSignIn">
                        <div className="GsSignIn__header">
                            <Typography variant="h3">Sign In</Typography>
                        </div>

                        <div className="GsSignIn__form">
                            <form onSubmit={handleSubmit}>
                                <div className="GsSignIn__form__item">
                                    <input type="text" placeholder="Email" onChange={(e) => setEmail(e.target.value)} />
                                </div>
                                <div className="GsSignIn__form__item">
                                    <input type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} />
                                </div>
                                <div className="GsSignIn__form__item">
                                    <button type="submit">Sign In</button>
                                </div>
                            </form>
                            <div className="GsSignIn__form__text">
                                <Typography variant="subtitle1">Don't have an account? <Link to="/sign-up">Sign Up</Link></Typography>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default SignIn
