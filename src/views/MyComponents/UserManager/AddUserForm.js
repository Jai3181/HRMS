import React, { useState, useReducer, useEffect } from 'react';
import "./AddUserForm.css"
import endPoints from 'src/utils/EndPointApi';
import {
    CButton, CCol, CForm, CFormControl, CRow, CFormLabel, CFormSelect, CFormCheck, CContainer,
    CSpinner, CModal, CModalHeader, CModalFooter, CModalTitle, CModalBody,
} from '@coreui/react'
import Select from 'react-select';
import { MDBDataTableV5 } from 'mdbreact';
import { useStateValue } from "../../../StateProvider"
// import SelectSearch, { fuzzySearch } from 'react-select-search';
// import { AiOutlineMinusCircle } from "react-icons/ai";
// import { GrView } from "react-icons/gr";

const InitialFormState = {
    fName: "",
    lName: "",
    uType: "",
    uRole: { label: undefined },
    access: {},
    hType: "",
    hName: "",
    jType: "",
    gender: "",
    diversity: "",
    email: "",
    designation: "",
    location: "",
    BID: ""
}

const formReducer = (formState, action) => {
    switch (action.type) {
        case "FNAME_INPUT":
            return {
                ...formState,
                fName: action.val
            }
        case "LNAME_INPUT":
            return {
                ...formState,
                lName: action.val
            }
        case "SELECT_UTYPE":
            return {
                ...formState,
                uType: action.val
            }
        case "SELECT_UROLE":
            return {
                ...formState,
                uRole: action.val
            }
        // case "CHANGE_ACCESS":
        //     return {
        //         ...formState,
        //         access: {
        //             ...formstate.access, 
        //             action.val
        //         }
        //     }
        case "HTYPE_INPUT":
            return {
                ...formState,
                hType: action.val
            }
        case "HNAME_INPUT":
            return {
                ...formState,
                hName: action.val
            }
        case "JTYPE_INPUT":
            return {
                ...formState,
                jType: action.val
            }
        case "GENDER_INPUT":
            return {
                ...formState,
                gender: action.val
            }
        case "DIVERSITY_INPUT":
            return {
                ...formState,
                diversity: action.val
            }
        case "EMAIL_INPUT":
            return {
                ...formState,
                email: action.val
            }
        case "DESIGNATION_INPUT":
            return {
                ...formState,
                designation: action.val
            }
        case "LOCATION_INPUT":
            return {
                ...formState,
                location: action.val
            }
        case "BID_INPUT":
            return {
                ...formState,
                BID: action.val
            }
        default: return formState
    }
}

