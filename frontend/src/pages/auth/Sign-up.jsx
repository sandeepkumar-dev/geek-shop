import Typography from 'geeky-ui/core/Typography'
import React from 'react'
import { Link } from 'react-router-dom'
import AppBar from '../../components/Appbar'
import "./auth.scss"

function SignUp() {
    const [email, setEmail] = React.useState('')
    const [password, setPassword] = React.useState('')
    const [confirmPassword, setConfirmPassword] = React.useState('')

    const handleSubmit = (e) => {
        e.preventDefault()

        if (email === '' || password === '' || confirmPassword === '') {
            console.log('Please fill in all the fields')
        } else if (password !== confirmPassword) {
            console.log('Passwords do not match')
        } else {
            console.log('Signing up...')
        }
    }

    return (
        <>
            <AppBar />

            <div className="GuiContainer">
                <div className='GsCenterDiv'>
                    <div className="GsSignIn">
                        <div className="GsSignIn__header">
                            <Typography variant="h3">Sign Up</Typography>
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
                                    <input type="password" placeholder="Confirm Password" onChange={(e) => setConfirmPassword(e.target.value)} />
                                </div>
                                <div className="GsSignIn__form__item">
                                    <button type="submit">Sign Up</button>
                                </div>
                            </form>
                            <div className="GsSignIn__form__text">
                                <Typography variant="subtitle1">Already have an account? <Link to="/sign-in">Sign In</Link></Typography>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default SignUp
