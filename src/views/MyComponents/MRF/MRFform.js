import React, { useState, useEffect, useReducer, createContext } from 'react';
import endPoints from 'src/utils/EndPointApi';
import { Link } from 'react-router-dom'
import './MRFform.css'
import { BsEyeFill } from "react-icons/bs";
import { MDBDataTableV5 } from 'mdbreact';
import {
    CContainer, CRow, CCol, CButton, CFormCheck
} from '@coreui/react'
import { AppFooter, AppHeader2 } from '../../../components/index'
import { useStateValue } from "../../../StateProvider";
import "../Approval/Approval.css";

export default function MRFform(props) {
    const [reducerState, dispatch] = useStateValue()
    const token = reducerState.token
    const [mrfList, setMRFList] = useState()
    const [userList, setUserList] = useState()
    const [hierarchyList, setHierarchyList] = useState()
    const [branchList, setBranchList] = useState()
    const [approvalList, setApprovalList] = useState()


    if (approvalList) { localStorage.setItem("approvalList", JSON.stringify(approvalList)) }
    if (userList) { localStorage.setItem("userList", JSON.stringify(userList)) }
    if (hierarchyList) { localStorage.setItem("hierarchyList", JSON.stringify(hierarchyList)) }
    if (branchList) { localStorage.setItem("branchList", JSON.stringify(branchList)) }

    const showButtonHandler = (event) => {
        console.log("event id: ", event.target.id)
        const mrfSelected = mrfList.filter((item) => item._id === event.target.id)
        localStorage.setItem("ViewMRF", JSON.stringify(mrfSelected))
        // dispatch({
        //     type: "VIEW_MRF",
        //     // mrfID: event.target.id,
        //     mrf: mrfSelected[0],
        //     positions: positionNameOptions,
        //     users: userNameOptions,
        //     hierarchies: hierarchyNameOptions,
        //     branchName: branchNameOptions,
        //     branchLocation: branchLocationOptions,
        // })
    }
    const createButtonHandler = () => {
        // console.log("event : ", event.target.id)
        // console.log("reducerState::::::: ", reducerState)
        // dispatch({
        //     type: "CREATE_MRF",
        //     positions: positionNameOptions,
        //     users: userNameOptions,
        //     hierarchies: hierarchyNameOptions,
        //     branchName: branchNameOptions,
        //     branchLocation: branchLocationOptions,
        // })
    }
    {/* <BsEyeFill className={item._id} id={item._id} /> */ }
    const tableRows = []
    {
        mrfList?.map(item => {
            // console.log("item:", item)
            tableRows.push({
                showButton: <Link to="/EditMrfPage"><BsEyeFill id={item._id} onClick={showButtonHandler} /></Link>,
                position_id: item.designation.positionID.position,
                position_type: item.designation.positionType,
                hierarchy: item.hierarchyID.type + ": " + item.hierarchyID.name,
                repoting_manager: item.reportingManager.name.firstName + " " + item.reportingManager.name.lastName,
                startDate: item.startDate.toString().slice(0, 10),
                endDate: item.endDate.toString().slice(0, 10),
                diversity: item.diversity,
                job_type: item.jobType,
                job_location: item.branchID.name + ", " + item.branchID.location
            })
        })
    }

    const dataTable = {
        columns: [
            {
                label: '',
                field: 'showButton',
                width: 90,
            },
            {
                label: 'Position Name',
                field: 'position_id',
                width: 170,
                attributes: {
                    'aria-controls': 'DataTable',
                    'aria-label': 'Name',
                },
            },
            {
                label: 'Type',
                field: 'position_type',
                width: 100,
            },
            {
                label: 'Hierarchy',
                field: 'hierarchy',
                width: 200,
            },
            {
                label: 'Repoting Manager',
                field: 'repoting_manager',
                sort: 'disabled',
                width: 200,
            },
            {
                label: 'Start date',
                field: 'startDate',
                sort: 'disabled',
                width: 150,
            },
            {
                label: 'End date',
                field: 'endDate',
                sort: 'disabled',
                width: 150,
            },
            {
                label: 'Diversity',
                field: 'diversity',
                sort: 'disabled',
                width: 100,
            },
            {
                label: 'Job Type',
                field: 'job_type',
                sort: 'disabled',
                width: 150,
            },
            {
                label: 'Job Location',
                field: 'job_location',
                sort: 'disabled',
                width: 200,
            },

        ],
        rows: tableRows
    }

    async function postData(url, data) {
        // setIsLoading(true)
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': token
            },
            body: JSON.stringify(data)
        });
        const Data = await response.json();
        // setIsLoading(false)
        return Data
    }
    const axios = require('axios').default;
    async function showData(url) {
        // setIsLoading(true)
        const response = await axios.get(url, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': token
            },
        });
        console.log(response)
        return response.data

        // const response = await fetch(url, {
        //     method: 'GET',
        //     headers: {
        //         'Content-Type': 'application/json',
        //         'Authorization': token
        //     },
        // });
        // const data = await response.json();
        // console.log("Data from show:", response)
        // setIsLoading(false)
        // return data
    }
    useEffect(() => {
        console.log("in use effect")
        showData(endPoints.searchMrf)
            .then(Data => {
                console.log("mrfList:", Data)
                setMRFList(Data)
            })
        showData(endPoints.searchApproval)
            .then(Data => {
                console.log("approvals:", Data)
                setApprovalList(Data)
            })
        showData(endPoints.searchUser)
            .then(Data => {
                console.log("user:", Data)
                setUserList(Data)
                showData(endPoints.searchHierarchy)
                    .then(Data => {
                        console.log("hierarchy:", Data)
                        setHierarchyList(Data)
                    })
            })
        showData(endPoints.searchBranch)
            .then(Data => {
                console.log("branch:", Data)
                setBranchList(Data)
            })
    }, [])
    console.log("reducerState::::::: ", reducerState)
    return (
        <div>
            {/* <AppSidebar /> */}
            <div className="wrapper d-flex flex-column min-vh-100 bg-light">
                <AppHeader2 />
                <div className="body flex-grow-1 px-3">
                    <CRow className="py-2 justify-content-between">
                        <CCol md={6} className="align-self-start align-items-center justify-content-center"><h2>CREATE | VIEW | DELETE - MRF</h2></CCol>
                        <CCol md={2} className="align-self-end align-items-center justify-content-center"><Link to="/CreateMRFPage"><CButton color="primary" onClick={createButtonHandler}>+ CREATE NEW MRF</CButton></Link></CCol>
                    </CRow>
                    <hr />
                    <CContainer fluid className="justify-content-between">
                        <CRow>
                            <CCol md={2} className="filterbar align-self-start align-items-center justify-content-center">
                                FILTER BAR
                                <hr />
                                <CRow>
                                    <CRow>
                                        <CFormCheck id="flexCheckDefault" label="By Position" value="searchPosition" />
                                        <CRow>
                                            <input className="input" type="text" placeholder="enter position" />

                                        </CRow>

                                    </CRow>
                                    <hr />
                                    <CRow>
                                        <CFormCheck id="flexCheckDefault" label="By Heirarchy" value="searchHeirarchy" />
                                        <CRow>
                                            <input className="input" type="text" placeholder="enter heirarchy " />
                                            {/* <Select
                                                className="select"
                                            // onChange={heirarchySearchHandler}
                                            /> */}
                                        </CRow>
                                    </CRow>
                                    <hr />
                                    <CRow>
                                        <CFormCheck id="flexCheckDefault" label="By Job Diversity" value="searchBranch" />
                                        <CRow>
                                            <input className="input" type="text" placeholder="enter branch" />
                                        </CRow>
                                    </CRow>
                                    <hr />
                                    {/* <CRow>
                                        <CFormCheck id="flexCheckDefault" label="By Cooling Period" value="searchCooling" onChange={changeValueHandler} />
                                        <CRow>
                                            <CFormControl
                                                className="select"
                                                type="number"
                                                id="age"

                                                onChange={coolingSearchHandler}
                                            // required
                                            />
                                        </CRow>
                                    </CRow>
                                    <hr />
                                    <CRow>
                                        <CFormCheck id="flexCheckDefault" label="By TAT" value="searchTAT" />
                                        <CRow>
                                            <CFormControl
                                                className="select"
                                                type="number"
                                                id="age"

                                            // onChange={ageChangeHandler}
                                            // required
                                            />
                                        </CRow>
                                    </CRow> */}
                                    <hr />
                                    <CRow>
                                        <CFormCheck id="flexCheckDefault" label="By Location" value="searchApprover" />
                                        <CRow>
                                            <input className="input" type="text" placeholder="enter approver" />
                                        </CRow>
                                    </CRow>
                                    <CRow className="mt-4">
                                        <CCol className="col-sm-2"></CCol>
                                        <CCol className="col-sm-9">
                                            <CButton >APPLY FILTER</CButton>

                                        </CCol>

                                        <CCol className="col-sm-2"></CCol>

                                    </CRow>

                                </CRow>
                            </CCol>
                            <CCol className="col-sm-8 col-md-10 ">
                                <CContainer fluid >
                                    <MDBDataTableV5
                                        small
                                        hover
                                        // striped
                                        fullPagination
                                        entriesOptions={[5, 20, 25]}
                                        entries={5}
                                        // bordered
                                        scrollX
                                        searchTop
                                        searchBottom={false}
                                        data={dataTable}
                                    />;
                                </CContainer>
                            </CCol>
                        </CRow>
                    </CContainer>
                </div>
                {/* <AppFooter /> */}
            </div>
        </div >
    );
}