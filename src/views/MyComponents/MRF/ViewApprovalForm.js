import React, { useState, useReducer, useEffect } from 'react';
import PropTypes from 'prop-types';
import {
    CRow, CCol, CButton, CForm, CFormControl, CFormLabel, CFormSelect, CFormCheck, CInputGroup, CInputGroupText
} from '@coreui/react';
import { AppContent, AppSidebar, AppFooter, AppHeader2 } from '../../../components/index'
import { IoIosArrowBack } from "react-icons/io";
import { Link } from 'react-router-dom';
import endPoints from 'src/utils/EndPointApi';
import Select from 'react-select';
import { useStateValue } from "../../../StateProvider";
// import FilteredList from 'react-filteredlist';
// import "../../../../node_modules/react-filteredlist/dist/main.css";



function ViewApprovalForm(props) {

    const [reducerState, dispatch] = useStateValue();
    // const [reducerState, dispatch] = useStateValue();
    // const token = reducerState.token;
    // const [finalData, setFinalData] = useState([]);
    const [heirarchyList, setHeirarchyList] = React.useState([]);
    const [BranchData, setBranchData] = React.useState([]);
    const [Approvers, setApprovers] = React.useState([]);

    const getData = sessionStorage.getItem("approvalMatrix");
    const getID = JSON.parse(sessionStorage.getItem("eventID"));
    console.log(getID);
    // const newdata = JSON.parse(getData);
    // console.log(getData)
    var myObject = eval("(" + getData + ")");
    console.log(myObject);
    // console.log("reducer STATE: ", reducerState);
    console.log("selectedApproval: ", reducerState.selectedApproval)
    const eventID = reducerState.selectedApproval;

    const token = JSON.parse(sessionStorage.getItem("token"));



    const hierarchyNameOptions = []
    {
        heirarchyList?.map(hierarchy => {
            hierarchyNameOptions.push({ label: hierarchy.name, value: hierarchy._id, type: hierarchy.type })
        })
    }
    // console.log("hierarchyNameOptions", hierarchyNameOptions)

    const branchNameOptions = []
    {
        BranchData?.map(branch => {
            branchNameOptions.push({ label: branch.name, value: branch._id, location: branch.location })
        })
    }
    console.log("branchNameOptions", branchNameOptions)

    const ApproverNameOptions = []
    {
        Approvers?.map(user => {
            ApproverNameOptions.push({ label: user.name.firstName + " " + user.name.lastName, value: user._id })
        })
    }


    async function showHeirarchyData(url) {
        // console.log("in show data")
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
        // console.log(Data);
        return Data
    }

    async function showBranchData(url) {
        // console.log("in show data")
        // setIsLoading(true)
        const response = await fetch(url, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': token
            },
        });
        const Data1 = await response.json();
        // setIsLoading(false)
        // console.log(Data1);
        return Data1
    }

    async function showApprovers(url) {
        // console.log("in show users")
        // setIsLoading(true)
        const response = await fetch(url, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': token
            },
        });
        const Data2 = await response.json();
        // setIsLoading(false)
        // console.log(Data2);
        return Data2
    }

    useEffect(() => {
        showHeirarchyData(endPoints.searchHierarchy).then(Data => setHeirarchyList(Data));
        showBranchData(endPoints.searchBranch).then(Data1 => {
            setBranchData(Data1)
            console.log("branchData", BranchData);
        });
        showApprovers(endPoints.searchUser).then(Data2 => {
            setApprovers(Data2)
            // console.log(Approvers);

        });
    }, [])

    const finalData = {};
    {

        myObject.filter(data => data._id == eventID).map(data => Object.assign(finalData, data));
        console.log(finalData);


    }





    return (
        <div>
            {/* <AppSidebar /> */}
            {/* <h1>{reducerState.selectedApproval}</h1> */}
            <div className="wrapper d-flex flex-column min-vh-100 bg-light">
                <AppHeader2 />
                <div className="body flex-grow-1 px-3">
                    <CRow className="pt-2 justify-content-between bg-light">
                        <CCol md={6} className="d-flex align-self-start align-items-center"><Link to="/approval"><CButton color="light"><IoIosArrowBack /></CButton></Link><h3>VIEW | EDIT  - APPROVAL</h3></CCol>
                        <CForm className="form bg-white">
                            <h4><b>Position</b></h4>


                            <CRow className="mb-3">
                                <CFormLabel className="col-sm-2 col-form-label">Position Name</CFormLabel>
                                <CCol sm="4">
                                    <div className="col-sm-12">
                                        <CFormControl
                                            type="text"
                                            value={finalData.position}
                                            // onChange={positionChangeHandler}
                                            required
                                        />
                                    </div>
                                </CCol>
                            </CRow>
                            {/* <CRow className="mb-3 col-sm-12">
                                <CCol className="col-sm-2"></CCol>
                                <CFormLabel htmlFor="inputPassword" className="col-sm-2 col-form-label">
                                    Position
                                </CFormLabel>
                                <div className="col-sm-6">
                                    <CFormControl
                                        type="text"
                                        value={myObject[0].position}
                                        // onChange={positionChangeHandler}
                                        required
                                    />
                                </div>
                                <CCol className="col-sm-2"></CCol>
                            </CRow> */}
                            <br />
                            <h4><b>Position Details</b></h4>


                            <CRow className="mb-3">
                                <CFormLabel className="col-sm-2 col-form-label" htmlFor="h_type">
                                    Hierarchy Type:
                                </CFormLabel>
                                <CCol sm="4">
                                    <Select
                                        // options={hierarchyNameOptions.filter(hierarchy => hierarchy.type == formState.hierarchyType)}
                                        isSearchable
                                        placeholder={finalData.hierarchyID.type}
                                        // onChange={hNameChangeHandler}
                                        required
                                        readOnly
                                    />
                                </CCol>

                                <CFormLabel htmlFor="h_name" className="col-sm-2 col-form-label">
                                    Hierarchy Name
                                </CFormLabel>
                                <CCol sm="4">
                                    <Select
                                        // options={hierarchyNameOptions.filter(hierarchy => hierarchy.type == heirarchy)}
                                        isSearchable
                                        placeholder={finalData.hierarchyID.name}
                                        // onChange={hNameChangeHandler}
                                        required
                                        readonly
                                    />
                                </CCol>
                            </CRow>
                            <CRow className="mb-3">

                                <CFormLabel htmlFor="location" className="col-sm-2 col-form-label">Branch Location</CFormLabel>
                                <CCol sm="4">
                                    <Select
                                        // options={branchLocationOptions}
                                        placeholder={finalData.branchID.location}
                                        isSearchable
                                    // isClearable
                                    // onChange={locationChangeHandler}
                                    />
                                </CCol>

                                <CFormLabel className="col-sm-2 col-form-label" htmlFor="branchID">Branch Name</CFormLabel>
                                <CCol sm="4">
                                    <Select
                                        options={branchNameOptions}
                                        isSearchable
                                        placeholder={finalData.branchID.name}
                                    // isClearable
                                    // onChange={branchNameChangeHandler}
                                    />
                                </CCol>

                            </CRow>
                            <br />
                            <h4><b>Approver Details</b></h4>
                            <CRow className="mb-3">
                                <CFormLabel htmlFor="pos_id" className="col-sm-2 col-form-label">Cooling Period</CFormLabel>
                                <CCol sm="4">
                                    <div className="col-sm-12">
                                        <CFormControl
                                            type="number"
                                            value={finalData.coolingPeriod}
                                            // onChange={positionChangeHandler}
                                            required
                                        />
                                    </div>
                                </CCol>
                            </CRow>
                            <CRow className="mb-3">
                                <CFormLabel htmlFor="pos_id" className="col-sm-2 col-form-label">TAT</CFormLabel>
                                <CCol sm="4">
                                    <div className="col-sm-12">
                                        <CFormControl
                                            type="number"
                                            value={finalData.tat}
                                            // onChange={positionChangeHandler}
                                            required
                                        />
                                    </div>
                                </CCol>
                            </CRow>
                            <CRow className="mb-3">
                                <CFormLabel className="col-sm-2 col-form-label">Approvers</CFormLabel>
                                <CCol sm="10" lg="6" md="6">
                                    {finalData.approversID.map((approver, index) => (
                                        <CRow key={index}>
                                            <CCol sm="3" lg="2" className="my-2">
                                                <CFormLabel >Approver-{index + 1}:</CFormLabel>
                                            </CCol>
                                            <CCol sm="8" lg="10" >
                                                <Select
                                                    name="approver"
                                                    placeholder={approver._id.name.firstName + " " + approver._id.name.lastName}
                                                    isSearchable
                                                    required
                                                // onChange={e => onChangeApprover(e, index)}
                                                />
                                            </CCol>
                                        </CRow>
                                    ))}
                                </CCol>
                            </CRow>
                            <br />
                            <div className="center mt-3 mb-3">
                                <CButton type="submit" >Save Changes</CButton>
                            </div>


                        </CForm>
                    </CRow>
                </div>
            </div>
        </div>
    );



}
ViewApprovalForm.propTypes = {
    ItemId: PropTypes.string
};

export default ViewApprovalForm;