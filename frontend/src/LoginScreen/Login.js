import { useRef, useState, useEffect, useContext} from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

import AuthContext from '../context/AuthProvider';

function Login() {
    const userRef = useRef();
    const errRef = useRef();

    const { setAuth } = useContext(AuthContext);

    const [user, setUser] = useState('');
    const [pwd, setPwd] = useState('');
    const [errMsg, setErrMsg] = useState('');
    const [success, setSuccess] = useState(false);

    const navigate = useNavigate();


    useEffect(() => {
        userRef.current.focus();
    }, [])

    useEffect(() => {
        setErrMsg('');
    }, [user, pwd])

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            console.log("TODO: HANDLE SUBMIT NEEDS API HELP")
            const response = await axios.post('https://your-api-url.com/process',
                JSON.stringify({username: user, password: pwd}),
                {
                    headers: { 'Content-Type': 'application/json' },
                    withCredentials: true
                }
            );
            console.log("Login response is:" + JSON.stringify(response?.data));
            const accessToken = response?.data?.accessToken;
            setAuth({user, pwd, accessToken });
            setUser('');
            setPwd('');
            
            setSuccess(true);
            navigate('/translator');
            console.log("User succesfully logged in");
        } catch (error) {
            if (!error?.response) {
                setErrMsg('No Server Response');
            } else if (error.err.response?.status === 400) {
                setErrMsg('Missing Username or Password');
            } else if (error.err.response?.status === 401) {
                setErrMsg('Unauthorized');
            } else {
                setErrMsg('Login Failed');
            }
            errRef.current.focus();
        }
    }

    //Steal the HTML and authentication from this video https://youtu.be/X3qyxo_UTR4?si=Evobd3HCobfdD1MU
    return (
        <section>
            <p ref={errRef} className={errMsg? "errmsg" : "offscreen"} aria-live="assertive">{errMsg}</p>
            <h1>Sign In</h1>
            <form onSubmit={handleSubmit}>
                <label htmlFor="username">Username:</label>
                <input 
                    type="text" 
                    id="username"
                    ref={userRef} 
                    autoComplete='off'
                    onChange={(e) => setUser(e.target.value)} 
                    value={user} 
                    required
                />
                <label htmlFor="password">Password:</label>
                <input 
                    type="password" 
                    id="password"
                    onChange={(e) => setPwd(e.target.value)} 
                    value={pwd} 
                    required
                />
                <button>Sign In</button>
            </form>
            <p>
                <span className="line">
                    <Link to="/register">Sign Up</Link>
                </span>
            </p>
            
        
        </section>
    )
}

export default Login;