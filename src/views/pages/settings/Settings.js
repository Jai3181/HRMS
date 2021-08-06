import React, { useState } from 'react';
import { CContainer, CRow, CCol, CButton, CFormSelect } from '@coreui/react'
import { AppFooter, AppHeader2 } from '../../../components/index'
import { Link } from 'react-router-dom'
import "./Settings.css";
import endPoints from "../../../utils/EndPointApi";

function Settings(props) {

  const [distribution, setDistribution] = useState("");

  async function postData(url, data) {
    console.log("in post data")
    // setIsLoading(true)
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        // 'Authorization': token
      },
      body: JSON.stringify(data)
    });
    const Data3 = await response.json();
    // console.log(Data3);
    // setIsLoading(false)
    return Data3
  }

  const distributionHandler = (event) => {
    postData(endPoints.settings, { distribution: distribution }).then(data => console.log(data))



  }
  return (
    <div>
      {/* <AppSidebar /> */}
      <div className="wrapper d-flex flex-column min-vh-100 bg-light">
        <AppHeader2 />
        <div className="body flex-grow-1 px-3">
          <h1 className="page_heading">Settings</h1>
          <hr />
          <CContainer>
            <CRow className="d-flex justify-content-around">

              <CCol className="setting_section" sm="6" lg="2">
                <CRow><h4 className="setting_heading"><b>General</b></h4></CRow>
                <CRow>
                  <Link className="link_text" to="/hierarchyManager">Manage Hierarchy</Link><br />
                  <Link className="link_text" to="/branchManager">Manage Branch</Link><br />
                  <Link className="link_text" to="/userManager">Manage Users</Link><br />
                  <Link className="link_text" to="/mrf">Manage MRF</Link><br />
                  <Link className="link_text" to="/userprofile">Manage User Profile</Link><br />
                </CRow>
              </CCol>

              <CCol className="setting_section" sm="6" lg="2">
                <CRow><h4 className="setting_heading"><b>Users</b></h4></CRow>
                <CRow>
                  <Link className="link_text" to="/userManager">View Users</Link><br />
                  <Link className="link_text" to="/userManager">Create Users</Link><br />
                  <Link className="link_text" to="/userManager">Remove Users</Link><br />
                </CRow>
              </CCol>

              <CCol className="setting_section" sm="6" lg="2">
                <CRow><h4 className="setting_heading"><b>Hierarchy</b></h4></CRow>
                <CRow>
                  <Link className="link_text" to="/hierarchyManager">View Hierarchy</Link><br />
                  <Link className="link_text" to="/hierarchyManager">Create Hierarchy</Link><br />
                  <Link className="link_text" to="/hierarchyManager">Remove Hierarchy</Link><br />
                </CRow>
              </CCol>

              <CCol className="setting_section" sm="6" lg="2">
                <CRow><h4 className="setting_heading"><b>MRF</b></h4></CRow>
                <CRow>
                  <Link className="link_text" to="/mrf">View MRF</Link><br />
                  <Link className="link_text" to="/CreateMRFPage">Create MRF</Link><br />
                  <Link className="link_text" to="/mrf">Delete MRF</Link><br />
                </CRow>
              </CCol>

              <CCol className="setting_section" sm="6" lg="2">
                <CRow><h4 className="setting_heading"><b>Approvals</b></h4></CRow>
                <CRow>
                  <Link className="link_text" to="/approval">View Approval</Link><br />
                  <Link className="link_text" to="/approvalform">Create Approaval</Link><br />
                  <Link className="link_text" to="/approval">Delete Approval</Link><br />
                </CRow>
              </CCol>
            </CRow>
            <CRow className="d-flex justify-content-around">
              <CCol className="setting_section" sm="6" lg="2">
                <CRow><h4 className="setting_heading"><b>Profiles</b></h4></CRow>
                <CRow>
                  <Link className="link_text" to="/userprofile">View User Profile</Link><br />
                  <Link className="link_text" to="/userprofile">Create User Profile</Link><br />
                  <Link className="link_text" to="/userprofile">Edit User Profile</Link><br />
                </CRow>
              </CCol>

              <CCol className="setting_section" sm="6" lg="2">
                <CRow><h4 className="setting_heading"><b>Branch</b></h4></CRow>
                <CRow>
                  <Link className="link_text" to="/branchManager">View Branch</Link><br />
                  <Link className="link_text" to="/branchManager">Create Branch</Link><br />
                  <Link className="link_text" to="/branchManager">Delete Branch</Link><br />
                </CRow>
              </CCol>

              <CCol className="setting_section" sm="6" lg="2">
                <CRow><h4 className="setting_heading"><b>Distribution</b></h4></CRow>
                <CRow>
                  <CCol className="col-sm-12">
                    <CFormSelect id="hirearchy_type" required onChange={(e) => setDistribution(e.target.value)}>
                      {console.log(distribution)}
                      <option>Choose...</option>
                      <option value="manual">Manual</option>
                      <option value="odd-even">odd-even</option>
                      <option value="department">department</option>
                    </CFormSelect>
                  </CCol>


                </CRow>
                <CRow className="my-5 col-sm-6 center" >
                  <CButton onClick={distributionHandler}>
                    Send

                  </CButton>

                </CRow>
              </CCol>


            </CRow>

          </CContainer>
        </div>
        {/* <AppFooter /> */}
      </div>
    </div>
  );
}

export default Settings;