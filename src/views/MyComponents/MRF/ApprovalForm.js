import React, { useState, useReducer, useEffect } from 'react';
import { AppContent, AppSidebar, AppFooter, AppHeader, AppHeader2 } from '../../../components/index'
import {
    CButton, CCol, CForm, CFormControl, CRow, CFormLabel, CFormSelect
} from '@coreui/react';
import endPoints from "../../../utils/EndPointApi";
import "../Approval/Approval.css";
import Select from 'react-select';
import CreatableSelect from 'react-select/creatable';
import { useStateValue } from "../../../StateProvider";
import { IoIosArrowBack } from "react-icons/io";
import { Link } from 'react-router-dom';
import { MdDelete } from "react-icons/md";
import { BsPersonPlusFill } from "react-icons/bs";
// import { filter } from 'core-js/core/array';







function ApprovalForm(props) {
    const [reducerState, dispatch] = useStateValue()
    const [heirarchy, setHeirarchy] = React.useState("");

    const [isLoading, setIsLoading] = useState();
    const [heirarchyList, setHeirarchyList] = React.useState([]);
    const [BranchData, setBranchData] = React.useState([]);
    const [Approvers, setApprovers] = React.useState([]);


    const token = JSON.parse(sessionStorage.getItem("token"));
    const approverTemplate = {};




    const [position, setPosition] = useState("");
    const [cooling, setCooling] = useState();
    const [tat, setTAT] = useState();
    const [heirarchydata, setHeirarchyData] = useState("");
    const [branch, setBranch] = useState("");
    const [approver, setApprover] = useState("");
    const [selectApprover, setSelectApprover] = useState([approverTemplate]);

    // if (position) { localStorage.setItem("position", position) }

    const addApprover = () => {
        setSelectApprover([...selectApprover, approverTemplate]);

    }
    const deleteApprover = (index) => {
        const filteredApprover = [...selectApprover];
        filteredApprover.splice(index, 1);
        setSelectApprover(filteredApprover);
        console.log(filteredApprover);
    }

    const onChangeApprover = (e, index) => {
        const updatedApprover = selectApprover.map((approver, i) =>
            index == i ? Object.assign(approver, { "_id": e.value }) : approver);
        setSelectApprover(updatedApprover);
        console.log(selectApprover);
        console.log(updatedApprover);
    }


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
    // console.log("branchNameOptions", branchNameOptions)

    const ApproverNameOptions = []
    {
        Approvers?.map(user => {
            ApproverNameOptions.push({ label: user.name.firstName + " " + user.name.lastName, value: user._id })
        })
    }
    // console.log("ApproverNameOptions", ApproverNameOptions)


    async function showHeirarchyData(url) {
        // console.log("in show data")
        setIsLoading(true)
        const response = await fetch(url, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': token
            },
        });
        const Data = await response.json();
        setIsLoading(false)
        // console.log(Data);
        return Data
    }

    async function showBranchData(url) {
        // console.log("in show data")
        setIsLoading(true)
        const response = await fetch(url, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': token
            },
        });
        const Data1 = await response.json();
        setIsLoading(false)
        // console.log(Data1);
        return Data1
    }

    async function showApprovers(url) {
        // console.log("in show users")
        setIsLoading(true)
        const response = await fetch(url, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': token
            },
        });
        const Data2 = await response.json();
        setIsLoading(false)
        // console.log(Data2);
        return Data2
    }
    async function postData(url, data) {
        console.log("in post data")
        // setIsLoading(true)
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': token
            },
            body: JSON.stringify(data)
        });
        const Data3 = await response.json();
        // console.log(Data3);
        // setIsLoading(false)
        return Data3
    }

    useEffect(() => {
        showHeirarchyData(endPoints.searchHierarchy).then(Data => setHeirarchyList(Data));
        showBranchData(endPoints.searchBranch).then(Data1 => {
            setBranchData(Data1)
            // console.log(BranchData);
        });
        showApprovers(endPoints.searchUser).then(Data2 => {
            setApprovers(Data2)
            // console.log(Approvers);

        });
    }, [])


    const positionChangeHandler = (event) => {
        setPosition(event.target.value);
    }
    const CoolingPeriodChangeHandler = (event) => {
        setCooling(event.target.value);
    }
    const TATChangeHandler = (event) => {
        setTAT(event.target.value);
    }


    const hiearchyNameChangeHandler = (event) => {
        setHeirarchyData(event.value);

    }
    const BranchChangeHandler = (event) => {
        setBranch(event.value);

    }
    // const ApproverChangeHandler = (event) => {
    //     console.log(event);
    //     setApprover(event);

    // }
    const approver_id = [];
    for (var i = 0; i < approver.length; i++) {

        approver_id.push({
            _id: approver[i].value
        });
        console.log(approver_id);
    }


    const formSubmitHandler = (event) => {
        event.preventDefault()
        const newEmp = {
            position: position,
            coolingPeriod: parseInt(cooling),
            tat: parseInt(tat),
            hierarchyID: heirarchydata,
            branchID: branch,
            approversID: selectApprover,

        }
        // console.log(newEmp.TAT);
        console.log(newEmp)
        postData(endPoints.addApprovalMatrix, newEmp).then(Data => { console.log(Data) });
        event.target.reset()
    }













    return (
        <div>
            {/* <AppSidebar /> */}
            <div className="wrapper d-flex flex-column min-vh-100 bg-light">
                <AppHeader2 />
                <div className="body flex-grow-1 px-3 ">
                    <CRow className="pt-2 justify-content-between bg-light">
                        <CCol md={6} className="d-flex align-self-start align-items-center"><Link to="/approval"><CButton color="light"><IoIosArrowBack /></CButton></Link><h3>ADD APPROVAL</h3></CCol>
                        <CForm onSubmit={formSubmitHandler} className="form bg-white">
                            <h4><b>Position </b></h4>
                            <CRow className="mb-3">
                                <CFormLabel htmlFor="pos_id" className="col-sm-2 col-form-label">Position Name :</CFormLabel>
                                <CCol sm="4">
                                    <div className="col-sm-12">
                                        <CFormControl
                                            type="text"
                                            // value={finalData.position}
                                            onChange={positionChangeHandler}
                                            required
                                        />
                                    </div>
                                </CCol>
                            </CRow>
                            <br />
                            <h4><b>Position Details</b></h4>
                            <CRow className="mb-3">
                                <CFormLabel className="col-sm-2 col-form-label" htmlFor="h_type">
                                    Hierarchy Type:
                                </CFormLabel>
                                <CCol className="col-sm-4">
                                    <CFormSelect id="hirearchy_type" required
                                        onChange={(e) => { setHeirarchy(e.target.value); }}>
                                        <option>Choose...</option>
                                        <option value="Department">Department</option>
                                        <option value="Sub-Department">Sub-Department</option>
                                        <option value="Team">Team</option>
                                        <option value="Management">Management</option>
                                    </CFormSelect>
                                </CCol>

                                <CFormLabel htmlFor="h_name" className="col-sm-2 col-form-label">
                                    Hierarchy Name :
                                </CFormLabel>
                                <CCol className="col-sm-4">
                                    <Select
                                        placeholder={heirarchy}
                                        options={hierarchyNameOptions.filter(hierarchy => hierarchy.type == heirarchy)}
                                        isSearchable
                                        // isClearable
                                        onChange={hiearchyNameChangeHandler}
                                    />
                                </CCol>
                            </CRow>
                            <CRow className="mb-3">

                                <CFormLabel htmlFor="location" className="col-sm-2 col-form-label">Branch Name :</CFormLabel>
                                <CCol className="col-sm-4">
                                    <Select
                                        options={branchNameOptions}
                                        isSearchable
                                        // isClearable
                                        onChange={BranchChangeHandler}
                                        required
                                    />
                                </CCol>


                            </CRow>
                            <br />
                            <h4><b>Approver Details</b></h4>
                            <CRow className="mb-3">
                                <CFormLabel htmlFor="pos_id" className="col-sm-2 col-form-label">Cooling Period :</CFormLabel>
                                <CCol sm="10" lg="6">
                                    <div className="col-sm-12">
                                        <CFormControl type="number"
                                            onChange={CoolingPeriodChangeHandler}
                                            required />
                                    </div>
                                </CCol>
                            </CRow>
                            <CRow className="mb-3">
                                <CFormLabel className="col-sm-2 col-form-label">TAT :</CFormLabel>
                                <CCol sm="10" lg="6">
                                    <div className="col-sm-12">
                                        <CFormControl type="number"
                                            onChange={TATChangeHandler}
                                            required />
                                    </div>
                                </CCol>
                            </CRow>
                            <CRow className="mb-3">
                                <CFormLabel className="col-sm-2 col-form-label">Approvers</CFormLabel>

                                <CCol sm="10" lg="6">
                                    {selectApprover.map((approver, index) => (

                                        <CRow key={index}>
                                            <CCol sm="3" lg="2" className="my-2">
                                                <CFormLabel >Approver-{index + 1}:</CFormLabel>
                                            </CCol>
                                            <CCol sm="7" lg="9">
                                                <Select
                                                    name="approver"
                                                    options={ApproverNameOptions}
                                                    isSearchable
                                                    required
                                                    onChange={e => onChangeApprover(e, index)}
                                                />
                                            </CCol>
                                            <CCol sm="2" lg="1">
                                                <div className="my-2">

                                                    <MdDelete size={23} className="mx-1 remove" onClick={() => deleteApprover(index)} />
                                                </div>
                                            </CCol>

                                        </CRow>


                                    ))}
                                    <div className="my-3 center">
                                        <CButton size="sm" shape="rounded-pill" onClick={addApprover}><BsPersonPlusFill size={15} className="mb-1 mx-1" />  Add Approver</CButton>

                                    </div>

                                </CCol>





                            </CRow>
                            <hr />
                            {/* <CCol className="mb-2">
                                <CreatableSelect
                                    isMulti
                                    onChange={ApproverChangeHandler}
                                    options={ApproverNameOptions}
                                    ActionTypes='clear-option'
                                />
                            </CCol> */}
                            <div className="center mt-3 mb-3">
                                <CButton type="submit" size="lg" >Submit</CButton>
                            </div>


                        </CForm>
                    </CRow>

                </div>
                <AppFooter />
            </div>
        </div>
    );
}
export default ApprovalForm;