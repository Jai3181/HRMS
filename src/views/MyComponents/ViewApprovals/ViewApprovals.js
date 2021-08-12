import React, { useState, useEffect } from 'react';
import { CNavbar, CContainer, CNavbarBrand, CNavbarToggler, CCollapse, CNavbarNav, CNavLink, CRow, CTabContent, CTabPane, CCol, CButton, CButtonGroup, CModal, CModalBody, CModalHeader, CModalTitle, CModalFooter, CFormControl, CCard, CCardTitle, CCardBody, CCardSubtitle, CCardText, CNav } from "@coreui/react";
// import "../Approval/Approval.css"
import "./ViewApproval.css";

// import { Button, Card, Image } from '../../../../node_modules/semantic-ui-react';
// import "../../../../node_modules/semantic-ui-css/semantic.min.css";
import { useStateValue } from "../../../StateProvider";
import endPoints from "../../../utils/EndPointApi";



function ViewApprovals() {

    const [reducerState, dispatch] = useStateValue()
    const [visible, setVisible] = useState(false)
    const [visible1, setVisible1] = useState(false)
    const [activeKey, setActiveKey] = useState(1)
    const [showApproval, setShowApproval] = useState([]);
    const [remarks, setRemarks] = useState("");
    const token = JSON.parse(sessionStorage.getItem("token"));
    const [acceptApproval, setAcceptApproval] = useState([]);
    const [pendingApproval, setPendingApproval] = useState([]);
    const [rejectApproval, setRejectApproval] = useState([]);
    const [escalateApproval, setEscalateApproval] = useState([]);


    const cardInfo1 = [];
    {
        pendingApproval.map(data => {
            cardInfo1.push({
                position: data.mrfRequestID.designation.positionID.position,
                heirarchyType: data.mrfRequestID.hierarchyID.type,
                heirarchyName: data.mrfRequestID.hierarchyID.name,
                branchName: data.mrfRequestID.branchID.name,
                jobType: data.mrfRequestID.jobType
            });
        })
    }

    const cardInfo2 = [];
    {
        acceptApproval.map(data => {
            cardInfo2.push({
                position: data.mrfRequestID.designation.positionID.position,
                heirarchyType: data.mrfRequestID.hierarchyID.type,
                heirarchyName: data.mrfRequestID.hierarchyID.name,
                branchName: data.mrfRequestID.branchID.name,
                jobType: data.mrfRequestID.jobType
            });
        })
    }
    const cardInfo3 = [];
    {
        rejectApproval.map(data => {
            cardInfo3.push({
                position: data.mrfRequestID.designation.positionID.position,
                heirarchyType: data.mrfRequestID.hierarchyID.type,
                heirarchyName: data.mrfRequestID.hierarchyID.name,
                branchName: data.mrfRequestID.branchID.name,
                jobType: data.mrfRequestID.jobType
            });
        })
    }
    const cardInfo4 = [];
    {
        escalateApproval.map(data => {
            cardInfo4.push({
                position: data.mrfRequestID.designation.positionID.position,
                heirarchyType: data.mrfRequestID.hierarchyID.type,
                heirarchyName: data.mrfRequestID.hierarchyID.name,
                branchName: data.mrfRequestID.branchID.name,
                jobType: data.mrfRequestID.jobType
            });
        })
    }




    async function getApproval(url) {
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

    async function sendApproval(url) {
        // console.log("in show data")
        // setIsLoading(true)
        const response = await fetch(url, {
            method: 'POST',
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

    useEffect(() => {
        getApproval(endPoints.getApprovals).then(data => {
            console.log(data);
            setAcceptApproval(data);
        });

    }, [])
    console.log("approval:", acceptApproval);





    const acceptApprovalHandler = () => {
        const sendData = {
            id: showApproval.id,
            status: "Accept",

        }
        // sendApproval(endPoints.sendApproval, sendData).then(data => console.log(data))



    }



    const declineApprovalHandler = (event) => {
        setRemarks(event.target.value);


    }

    const sendRemarksHandler = () => {
        console.log(remarks);
    }


    const renderCard1 = (card, index) => {
        return (
            <>



                <CCard style={{ width: '30rem' }} key={index} className="mx-auto my-5">
                    <CCardBody>
                        <CCardTitle>Accepted Approval</CCardTitle>
                        <hr />
                        <CCardSubtitle className="mb-2 text-muted"></CCardSubtitle>
                        <CCardText className="text-black">
                            Position: {card.position}
                            <br></br>
                            Hierarchy-Type: {card.heirarchyType}
                            <br></br>
                            Hierarchy-Name: {card.heirarchyName}
                            <br></br>
                            Branch-Name: {card.branchName}
                            <br></br>
                            Job Type: {card.jobType}
                        </CCardText>
                        <div className="buttons">
                            <CButton className="buttons" color="success" onClick={acceptApprovalHandler}>Accept</CButton>
                            <CButton className="buttons" color="danger" onClick={() => setVisible(!visible)}>Decline</CButton>

                        </div>

                    </CCardBody>
                    <CModal alignment="center" visible={visible}>
                        <CModalHeader onDismiss={() => setVisible(false)}>
                            <CModalTitle>Remarks!</CModalTitle>
                        </CModalHeader>

                        <CModalBody>
                            <CFormControl
                                size="sm"
                                component="textarea"
                                aria-label="With textarea"
                                placeholder="enter remarks!"
                                onChange={declineApprovalHandler}
                            ></CFormControl>
                        </CModalBody>
                        <CModalFooter>
                            <CButton color="secondary" onClick={() => setVisible(false)}>
                                Close
                            </CButton>
                            <CButton color="primary" onClick={sendRemarksHandler}>Send</CButton>
                        </CModalFooter>
                    </CModal>
                </CCard>


            </>

        );
    }


    const renderCard2 = (card, index) => {
        return (
            <>



                <CCard style={{ width: '30rem' }} key={index} className="mx-auto my-5">
                    <CCardBody>
                        <CCardTitle>Accepted Approval</CCardTitle>
                        <hr />
                        <CCardSubtitle className="mb-2 text-muted"></CCardSubtitle>
                        <CCardText className="text-black">
                            Position: {card.position}
                            <br></br>
                            Hierarchy-Type: {card.heirarchyType}
                            <br></br>
                            Hierarchy-Name: {card.heirarchyName}
                            <br></br>
                            Branch-Name: {card.branchName}
                            <br></br>
                            Job Type: {card.jobType}
                        </CCardText>
                    </CCardBody>
                </CCard>


            </>

        );
    }

    return (
        <>
            <div className="bg-light">

                <div >
                    <CRow >
                        <CNavbar colorScheme="light" className="bg-light" variant="tabs">
                            <CContainer fluid>
                                {/* <CNavbarToggler onClick={() => setVisible1(!visible1)} />
                                <CCollapse className="navbar-collapse" visible={visible1}> */}

                                <CNavbarBrand className="mx-auto nav1 " active={activeKey === 1}
                                    onClick={() => setActiveKey(1)}>PENDING</CNavbarBrand>
                                <CNavbarBrand className="mx-auto nav1 " active={activeKey === 2}
                                    onClick={() => setActiveKey(2)}>ACCEPTED</CNavbarBrand>
                                <CNavbarBrand className="mx-auto nav1 " active={activeKey === 3}
                                    onClick={() => setActiveKey(3)}>REJECTED</CNavbarBrand>
                                <CNavbarBrand className="mx-auto nav1 " active={activeKey === 4}
                                    onClick={() => setActiveKey(4)}>ESCALATED</CNavbarBrand>
                                {/* </CCollapse> */}
                            </CContainer>
                        </CNavbar>
                    </CRow>
                    <hr />
                    {/* <CButton onClick={getDataHandler}>show data</CButton> */}
                    <CRow>
                        <CCol>
                            <CTabContent >
                                <CTabPane visible={activeKey === 1}>
                                    <div className="docs-example-row">
                                        <CCol  >
                                            <CRow xs={{ gutterX: 5 }}>
                                                {cardInfo1.map(renderCard1)}
                                            </CRow>
                                        </CCol>
                                    </div>
                                </CTabPane>
                                <CTabPane visible={activeKey === 2}>
                                    <div className="docs-example-row">
                                        <CCol  >
                                            <CRow xs={{ gutterX: 5 }}>
                                                {cardInfo2.map(renderCard2)}
                                            </CRow>
                                        </CCol>
                                    </div>
                                </CTabPane>
                                <CTabPane visible={activeKey === 3}>
                                    <div className="docs-example-row">
                                        <CCol  >
                                            <CRow xs={{ gutterX: 5 }}>
                                                {cardInfo3.map(renderCard2)}
                                            </CRow>
                                        </CCol>
                                    </div>
                                </CTabPane>
                                <CTabPane visible={activeKey === 4}>
                                    <div className="docs-example-row">
                                        <CCol  >
                                            <CRow xs={{ gutterX: 5 }}>
                                                {cardInfo4.map(renderCard2)}
                                            </CRow>
                                        </CCol>
                                    </div>
                                </CTabPane>
                            </CTabContent>
                        </CCol>
                    </CRow>
                </div>
            </div>
        </>
    );

}

export default ViewApprovals;