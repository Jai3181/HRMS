import React, { useState, useEffect, useReducer, createContext } from 'react';
import endPoints from 'src/utils/EndPointApi';
import { Link } from 'react-router-dom'
import './MRFform.css'
import { BsEyeFill } from "react-icons/bs";
import { MDBDataTableV5 } from 'mdbreact';
import { CContainer, CRow, CCol, CButton, CForm, CFormCheck } from '@coreui/react'
import { AppFooter, AppHeader2 } from '../../../components/index'
import { useStateValue } from "../../../StateProvider";
import "../Approval/Approval.css";

export default function MRFform(props) {
    const [reducerState, dispatch] = useStateValue()
    const token = JSON.parse(sessionStorage.getItem("token"));
    const [mrfList, setMRFList] = useState()
    const [userList, setUserList] = useState()
    const [hierarchyList, setHierarchyList] = useState()
    const [branchList, setBranchList] = useState()
    const [checkList, setCheckList] = useState([])
    const [approvalList, setApprovalList] = useState()
    const [mdbDataRows, setMdbDataRows] = useState([])
    const [isFiltered, setIsFiltered] = useState(false)


    if (approvalList) { sessionStorage.setItem("approvalList", JSON.stringify(approvalList)) }
    if (userList) { sessionStorage.setItem("userList", JSON.stringify(userList)) }
    if (hierarchyList) { sessionStorage.setItem("hierarchyList", JSON.stringify(hierarchyList)) }
    if (branchList) { sessionStorage.setItem("branchList", JSON.stringify(branchList)) }

    const showButtonHandler = (event) => {
        console.log("event id: ", event.target.id)
        const mrfSelected = mrfList.filter((item) => item._id === event.target.id)
        sessionStorage.setItem("ViewMRF", JSON.stringify(mrfSelected))
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
    const tableRows = []
    {
        mrfList?.map(item => {
            tableRows.push({
                showButton: <div className="d-flex justify-content-around">
                    {/* <Link to="/EditMrfPage"><BsEyeFill id={item._id} onClick={showButtonHandler} /></Link> */}
                    <Link to="#">
                        <CButton variant="ghost" color="primary" size="sm" onClick={showButtonHandler} id={item._id} >View</CButton>
                    </Link>
                </div>,
                position_id: item.designation.positionID.position,
                position_type: item.designation.positionType,
                // hierarchy: item.hierarchyID.type + ": " + item.hierarchyID.name,
                hierarchy: item.hierarchyID.name,
                repoting_manager: item.reportingManager.name.firstName + " " + item.reportingManager.name.lastName,
                startDate: item.startDate.toString().slice(0, 10),
                endDate: item.endDate.toString().slice(0, 10),
                diversity: item.diversity,
                job_type: item.jobType,
                // job_location: item.branchID.name + ", " + item.branchID.location
                job_city: item.branchID.location,
                job_branch: item.branchID.name,
            })
        })
    }

    const dataTable = {
        columns: [
            {
                label: '',
                field: 'showButton',
                width: 100,
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
                width: 150,
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
                label: 'location',
                field: 'job_city',
                sort: 'disabled',
                width: 200,
            },
            {
                label: 'branch',
                field: 'job_branch',
                sort: 'disabled',
                width: 200,
            },

        ],
        rows: isFiltered ? mdbDataRows : tableRows
    }
    // const widerData = {
    //     columns: [
    //         ...dataTable.columns.map((col) => {
    //             col.width = 200;
    //             return col;
    //         }),
    //     ],
    //     rows: [...dataTable.rows],
    // }

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


    var searchPosition = "";
    var searchHierarchy = "";
    var searchLocation = "";
    var searchBranch = "";
    var reportingManager = "";
    // const checkList = []
    const changeValueHandler = (event) => {
        // console.log(event.target)
        if (event.target.checked == true) {
            setCheckList([...checkList, event.target.value])
        } else if (event.target.checked == false) {
            const index1 = checkList.indexOf(event.target.value);
            let newCheckList = [...checkList]
            newCheckList.splice(index1, 1);
            console.log(newCheckList)
            setCheckList(newCheckList)
        }
    }

    const filteredRows = [];
    const clearFilterHandler = () => {
        document.querySelector("#filterForm").reset()
        setIsFiltered(false)
        setCheckList([])
    }

    const filterSubmitHandler = (event) => {
        event.preventDefault()
        console.log("event: ", event)
        if (checkList.includes("searchPosition")) {
            if (searchPosition.length > 0) {
                tableRows.filter(data => data.position_id.toUpperCase().includes(searchPosition.toUpperCase())).map(data => filteredRows.push(data));
            }
            console.log("filteredRows:", filteredRows);
        }
        if (checkList.includes("searchHeirarchy")) {
            if (searchHierarchy.length > 0) {
                tableRows.filter(data => data.hierarchy.toUpperCase().includes(searchHierarchy.toUpperCase())).map(data => filteredRows.push(data));
            }
            console.log("filteredRows:", filteredRows);
        }
        if (checkList.includes("searchLocation")) {
            if (searchLocation.length > 0) {
                tableRows.filter(data => data.job_city.toUpperCase().includes(searchLocation.toUpperCase())).map(data => filteredRows.push(data))
            }
            console.log("filteredRows:", filteredRows);
        }
        if (checkList.includes("searchBranch")) {
            if (searchBranch.length > 0) {
                tableRows.filter(data => data.job_branch.toUpperCase().includes(searchBranch.toUpperCase())).map(data => filteredRows.push(data))
            }
            console.log("filteredRows:", filteredRows);
        }
        if (checkList.includes("reportingManager")) {
            if (reportingManager.length > 0) {
                tableRows.filter(data => data.repoting_manager.toUpperCase().includes(reportingManager.toUpperCase())).map(data => filteredRows.push(data));
            }
            console.log("filteredRows:", filteredRows);
        }
        let updatedRows = [...new Set(filteredRows)];
        console.log("updatedRows:", updatedRows);
        setMdbDataRows(updatedRows)
        setIsFiltered(true)
        event.target.reset()
    }

    const positionSearchHandler = (event) => {
        searchPosition = event.target.value;
        console.log("searchPosition: ", searchPosition)
    }
    const heirarchySearchHandler = (event) => {
        searchHierarchy = event.target.value;
        console.log("search hierarchy: ", searchHierarchy)
    }
    const locationSearchHandler = (event) => {
        searchLocation = event.target.value;
        console.log("searchLocation: ", searchLocation)
    }
    const branchSearchHandler = (event) => {
        searchBranch = event.target.value;
        console.log("searchBranch: ", searchBranch)
    }
    const reportingManagerSearchHandler = (event) => {
        reportingManager = event.target.value;
        console.log("reportingManager: ", reportingManager)
    }

    console.log(checkList)
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
                                <CForm onSubmit={filterSubmitHandler} id="filterForm">
                                    <CRow>
                                        <CFormCheck id="flexCheckDefault" label="By Position" value="searchPosition" onChange={changeValueHandler} />
                                        {checkList.includes("searchPosition") ?
                                            <CRow>
                                                <input className="input" type="text" placeholder="enter position" onChange={positionSearchHandler} />
                                            </CRow> : ""}
                                    </CRow>
                                    <hr />
                                    <CRow>
                                        <CFormCheck id="flexCheckDefault" label="By Heirarchy" value="searchHeirarchy" onChange={changeValueHandler} />
                                        {checkList.includes("searchHeirarchy") ?
                                            <CRow>
                                                <input className="input" type="text" placeholder="enter heirarchy " onChange={heirarchySearchHandler} />
                                            </CRow> : ""}
                                    </CRow>
                                    <hr />
                                    <CRow>
                                        <CFormCheck id="flexCheckDefault" label="By location" value="searchLocation" onChange={changeValueHandler} />
                                        {checkList.includes("searchLocation") ?
                                            <CRow>
                                                <input className="input" type="text" placeholder="enter location" onChange={locationSearchHandler} />
                                            </CRow> : ""}
                                    </CRow>
                                    <hr />
                                    <CRow>
                                        <CFormCheck id="flexCheckDefault" label="By Branch" value="searchBranch" onChange={changeValueHandler} />
                                        {checkList.includes("searchBranch") ?
                                            <CRow>
                                                <input className="input" type="text" placeholder="enter branch" onChange={branchSearchHandler} />
                                            </CRow> : ""}
                                    </CRow>
                                    <hr />
                                    <CRow>
                                        <CFormCheck id="flexCheckDefault" label="By Reporting Manager" value="reportingManager" onChange={changeValueHandler} />
                                        {checkList.includes("reportingManager") ?
                                            <CRow>
                                                <input className="input" type="text" placeholder="enter reporting manager" onChange={reportingManagerSearchHandler} />
                                            </CRow> : ""}
                                    </CRow>
                                    <CRow className="mt-4">
                                        <CCol className="col-sm-4 mx-3">
                                            <CButton type="submit" shape="rounded-pill" >APPLY</CButton>
                                        </CCol>
                                        {/* <CCol className="col-sm-4"></CCol> */}
                                        <CCol className="col-sm-4 mx-3" >
                                            <CButton onClick={clearFilterHandler} shape="rounded-pill" color="danger">CLEAR</CButton>
                                        </CCol>
                                    </CRow>
                                </CForm>
                            </CCol>
                            <div className="vertical"></div>
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