import React, { useState } from "react";
import { CNavbar, CContainer, CNavbarBrand, CNavbarToggler, CCollapse, CNavbarNav, CNavLink, CRow, CTabContent, CTabPane, CCol, CButton, CButtonGroup, CModal, CModalBody, CModalHeader, CModalTitle, CModalFooter, CFormControl, CCard, CCardTitle, CCardBody, CCardSubtitle, CCardText, CNav, CFormFloating } from "@coreui/react";
// import "../Approval/Approval.css"
import "../ViewApprovals/ViewApproval.css";
import { Link } from 'react-router-dom';
import { sum } from "lodash";
import { MdDelete } from "react-icons/md";
import Select from 'react-select';
import { BsPersonPlusFill } from "react-icons/bs";


// import { Button, Card, Image } from '../../../../node_modules/semantic-ui-react';
// import "../../../../node_modules/semantic-ui-css/semantic.min.css";
import { useStateValue } from "../../../StateProvider";
import endPoints from "../../../utils/EndPointApi";

function MrfDistribution() {
  const [activeKey, setActiveKey] = useState(1);
  const [visible, setVisible] = useState(false);

  const cardInfo = [
    { title: "hello 1", body: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book" },
    { title: "hello 2", body: "Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia," },
  ]

  const RenderCard = (card, index) => {

    const assignedNumbers = [5];
    var sum1 = sum(assignedNumbers);
    const distributorTemplate = {};
    const [distributor, setDistributor] = useState([distributorTemplate]);
    const leftApprovals = 7 - sum1
    console.log(leftApprovals);


    const addDistributor = () => {
      setDistributor([...distributor, distributorTemplate]);

    }

    const deleteDistributor = (index) => {
      const filteredDistributor = [...distributor];
      filteredDistributor.splice(index, 1);
      setDistributor(filteredDistributor);
      console.log(filteredDistributor);
    }
    return (
      <>



        <CCard style={{ width: '30rem' }} key={index} className="mx-auto my-5">
          <CCardBody>
            <CCardTitle>{card.title}</CCardTitle>
            <CCardSubtitle className="mb-2 text-muted">Card subtitle</CCardSubtitle>
            <CCardText>
              {card.body}
            </CCardText>
            <div >
              {/* <CButton className="buttons" color="info" >View</CButton> */}
              <CButton color="info" onClick={() => setVisible(!visible)}>View</CButton>

            </div>

          </CCardBody>
          <CModal size="lg" alignment="center" visible={visible}>
            <CModalHeader onDismiss={() => setVisible(false)}>
              <CModalTitle>MRF Distribution</CModalTitle>
            </CModalHeader>

            <CModalBody>
              <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Fugiat aliquid odit aspernatur voluptatum beatae aliquam, repellendus molestias. Nulla praesentium dolore tempore fuga ex tenetur. Aut ullam illum, totam commodi vel velit dicta eveniet quas assumenda similique enim, harum, eligendi architecto ut id mollitia ipsum doloremque sequi nostrum soluta minima! Assumenda esse laudantium dolorem ad dolore distinctio, eius debitis fugiat libero?</p>
              <h4 alignment="center">Distribution :</h4>
              <h6>No.of Approvals left : {leftApprovals}</h6>
              <CRow className="mb-3">
                <CCol md="12">
                  {distributor.map((dis, index) => (

                    <CRow className="my-2" key={index}>
                      <CCol sm="7" lg="9">
                        <Select
                          name="dis"
                          // options={ApproverNameOptions}
                          isSearchable
                          required
                        // onChange={e => onChangeApprover(e, index)}
                        />
                      </CCol>
                      <CCol>
                        <CFormControl type="Number" min={0} />
                      </CCol>
                      <CCol sm="2" lg="1">
                        <div className="my-2">

                          <MdDelete size={23} className="mx-1 remove" onClick={deleteDistributor} />
                        </div>
                      </CCol>

                    </CRow>


                  ))}


                </CCol>
                <div className="my-3 center">
                  <CButton size="sm" shape="rounded-pill" onClick={addDistributor}><BsPersonPlusFill size={15} className="mb-1 mx-1" />  Add Distributor</CButton>

                </div>
              </CRow>



            </CModalBody>
            <CModalFooter>
              <CButton color="secondary" onClick={() => setVisible(false)}>
                Close
              </CButton>
              <CButton color="primary">Send</CButton>
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
            <CNavbar colorScheme="light" className="bg-light" variant="tabs">
              <CContainer fluid>
                {/* <CNavbarToggler onClick={() => setVisible1(!visible1)} />
                                <CCollapse className="navbar-collapse" visible={visible1}> */}

                <CNavbarBrand className="mx-auto nav1 " active={activeKey === 1}
                  onClick={() => setActiveKey(1)}>PENDING</CNavbarBrand>
                <CNavbarBrand className="mx-auto nav1 " active={activeKey === 2}
                  onClick={() => setActiveKey(2)}>ACCEPTED</CNavbarBrand>
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
                        {cardInfo.map(RenderCard)}
                      </CRow>
                    </CCol>
                  </div>
                </CTabPane>
                <CTabPane visible={activeKey === 2}>
                  <h1>distributed approvals</h1>
                </CTabPane>

              </CTabContent>
            </CCol>
          </CRow>
        </div>
      </div>
    </>
  );

}


export default MrfDistribution;