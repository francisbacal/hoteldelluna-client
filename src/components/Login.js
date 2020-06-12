import React from 'react';
import {login} from './../api/userLogin';
import {userState, userLoginState, loginResponseState} from './../atoms/UserState';
import { useRecoilState } from 'recoil';
import {setToken} from './init'
import { Redirect } from 'react-router-dom';
import ErrorMessage from './helpers/ErrorMessage';

const Login = () => {

    const [loginDetails, setLoginDetails] = useRecoilState(userLoginState)
    const [userDetails, setUserDetails] = useRecoilState(userState)
    const [loginResponse, setLoginResponse] = useRecoilState(loginResponseState)

    
    const handleSubmit = async (e) => {
        e.preventDefault();
        
        const user = await login(loginDetails)
        
        if (user.data) {
            let error = user.data.error
            if (error == "Login failed. Check Credentials") {
                console.log('YES')
            }
            setLoginResponse({...loginResponse, error: 'Login failed. Check Credentials'})
        } else {
            console.log('success')
            setUserDetails({
                _id: user.authenticatedUser._id,
                firstname: user.authenticatedUser.firstname,
                lastname: user.authenticatedUser.lastname,
                email: loginDetails.email
            })
            setToken(user.token)
            setLoginResponse({...loginResponse, success: true})
        }

    }

    const handleChange = (e) => {
        setLoginDetails({
            ...loginDetails,
            [e.target.name]: e.target.value
        })
    }

    
    return(
        <div className="container-fluid login">
        {loginResponse.success ? <Redirect to='/user/profile' /> : ''}
            <div className="row justify-content-center align-items-center login">
                <div className="col-12 col-lg-4 p-3 border border-primary rounded">
                    <div className="container bg-primary">
                        <div className="row m-2 justify-content-center align-items-center">
                            <h2 className="login__title">Login</h2>
                        </div>
                        <div className="row m-2 justify-content-center align-items-center">
                            <div className="col-12 col-lg-8 col-md-10 login__form mb-5">
                                {loginResponse.error ? <ErrorMessage error={loginResponse.error} /> : ''}
                                
                                <form onSubmit={handleSubmit}>
                                    <div className="form-group">
                                        <label htmlFor="email">Email:</label>
                                        <input onChange={handleChange} type="text" className="form-control" name="email" id="email" />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="password">Password:</label>
                                        <input onChange={handleChange} type="password" className="form-control" name="password" id="password" />
                                    </div>
                                    <button className="btn btn-secondary text-warning mt-2">Login</button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Login