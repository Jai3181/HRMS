import React, { Component } from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import './scss/style.scss'

const loading = (
  <div className="pt-3 text-center">
    <div className="sk-spinner sk-spinner-pulse"></div>
  </div>
)

// Containers
const DefaultLayout = React.lazy(() => import('./layout/DefaultLayout'))

// Pages
const Login = React.lazy(() => import('./views/pages/login/Login'))
const Register = React.lazy(() => import('./views/pages/register/Register'))
const Page404 = React.lazy(() => import('./views/pages/page404/Page404'))
const Page500 = React.lazy(() => import('./views/pages/page500/Page500'))
const MyDashboard = React.lazy(() => import('./views/dashboard/MyDashboard'))
const MRF = React.lazy(() => import('./views/MyComponents/MRF/MRFform.js'))
const ApprovalForm = React.lazy(() => import('./views/MyComponents/MRF/Approvalform.js'))

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
            <Route exact path="/Approvalform" name="ApprovalForm" render={(props) => <ApprovalForm {...props} />} />
            <Route path="/" name="Home" render={(props) => <DefaultLayout {...props} />} />
            {/* <Route exact path="/approvalform" name="Approval Form" render={(props) => <Approvalform {...props} />} /> */}
            {/* <Route exact path="/approvalform" name="ApprovalForm" render={(props) => <ApprovalForm {...props} />} /> */}
          </Switch>
        </React.Suspense>
      </BrowserRouter>
    )
  }
}

export default App