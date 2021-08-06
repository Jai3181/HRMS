import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom'
import '../MRF/MRFform.css'
import { MDBDataTableV5 } from 'mdbreact';
import { CContainer, CRow, CCol, CBadge, CButton, CFormCheck, CFormControl, CModalFooter, CModalBody, CModalTitle, CModalHeader, CModal } from '@coreui/react'
import { AppFooter, AppHeader2 } from '../../../components/index';
import endPoints from "../../../utils/EndPointApi";
import "./Approval.css";
import { useStateValue } from "../../../StateProvider";






function Approval(props) {
    const [approvalMatrix, setApprovalMatrix] = useState([]);
    const [reducerState, dispatch] = useStateValue();
    // const token = reducerState.token;
    const token = JSON.parse(sessionStorage.getItem("token"));
    // console.log("token1: ", token, typeof (token))
    // console.log("token2: ", token, typeof (token2))
    // const [documentID, setDocumentID] = useState("");
    const [hierarchyList, setHierarchyList] = useState()
    const [branchList, setBranchList] = useState()
    const [userList, setUserList] = useState()


    var searchPosition;
    var searchHierarchy;
    var searchBranch;
    var searchApprover;

    if (approvalMatrix) { sessionStorage.setItem("approvalMatrix", JSON.stringify(approvalMatrix)) }
    if (userList) { sessionStorage.setItem("userList", JSON.stringify(userList)) }
    if (hierarchyList) { sessionStorage.setItem("hierarchyList", JSON.stringify(hierarchyList)) }
    if (branchList) { sessionStorage.setItem("branchList", JSON.stringify(branchList)) }


    async function showData(url) {
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
        return Data
    }
    useEffect(() => {
        console.log("in use effect")
        showData(endPoints.showApprovalMatrix)
            .then(Data => {
                console.log(Data);
                setApprovalMatrix(Data);
            })
        showData(endPoints.searchUser)
            .then(Data => {
                console.log("user:", Data)
                setUserList(Data)

            })
        showData(endPoints.searchHierarchy)
            .then(Data => {
                console.log("hierarchy:", Data)
                setHierarchyList(Data)
            })
        showData(endPoints.searchBranch)
            .then(Data => {
                console.log("branch:", Data)
                setBranchList(Data)
            })
    }, []);

    const pageChangeHandler = (event) => {
        // console.log("event id: ", event.target.id)
        // const ApprovalSelected = approvalMatrix.filter((item) => item._id === event.target.id)
        // localStorage.setItem("approval selected", JSON.stringify(ApprovalSelected))
        console.log("event id: ", event.target.id)
        sessionStorage.setItem("eventID", JSON.stringify(event.target.id));
        dispatch({
            type: "VIEW_APPROVAL",
            approvalID: event.target.id
        })
    }


    async function deleteMatrix(url, data) {
        // console.log("in post data")
        // setIsLoading(true)
        const response = await fetch(url, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': token
            },
            body: JSON.stringify(data)
        });
        const Data1 = await response.json();
        // console.log(Data1);
        // setIsLoading(false)
        return Data1
    }

    const dataDeleteHandler = (event) => {
        console.log("deleted")
        const documentID = event.target.id;
        // approvalMatrix?.map(data => {
        //     documentID = data._id;
        // })
        deleteMatrix(endPoints.deleteApprovalMatrix, { _id: documentID }).then(Data => { console.log(Data) });
        console.log(typeof (documentID));
    }


    var approverList = "";
    const DataRows = []
    {
        approvalMatrix?.map(data => {
            {
                for (var i = 0; i < data.approversID.length; i++) {

                    approverList += [i + 1] + "." + "" + data.approversID[i]._id.name.firstName + "  " + data.approversID[i]._id.name.lastName + " ";
                    var approverListfinal = approverList;
                }
                approverList = "";
                console.log(approverListfinal);
            }
            console.log(data)
            {
                DataRows.push({
                    document_id: data._id,
                    delete: <div className="icons">
                        <Link to="/viewapprovalform"><CButton size="sm" color="primary" variant="ghost" id={data._id} className="icon1" onClick={pageChangeHandler}>Edit</CButton></Link>
                        {/* <CButton variant="ghost" color="info" size="sm" className="icon2" id={data._id} onClick={() => setVisible(!visible)} >View</CButton> */}
                        <CButton variant="ghost" color="danger" size="sm" className="icon3" onClick={dataDeleteHandler} id={data._id} >Delete</CButton>
                    </div>,
                    position: data.position,
                    heirarchy: data.hierarchyID.name,
                    branchname: data.branchID.name,
                    cooling: data.coolingPeriod,
                    verified: data.verified.toString(),
                    tatdate: data.tat,
                    approverName: approverListfinal,
                })
            }

        })


    }




    console.log(approvalMatrix);

    // console.log(DataRows)

    const positionSearchHandler = (event) => {
        searchPosition = event.target.value;
        console.log(searchPosition);



    }
    const heirarchySearchHandler = (event) => {
        searchHierarchy = event.target.value;
    }
    const branchSearchHandler = (event) => {
        searchBranch = event.target.value;
    }
    const approverSearchHandler = (event) => {
        searchApprover = event.target.value;
    }



    const datatable = {
        columns: [
            {
                label: '',
                field: 'delete',
                width: 200
            },
            {
                label: 'position',
                field: 'position',
                sort: 'asc',
                width: 100
            },
            {
                label: 'Heirarchy',
                field: 'heirarchy',
                sort: 'asc',
                width: 50
            },
            {
                label: 'Branch Name',
                field: 'branchname',
                sort: 'asc',
                width: 100
            },
            {
                label: 'Cooling Period',
                field: 'cooling',
                sort: 'asc',
                width: 50
            },
            {
                label: 'TAT',
                field: 'tatdate',
                sort: 'asc',
                width: 50
            },
            {
                label: 'Verification status',
                field: 'verified',
                sort: 'asc',
                width: 100
            },
            {
                label: 'Approver',
                field: 'approverName',
                sort: 'asc',
                width: 100
            },
        ],


        rows: DataRows
    }
    const widerData = {
        columns: [
            ...datatable.columns.map((col) => {
                col.width = 200;
                return col;
            }),
        ],
        rows: [...datatable.rows],
    }

    // console.log(typeof (rows))
    // console.log(searchHierarchy);

    const checkList = []
    const changeValueHandler = (event) => {
        if (event.target.checked) {
            checkList.push(event.target.value);
        } else if (event.target.checked == false) {
            const index1 = checkList.indexOf(event.target.value);
            checkList.splice(index1, 1);
        }
        console.log(checkList);
    }


    const filteredRows = [];
    const filterHandler = (event) => {
        if (checkList.includes("searchPosition")) {
            DataRows.filter(data => data.position.toUpperCase().includes(searchPosition.toUpperCase())).map(data => filteredRows.push(data));
            // console.log(pos);
            // filteredRows.push(pos);
        }
        if (checkList.includes("searchHeirarchy")) {
            DataRows.filter(data => data.heirarchy.toUpperCase().includes(searchHierarchy.toUpperCase())).map(data => filteredRows.push(data));
            // console.log(hei);
            // filteredRows.push(hei);
        }
        if (checkList.includes("searchBranch")) {
            DataRows.filter(data => data.branchname.toUpperCase().includes(searchBranch.toUpperCase())).map(data => filteredRows.push(data))
            // console.log(branch);
            // filteredRows.push(branch);
        }
        if (checkList.includes("searchApprover")) {
            DataRows.filter(data => data.approverName.toUpperCase().includes(searchApprover.toUpperCase())).map(data => filteredRows.push(data));
            // console.log(app);
            // filteredRows.push(app);
        }
        console.log(filteredRows);
        let updatedRows = [...new Set(filteredRows)];
        console.log(updatedRows);
        // tableRows = [];
        // setTableRows([]);
        // setTableRows(updatedRows);
    }

    const clearFilterHandler = () => {
        // setTableRows([]);
        // setTableRows(DataRows);
    }






    // console.log(DataRows)
    return (
        <div>
            {/* <AppSidebar /> */}
            <div className="wrapper d-flex flex-column min-vh-100 bg-light">
                <AppHeader2 />
                <div className="body flex-grow-1 px-3">
                    <CRow className="py-2 justify-content-between">
                        <CCol md={6} className="align-self-start align-items-center justify-content-center"><h2>CREATE | VIEW | DELETE - APPROVAL</h2></CCol>
                        <CCol md={2} className="align-self-end align-items-center justify-content-center"><Link to="/approvalform"><CButton color="primary">+ CREATE NEW APPROVAL</CButton></Link></CCol>
                    </CRow>
                    <hr />
                    <CContainer fluid className="justify-content-between">
                        <CRow>
                            <CCol className=" col-sm-4 col-md-2 filter ">
                                FILTER BAR
                                <hr />
                                <CRow>
                                    <CRow>
                                        <CFormCheck id="flexCheckDefault" label="By Position" value="searchPosition" onChange={changeValueHandler} />
                                        <CRow>
                                            <input className="input" type="text" placeholder="enter position" onChange={positionSearchHandler} />
                                        </CRow>
                                    </CRow>
                                    <hr />
                                    <CRow>
                                        <CFormCheck id="flexCheckDefault" label="By Heirarchy" value="searchHeirarchy" onChange={changeValueHandler} />
                                        <CRow>
                                            <input className="input" type="text" placeholder="enter heirarchy " onChange={heirarchySearchHandler} />
                                            {/* <Select
                                                className="select"
                                            // onChange={heirarchySearchHandler}
                                            /> */}
                                        </CRow>
                                    </CRow>
                                    <hr />
                                    <CRow>
                                        <CFormCheck id="flexCheckDefault" label="By Branch" value="searchBranch" onChange={changeValueHandler} />
                                        <CRow>
                                            <input className="input" type="text" placeholder="enter branch" onChange={branchSearchHandler} />
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
                                        <CFormCheck id="flexCheckDefault" label="By Approver" value="searchApprover" onChange={changeValueHandler} />
                                        <CRow>
                                            <input className="input" type="text" placeholder="enter approver" onChange={approverSearchHandler} />
                                        </CRow>
                                    </CRow>
                                    <CRow className="mt-4">
                                        <CCol className="col-sm-4 mx-3">
                                            <CButton shape="rounded-pill" onClick={filterHandler}>APPLY</CButton>
                                        </CCol>
                                        {/* <CCol className="col-sm-4"></CCol> */}
                                        <CCol className="col-sm-4 mx-3" >
                                            <CButton onClick={clearFilterHandler} shape="rounded-pill" color="danger">CLEAR</CButton>
                                        </CCol>
                                    </CRow>
                                </CRow>
                            </CCol>

                            <CCol className="col-sm-8 col-md-10 ">
                                <CContainer fluid >
                                    <MDBDataTableV5 hover bordered
                                        entriesOptions={[5, 20, 25]} entries={5} pagesAmount={4} scrollX data={widerData} fullPagination />
                                </CContainer>
                            </CCol>
                        </CRow>
                    </CContainer>
                </div>
                <AppFooter />
            </div>
        </div>
    );
}
export default Approval;
