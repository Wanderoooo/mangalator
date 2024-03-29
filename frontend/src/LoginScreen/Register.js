import { useRef, useState, useEffect } from "react";
import { Link, useNavigate } from 'react-router-dom';
import {faCheck, faTimes, faInfoCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import './Register.css'
import axios from 'axios';
import { Form, Input, Button, Checkbox, message } from 'antd';
import { QuestionCircleOutlined } from '@ant-design/icons';

import { Paper } from "@mui/material";

const USER_REGEX = /^[a-zA-Z][a-zA-Z0-9-_]{3,23}$/;
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;

function RegisterPage({userKey, setUserKey}) {
    const userRef = useRef();
    const errRef = useRef();

    const [user, setUser] = useState('');
    const [validName, setValidName ] = useState(false);
    const [userFocus, setUserFocus ] = useState(false);


    const [pwd, setPwd] = useState('');
    const [validPwd, setValidPwd ] = useState(false);
    const [pwdFocus, setPwdFocus ] = useState(false);

    const [matchPwd, setMatchPwd] = useState('');
    const [validMatch, setValidMatch ] = useState(false);
    const [matchFocus, setMatchFocus ] = useState(false);


    const [errMsg, setErrMsg] = useState('');
    const [success, setSuccess] = useState(false);

    const navigate = useNavigate();



    useEffect(() => {
        userRef.current.focus();
    }, [])

    useEffect(() => {
        const validUsername = USER_REGEX.test(user);
        console.log(validUsername);
        console.log(user);
        setValidName(validUsername);
    }, [user])

    useEffect(() => {
        const validPassword = PWD_REGEX.test(pwd);
        console.log(validPassword);
        console.log(pwd);
        setValidPwd(validPassword);
        const match = pwd === matchPwd;
        setValidMatch(match);
    }, [pwd, matchPwd])

    useEffect(() => {
        setErrMsg('');
    }, [user, pwd, matchPwd])

    const handleSubmit = async (e) => {
        e.preventDefault();
        const v1 = USER_REGEX.test(user);
        const v2 = PWD_REGEX.test(pwd);
        if (!v1 || !v2) {
            setErrMsg("Invalid Entry");
            return;
        }
        try {
            const response = await axios.post('http://localhost:8000/signup', {"key": user});
            if (response?.data) {
                setUserKey(user);
                setSuccess(true);
                navigate('/translator');
                console.log("User succesfully registered");
            } else {
                console.log("reg failed!")
            }

            console.log(response.data);
            console.log(response.accessToken);
            setSuccess(true);

        } catch (error) {
            if (!error?.response) {
                setErrMsg('No Server Response');
            } else if (error.response?.status === 409) {
                setErrMsg('Username Taken');
            } else {
                setErrMsg('Registration Failed')
            }
            errRef?.current.focus();
        }

    }


    return (
        
        <section className="sectionContainer"> 
            <Paper className="Paper">
                <p ref={errRef} className={errMsg? "errmsg" : "offscreen"} aria-live="assertive">{errMsg}</p>
                <h1>Register</h1>
                <form onSubmit={handleSubmit}>
                    <label htmlFor="username">
                        Username:
                        <span className={validName ? "valid" : "hide"}>
                            <FontAwesomeIcon icon={faCheck} />
                        </span>
                        <span className={validName || !user ? "hide" : "invalid"}>
                            <FontAwesomeIcon icon={faTimes} />
                        </span>
                    </label>
                    <input 
                        type="text" 
                        id="username"
                        className="input"
                        ref={userRef} 
                        autoComplete='off'
                        onChange={(e) => setUser(e.target.value)} 
                        value={user} 
                        required
                        aria-invalid={validName ? "false" : "true"}
                        aria-describedby="uidnote"
                        onFocus={() => setUserFocus(true)}
                        onBlur={() => setUserFocus(false)}
                    />
                    <p id="uidnote" className={userFocus && user && !validName ? "instructions" : "offscreen"}>
                        <FontAwesomeIcon icon={faInfoCircle} />
                        4 to 24 characters. <br />
                        Must begin with a letter. <br />
                        Letters, numbers, underscores, hyphens allowed.
                    </p>
                    <label htmlFor="password">
                        Password:
                        <span className={validPwd ? "valid" : "hide"}>
                            <FontAwesomeIcon icon={faCheck} />
                        </span>
                        <span className={validPwd || !pwd ? "hide" : "invalid"}>
                            <FontAwesomeIcon icon={faTimes} />
                        </span>
                    </label>
                    <input 
                        type="password" 
                        id="password"
                        className="input"
                        onChange={(e) => setPwd(e.target.value)} 
                        required
                        aria-invalid={validPwd ? "false" : "true"}
                        aria-describedby="pwdnote"
                        onFocus={() => setPwdFocus(true)}
                        onBlur={() => setPwdFocus(false)}
                    />
                    <p id="pwdnote" className={pwdFocus && !validPwd ? "instructions" : "offscreen"}>
                        <FontAwesomeIcon icon={faInfoCircle} />
                        8 to 24 characters. <br />
                        Must include uppercase and lowercase letters, a number and a special character. <br />
                    </p>
                    <label htmlFor="match">
                        Confirm Password:
                        <span className={validMatch && matchPwd ? "valid" : "hide"}>
                            <FontAwesomeIcon icon={faCheck} />
                        </span>
                        <span className={validMatch || !matchPwd ? "hide" : "invalid"}>
                            <FontAwesomeIcon icon={faTimes} />
                        </span>
                    </label>
                    <input 
                        type="password" 
                        id="confirm_pwd"
                        className="input"
                        onChange={(e) => setMatchPwd(e.target.value)} 
                        required
                        aria-invalid={validMatch ? "false" : "true"}
                        aria-describedby="confirmnote"
                        onFocus={() => setMatchFocus(true)}
                        onBlur={() => setMatchFocus(false)}
                    />
                    <p id="confirmnote" className={matchFocus && !validMatch ? "instructions" : "offscreen"}>
                        <FontAwesomeIcon icon={faInfoCircle} />
                        Must match the previous password input field.
                    </p>
                    <button disabled={!validName || !validPwd || !validMatch ? true : false} className="button">
                        Sign up
                    </button>
                    <p>
                        Already Signed Up? <Link to='/login'>Sign In</Link>
                    </p>
                </form>
            </Paper>
        </section>
        
    )
}

export default RegisterPage;