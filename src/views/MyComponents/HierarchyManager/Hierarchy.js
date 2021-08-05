import React, { useState, useEffect } from 'react';
import TreeView from 'react-treeview';
import "react-treeview/react-treeview.css";
import "./Hierarchy.css"
import { CContainer, CButton, CRow, CCol, CFormLabel, CFormControl, CFormFloating, CTooltip, CSpinner } from '@coreui/react'
import { RiBuilding4Line, RiBuildingLine } from "react-icons/ri";
import { AiOutlineTeam, AiOutlineMinusCircle } from "react-icons/ai";
import { GrAddCircle } from "react-icons/gr";
import endPoints from 'src/utils/EndPointApi';
import { useStateValue } from "../../../StateProvider"

function HierarchyF(props) {
    const [reducerState, dispatch] = useStateValue()
    const token = JSON.parse(sessionStorage.getItem("token"));
    const [isLoading, setIsLoading] = useState()
    const [dataList, setDataList] = useState([])
    const [searchedDepartment, setSearchedDepartment] = useState("")
    const [enteredSubDepartment, setEnteredSubDepartment] = useState("")
    const [enteredTeam, setEnteredTeam] = useState("")
    const [enteredDepartment, setEnteredDepartment] = useState("")

    const departmentSearchHandler = (event) => {
        setSearchedDepartment(event.target.value)
    }
    const subDepartmentInputHandler = (event) => {
        setEnteredSubDepartment(event.target.value)
    }
    const teamInputHandler = (event) => {
        setEnteredTeam(event.target.value)
    }
    const departmentInputHandler = (event) => [
        setEnteredDepartment(event.target.value)
    ]
    const searchHandler = () => {
        console.log("Search button hit")
        console.log("dataList : ", dataList)
        console.log("searched department: ", searchedDepartment)
        const arr = dataList.filter(obj => (obj.type === "Department" && obj.name.toUpperCase().includes(searchedDepartment.toUpperCase())))
        console.log("arr : ", arr)
        var searchArr = []
        for (let deps of arr) {
            console.log("before condition : ", deps)
            searchArr.push(deps)
            for (let subs of dataList) {
                if (subs.type === "Sub-Department" && subs.parent === deps.name) {
                    console.log("subs : ", subs)
                    searchArr.push(subs)
                    for (let teams of dataList) {
                        if (teams.type === "Team" && teams.parent === subs.name) {
                            console.log("teams : ", teams)
                            searchArr.push(teams)
                        }
                    }
                }
            }
        }
        console.log("searchArr", searchArr)
        setDataList(searchArr)
        // const a = dataList.filter(obj => (obj.type === "Department" && obj.name.toUpperCase().includes(searchedDepartment.toUpperCase())))
        // const b = dataList.filter(obj => )
        // setDataList(dataList.filter(obj => (obj.type === "Department" && obj.name.toUpperCase().includes(searchedDepartment.toUpperCase()))))
    }
    const clearHandler = () => {
        showData(endPoints.searchHierarchy)
            .then(data => setDataList(data))
        setSearchedDepartment("")
    }
    const deleteDepartmentHandler = (event) => {
        const delDep = {
            type: "Department",
            name: event.target.className.baseVal,
        }
        console.log("Department to be removed: ", delDep)
        removeData(endPoints.removeHierarchy, delDep)
            .then(data => {
                console.log(data.success)
                if (data.success === true) {
                    showData(endPoints.searchHierarchy, {})
                        .then(data => setDataList(data))
                }
            })
    }
    const deleteSubDepartmentHandler = (event) => {
        const delSub = {
            type: "Sub-Department",
            name: event.target.className.baseVal,
        }
        console.log("Sub- Department to be removed: ", delSub)
        removeData(endPoints.removeHierarchy, delSub)
            .then(data => {
                console.log(data.success)
                if (data.success === true) {
                    showData(endPoints.searchHierarchy)
                        .then(data => setDataList(data))
                }
            })
    }
    const deleteTeamHandler = (event) => {
        const delTeam = {
            type: "Team",
            name: event.target.className.baseVal,
        }
        console.log("Team to be removed: ", delTeam)
        removeData(endPoints.removeHierarchy, delTeam)
            .then(data => {
                console.log(data.success)
                if (data.success === true) {
                    showData(endPoints.searchHierarchy)
                        .then(data => setDataList(data))
                }
            })
    }
    const AddDepartmentHandler = (event) => {
        event.preventDefault()
        const newDep = {
            type: "Department",
            name: enteredDepartment,
            parent: null
        }
        console.log("Department to be added: ", newDep)
        postData(endPoints.addHierarchy, newDep)
            .then(data => {
                console.log(data.success)
                if (data.success === true) {
                    showData(endPoints.searchHierarchy)
                        .then(data => setDataList(data))
                }
            })
        event.target.reset()
        setEnteredDepartment("")
    }
    const AddSubDepartmentHandler = (event) => {
        event.preventDefault()
        const newSub = {
            type: "Sub-Department",
            name: enteredSubDepartment,
            parent: event.target.className
        }
        console.log("Sub- Department to be added: ", newSub)
        postData(endPoints.addHierarchy, newSub)
            .then(data => {
                console.log(data.success)
                if (data.success === true) {
                    showData(endPoints.searchHierarchy)
                        .then(data => setDataList(data))
                }
            })
        event.target.reset()
        setEnteredSubDepartment("")
    }
    const AddTeamHandler = (event) => {
        event.preventDefault()
        const newTeam = {
            type: "Team",
            name: enteredTeam,
            parent: event.target.className
        }
        console.log("Team to be added: ", newTeam)
        postData(endPoints.addHierarchy, newTeam)
            .then(data => {
                console.log(data.success)
                if (data.success === true) {
                    showData(endPoints.searchHierarchy)
                        .then(data => setDataList(data))
                }
            })
        event.target.reset()
        setEnteredTeam("")
    }
    useEffect(() => {
        showData(endPoints.searchHierarchy)
            .then(data => {
                setDataList(data)
                console.log("Data:", dataList)
            })
    }, [])


    async function postData(url, data) {
        setIsLoading(true)
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': token
            },
            body: JSON.stringify(data)
        });
        const Data = await response.json();
        setIsLoading(false)
        return Data
    }
    async function showData(url) {
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
        return Data
    }
    async function removeData(url, data) {
        setIsLoading(true)
        const response = await fetch(url, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': token
            },
            body: JSON.stringify(data)
        });
        const Data = await response.json();
        setIsLoading(false)
        return Data
    }

    console.log("rendering this in treeView: ", dataList)
    const Departments = dataList.filter(obj => obj.type === "Department")
    return (
        <CContainer fluid>
            {console.log("inside return")}
            <CRow>
                <CCol md={3} >
                    <CFormFloating className="mb-3" >
                        <CFormControl
                            type="text"
                            id="department"
                            placeholder="department"
                            onChange={departmentSearchHandler}
                            value={searchedDepartment}
                        />
                        <CFormLabel htmlFor="department">Search by Department</CFormLabel>
                    </CFormFloating>
                </CCol>
                <CCol md={1} className="searchBar">
                    <CButton size="lg" type="submit" color="success" onClick={searchHandler}>Search</CButton>
                </CCol>

                <CCol md={1} className="searchBar">
                    <CButton size="lg" type="submit" onClick={clearHandler}>Clear</CButton>
                </CCol>
                <CCol md={1} className="searchBar">
                    {isLoading === true && <CSpinner color="primary" />}
                </CCol>
            </CRow>
            {console.log("tree structure starting", dataList, Departments)}
            <CRow className="mt-3 pt-3 tree-view_box">
                {Departments.map((department, i) => {
                    const label = <span className="node"><RiBuilding4Line /> {department.name} <CTooltip content="Delete Department" placement="end"><button id={department.name} className="delete" onClick={deleteDepartmentHandler}><AiOutlineMinusCircle className={department.name} /></button></CTooltip></span>
                    const SubDepartments = dataList.filter(SubDepartment => SubDepartment.type === "Sub-Department" && SubDepartment.parent === department.name)
                    return (
                        <TreeView
                            className="departments"
                            key={department.name}
                            nodeLabel={label}
                            defaultCollapsed={true}
                        >
                            {
                                SubDepartments.map((subDepartment) => {
                                    const label2 = <span className="node"><RiBuildingLine /> {subDepartment.name} <CTooltip content="Delete Sub-Department" placement="end"><button id={subDepartment.name} className="delete" onClick={deleteSubDepartmentHandler}><AiOutlineMinusCircle className={subDepartment.name} /></button></CTooltip></span>
                                    const Teams = dataList.filter(Team => Team.type === "Team" && Team.parent === subDepartment.name)
                                    return (
                                        <TreeView
                                            key={subDepartment.name}
                                            nodeLabel={label2}
                                            defaultCollapsed={true}
                                        >
                                            {Teams.map(team => {
                                                return <div key={team.name} className="info"><AiOutlineTeam /> {team.name} <CTooltip content="Delete Team" placement="end"><button id={team.name} className="delete" onClick={deleteTeamHandler}><AiOutlineMinusCircle className={team.name} /></button></CTooltip></div>
                                            })}
                                            <div className="tree-view">
                                                <div className="tree-view_item d-flex flex-row">
                                                    <div className=" tree-view_arrow tree-view_arrow-collapsed input_arrow"></div>
                                                    <form className={subDepartment.name} onSubmit={AddTeamHandler}>
                                                        <span className="node"><GrAddCircle /><input id={subDepartment.name} className="inputText" type="text" onChange={teamInputHandler} placeholder="Add Team" /></span>
                                                        <button type="submit" className="inputButton">+</button>
                                                    </form>
                                                </div>
                                            </div>
                                        </TreeView>
                                    )
                                })}
                            <div className="tree-view">
                                <div className="tree-view_item d-flex flex-row">
                                    <div className=" tree-view_arrow tree-view_arrow-collapsed input_arrow"></div>
                                    <form className={department.name} onSubmit={AddSubDepartmentHandler}>
                                        <span className="node"><GrAddCircle /><input id={department.name} className="inputText" type="text" onChange={subDepartmentInputHandler} placeholder="Add Sub Department" /></span>
                                        <button type="submit" className="inputButton">+</button>
                                    </form>
                                </div>
                            </div>
                        </TreeView>
                    )
                })}
                <div className="tree-view">
                    <div className="tree-view_item d-flex flex-row">
                        <div className=" tree-view_arrow tree-view_arrow-collapsed input_arrow"></div>
                        <form className="addDepartment" onSubmit={AddDepartmentHandler}>
                            <span className="node"><GrAddCircle /><input className="inputText" type="text" onChange={departmentInputHandler} placeholder="Add Department" /></span>
                            <button type="submit" className="inputButton">+</button>
                        </form>
                    </div>
                </div>
            </CRow>
        </CContainer>
    )
}

export default HierarchyF;