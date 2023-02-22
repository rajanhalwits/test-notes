import { useState, useEffect } from 'react';

import { googleLogout, useGoogleLogin } from '@react-oauth/google';
import { useNavigate } from "react-router-dom";
import axios from 'axios';

function Login() {
    const navigate = useNavigate();
    const [user, setUser] = useState([]);

    useEffect(
        () => {
            if (user) {
                axios.get(`https://www.googleapis.com/oauth2/v1/userinfo?access_token=${user.access_token}`, {
                    headers: {
                        Authorization: `Bearer ${user.access_token}`,
                        Accept: 'application/json'
                    }
                })
                    .then((res) => {
                        localStorage.setItem('userData', JSON.stringify(res.data));
                        navigate('list')
                    })
                    .catch((err) => {
                        googleLogout();
                        console.log(err)
                    });
            }
        },
        [user]
    );

    const login = useGoogleLogin({
        onSuccess: (codeResponse) => setUser(codeResponse),
        onError: (error) => console.log('Login Failed:', error)
    });
    
    return (
        <div className="row ContentBg">
            <div className="col-lg-12">
                <div className="container">
                    <div className="col-lg-6 offset-lg-3 loginBox text-center">
                        <div className='col-lg-12'>
                            <img src='./logo.jpg' alt='Logo' />
                        </div>
                        <button className="btn btn-primary" onClick={() => login()}>Login with Google</button>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default Login;