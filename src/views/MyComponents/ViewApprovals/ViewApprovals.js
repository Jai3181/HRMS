import React, { useState, useEffect } from 'react';
import { CNavbar, CContainer, CNavbarBrand, CNavbarToggler, CCollapse, CNavbarNav, CNavLink, CRow, CTabContent, CTabPane, CCol, CButton, CButtonGroup, CModal, CModalBody, CModalHeader, CModalTitle, CModalFooter, CFormControl, CCard, CCardTitle, CCardBody, CCardSubtitle, CCardText, CNav } from "@coreui/react";
// import "../Approval/Approval.css"
import "./ViewApproval.css"

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
    const token = reducerState.token


    const cardInfo = [
        { title: "hello 1", body: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book" },
        { title: "hello 2", body: "Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia," },
        { title: "hello 3", body: "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters" },
        { title: "hello 3", body: "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters" },
        { title: "hello 3", body: "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters" },
        { title: "hello 3", body: "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters" }

    ]

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
        getApproval(endPoints.getApprovals).then(data => console.log(data));

    }, [])


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


    const renderCard = (card, index) => {
        return (
            <>



                <CCard style={{ width: '30rem' }} key={index} className="mx-auto my-5">
                    <CCardBody>
                        <CCardTitle>{card.title}</CCardTitle>
                        <CCardSubtitle className="mb-2 text-muted">Card subtitle</CCardSubtitle>
                        <CCardText>
                            {card.body}
                        </CCardText>
                        <div className="buttons">
                            <CButton className="buttons" color="success" onClick={acceptApprovalHandler}>Accept</CButton>
                            <CButton className="buttons" color="danger" onClick={() => setVisible(!visible)}>Decline</CButton>

                        </div>

                    </CCardBody>
                    <CModal visible={visible} onDismiss={() => setVisible(false)} className="align-align-items-center mt-5">
                        <CModalHeader onDismiss={() => setVisible(false)}>
                            <CModalTitle>REMARKS!</CModalTitle>
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

    return (
        <>
            <div className="bg-light">

                <div >
                    <CRow >
                        {/* <CNavbar expand="lg" colorScheme="light" className=" navbar bg-light ">
                            <CContainer fluid>
                                <CNavbarToggler onClick={() => setVisible1(!visible1)} />
                                <CCollapse className="navbar-collapse" visible={visible1}>
                                    <CNavbarNav component="nav ">
                                        <CNavLink href="#"
                                            style={{ fontsize: 20 }}
                                            active={activeKey === 1}
                                            onClick={() => setActiveKey(1)}
                                        >
                                            PENDING
                                        </CNavLink>
                                        <CNavLink href="#"
                                            active={activeKey === 2}
                                            onClick={() => setActiveKey(2)}
                                        >ACCEPTED</CNavLink>
                                        <CNavLink href="#"
                                            active={activeKey === 3}
                                            onClick={() => setActiveKey(3)}
                                        >ANYTHING</CNavLink>
                                    </CNavbarNav>
                                </CCollapse>
                            </CContainer>
                        </CNavbar> */}
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
                                                {cardInfo.map(renderCard)}

                                            </CRow>





                                            {/*} <CCol className="col-sm-4">

                                            </CCol>
                                            <CCol className="col-sm-4">
                                                <Card>
                                                    <Card.Content>
                                                        {/* <Image
                                                    floated='right'
                                                    size='mini'
                                                    src='https://picsum.photos/200'
                                                /> *
                                                        <Card.Header>Steve Sanders</Card.Header>
                                                        <Card.Meta>Friends of Elliot</Card.Meta>
                                                        <Card.Description>
                                                            Steve wants to add you to the group <strong>best friends</strong>
                                                            Steve wants to add you to the group <strong>best friends</strong>
                                                            Steve wants to add you to the group <strong>best friends</strong>
                                                            Steve wants to add you to the group <strong>best friends</strong>
                                                        </Card.Description>
                                                    </Card.Content>
                                                    <Card.Content extra>
                                                        <div className='ui two buttons'>
                                                            <Button basic color='green'>
                                                                Approve
                                                            </Button>
                                                            <Button basic color='red'>
                                                                Decline
                                                            </Button>
                                                        </div>
                                                    </Card.Content>
                                                </Card>
                                            </CCol>
                                            <CCol className="col-sm-4">
                                                <Card>
                                                    <Card.Content>
                                                        {/* <Image
                                                    floated='right'
                                                    size='mini'
                                                    src='https://picsum.photos/200'
                                                /> *
                                                        <Card.Header>Steve Sanders</Card.Header>
                                                        <Card.Meta>Friends of Elliot</Card.Meta>
                                                        <Card.Description>
                                                            Steve wants to add you to the group <strong>best friends</strong>
                                                            Steve wants to add you to the group <strong>best friends</strong>
                                                            Steve wants to add you to the group <strong>best friends</strong>
                                                            Steve wants to add you to the group <strong>best friends</strong>
                                                        </Card.Description>
                                                    </Card.Content>
                                                    <Card.Content extra>
                                                        <div className='ui two buttons'>
                                                            <Button basic color='green'>
                                                                Approve
                                                            </Button>
                                                            <Button basic color='red'>
                                                                Decline
                                                            </Button>
                                                        </div>
                                                    </Card.Content>
                                                </Card>
                                            </CCol>*/}
                                        </CCol>


                                    </div>
                                </CTabPane>
                                <CTabPane visible={activeKey === 2}>
                                    <h1>acceptedapprovals</h1>
                                </CTabPane>
                                <CTabPane visible={activeKey === 3}>
                                    <h1>rejected approvals</h1>
                                </CTabPane>
                                <CTabPane visible={activeKey === 4}>
                                    <h1> escalated approvals</h1>
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