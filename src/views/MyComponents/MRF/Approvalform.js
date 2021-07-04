import React, { useState, useEffect } from 'react';
import { AppContent, AppSidebar, AppFooter, AppHeader, AppHeader2 } from '../../../components/index'
import {
    CButton, CCol, CForm, CFormControl, CRow, CFormLabel, CFormSelect, CFormCheck, CContainer,
    CTable, CTableHead, CTableBody, CTableHeaderCell, CTableDataCell, CTableRow,
    CSpinner, CModal, CModalHeader, CModalFooter, CModalTitle, CModalBody
} from '@coreui/react';
import JSONDATA from "./approval.json";



function ApprovalForm() {
    const [heirarchy, setHeirarchy] = React.useState("");
    const [heirarchyName, setHeirarchyName] = React.useState("");
    const [branch, setBranch] = React.useState("");
    const [approver, setApprover] = React.useState("");


    const [searchedItem, setSearchedItem] = React.useState("");

    useEffect(() => {
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ title: 'React Hooks POST Request Example' })
        };

        fetch("https://crm1728.herokuapp.com/hierarchy/search", requestOptions)
            .then(response => response.json())
            .then(data => console.log(data));


    }, [])

    // const fetchSearch = async () => {
    //     const response = await fetch(, requestOptions);
    //     const data1 = await response.json();
    //     console.log(data1.type);
    // }


    return (
        <div>
            {/* <AppSidebar /> */}
            <div className="wrapper d-flex flex-column min-vh-100 bg-light">
                <AppHeader2 />
                <div className="body flex-grow-1 px-3 ml-lg-5 ml-md-5">
                    <CRow className="align-items-center ml-5 ">

                        <CRow className="mb-3 col-sm-12">
                            <CCol className="col-sm-2"></CCol>
                            <CFormLabel htmlFor="inputPassword" className="col-sm-2 col-form-label">
                                Position
                            </CFormLabel>
                            <div className="col-sm-6">
                                <CFormControl type="text" id="inputPassword" />
                            </div>
                            <CCol className="col-sm-2"></CCol>
                        </CRow>
                        <CRow className="mb-3">
                            <CCol className="col-sm-2"></CCol>
                            <CFormLabel htmlFor="inputPassword" className="col-sm-2 col-form-label">
                                Cooling Period
                            </CFormLabel>
                            <div className="col-sm-6">
                                <CFormControl type="text" id="inputPassword" />
                            </div>
                            <CCol className="col-sm-2"></CCol>
                        </CRow>


                        <CRow className="mb-3">
                            <CCol className="col-sm-2"></CCol>
                            <CFormLabel htmlFor="inputPassword" className="col-sm-2 col-form-label">
                                Turn Around Time
                            </CFormLabel>
                            <div className="col-sm-6">
                                <CFormControl type="text" id="inputPassword" />
                            </div>
                            <CCol className="col-sm-2"></CCol>
                        </CRow>
                        <CRow>
                            <CCol className="col-sm-2"></CCol>
                            <CFormLabel className="col-sm-2 col-form-label mb-3" htmlFor="user_type">
                                Heirarchy:
                            </CFormLabel>
                            <CCol sm="3">
                                <CFormSelect id="user_type" required onChange={(e) => {
                                    const selectedHeirarchy = e.target.value;
                                    setHeirarchy(selectedHeirarchy);

                                }}>
                                    <option>Choose...</option>
                                    <option value="Department">Department</option>
                                    <option value="sub-department">Sub-Department</option>
                                    <option value="team">Team</option>

                                </CFormSelect>
                            </CCol>
                            <CCol sm="3">
                                <CFormSelect id="user_type" required onChange={(e) => {
                                    const selectedHeirarchyName = e.target.value;
                                    setHeirarchyName(selectedHeirarchyName);

                                }}>
                                    <option>Choose {heirarchy}</option>
                                    {JSONDATA.filter(data => data.type == heirarchy).map((filtereddata, key) => (

                                        <option key={key}>{filtereddata.name}</option>


                                    ))}




                                </CFormSelect>
                            </CCol>





                            <CCol className="col-sm-2"></CCol>
                        </CRow>


                        <CRow>
                            <CCol className="col-sm-2"></CCol>
                            <CFormLabel className="col-sm-2 col-form-label mb-3" htmlFor="user_type">
                                Branch:
                            </CFormLabel>
                            <CCol sm="3">
                                <CFormSelect id="user_type" required onChange={(e) => {
                                    const selectedbranch = e.target.value;
                                    setBranch(selectedbranch);

                                }}>
                                    <option>Choose...</option>

                                    <option value="admin">admin</option>
                                    <option value="recruiter">recruiter</option>
                                    <option value="vendor">vendor</option>
                                    <option value="employee">employee</option>
                                    <option value="interviewer">interviewer</option>
                                </CFormSelect>
                            </CCol>
                            <CCol>
                                <CFormControl type="text" id="inputPassword" placeholder="search ..." />
                                {console.log(heirarchy)}


                            </CCol>
                            <CCol className="col-sm-2"></CCol>
                        </CRow>

                        <CRow>
                            <CCol className="col-sm-2"></CCol>
                            <CFormLabel className="col-sm-2 col-form-label mb-3" htmlFor="user_type">
                                Approver:
                            </CFormLabel>
                            <CCol sm="3">
                                <CFormSelect id="user_type" required onChange={(e) => {
                                    const selectedbranch = e.target.value;
                                    setBranch(selectedbranch);

                                }}>
                                    <option>Choose...</option>
                                    <option value="admin">admin</option>
                                    <option value="recruiter">recruiter</option>
                                    <option value="vendor">vendor</option>
                                    <option value="employee">employee</option>
                                    <option value="interviewer">interviewer</option>
                                </CFormSelect>
                            </CCol>
                            <CCol>
                                <CFormControl type="text" id="inputPassword" placeholder="search ..." />
                            </CCol>
                            <CCol className="col-sm-2"></CCol>
                        </CRow>

                        <CRow>
                            <CCol className="col-sm-5"></CCol>
                            <CCol>
                                <CButton>Submit</CButton>
                            </CCol>
                            <CCol className="col-sm-5"></CCol>
                        </CRow>


                    </CRow>
                </div>
                <AppFooter />
            </div>
        </div>
    );
}
export default ApprovalForm;