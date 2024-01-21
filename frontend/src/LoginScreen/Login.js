import { useRef, useState, useEffect, useContext} from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Form, Input, Button, Typography, Alert } from 'antd';
import './Login.css'; // Import the CSS file
import AuthContext from '../context/AuthProvider';
import Paper from '@mui/material/Paper';
const { Title } = Typography;


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
        //e.preventDefault();
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
            } else if (error.response?.status === 400) {
                setErrMsg('Missing Username or Password');
            } else if (error.response?.status === 401) {
                setErrMsg('Unauthorized');
            } else {
                setErrMsg('Login Failed');
            }
            errRef.current.focus();
        }
    }

    //Steal the HTML and authentication from this video https://youtu.be/X3qyxo_UTR4?si=Evobd3HCobfdD1MU
    return (
        <section className="sectionContainer">
            <Paper className="Paper">
                
            <p ref={errRef} className={errMsg? "errmsg" : "offscreen"} aria-live="assertive">{errMsg}</p>
            <h1>Sign In</h1>
            <Form onFinish={handleSubmit}>
                <Form.Item label="Username" name="username" rules={[{ required: true, message: 'Please input your username!' }]}>
                <Input onChange={(e) => setUser(e.target.value)} value={user} ref={userRef} />
                </Form.Item>
                <Form.Item label="Password" name="password" rules={[{ required: true, message: 'Please input your password!' }]}>
                <Input.Password onChange={(e) => setPwd(e.target.value)} value={pwd} />
                </Form.Item>
                <Form.Item>
                <Button type="primary" htmlType="submit">Sign In</Button>
                </Form.Item>
            </Form>
            <p>
                <span className="line">
                    Don't have an account yet? <Link to="/register">Sign Up</Link>
                </span>
            </p>
            </Paper>
            
        
        </section>
    )
}

export default Login;