function AddUserForm(props) {
    const [filterBy, setFilter] = useState("fName")
    const [clicked, setClicked] = useState()
    const [ViewUserFormState, setForm1] = useState()
    let selectedUser = ""
    // const [selectedUser, setSelectedUser] = useState("")
    const [searchedItem, setSearchedItem] = useState()
    const [visible, setVisible] = useState(false)
    const [visible2, setVisible2] = useState(false)
    const [isLoading, setIsLoading] = useState()
    const [userList, setUserList] = useState([])
    const [hierarchyList, setHierarchyList] = useState()
    const [branchList, setBranchList] = useState()
    const [userProfile, setUserProfile] = useState()
    const [currentUserRole, setCurrentUserRole] = useState()
    const [objAccess, setObjAccess] = useState({})
    const [formState, dispatchForm] = useReducer(formReducer, InitialFormState)
    const [reducerState, dispatch] = useStateValue()
    const token = JSON.parse(sessionStorage.getItem("token"));

    const clearHandler = (event) => {
        console.log("search cleared")
        setSearchedItem("")
        setFilter("")
        showData(endPoints.searchUser)
            .then(Data => {
                setUserList(Data)
            })
    }
    const searchInputChangeHandler = (event) => {
        setSearchedItem(event.target.value)
    }
    const selectedFilterByHandler = (event) => {
        setFilter(event.target.value)
    }
    const searchFormHandler = (event) => {
        event.preventDefault()
        console.log("searching by : ", filterBy, searchedItem, userList)
        let list = userList.filter(user => user.name.firstName.toUpperCase().includes(searchedItem.toUpperCase()))
        switch (filterBy) {
            case "name.fName":
                list = userList.filter(user => user.name.firstName.toUpperCase().includes(searchedItem.toUpperCase()))
                setUserList(list)
                break;
            case "uType":
                list = userList.filter(user => user.userType.toUpperCase().includes(searchedItem.toUpperCase()))
                setUserList(list)
                break;
            case "uRole":
                list = userList.filter(user => user.userRole.toUpperCase().includes(searchedItem.toUpperCase()))
                setUserList(list)
                break;
            case "jType":
                list = userList.filter(user => user.jobType.toUpperCase().includes(searchedItem.toUpperCase()))
                setUserList(list)
                break;
            case "hierarchy.hType":
                list = userList.filter(user => user.hierarchyID.type.toUpperCase().includes(searchedItem.toUpperCase()))
                setUserList(list)
                break;
            case "hierarchy.hName":
                list = userList.filter(user => user.hierarchyID.name.toUpperCase().includes(searchedItem.toUpperCase()))
                setUserList(list)
                break;
            case "diversity":
                list = userList.filter(user => user.diversity.toUpperCase().includes(searchedItem.toUpperCase()))
                setUserList(list)
                break;
            case "location":
                list = userList.filter(user => user.branchID.location.toUpperCase().includes(searchedItem.toUpperCase()))
                setUserList(list)
                break;
            case "email":
                list = userList.filter(user => user.email.toUpperCase().includes(searchedItem.toUpperCase()))
                setUserList(list)
                break;
            case "BID":
                list = userList.filter(user => user.branchID.name.toUpperCase().includes(searchedItem.toUpperCase()))
                setUserList(list)
                break;
        }
    }

    const fNameChangeHandler = (event) => {
        dispatchForm({ type: "FNAME_INPUT", val: event.target.value })
    };
    const lNameChangeHandler = (event) => {
        dispatchForm({ type: "LNAME_INPUT", val: event.target.value })
    };
    const selectedUserTypeHandler = (event) => {
        dispatchForm({ type: "SELECT_UTYPE", val: event.target.value })
    }
    const selectedUserRoleHandler = (event) => {
        console.log("changeddd")
        dispatchForm({ type: "SELECT_UROLE", val: event })
        setCurrentUserRole(event)
        if (event.label != "Special") {
            setObjAccess(userProfile?.filter(item => item.role == event.label)[0].access)
            console.log(objAccess)
        }
    }
    const hirearchyTypeChangeHandler = (event) => {
        dispatchForm({ type: "HTYPE_INPUT", val: event.target.value })
    }
    const hiearchyNameChangeHandler = (event) => {
        dispatchForm({ type: "HNAME_INPUT", val: event.value })
    }
    const choosenJobTypeHandler = (event) => {
        dispatchForm({ type: "JTYPE_INPUT", val: event.target.value })
    }
    const genderHandler = (event) => {
        dispatchForm({ type: "GENDER_INPUT", val: event.target.value })
    }
    const diversityHandler = (event) => {
        dispatchForm({ type: "DIVERSITY_INPUT", val: event.target.value })
    }
    const emailChangeHandler = (event) => {
        dispatchForm({ type: "EMAIL_INPUT", val: event.target.value })
    };
    const designationChangeHandler = (event) => {
        dispatchForm({ type: "DESIGNATION_INPUT", val: event.target.value })
    }
    const locationChangeHandler = (event) => {
        dispatchForm({ type: "LOCATION_INPUT", val: event.value })
    };
    const branchIDHandler = (event) => {
        dispatchForm({ type: "BID_INPUT", val: event.value })
        console.log(event.value)
    };


    const formSubmitHandler = (event) => {
        event.preventDefault()
        let newEmp = {}
        console.log("formState.uRole.label::::", formState.uRole.label)
        if (formState.uRole.label != "Special") {
            newEmp = {
                name: {
                    firstName: formState.fName,
                    lastName: formState.lName,
                },
                userType: formState.uType,
                userRole: {
                    name: formState.uRole.label,
                    _id: formState.uRole.value
                },
                hierarchyID: formState.hName,
                gender: formState.gender,
                designation: formState.designation,
                jobType: formState.jType,
                diversity: formState.diversity,
                email: formState.email,
                location: formState.location,
                branchID: formState.BID
            }
        }
        else {
            newEmp = {
                name: {
                    firstName: formState.fName,
                    lastName: formState.lName,
                },
                userType: formState.uType,
                userRole: {
                    name: formState.uRole.label,
                },
                access: objAccess,
                hierarchyID: formState.hName,
                gender: formState.gender,
                designation: formState.designation,
                jobType: formState.jType,
                diversity: formState.diversity,
                email: formState.email,
                location: formState.location,
                branchID: formState.BID
            }
        }
        console.log("adding new emp ::::::::::::::::::::::::::: ", newEmp)
        postData(endPoints.addUser, newEmp)
            .then(data => {
                console.log(data)
                if (data.Success === true) {
                    showData(endPoints.searchUser)
                        .then(Data => {
                            setUserList(Data)
                        })
                }
            })
        event.target.reset()
    }

    const deleteUserHandler = (event) => {
        const delUser = {
            _id: event.target.id
        }
        console.log("deleting user: ", delUser)
        removeData(endPoints.removeUser, delUser)
            .then(data => {
                if (data.Success === true) {
                    showData(endPoints.searchUser)
                        .then(Data => {
                            setUserList(Data)
                        })
                }
            })
    }
    const viewUserHandler = (event) => {
        setClicked(true)
        const et = event.target.id
        console.log("viewUserHandler Event.target.id: ", et)
        selectedUser = userList.filter(user => user._id == et)
        console.log("user selected to view", selectedUser)
        let userAccess = ""
        if (selectedUser[0].userRole.name != "Special") {
            userAccess = userProfile?.filter(item => item.role == selectedUser[0].userRole.name)[0].access
        }
        else {
            userAccess = selectedUser[0].access
        }

        const selectedUserRole = {
            label: selectedUser[0].userRole.name,
            value: selectedUser[0].userRole._id
        }
        console.log("selectedUserRole", selectedUserRole)

        const selectedBranchLocation = {
            label: selectedUser[0].branchID.location,
            value: selectedUser[0].branchID.location
        }
        console.log("selectedBranchLocation", selectedBranchLocation)

        const selectedBranchName = {
            label: selectedUser[0].branchID.name,
            value: selectedUser[0].branchID._id,
            location: selectedUser[0].branchID.location
        }
        console.log("selectedBranchName", selectedBranchName)

        const selectedUserhName = {
            label: selectedUser[0].hierarchyID.name,
            value: selectedUser[0].hierarchyID._id
        }

        form1 = {
            fName: selectedUser[0].name.firstName,
            lName: selectedUser[0].name.lastName,
            uType: selectedUser[0].userType,
            uRole: selectedUserRole,
            access: userAccess,
            hType: selectedUser[0].hierarchyID.type,
            hName: selectedUserhName,
            jType: selectedUser[0].jobType,
            gender: selectedUser[0].gender,
            diversity: selectedUser[0].diversity,
            email: selectedUser[0].email,
            designation: selectedUser[0].designation,
            location: selectedBranchLocation,
            BID: selectedBranchName
        }
        setForm1(form1)
        setVisible2(!visible)
        // if (et.tagName == "BUTTON") {
        //     setSelectedUser(event.target.id)
        //     console.log("selected user: ", event.target.id)
        //     setVisible2(!visible)
        // }
        // else {
        //     setSelectedUser(event.target.className.baseVal)
        //     console.log("selected user: ", event.target.className.baseVal)
        //     setVisible2(!visible)
        // }
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
        const Data = await response.json();
        // setIsLoading(false)
        return Data
    }
    async function showData(url) {
        console.log("in show data")
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
    async function removeData(url, data) {
        console.log("in remove data")
        // setIsLoading(true)
        const response = await fetch(url, {
            method: 'DELETE',
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
    useEffect(() => {
        console.log("in use effect")
        showData(endPoints.searchUser)
            .then(Data => {
                console.log("userList:", Data)
                setUserList(Data)
            })
        showData(endPoints.searchHierarchy)
            .then(Data => {
                console.log("hierarchyList:", Data)
                setHierarchyList(Data)
            })
        showData(endPoints.searchBranch)
            .then(Data => {
                console.log("branchList:", Data)
                setBranchList(Data)
            })
        showData(endPoints.searchUserProfile)
            .then(Data => {
                console.log("userProfile:", Data)
                setUserProfile(Data)
            })
    }, [])


    const userRoleOptions = []
    if (userProfile) {
        {
            userProfile?.map(profile => {
                userRoleOptions.push({ label: profile.role, value: profile._id })
            })
        }
        console.log("userRoleOptions", userRoleOptions)
    }

    const branchNameOptions = []
    if (branchList) {
        {
            branchList?.map(branch => {
                branchNameOptions.push({ label: branch.name, value: branch._id, location: branch.location })
            })
        }
        console.log("branchNameOptions", branchNameOptions)
    }

    const branchLocationOptions = []
    if (branchList) {
        let branchLocationObject = new Set()
        {
            branchList?.map(branch => {
                branchLocationObject.add(branch.location)
            })
        }
        {
            for (let branch of branchLocationObject) {
                branchLocationOptions.push({ label: branch, value: branch })
            }
        }
        console.log("branchLocationOptions after", branchLocationOptions)
    }

    const hierarchyNameOptions = []
    if (hierarchyList) {
        {
            hierarchyList?.map(hierarchy => {
                hierarchyNameOptions.push({ label: hierarchy.name, value: hierarchy._id, type: hierarchy.type })
            })
        }
        console.log("hierarchyNameOptions", hierarchyNameOptions)
    }

    const tableRows = []
    if (userList.length > 0) {
        {
            userList?.map(user => {
                tableRows.push({
                    // removeButton: <button className="remove_button" onClick={deleteUserHandler}><AiOutlineMinusCircle className={user._id} /></button>,
                    removeButton: <CButton variant="ghost" color="danger" size="sm" className="icon3" onClick={deleteUserHandler} id={user._id} >Delete</CButton>,
                    // showButton: <button className="remove_button" id={user._id} onClick={viewUserHandler}><GrView className={user._id} /></button>,
                    showButton: <CButton variant="ghost" color="primary" size="sm" className="icon3" onClick={viewUserHandler} id={user._id} >View</CButton>,
                    full_name: user.name.firstName + " " + user.name.lastName,
                    // first_name: user.name.firstName,
                    // last_name: user.name.lastName,
                    user_type: user.userType,
                    user_role: user.userRole.name,
                    hierarchy: user.hierarchyID.type + "," + user.hierarchyID.name,
                    // hierarchy_type: user.hierarchyID.type,
                    // hierarchy_name: user.hierarchyID.name,
                    job_type: user.jobType,
                    diversity: user.diversity,
                    email: user.email,
                    designation: user.designation,
                    branch: user.branchID.location + "," + user.branchID.name,
                })
            })
        }
    }

    const dataTable = {
        columns: [
            {
                label: '',
                field: 'removeButton',
                width: 50,
            },
            {
                label: '',
                field: 'showButton',
                width: 50,
            },
            {
                label: 'Full Name',
                field: 'full_name',
                sort: 'disabled',
                width: 200,
            },
            {
                label: 'User Type',
                field: 'user_type',
                sort: 'disabled',
                width: 100,
            },
            {
                label: 'User Role',
                field: 'user_role',
                sort: 'disabled',
                width: 100,
            },
            {
                label: 'Hierarchy',
                field: 'hierarchy',
                sort: 'disabled',
                width: 250,
            },
            {
                label: 'Job Type',
                field: 'job_type',
                sort: 'disabled',
                width: 100,
            },
            {
                label: 'Diversity',
                field: 'diversity',
                sort: 'disabled',
                width: 100,
            },
            {
                label: 'Email Address',
                field: 'email',
                sort: 'disabled',
                width: 200,
            },
            {
                label: 'Designation',
                field: 'designation',
                sort: 'disabled',
                width: 200,
            },
            {
                label: 'Branch',
                field: 'branch',
                sort: 'disabled',
                width: 250,
            },
        ],
        rows: tableRows
    }

    const modalCloseHandler = () => {
        setVisible(false)
        setCurrentUserRole(undefined)
    }
    const modal2CloseHandler = () => {
        setVisible2(false)
    }

    const accessChangeHandler = (event) => {
        setObjAccess({
            ...objAccess,
            [event.target.id]: event.target.checked
        }
        )
        dispatchForm({ type: "SELECT_UROLE", val: { label: "Special", value: "Special" } })
        setCurrentUserRole({ label: "Special", value: "Special" })
    }
    console.log(formState)
    let form1 = {}
    return (
        <CContainer>
            <CRow className="mb-3">
                <CForm onSubmit={searchFormHandler}>
                    <CRow>
                        <CFormLabel htmlFor="SearchBar" className="col-sm-1 col-form-label align-items-center">
                            <h4><b>Search:</b></h4>
                        </CFormLabel>
                        <CCol sm="2">
                            <CFormSelect id="searchBy" onChange={selectedFilterByHandler} value={filterBy} required>
                                <option>search by...</option>
                                <option value="name.fName">First Name</option>
                                <option value="uType">User Type</option>
                                <option value="uRole">User Role</option>
                                <option value="jType">Job Type</option>
                                <option value="hierarchy.hType">Hierarchy</option>
                                <option value="hierarchy.hName">Hierarchy name</option>
                                <option value="diversity">Diversity</option>
                                <option value="email">Email address</option>
                                <option value="location">Branch Location</option>
                                <option value="BID">Branch Name</option>
                            </CFormSelect>
                        </CCol>
                        <CCol sm="5">
                            <CFormControl
                                value={searchedItem}
                                type="text"
                                id="SearchBar"
                                placeholder="search field"
                                onChange={searchInputChangeHandler}
                                required
                            />
                        </CCol>
                        <CCol md={1} className="searchBar">
                            <CButton type="submit" color="success">Search</CButton>
                        </CCol>
                        <CCol md={1} className="searchBar">
                            <CButton type="reset" onClick={clearHandler}>Clear</CButton>
                        </CCol>
                        <CCol md={2} className="add">
                            <CButton color="primary" onClick={() => setVisible(!visible)}>+ Add User</CButton>
                        </CCol>
                    </CRow>
                </CForm>
            </CRow>
            <MDBDataTableV5
                small
                hover
                // striped
                fullPagination
                entriesOptions={[5, 10, 20]}
                entries={5}
                // bordered
                scrollX
                searchTop={false}
                searchBottom={false}
                data={dataTable}
            />;
            <CModal size="xl" alignment="center" visible={visible} backdrop={true}>
                <CModalHeader onDismiss={modalCloseHandler}>
                    <CModalTitle>Add New User</CModalTitle>
                </CModalHeader>
                <CModalBody className="bg-light">
                    <CForm onSubmit={formSubmitHandler}>
                        <CRow className="mb-3">
                            <CFormLabel htmlFor="f_name" className="col-sm-2 col-form-label">
                                First Name
                            </CFormLabel>
                            <CCol sm="4">
                                <CFormControl
                                    type="text"
                                    id="f_name"
                                    onChange={fNameChangeHandler}
                                    required
                                />
                            </CCol>
                            <CFormLabel htmlFor="l_name" className="col-sm-2 col-form-label">
                                Last Name
                            </CFormLabel>
                            <CCol sm="4">
                                <CFormControl
                                    type="text"
                                    id="l_name"
                                    onChange={lNameChangeHandler}
                                    required
                                />
                            </CCol>
                        </CRow>
                        <CRow className="mb-3">
                            <CFormLabel className="col-sm-2 col-form-label" htmlFor="user_type">
                                User Type:
                            </CFormLabel>
                            <CCol sm="4">
                                <CFormSelect id="user_type" required onChange={selectedUserTypeHandler}>
                                    <option>Choose...</option>
                                    <option value="admin">admin</option>
                                    <option value="recruiter">recruiter</option>
                                    <option value="vendor">vendor</option>
                                    <option value="employee">employee</option>
                                    <option value="interviewer">interviewer</option>
                                </CFormSelect>
                            </CCol>
                            <CFormLabel className="col-sm-2 col-form-label" htmlFor="user_role">
                                User Role:
                            </CFormLabel>
                            <CCol sm="4">
                                <Select
                                    options={userRoleOptions}
                                    isSearchable
                                    // isClearable
                                    onChange={selectedUserRoleHandler}
                                    value={formState.uRole}
                                />
                            </CCol>
                        </CRow>
                        <CRow classname="mb-3">
                            {currentUserRole === undefined ? console.log("not yettttttttt") :
                                currentUserRole.label == "Special" ? Object.entries(objAccess).map(([key, value]) => {
                                    return (
                                        <CCol sm="3" key={key}>
                                            <CFormCheck id={key} label={key} defaultChecked={value} onChange={accessChangeHandler} />
                                        </CCol>
                                    )
                                }) : Object.entries((userProfile?.filter(item => item.role == currentUserRole.label))[0].access).map(([key, value]) => {
                                    return (
                                        <CCol sm="3" key={key}>
                                            <CFormCheck id={key} label={key} defaultChecked={value} onChange={accessChangeHandler} />
                                        </CCol>
                                    )
                                })}
                        </CRow>
                        <CRow className="mb-3">
                            <CFormLabel className="col-sm-2 col-form-label" htmlFor="hirearchy_type">
                                Hierarchy Type
                            </CFormLabel>
                            <CCol sm="4">
                                <CFormSelect id="hirearchy_type" required onChange={hirearchyTypeChangeHandler}>
                                    <option>Choose...</option>
                                    <option value="Department">Department</option>
                                    <option value="Sub-Department">Sub-Department</option>
                                    <option value="Team">Team</option>
                                    <option value="Management">Management</option>
                                </CFormSelect>
                            </CCol>
                            <CFormLabel className="col-sm-2 col-form-label" htmlFor="h_name">
                                Hierarchy Name
                            </CFormLabel>
                            <CCol sm="4">
                                <Select
                                    options={hierarchyNameOptions.filter(hierarchy => hierarchy.type == formState.hType)}
                                    isSearchable
                                    // isClearable
                                    onChange={hiearchyNameChangeHandler}
                                />
                            </CCol>
                        </CRow>
                        <CRow className="mb-3">
                            <CFormLabel className="col-sm-2 col-form-label" htmlFor="job_type">Job Type : </CFormLabel>
                            <CCol className="align-items-end">
                                <CFormCheck
                                    inline
                                    type="radio"
                                    name="job_type"
                                    id="job_type1"
                                    value="Internship"
                                    label="Internship"
                                    onChange={choosenJobTypeHandler}
                                    required
                                />
                                <CFormCheck
                                    inline
                                    type="radio"
                                    name="job_type"
                                    id="job_type2"
                                    value="Full-Time"
                                    label="Full-Time"
                                    onChange={choosenJobTypeHandler}
                                    required
                                />
                                <CFormCheck
                                    inline
                                    type="radio"
                                    name="job_type"
                                    id="job_type3"
                                    value="Temporary"
                                    label="Temporary"
                                    onChange={choosenJobTypeHandler}
                                    required
                                />
                            </CCol>
                            <CFormLabel className="col-sm-2 col-form-label" htmlFor="diversity">Diversity : </CFormLabel>
                            <CCol className="align-items-end">
                                <CFormCheck
                                    inline
                                    type="radio"
                                    name="diversity"
                                    id="diversity3"
                                    value="General"
                                    label="General"
                                    onChange={diversityHandler}
                                    required
                                />
                                <CFormCheck
                                    inline
                                    type="radio"
                                    name="diversity"
                                    id="diversity2"
                                    value="Female"
                                    label="Female"
                                    onChange={diversityHandler}
                                    required
                                />
                                <CFormCheck
                                    inline
                                    type="radio"
                                    name="diversity"
                                    id="diversity1"
                                    value="Physically Challenged"
                                    label="Physically Challenged"
                                    onChange={diversityHandler}
                                    required
                                />
                            </CCol>
                        </CRow>
                        <CRow classname="mb-3">
                            <CFormLabel className="col-sm-2 col-form-label" htmlFor="gender">Gender : </CFormLabel>
                            <CCol className="align-items-end">
                                <CFormCheck
                                    inline
                                    type="radio"
                                    name="gender"
                                    id="gender3"
                                    value="Male"
                                    label="Male"
                                    onChange={genderHandler}
                                    required
                                />
                                <CFormCheck
                                    inline
                                    type="radio"
                                    name="gender"
                                    id="gender2"
                                    value="Female"
                                    label="Female"
                                    onChange={genderHandler}
                                    required
                                />
                                <CFormCheck
                                    inline
                                    type="radio"
                                    name="gender"
                                    id="gender1"
                                    value="Others"
                                    label="Others"
                                    onChange={genderHandler}
                                    required
                                />
                            </CCol>
                        </CRow>
                        <CRow className="mb-3">
                            <CFormLabel htmlFor="email" className="col-sm-2 col-form-label">Email Address</CFormLabel>
                            <CCol sm="4">
                                <CFormControl
                                    type="email"
                                    id="email"
                                    placeholder=""
                                    required
                                    onChange={emailChangeHandler}
                                />
                            </CCol>
                            <CFormLabel htmlFor="designation" className="col-sm-2 col-form-label">Designation</CFormLabel>
                            <CCol sm="4">
                                <CFormControl
                                    type="text"
                                    id="designation"
                                    placeholder=""
                                    required
                                    onChange={designationChangeHandler}
                                />
                            </CCol>
                        </CRow>
                        <CRow className="mb-3">
                            <CFormLabel htmlFor="location" className="col-sm-2 col-form-label">Branch Location</CFormLabel>
                            <CCol sm="4">
                                <Select
                                    options={branchLocationOptions}
                                    isSearchable
                                    onChange={locationChangeHandler}
                                />
                            </CCol>
                            <CFormLabel className="col-sm-2 col-form-label" htmlFor="branchID">Branch Name</CFormLabel>
                            <CCol sm="4">
                                <Select
                                    options={branchNameOptions.filter(branch => branch.location == formState.location)}
                                    isSearchable
                                    onChange={branchIDHandler}
                                />
                            </CCol>
                        </CRow>
                        <br />
                        <CCol className="d-flex align-items-center justify-content-center">
                            <CButton type="submit" color="primary" onClick={modalCloseHandler}>Add Employee</CButton>
                        </CCol>
                    </CForm>
                </CModalBody>
                <CModalFooter>
                    <CButton color="secondary" onClick={modalCloseHandler}>Close</CButton>
                </CModalFooter>
            </CModal>
            <CModal size="xl" alignment="center" visible={visible2} backdrop={true}>
                <CModalHeader onDismiss={modal2CloseHandler}>
                    <CModalTitle>View/Edit Employee</CModalTitle>
                </CModalHeader>
                {console.log("selectedUser----------------", ViewUserFormState)}
                {console.log("selectedUser Access Permissions", clicked ? ViewUserFormState.access : "failed to recognise user")}
                {console.log("selectedUser----------------", selectedUser)}
                {console.log("selectedUser----------------", clicked)}
                <CModalBody className="bg-light">
                    <CForm onSubmit={formSubmitHandler}>
                        <CRow className="mb-3">
                            <CFormLabel htmlFor="f_name" className="col-sm-2 col-form-label">
                                First Name
                            </CFormLabel>
                            <CCol sm="4">
                                <CFormControl
                                    defaultValue={clicked ? ViewUserFormState.fName : ""}
                                    type="text"
                                    id="f_name"
                                    onChange={fNameChangeHandler}
                                    required
                                />
                            </CCol>
                            <CFormLabel htmlFor="l_name" className="col-sm-2 col-form-label">
                                Last Name
                            </CFormLabel>
                            <CCol sm="4">
                                <CFormControl
                                    defaultValue={clicked ? ViewUserFormState.lName : ""}
                                    type="text"
                                    id="l_name"
                                    onChange={lNameChangeHandler}
                                    required
                                />
                            </CCol>
                        </CRow>
                        <CRow className="mb-3">
                            <CFormLabel className="col-sm-2 col-form-label" htmlFor="user_type">
                                User Type:
                            </CFormLabel>
                            <CCol sm="4">
                                <CFormSelect id="user_type" required onChange={selectedUserTypeHandler}
                                    defaultValue={clicked ? ViewUserFormState.uType : ""}>
                                    <option>Choose...</option>
                                    <option value="admin">admin</option>
                                    <option value="recruiter">recruiter</option>
                                    <option value="vendor">vendor</option>
                                    <option value="employee">employee</option>
                                    <option value="interviewer">interviewer</option>
                                </CFormSelect>
                            </CCol>
                            <CFormLabel className="col-sm-2 col-form-label" htmlFor="user_role">
                                User Role:
                            </CFormLabel>
                            <CCol sm="4">
                                <Select
                                    options={userRoleOptions}
                                    isSearchable
                                    // isClearable
                                    onChange={selectedUserRoleHandler}
                                    value={clicked ? ViewUserFormState.uRole : ""}
                                />
                            </CCol>
                        </CRow>
                        <CRow classname="mb-3">
                            {
                                clicked ?
                                    Object.entries(ViewUserFormState.access).map(([key, value]) => {
                                        return (
                                            <CCol sm="3" key={key}>
                                                <CFormCheck id={key} label={key} defaultChecked={value} onChange={accessChangeHandler} />
                                            </CCol>
                                        )
                                    }) : "select a User Role to see it's access permissions"
                            }
                        </CRow>

                        <CRow className="mb-3">
                            <CFormLabel className="col-sm-2 col-form-label" htmlFor="hirearchy_type">
                                Hierarchy Type
                            </CFormLabel>
                            <CCol sm="4">
                                <CFormSelect id="hirearchy_type" required onChange={hirearchyTypeChangeHandler}
                                    // defaultValue={selectedUser ? (userList.filter((user) => user._id == selectedUser))[0].hierarchyID.type : ""}>
                                    defaultValue={clicked ? ViewUserFormState.hType : ""}>
                                    <option>Choose...</option>
                                    <option value="Department">Department</option>
                                    <option value="Sub-Department">Sub-Department</option>
                                    <option value="Team">Team</option>
                                    <option value="Management">Management</option>
                                </CFormSelect>
                            </CCol>
                            <CFormLabel className="col-sm-2 col-form-label" htmlFor="h_name">
                                Hierarchy Name
                            </CFormLabel>
                            <CCol sm="4">
                                <Select
                                    options={hierarchyNameOptions.filter(hierarchy => hierarchy.type == formState.hType)}
                                    isSearchable
                                    // isClearable
                                    onChange={hiearchyNameChangeHandler}
                                    value={clicked ? ViewUserFormState.hName : ""}
                                />
                            </CCol>
                        </CRow>
                        <CRow className="mb-3">
                            <CFormLabel className="col-sm-2 col-form-label" htmlFor="job_type">Job Type : </CFormLabel>
                            <CCol className="align-items-end">
                                <CFormCheck
                                    // defaultChecked={selectedUser ? ((userList.filter((user) => user._id == selectedUser))[0].jobType == "Internship" ? true : false) : false}
                                    defaultChecked={clicked ? (ViewUserFormState.jType == "Internship" ? true : false) : false}
                                    inline
                                    type="radio"
                                    name="job_type"
                                    id="job_type1"
                                    value="Internship"
                                    label="Internship"
                                    onChange={choosenJobTypeHandler}
                                    required
                                />
                                <CFormCheck
                                    // defaultChecked={selectedUser ? ((userList.filter((user) => user._id == selectedUser))[0].jobType == "Full-Time" ? true : false) : false}
                                    defaultChecked={clicked ? (ViewUserFormState.jType == "Full-Time" ? true : false) : false}
                                    inline
                                    type="radio"
                                    name="job_type"
                                    id="job_type2"
                                    value="Full-Time"
                                    label="Full-Time"
                                    onChange={choosenJobTypeHandler}
                                    required
                                />
                                <CFormCheck
                                    // defaultChecked={selectedUser ? ((userList.filter((user) => user._id == selectedUser))[0].jobType == "Temporary" ? true : false) : false}
                                    defaultChecked={clicked ? (ViewUserFormState.jType == "Temporary" ? true : false) : false}
                                    inline
                                    type="radio"
                                    name="job_type"
                                    id="job_type3"
                                    value="Temporary"
                                    label="Temporary"
                                    onChange={choosenJobTypeHandler}
                                    required
                                />
                            </CCol>

                            <CFormLabel className="col-sm-2 col-form-label" htmlFor="diversity">Diversity : </CFormLabel>
                            <CCol className="align-items-end">
                                <CFormCheck
                                    defaultChecked={clicked ? (ViewUserFormState.diversity == "General" ? true : false) : false}
                                    inline
                                    type="radio"
                                    name="diversity"
                                    id="diversity3"
                                    value="General"
                                    label="General"
                                    onChange={diversityHandler}
                                    required
                                />
                                <CFormCheck
                                    defaultChecked={clicked ? (ViewUserFormState.diversity == "Female" ? true : false) : false}
                                    inline
                                    type="radio"
                                    name="diversity"
                                    id="diversity2"
                                    value="Female"
                                    label="Female"
                                    onChange={diversityHandler}
                                    required
                                />
                                <CFormCheck
                                    defaultChecked={clicked ? (ViewUserFormState.diversity == "Physically Challenged" ? true : false) : false}
                                    inline
                                    type="radio"
                                    name="diversity"
                                    id="diversity1"
                                    value="Physically Challenged"
                                    label="Physically Challenged"
                                    onChange={diversityHandler}
                                    required
                                />
                            </CCol>

                        </CRow>
                        <CRow classname="mb-3">
                            <CFormLabel className="col-sm-2 col-form-label" htmlFor="gender">Gender : </CFormLabel>
                            <CCol className="align-items-end">
                                <CFormCheck
                                    defaultChecked={clicked ? (ViewUserFormState.gender == "Male" ? true : false) : false}
                                    inline
                                    type="radio"
                                    name="gender"
                                    id="gender3"
                                    value="Male"
                                    label="Male"
                                    onChange={genderHandler}
                                    required
                                />
                                <CFormCheck
                                    defaultChecked={clicked ? (ViewUserFormState.gender == "Female" ? true : false) : false}
                                    inline
                                    type="radio"
                                    name="gender"
                                    id="gender2"
                                    value="Female"
                                    label="Female"
                                    onChange={genderHandler}
                                    required
                                />
                                <CFormCheck
                                    defaultChecked={clicked ? (ViewUserFormState.gender == "Others" ? true : false) : false}
                                    inline
                                    type="radio"
                                    name="gender"
                                    id="gender1"
                                    value="Others"
                                    label="Others"
                                    onChange={genderHandler}
                                    required
                                />
                            </CCol>
                        </CRow>
                        <CRow className="mb-3">

                            <CFormLabel htmlFor="email" className="col-sm-2 col-form-label">Email Address</CFormLabel>
                            <CCol sm="4">
                                <CFormControl
                                    defaultValue={clicked ? ViewUserFormState.email : ""}
                                    type="email"
                                    id="email"
                                    placeholder=""
                                    required
                                    onChange={emailChangeHandler}
                                />
                            </CCol>
                            <CFormLabel htmlFor="designation" className="col-sm-2 col-form-label">Designation</CFormLabel>
                            <CCol sm="4">
                                <CFormControl
                                    defaultValue={clicked ? ViewUserFormState.designation : ""}
                                    type="text"
                                    id="designation"
                                    placeholder=""
                                    required
                                    onChange={designationChangeHandler}
                                />
                            </CCol>

                        </CRow>
                        <CRow className="mb-3">
                            <CFormLabel htmlFor="location" className="col-sm-2 col-form-label">Branch Location</CFormLabel>
                            <CCol sm="4">
                                <Select
                                    options={branchLocationOptions}
                                    isSearchable
                                    // isClearable
                                    onChange={locationChangeHandler}
                                    value={clicked ? ViewUserFormState.location : ""}
                                />
                            </CCol>

                            <CFormLabel className="col-sm-2 col-form-label" htmlFor="branchID">Branch Name</CFormLabel>
                            <CCol sm="4">
                                <Select
                                    options={branchNameOptions.filter(branch => branch.location == formState.location)}
                                    isSearchable
                                    // isClearable
                                    onChange={branchIDHandler}
                                    value={clicked ? ViewUserFormState.BID : ""}
                                />
                            </CCol>

                        </CRow>

                        <br />

                        <CCol className="d-flex align-items-center justify-content-center">

                            <CButton type="submit" color="primary" onClick={modalCloseHandler}>Save Changes</CButton>



                        </CCol>
                    </CForm>
                </CModalBody>
                <CModalFooter>
                    <CButton color="secondary" onClick={modal2CloseHandler}>Close</CButton>
                </CModalFooter>
            </CModal>
        </CContainer>
    );
}

export default AddUserForm;