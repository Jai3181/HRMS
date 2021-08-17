import React, { useState } from 'react';
import '../login/Login.css'
import { Link, Redirect } from 'react-router-dom'
import PropTypes from "prop-types";
import endPoints from 'src/utils/EndPointApi';
import { CButton, CCard, CCardBody, CCol, CForm, CFormControl, CRow, CFormFloating, CFormLabel } from '@coreui/react'
// import {CInputGroup, CDropdown, CDropdownItem, CDropdownMenu, CDropdownToggle} from '@coreui/react'
function RegisterCard(props) {

    // const existingLoginHandler = (event) => {
    //     props?.isExistingUser(true);
    // }
    const [authenticate, setAuthenticated] = useState(false);
    const [enteredFName, setEnteredFName] = useState("");
    const [enteredLName, setEnteredLName] = useState("");
    const [enteredEmail, setEnteredEmail] = useState("");
    const [enteredPassword, setEnteredPassword] = useState("");
    const [enteredRePassword, setEnteredRePassword] = useState("");
    // const [isDisabled, SetIsDisabled] = useState(true)

    const fNameChangeHandler = (event) => {
        setEnteredFName(event.target.value);
    };
    const lNameChangeHandler = (event) => {
        setEnteredLName(event.target.value);
    };
    const emailChangeHandler = (event) => {
        setEnteredEmail(event.target.value);
    };
    const passwordChangeHandler = (event) => {
        setEnteredPassword(event.target.value);
    };
    const rePasswordChangeHandler = (event) => {
        setEnteredRePassword(event.target.value);
    };

    // useEffect(()=>{
    //     if(enteredPassword===enteredRePassword){
    //         SetIsDisabled(false)
    //     }
    // },[enteredPassword,enteredRePassword])

    const registerHandler = (event) => {
        event.preventDefault();
        const registerData = {
            name: {
                firstName: enteredFName,
                lastName: enteredLName
            },
            email: enteredEmail,
            password: enteredPassword
        };
        postData(endPoints.registerURL, registerData)
            .then(data => {
                console.log(data); // JSON data parsed by data.json() call
                if (data.success === true) {
                    // sessionStorage.setItem('token', JSON.stringify(data.token));
                    // history.push("/mydashboard")
                    setAuthenticated(true)
                }
            }
            );
        console.log(registerData)
        setEnteredFName("");
        setEnteredLName("");
        setEnteredEmail("");
        setEnteredPassword("");
        setEnteredRePassword("");
    };

    async function postData(url, data) {
        console.log(data)
        const response = await fetch(url, {
            // mode : 'no-cors',
            method: 'POST', // *GET, POST, PUT, DELETE, etvc.
            headers: {
                'Content-Type': 'application/json'
                // 'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: JSON.stringify(data)// body data type must match "Content-Type" header
        });
        return response.json(); // parses JSON response into native JavaScript objects
    }
    if (authenticate == true) {
        return <Redirect to="/login" />
    }
    return (
        <CCard className="card_component">
            <CCardBody>
                <CForm onSubmit={registerHandler}>
                    <CRow>
                        <h3 className="heading">Register Your Account</h3>
                        <p className="heading">Create your account</p>
                    </CRow>
                    <CRow>
                        <CCol>
                            <CFormFloating className="mb-3" >
                                <CFormControl
                                    size="sm"
                                    type="text"
                                    id="first_name"
                                    placeholder="name@example.com"
                                    onChange={fNameChangeHandler}
                                    value={enteredFName}
                                    required
                                />
                                <CFormLabel htmlFor="first_name">First Name</CFormLabel>
                            </CFormFloating>
                        </CCol>
                        <CCol>
                            <CFormFloating className="mb-3" >
                                <CFormControl
                                    size="sm"
                                    type="text"
                                    id="last_name"
                                    placeholder="name@example.com"
                                    onChange={lNameChangeHandler}
                                    value={enteredLName}
                                    required
                                />
                                <CFormLabel htmlFor="last_name">Last Name</CFormLabel>
                            </CFormFloating>
                        </CCol>
                    </CRow>
                    <CRow>
                        <CCol>
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
                        </CCol>
                    </CRow>
                    <CRow>
                        <CCol>
                            <CFormFloating className="mb-3" >
                                <CFormControl
                                    size="sm"
                                    type="password"
                                    id="password"
                                    placeholder="name@example.com"
                                    onChange={passwordChangeHandler}
                                    value={enteredPassword}
                                    required
                                />
                                <CFormLabel htmlFor="password">Password</CFormLabel>
                            </CFormFloating>
                        </CCol>
                        <CCol>
                            <CFormFloating className="mb-3" >
                                <CFormControl
                                    size="sm"
                                    type="password"
                                    id="password_repeat"
                                    placeholder="name@example.com"
                                    onChange={rePasswordChangeHandler}
                                    value={enteredRePassword}
                                    required
                                />
                                <CFormLabel htmlFor="password_repeat">Repeat Password</CFormLabel>
                            </CFormFloating>
                        </CCol>
                    </CRow>
                    <CRow>
                        <CFormFloating className="mb-3">
                            <CButton type="submit" size="lg" style={{ width: "100%" }} color="primary" className="text-center px-5 heading">Register</CButton>

                        </CFormFloating>
                    </CRow>
                </CForm>
                <hr />
                <CRow className="justify-content-center">
                    <CCol className="col-sm-4"></CCol>
                    <CCol className="col-sm-6">
                        <div className="heading">
                            Already a User?
                            <Link to="/login">
                                <CButton color="link" className="px-0 heading text-decoration-none"  >Login</CButton>
                            </Link>

                        </div>

                    </CCol>

                    <CCol className="col-sm-2"></CCol>


                </CRow>
                {/* <CRow className="justify-content-start">
                    <CCol md="4">
                        Already Existing User?
                    </CCol>

                    <CCol>

                        <Link to="/login">
                            <CButton color="primary" className="px-4">Login to existing account</CButton>
                        </Link>

                        {/* <CButton color="primary" className="px-4" onClick={existingLoginHandler} >Login to existing account</CButton> 
                    </CCol>

                </CRow> */}
            </CCardBody>
        </CCard>
    );
}
RegisterCard.propTypes = {
    isExistingUser: PropTypes.bool
}
export default RegisterCard;