import React, { useState, useEffect } from "react";
import { MDBDataTableV5 } from 'mdbreact';
import { AppFooter, AppHeader2 } from '../../../components/index';
import { CContainer, CRow, CCol, CBadge, CButton, CFormCheck, CFormControl, CModal, CModalHeader, CModalBody, CModalFooter, CModalTitle, CTable, CTableHead, CTableHeaderCell, CTableBody, CTableRow, CTableDataCell, CFormLabel } from '@coreui/react';
import endPoints from "../../../utils/EndPointApi";
import { Link } from 'react-router-dom';
import { BsFillPersonFill } from 'react-icons/bs';
import { BsFillEyeFill } from 'react-icons/bs';
import "./userProfile.css";
import { useStateValue } from "../../../StateProvider";


function UserProfile() {
    const [reducerState, dispatch] = useStateValue()
    const [visible, setVisible] = useState(false)
    const [visibleOne, setVisibleOne] = useState(false)
    var [showData, setShowData] = useState([]);
    const [Id, setId] = useState();
    const [userRole, setUserRole] = useState();
    const [roles, setRoles] = useState([]);
    const [newRole, setNewRole] = useState("");
    const [accessRoles, setAccessRoles] = useState([]);
    const token = JSON.parse(sessionStorage.getItem("token"));




    async function showDataList(url) {
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

    async function patchData(url, data) {
        // console.log("in show data")
        // setIsLoading(true)
        const response = await fetch(url, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': token
            },
            body: JSON.stringify(data)
        });
        const Data = await response.json();
        // setIsLoading(false)
        // console.log(Data);
        return Data
    }

    async function postData(url, data) {
        // console.log("in show data")
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
        // console.log(Data);
        return Data
    }


    useEffect(() => {
        showDataList(endPoints.getUserProfile).then(data => setShowData(data));


    }, [])

    const DataRows = []
    {
        showData?.map(data => {
            DataRows.push({
                position: <div className="column">
                    <BsFillPersonFill className="buttons" />
                    <h6 className="title">{data.role}</h6>
                </div>,
                show: <CButton id={data._id} value={data.role}
                    onClick={(event) => {
                        setVisible(!visible);
                        // console.log(event.target.id);
                        // const selectedRole = showData.filter(data => data.role == event.target.id);
                        setId(event.target.id);
                        setUserRole(event.target.value)
                        setRoles(Object.entries(data.access))
                    }
                    } >show</CButton>,


            })
        });

        // console.log(accessRoles);

    }

    const Access = {};
    {
        showData?.filter(data => data.role == "Super-Admin").map(data => Object.assign(Access, data.access));
        Object.keys(Access).forEach(key => {
            Access[key] = false;
        });
        // console.log(Access);

    }


    const fetchAccessHandler = () => {



        setAccessRoles(Object.entries(Access));
        console.log("clicked");
        // console.log(Access);
    }



    const savePermissionHandler = (event) => {
        console.log(roles);
        setVisible(false)
        showData.map(data => {
            patchData(endPoints.patchUserProfile, { _id: data._id, access: data.access }).then(res => {
                if (res.success === true) {
                    showDataList(endPoints.getUserProfile).then(data => { setShowData(data); setVisible(false); });
                }
            });
        });
    }


    const postDataHandler = () => {
        setVisibleOne(false)
        console.log(Access);
        postData(endPoints.postUserProfile, { role: newRole, access: Access }).then(res => console.log(res));

    }
    const datatable = {
        columns: [

            {
                label: 'Role',
                field: 'position',
                sort: 'asc',
                width: 100
            },
            {
                label: '',
                field: 'show',
                width: 50

            },
        ],
        rows: DataRows
    }
    // var access = {};
    // var Data = [...showData];

    return (
        <>


            <div className="body flex-grow-1 px-3">
                <CRow className="py-2 justify-content-between">
                    <CCol md={6} className="align-self-start align-items-center justify-content-center"><h2>USER PROFILE</h2></CCol>
                    <CCol md={2} className="align-self-end align-items-center justify-content-center">
                        <CButton onClick={() => { setVisibleOne(!visibleOne); fetchAccessHandler(); }} color="primary">+ CREATE ROLE</CButton></CCol>
                </CRow>
                <hr />
                <CContainer fluid className="justify-content-between">
                    <CRow>
                        <CContainer fluid >
                            <MDBDataTableV5 hover data={datatable} searchBottom={false} searchTop={false} paging={false} fullPagination />
                        </CContainer>

                    </CRow>
                </CContainer>

                <CModal visible={visible} onDismiss={() => setVisible(false)}>
                    <CModalHeader onDismiss={() => setVisible(false)}>
                        <CModalTitle>{userRole}-Permissions</CModalTitle>
                    </CModalHeader>
                    <CModalBody className="bg-light">
                        <CTable>
                            <CTableHead>
                                <CTableRow>
                                    <CTableHeaderCell scope="col">Roles</CTableHeaderCell>
                                </CTableRow>
                            </CTableHead>
                            <CTableBody>


                                {roles.map((key, values) => {
                                    {/* console.log(data) */ }

                                    return (
                                        <CTableRow key={key}>
                                            <CTableDataCell  >
                                                <div className="column1 ">
                                                    <CCol className="col-sm-6">
                                                        <h6 className="mx-5">{key}</h6>
                                                    </CCol>
                                                    <CCol className="col-sm-4">
                                                        <CFormCheck
                                                            className="mx-5"
                                                            switch
                                                            id={key}
                                                            defaultChecked={key[1]}
                                                            onChange={(event) => {
                                                                showData = showData.filter(data => data._id == Id).map(data => {
                                                                    // console.log(showData);
                                                                    // access = { ...data.access };
                                                                    if (event.target.checked == false) {
                                                                        data.access[key[0]] = false

                                                                    }
                                                                    return data;

                                                                    // console.log(data.access);

                                                                })

                                                            }}
                                                        />
                                                    </CCol>
                                                </div>
                                            </CTableDataCell>
                                        </CTableRow>
                                    );



                                })}

                            </CTableBody>
                        </CTable>
                    </CModalBody>
                    <CModalFooter>
                        <CButton color="secondary" onClick={() => setVisible(false)}>
                            Close
                        </CButton>
                        <CButton color="primary" onClick={savePermissionHandler}>Save changes</CButton>
                    </CModalFooter>
                </CModal>




                <CModal visible={visibleOne} onDismiss={() => setVisibleOne(false)}>
                    <CModalHeader onDismiss={() => setVisibleOne(false)}>
                        <CModalTitle>ADD NEW ROLE</CModalTitle>
                    </CModalHeader>
                    <CModalBody className="bg-light">
                        <CRow className="mb-3">
                            <CFormLabel htmlFor="roleName" className="col-sm-2 col-form-label">
                                Role Title
                            </CFormLabel>
                            <div className="col-sm-10">
                                <CFormControl type="text" onChange={(event) => setNewRole(event.target.value)} />
                            </div>
                        </CRow>
                        <CRow>
                            {accessRoles.map((key, value) => {
                                {/* console.log(Access); */ }
                                {/* console.log(key[0]) */ }
                                return (
                                    <CCol className="col-sm-6" key={key} >
                                        <CFormCheck
                                            id={key}
                                            label={key}
                                            onChange={(event) => {
                                                if (event.target.checked == true) {
                                                    Access[key[0]] = true;
                                                    // console.log(Access);
                                                }
                                                return Access;
                                            }} />
                                    </CCol>

                                );

                            })
                            }
                        </CRow>


                    </CModalBody>
                    <CModalFooter>
                        <CButton color="secondary" onClick={() => setVisibleOne(false)}>
                            Close
                        </CButton>
                        <CButton color="primary" onClick={postDataHandler}>Add Role</CButton>
                    </CModalFooter>
                </CModal>
            </div>


        </>
    );

}

export default UserProfile;

