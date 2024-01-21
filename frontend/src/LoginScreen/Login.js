import { useRef, useState, useEffect, useContext} from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Form, Input, Button, Typography, Alert } from 'antd';
import './Login.css'; // Import the CSS file
import AuthContext from '../context/AuthProvider';
import Paper from '@mui/material/Paper';
import { KeyContext } from '../context/KeyContext';
const { Title } = Typography;


function Login({userKey, setUserKey}) {
    const errRef = useRef();

    // const { setAuth } = useContext(AuthContext);

    const [user, setUser] = useState('');
    const [pwd, setPwd] = useState('');
    const [errMsg, setErrMsg] = useState('');
    const [success, setSuccess] = useState(false);

    const { setCurrentKey } = useContext(KeyContext);

    const navigate = useNavigate();


    useEffect(() => {
        setErrMsg('');
    }, [user, pwd])

    const handleLogOut = () => {
        setUserKey(null);
    }

    const handleSubmit = async (e) => {
        //e.preventDefault();
        try {
            const response = await axios.post('http://localhost:8000/login', {"key": user});
            if (response?.data) {
                setUserKey(user);
                setSuccess(true);
                setCurrentKey('upload');
                navigate('/translator');
                console.log("User succesfully logged in");
            } else {
                // no user, sign up instead
                console.log("no such user exists")
            }
        } catch (error) {
            console.log(error)
            if (!error?.response) {
                setErrMsg('No Server Response');
            } else if (error.response?.status === 400) {
                setErrMsg('Missing Username or Password');
            } else if (error.response?.status === 401) {
                setErrMsg('Unauthorized');
            } else {
                setErrMsg('Login Failed');
            }
            errRef?.current.focus();
        }
    }

    //Steal the HTML and authentication from this video https://youtu.be/X3qyxo_UTR4?si=Evobd3HCobfdD1MU
    return (
        <section className="sectionContainer">
            <Paper className="Paper">
                
            {!userKey ?
            <div>
            <p ref={errRef} className={errMsg? "errmsg" : "offscreen"} aria-live="assertive">{errMsg}</p>
            <h1>Sign In</h1>
            
            <Form onFinish={handleSubmit}>
                <Form.Item label="Username" name="username" rules={[{ required: true, message: 'Please input your username!' }]}>
                <Input onChange={(e) => setUser(e.target.value)} value={user} />
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
            </div> : 
            <div>
                <h1>Welcome, {userKey}</h1>
                <Button type="primary" onClick={handleLogOut}>Log out</Button>
            </div>}
            </Paper>
            
        
        </section>
    )
}

export default Login;