import React from 'react'
import { CCardGroup, CCol, CContainer, CRow, CFormLabel, CFormControl } from '@coreui/react'
import './Login.css'
import LoginHeader from '../LoginHeader'
import LoginCard from "./LoginCard";
import logo from "./logof.jpg";
import { useStateValue } from "../../../StateProvider";
// import RegisterCard from "../register/RegisterCard"

const Login = () => {
  const [reducerState, dispatch] = useStateValue()
  // const token = reducerState.token
  const token2 = sessionStorage.getItem("token");


  return (
    <div className="bg-light min-vh-100 d-flex flex-row align-items-start">
      <CContainer fluid className="container-root">
        <CRow>
          <LoginHeader />
        </CRow>
        <CRow className="justify-content-between">
          <CCol md="6" className="align-items-center align-self-start justify-content-center ">
            <img className="login_image" src={logo}
              alt="Random to fill space"
            />
          </CCol>

          <CCol md="6" className=" mr-auto align-self-start align-items-center justify-content-center">
            <CCardGroup >

              {/* {isUser && <LoginCard isNewUser={newUserHandler} />}
              {!isUser && <RegisterCard isExistingUser={existingUserHandler} />*/}

              <LoginCard />

            </CCardGroup>
          </CCol>

        </CRow>
      </CContainer>
    </div>
  )
}

export default Login