import React, { useContext, useState, useReducer, useEffect } from 'react';
import PropTypes from "prop-types";
// import AuthContext from "../../../AuthContext"
import { useStateValue } from "../../../StateProvider"
// import { SelectedMRF } from "./MRFform"

import { AppContent, AppSidebar, AppFooter, AppHeader, AppHeader2 } from '../../../components/index'
import {
    CButton, CCol, CForm, CFormControl, CRow, CFormLabel, CFormSelect
} from '@coreui/react';
import endPoints from "../../../utils/EndPointApi";
// import "./ApprovalForm.css";
import Select from 'react-select';
import CreatableSelect from 'react-select/creatable';
import { connectAdvanced } from 'react-redux';


function ViewApprovalPage(props) {
    const [reducerState, dispatch] = useStateValue()
    const [approvalMatrix, setApprovalMatrix] = useState([]);
    // const rtx = useContext(AuthContext)
    // const rtx2 = useContext(SelectedMRF)\
    console.log("reducer STATE: ", reducerState)
    console.log("selectedApproval: ", reducerState.selectedApproval)

    const token = reducerState.token





    async function showApprovalMatrix(url) {
        // console.log("in show users")
        // setIsLoading(true)
        const response = await fetch(url, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': token
            },
        });
        const Data = await response.json();
        // setIsLoading(false)
        // console.log(Data2);
        return Data
    }

    useEffect(() => {

        showApprovalMatrix(endPoints.showApprovalMatrix).then(Data => {
            setApprovalMatrix(Data)

        });
    }, [])


    const Data = []
    {
        approvalMatrix?.filter(data => data._id == reducerState.selectedApproval).map(data => {
            Data.push({
                position: data.position,
                heirarchy: data.hierarchyID.name,
                branchname: data.branchID.name,
            }
            )

        })

    }

    // const pos = Data[0].position;



    // const [position, setPosition] = useState(Data[0].position);
    // const [cooling, setCooling] = useState(Data.heirarchy);
    // const [tat, setTAT] = useState(Data.branchname);
    // const [heirarchydata, setHeirarchyData] = useState("");
    // const [branch, setBranch] = useState("");
    // const [approver, setApprover] = useState("");


    // console.log(position);

    return (
        <div>

            <div className="wrapper d-flex flex-column min-vh-100 bg-light">
                <AppHeader2 />
                <div className="body flex-grow-1 px-3 ml-lg-5 ml-md-5">
                    <h3> APPROVAL ID : {reducerState.selectedApproval}</h3>
                    <CForm
                    //  onSubmit={formSubmitHandler}
                    >
                        <CRow className="align-items-center ml-5 ">

                            <CRow className="mb-3 col-sm-12">
                                <CCol className="col-sm-2"></CCol>
                                <CFormLabel htmlFor="inputPassword" className="col-sm-2 col-form-label">
                                    Position
                                </CFormLabel>
                                <div className="col-sm-6">
                                    <CFormControl
                                        type="text"
                                        // value={pos}
                                        // onChange={positionChangeHandler}
                                        required
                                    />
                                </div>
                                <CCol className="col-sm-2"></CCol>
                            </CRow>
                            <CRow className="mb-3">
                                <CCol className="col-sm-2"></CCol>
                                <CFormLabel htmlFor="inputPassword" className="col-sm-2 col-form-label">
                                    Cooling Period
                                </CFormLabel>
                                <div className="col-sm-6">
                                    <CFormControl type="number"
                                        // onChange={CoolingPeriodChangeHandler}
                                        required />
                                </div>
                                <CCol className="col-sm-2"></CCol>
                            </CRow>


                            <CRow className="mb-3">
                                <CCol className="col-sm-2"></CCol>
                                <CFormLabel htmlFor="inputPassword" className="col-sm-2 col-form-label">
                                    Turn Around Time
                                </CFormLabel>
                                <div className="col-sm-6">
                                    <CFormControl type="number"
                                        // onChange={TATChangeHandler}
                                        required />
                                </div>
                                <CCol className="col-sm-2"></CCol>
                            </CRow>

                            <CRow className="mb-3">
                                <CCol className="col-sm-2"></CCol>
                                <CFormLabel className="col-sm-2 col-form-label" htmlFor="hirearchy_type">
                                    Hierarchy Type
                                </CFormLabel>
                                <CCol className="col-sm-6">
                                    <CFormSelect id="hirearchy_type" required
                                        onChange={(e) => {
                                            // setHeirarchy(e.target.value);
                                        }}>
                                        <option>Choose...</option>
                                        <option value="Department">Department</option>
                                        <option value="Sub-Department">Sub-Department</option>
                                        <option value="Team">Team</option>
                                        <option value="Management">Management</option>
                                    </CFormSelect>
                                </CCol>
                                <CCol className="col-sm-2"></CCol>
                            </CRow>
                            <CRow className="mb-3">
                                <CCol className="col-sm-2"></CCol>
                                <CFormLabel className="col-sm-2 col-form-label" htmlFor="h_name">
                                    Hierarchy Name
                                </CFormLabel>
                                <CCol className="col-sm-6">
                                    <Select
                                        // placeholder={heirarchy}
                                        // options={hierarchyNameOptions.filter(hierarchy => hierarchy.type == heirarchy)}
                                        isSearchable
                                    // isClearable
                                    // onChange={hiearchyNameChangeHandler}
                                    />
                                </CCol>
                                <CCol className="col-sm-2"></CCol>
                            </CRow>


                            <CRow >
                                <CCol className="col-sm-2"></CCol>
                                <CFormLabel className="col-sm-2 col-form-label mb-3" htmlFor="user_type">
                                    Branch:
                                </CFormLabel>
                                <CCol className="col-sm-6">
                                    <Select
                                        // options={branchNameOptions}
                                        isSearchable
                                        // isClearable
                                        // onChange={BranchChangeHandler}
                                        required
                                    />
                                </CCol>
                                <CCol className="col-sm-2"></CCol>
                            </CRow>



                            <CRow className="mb-3">
                                <CCol className="col-sm-2"></CCol>
                                <CFormLabel className="col-sm-2 col-form-label mb-3" htmlFor="user_type">
                                    Approver:
                                </CFormLabel>
                                <CCol className="mb-2">
                                    <CreatableSelect
                                        isMulti
                                        // onChange={ApproverChangeHandler}
                                        // options={ApproverNameOptions}
                                        ActionTypes='clear-option'
                                    />
                                </CCol>
                                <CCol className="col-sm-2"></CCol>
                            </CRow>

                            <CRow>
                                <CCol className="col-sm-6"></CCol>
                                <CCol>
                                    <CButton type="submit">Submit</CButton>
                                </CCol>
                                <CCol className="col-sm-4"></CCol>
                            </CRow>


                        </CRow>
                    </CForm>
                </div>
                <AppFooter />
            </div>
        </div>


    );
}
ViewApprovalPage.propTypes = {
    ItemID: PropTypes.string
}
export default ViewApprovalPage;