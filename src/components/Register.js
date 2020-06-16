import React, { useState } from 'react';
import { login, register } from './../api/userLogin';
import { userState, userLoginState, loginResponseState } from './../atoms/UserState';
import { useRecoilState } from 'recoil';
import { setToken } from './init'
import { Redirect } from 'react-router-dom';
import ErrorMessage from './helpers/ErrorMessage';

const Register = () => {

    const [loginDetails, setLoginDetails] = useRecoilState(userLoginState)
    const [userDetails, setUserDetails] = useRecoilState(userState)
    const [loginResponse, setLoginResponse] = useRecoilState(loginResponseState)
    const [isLoading, setIsLoading] = useState(false)
    const [registerDetails, setRegisterDetails] = useState({
        email: null,
        password: null,
        confirmPassword: null,
        firstname: null,
        lastname: null
    })


    if (loginResponse.isLoggedIn) {
        return <Redirect to='/dashboard' />
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true)
        let user = await register(registerDetails)
        let error;
        if (user.data) {
            error = user.data.error
            if (typeof error == 'object') {

                let singleErr = Object.keys(error)
                    .map(function (key) {
                        return error[key];
                    })
                    .join(', ');
                setLoginResponse({ ...loginResponse, error: singleErr })
            } else {
                setLoginResponse({
                    ...loginResponse,
                    error: 'Registration failed. Check Credentials'
                })
            }
            setIsLoading(false)
        } else {

            user = await login(loginDetails)

            if (user.data) {
                error = user.data.error
                setLoginResponse({ ...loginResponse, error: 'Login failed. Check Credentials' })
            } else {

                setUserDetails({
                    _id: user.authenticatedUser._id,
                    firstname: user.authenticatedUser.firstname,
                    lastname: user.authenticatedUser.lastname,
                    email: loginDetails.email
                })
                setToken(user.token)
                setIsLoading(false)
                setLoginResponse({ ...loginResponse, isLoggedIn: true })
            }

        }
    }

    const handleChange = (e) => {
        setRegisterDetails({
            ...registerDetails,
            [e.target.id]: e.target.value
        })

        if (e.target.id == 'email' || e.target.id == 'password') {
            setLoginDetails({
                ...loginDetails,
                [e.target.id]: e.target.value
            })
        }
    }


    return (
        <div className="container-fluid login">
            {loginResponse.success ? <Redirect to='/user/profile' /> : ''}
            <div className="row justify-content-center align-items-center login">
                <div className="col-12 col-lg-4 p-3 border border-primary rounded">
                    <div className="container bg-primary">
                        <div className="row m-2 justify-content-center align-items-center">
                            <h2 className="login__title">Register</h2>
                        </div>
                        <div className="row m-2 justify-content-center align-items-center">
                            <div className="col-12 col-lg-8 col-md-10 login__form mb-5">
                                {loginResponse.error ? <ErrorMessage error={loginResponse.error} /> : ''}

                                <form onSubmit={handleSubmit}>
                                    <div className="form-group">
                                        <label className="float-left" htmlFor="firstname">First Name:</label>
                                        <input onChange={handleChange} type="text" className="form-control" name="firstname" id="firstname" />
                                    </div>
                                    <div className="form-group">
                                        <label className="float-left" htmlFor="lastname">Last Name:</label>
                                        <input onChange={handleChange} type="text" className="form-control" name="lastname" id="lastname" />
                                    </div>
                                    <div className="form-group">
                                        <label className="float-left" htmlFor="email">Email:</label>
                                        <input onChange={handleChange} type="text" className="form-control" name="email" id="email" />
                                    </div>
                                    <div className="form-group">
                                        <label className="float-left" htmlFor="password">Password:</label>
                                        <input onChange={handleChange} type="password" className="form-control" name="password" id="password" />
                                    </div>
                                    <div className="form-group">
                                        <label className="float-left" htmlFor="confirmPassword">Confirm Password:</label>
                                        <input onChange={handleChange} type="password" className="form-control" name="confirmPassword" id="confirmPassword" />
                                    </div>
                                    {!isLoading ?
                                    <button className="btn btn-secondary text-warning mt-2">Register</button>
                                    :
                                    <button class="btn btn-secondary text-warning mt-2" type="button" disabled>
                                        <span class="spinner-grow spinner-grow-sm" role="status" aria-hidden="true"></span>
                                        Loading...
                                    </button>
                                    }
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Register