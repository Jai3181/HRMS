import React from 'react';
import "./DashboardButtons/DashboardButtons.css"
import { CContainer, CRow, CCol, CWidgetBrand } from '@coreui/react'
import DashboardButtons from './DashboardButtons/DashboardButtons';
import { AppContent, AppSidebar, AppFooter, AppHeader2 } from '../../components/index'
import CIcon from '@coreui/icons-react'

function MyDashboard(props) {
    return (
        <div className="wrapper d-flex flex-column bg-light">
            <AppHeader2 />
            <div className="body flex-grow-1 px-3">
                <CContainer>
                    <CRow className="d-flex justify-content-around align-items-center" style={{ marginTop: "100px" }}>
                        {/* <CRow> */}
                        <CCol sm="6" lg="3"><DashboardButtons image="https://img.icons8.com/ios/50/000000/dashboard.png" path="/mydashboard" title="Dashboard" /></CCol>
                        <CCol sm="6" lg="3"><DashboardButtons image="https://img.icons8.com/ios/50/000000/add-user-male.png" path="/userManager" title="Search/Add Candidate" /></CCol>
                        <CCol sm="6" lg="3"><DashboardButtons image="info" path="/mrf" title="MRF" /></CCol>
                        <CCol sm="6" lg="3"><DashboardButtons image="info" path="#" title="LAYOFFS" /></CCol>
                        {/* </CRow> */}
                        {/* <CRow> */}
                        <CCol sm="6" lg="3"><DashboardButtons image="info" path="#" title="SOURCING CHANNELS" /></CCol>
                        <CCol sm="6" lg="3"><DashboardButtons image="info" path="#" title="VENDORS" /></CCol>
                        <CCol sm="6" lg="3"><DashboardButtons image="info" path="#" title="WALK-INS/HIRING EVENTS" /></CCol>
                        <CCol sm="6" lg="3"><DashboardButtons image="info" path="#" title="ORG-CHART" /></CCol>
                        {/* </CRow> */}
                        {/* <CRow> */}
                        <CCol sm="6" lg="3"><DashboardButtons image="https://img.icons8.com/ios/50/000000/open-resume.png" path="#" title="PARSE RESUME THROUGH EXCEL" /></CCol>
                        <CCol sm="6" lg="3"><DashboardButtons image="info" path="#" title="PENDING JOININGS" /></CCol>
                        <CCol sm="6" lg="3"><DashboardButtons image="info" path="#" title="BATCHWISE JOININGS" /></CCol>
                        <CCol sm="6" lg="3"><DashboardButtons image="info" path="#" title="HIRING SOP's AND SLA's" /></CCol>
                        {/* </CRow> */}
                        {/* <CRow> */}
                        <CCol sm="6" lg="3"><DashboardButtons image="info" path="#" title="REMARKS" /></CCol>
                        <CCol sm="6" lg="3"><DashboardButtons image="info" path="/userManager" title="ADD/DELETE USER ACCOUNT" /></CCol>
                        <CCol sm="6" lg="3"><DashboardButtons image="info" path="/userManager" title="USER PROFILES" /></CCol>
                        <CCol sm="6" lg="3"><DashboardButtons image="info" path="#" title="PERFORMANCE" /></CCol>
                        {/* </CRow> */}
                        {/* <CRow className="justify-content-around align-items-center"> */}
                        <CCol sm="6" lg="3"><DashboardButtons colors="info" path="#" title="BGV REPORTS" /></CCol>
                    </CRow>
                </CContainer >
            </div>
            {/* <AppFooter /> */}
        </div>
    );
}

export default MyDashboard;