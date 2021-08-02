import React from 'react'
import { CCardGroup, CCol, CContainer, CRow, CFormLabel, CFormControl } from '@coreui/react'
import './Login.css'
import LoginHeader from '../LoginHeader'
import LoginCard from "./LoginCard";
import logo from "./logof.jpg";
import { useStateValue } from "../../../StateProvider";
// import RegisterCard from "../register/RegisterCard"
import { useHistory } from "react-router-dom";

const Login = () => {
  const history = useHistory();
  const [reducerState, dispatch] = useStateValue()
  const token = reducerState.token
  const token2 = sessionStorage.getItem("token");
  // console.log(token2)
  // const [isUser, setIsUser] = useState(true)

  // const existingUserHandler = (status) => {
  //   setIsUser(status)
  //   console.log(isUser)
  //   console.log("existingUserhandler")
  // }

  // const newUserHandler = (status2) => {
  //   setIsUser(status2)
  //   console.log(isUser)
  // }

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
    </div >
  )
}

export default Login
// import React from "react";
// import "./Login.css";
// import logo from "./logo.png";
// "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcToxaHQiLVAlLRDtYhb48y4oWWk-BDBhj0q5A&usqp=CAU"

// const Login = () => {
//   return (
//     <>
//       <div className="container">
//         <div className="img">
//           <img src={logo} />
//         </div>

//         <div className="login-content">
//           <form action="index.html">
//             {/* <img src={logo} /> */}
//             <h2 className="title">Welcome</h2>
//             <div className="input-div one">
//               <div className="i">
//                 <i className="fas fa-user"></i>
//               </div>
//               <div className="div">
//                 <h5>Username</h5>
//                 <input type="text" className="input" />
//               </div>
//             </div>
//             <div className="input-div pass">
//               <div className="i">
//                 <i className="fas fa-lock"></i>
//               </div>
//               <div className="div">
//                 <h5>Password</h5>
//                 <input type="password" className="input" />
//               </div>
//             </div>
//             <a href="#">Forgot Password?</a>
//             <input type="submit" className="btn" value="Login" />
//           </form>
//         </div>
//       </div>
//     </>
//   );
// }

// export default Login;