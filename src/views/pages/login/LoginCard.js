import React, { useState } from 'react';
import "./Login.css"
import { BrowserRouter, Route, Switch, Router, withRouter, Redirect } from 'react-router-dom'
import { Link } from 'react-router-dom'
import { CButton, CCard, CCardBody, CCol, CForm, CFormControl, CRow, CFormFloating, CFormLabel, CAlert } from '@coreui/react'
import PropTypes from "prop-types";
import endPoints from 'src/utils/EndPointApi';
import { useStateValue } from "../../../StateProvider"
import LoadingOverlay from 'react-loading-overlay';
// import { useHistory } from "react-router-dom";
function LoginCard(props) {
    // const history = useHistory();
    const MyDashboard = React.lazy(() => import('../../dashboard/MyDashboard'))
    // const createAccountHandler = (event) => {
    //     props?.isNewUser(false);
    // }
    const [reducerState, dispatch] = useStateValue()
    const [enteredEmail, setEnteredEmail] = useState("");
    const [enteredPassword, setEnteredPassword] = useState("");
    const [emailerrorMessage, setEmailerrorMessage] = useState(false);
    const [passworderrorMessage, setPassworderrorMessage] = useState(false);
    // const [okLogin, setOkLogin] = useState(false);


    const emailChangeHandler = (event) => {
        setEnteredEmail(event.target.value);
    };
    const passwordChangeHandler = (event) => {
        setEnteredPassword(event.target.value);
    };

    const loginHandler = (event) => {
        event.preventDefault();
        const credentials = {
            email: enteredEmail,
            password: enteredPassword,
        };
        console.log(credentials)
        postData(endPoints.loginURL, credentials)
            .then(data => {
                console.log(data);
                if (data.email == "Invalid") {
                    setEmailerrorMessage(true);
                }
                else if (data.password = "Invalid") {
                    setPassworderrorMessage(true);
                }
                if (data.token) {
                    console.log("entered here")
                    sessionStorage.setItem('token', JSON.stringify(data.token));
                    // history.push("/mydashboard");
                }

                dispatch({
                    type: 'USER_LOGIN',
                    token: data.token,
                    userRole: data.role
                }) // JSON data parsed by data.json() call


            });

        setEnteredEmail("");
        setEnteredPassword("");
    };


    async function postData(url, data) {
        console.log(data)
        const response = await fetch(url, {
            // mode: 'no-cors',
            method: 'POST', // *GET, POST, PUT, DELETE, etc.
            headers: {
                // "Access-Control-Allow-Origin": "*",
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)// body data type must match "Content-Type" header
        });
        return response.json(); // parses JSON response into native JavaScript objects
    }
    return (
        <CCard className="card_component mt-5">
            <CCardBody>
                <CForm onSubmit={loginHandler}>
                    <CRow>
                        <CCol ><h1 className="heading">Log In To Your Account</h1></CCol>
                        <p className="heading">Sign In to your account</p>
                        {emailerrorMessage ? <CAlert color="danger" dismissible> The email you entered is not registered</CAlert> : ""}
                        {passworderrorMessage ? <CAlert color="danger" dismissible> The password you entered is incorrect</CAlert> : ""}

                    </CRow>
                    <CFormFloating className="mb-3" >
                        <CFormControl
                            size="sm"
                            type="email"
                            id="emailInput"
                            placeholder="name@example.com"
                            onChange={emailChangeHandler}
                            value={enteredEmail}
                            required
                        />
                        <CFormLabel htmlFor="emailInput">Email address</CFormLabel>
                    </CFormFloating>
                    <CFormFloating className="mb-3" >
                        <CFormControl
                            size="sm"
                            type="password"
                            id="password"
                            placeholder="password"
                            onChange={passwordChangeHandler}
                            value={enteredPassword}
                            required
                        />
                        <CFormLabel htmlFor="password">Password</CFormLabel>
                    </CFormFloating>
                    <CFormFloating className="mb-3">
                        <CButton type="submit" size="lg" style={{ width: "100%" }} color="primary" className="text-center px-5 heading">Login</CButton>

                    </CFormFloating>

                    <CRow >
                        <CCol className="col-sm-8"></CCol>
                        <CCol className="col-sm-4"><CButton color="link" className="px-0 heading text-decoration-none">Forgot password?</CButton></CCol>

                    </CRow>
                </CForm>
                <hr color="white" />
                <CRow className="justify-content-center">
                    <CCol className="col-sm-4"></CCol>
                    <CCol className="col-sm-6">
                        <div className="heading">
                            New User?
                            <Link to="/register">
                                <CButton color="link" className="px-0 heading text-decoration-none" >Create Account</CButton>
                            </Link>
                        </div>
                    </CCol>

                    <CCol className="col-sm-2"></CCol>


                </CRow>
            </CCardBody>
        </CCard>
    );
}
LoginCard.propTypes = {
    isNewUser: PropTypes.func
}
export default LoginCard;