import React, { Component } from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import './scss/style.scss'
// import * as serviceWorker from './serviceWorker'
const loading = (
  <div className="pt-3 text-center">
    <div className="sk-spinner sk-spinner-pulse"></div>
  </div>
)
// Containers
const DefaultLayout = React.lazy(() => import('./layout/DefaultLayout'))

// Pages
const Login = React.lazy(() => import('./views/pages/login/Login'))
// const Login2 = React.lazy(() => import('./views/pages/login/Login-1'))
const Register = React.lazy(() => import('./views/pages/register/Register'))
const Page404 = React.lazy(() => import('./views/pages/page404/Page404'))
const Page500 = React.lazy(() => import('./views/pages/page500/Page500'))
const MyDashboard = React.lazy(() => import('./views/dashboard/MyDashboard'))
const MRF = React.lazy(() => import('./views/MyComponents/MRF/MRFform.js'))
const CreateMRFPage = React.lazy(() => import('./views/MyComponents/MRF/CreateMRFPage'))
const EditMRFPage = React.lazy(() => import('./views/MyComponents/MRF/EditMRFPage'))
const Approval = React.lazy(() => import('./views/MyComponents/Approval/Approval.js'))
const ApprovalForm = React.lazy(() => import('./views/MyComponents/MRF/ApprovalForm.js'))
const ViewApprovalForm = React.lazy(() => import('./views/MyComponents/MRF/ViewApprovalForm.js'))
// const serviceWorker = React.lazy(() => import('../public/serviceWorker'))



class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <React.Suspense fallback={loading}>
          <Switch>
            <Route exact path="/login" name="Login Page" render={(props) => <Login {...props} />} />

            <Route exact path="/register" name="Register Page" render={(props) => <Register {...props} />} />
            <Route exact path="/404" name="Page 404" render={(props) => <Page404 {...props} />} />
            <Route exact path="/500" name="Page 500" render={(props) => <Page500 {...props} />} />
            <Route exact path="/mydashboard" name="My Dashboard" render={(props) => <MyDashboard {...props} />} />
            <Route exact path="/mrf" name="MRF" render={(props) => <MRF {...props} />} />
            <Route exact path="/CreateMRFPage" name="CreateMRFPage" render={(props) => <CreateMRFPage {...props} />} />
            <Route exact path="/EditMRFPage" name="EditMRFPage" render={(props) => <EditMRFPage {...props} />} />
            <Route exact path="/approvalform" name="ApprovalForm" render={(props) => <ApprovalForm {...props} />} />
            <Route exact path="/viewapprovalform" name="ViewApprovalForm" render={(props) => <ViewApprovalForm {...props} />} />
            <Route exact path="/approval" name="Approval" render={(props) => <Approval {...props} />} />
            <Route path="/" name="Home" render={(props) => <DefaultLayout {...props} />} />
            {/* <Route exact path="/" name="Login Page" render={(props) => <Login {...props} />} /> */}
          </Switch>
        </React.Suspense>
      </BrowserRouter>
    )
  }
}

export default App