import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom'
import '../MRF/MRFform.css'
import { MDBDataTableV5 } from 'mdbreact';
import { CContainer, CRow, CCol, CBadge, CButton, CFormCheck, CFormControl, CModalFooter, CModalBody, CModalTitle, CModalHeader, CModal } from '@coreui/react'
import { AppFooter, AppHeader2 } from '../../../components/index';
import endPoints from "../../../utils/EndPointApi";
import { useStateValue } from "../../../StateProvider";
import { BsEyeFill } from "react-icons/bs";
import { makeStyles } from '@material-ui/core/styles';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import StepContent from '@material-ui/core/StepContent';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
// import { Stepper } from "@progress/kendo-react-layout";
import '@progress/kendo-theme-default/dist/all.css';


const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
  },
  button: {
    marginTop: theme.spacing(1),
    marginRight: theme.spacing(1),
  },
  actionsContainer: {
    marginBottom: theme.spacing(2),
    // color: theme.color(#fff),
  },
  resetContainer: {
    padding: theme.spacing(3),
  },
}));


function ApprovalStatus() {
  const [reducerState, dispatch] = useStateValue();
  // const token = reducerState.token;
  const token = JSON.parse(sessionStorage.getItem("token"));
  const [mrfData, setMrfData] = useState([]);
  const [visible, setVisible] = useState(false)
  const classes = useStyles();
  const [activeStep, setActiveStep] = React.useState(1);
  const steps = getSteps();
  const [value, setValue] = React.useState(0);

  const handleChange = (e) => {
    console.log(e.value);
    console.log("event:", e)
    setValue(e.value);
  }

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleReset = () => {
    setActiveStep(0);
  };

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
    showData(endPoints.searchMrf).then(data => {
      console.log("mrfList:", data)
      setMrfData(data)
    }
    );
  }, []);


  const viewModalHandler = (event) => {
    setVisible(!visible);



  }

  const tableRows = []
  {
    mrfData?.filter(item => item.status == "unapproved").map(item => {
      // console.log("item:", item)
      tableRows.push({
        showButton: <CButton variant="ghost" color="info" className="icon2 bold" id={item._id} onClick={viewModalHandler} >View</CButton>,
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


  function getSteps() {
    return ['waiting for approval', 'Approver-1', 'Approver-2', 'Approver-3', 'accepted'];
  }

  function getStepContent(step) {
    switch (step) {
      case 0:
        return `approved`;
      case 1:
        return 'unapproved';
      case 2:
        return `unapproved`;
      case 3:
        return 'approved';
      default:
        return 'Unknown step';
    }
  }
  const items = [
    {
      label: "Cart",
      icon: "k-i-cart",
    },
    {
      label: "Delivery Address",
      icon: "k-i-marker-pin-target",
    },
    {
      label: "Payment Method",
      icon: "k-i-dollar",
    },
    {
      label: "Preview",
      icon: "k-i-preview",
      optional: true,
    },
    {
      label: "Finish Order",
      icon: "k-i-track-changes-accept",
    },
  ];


  var i = 0
  const checkStatus = () => {
    if (getStepContent(i) == "approved") {
      handleNext();
      console.log("done", getStepContent(i), i);
      i++;

    }

    // console.log("clicked", index);
  }
  return (
    <div>
      {/* <AppSidebar /> */}
      <div className="wrapper d-flex flex-column min-vh-100 bg-light">
        <AppHeader2 />
        <div className="body flex-grow-1 px-3">
          <CRow className="py-2 justify-content-between">
            <CCol md={6} className="align-self-start align-items-center justify-content-center"><h2>VIEW APPROVAL STATUS</h2></CCol>
          </CRow>
          <hr />
          <CContainer fluid className="justify-content-between">
            <CRow>
              <CCol className=" col-sm-4 col-md-2 filter ">
                FILTER BAR
                <hr />
                {/* <CRow>
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
                    <CCol className="col-sm-4 mx-3" >
                      <CButton onClick={clearFilterHandler} shape="rounded-pill" color="danger">CLEAR</CButton>
                    </CCol>
                  </CRow>
                </CRow> */}
              </CCol>

              <CCol className="col-sm-8 col-md-10 ">
                <CContainer fluid >
                  <MDBDataTableV5 hover bordered entriesOptions={[5, 20, 25]} entries={5} pagesAmount={4} scrollX data={dataTable} fullPagination />
                </CContainer>
              </CCol>
            </CRow>
          </CContainer>
          <CModal alignment="center" visible={visible}>
            <CModalHeader onDismiss={() => setVisible(false)}>
              <CModalTitle>Approval Status</CModalTitle>
            </CModalHeader>
            <CModalBody>
              <div className={classes.root}>
                <Stepper activeStep={activeStep} orientation="vertical">
                  {steps.map((label, index) => (
                    <Step key={label}>
                      <StepLabel color="success">{label}</StepLabel>
                      <StepContent>
                        {/* <Typography>{getStepContent(index)}</Typography> */}
                        {/* {console.log(label, index)} */}
                        {/* {checkStatus(index)} */}









                        {/* <div className={classes.actionsContainer}>
                          <div>
                            <Button
                              disabled={activeStep === 0}
                              onClick={handleBack}
                              className={classes.button}
                            >
                              Back
                            </Button>
                            <Button
                              variant="contained"
                              color="primary"
                              onClick={handleNext}
                              className={classes.button}
                            >
                              {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
                            </Button>
                          </div>
                        </div> */}
                      </StepContent>
                    </Step>
                  ))}
                </Stepper>
                {activeStep === steps.length && (
                  <Paper square elevation={0} className={classes.resetContainer}>
                    <Typography>All steps completed - you&apos;re finished</Typography>
                    <Button onClick={handleReset} className={classes.button}>
                      Reset
                    </Button>
                  </Paper>
                )}
                {/* <CButton onClick={checkStatus}>update</CButton> */}
              </div>

              {/* <Stepper value={value} onChange={handleChange} items={items} /> */}

            </CModalBody>
            <CModalFooter>
              <CButton color="secondary" onClick={() => setVisible(false)}>
                Close
              </CButton>
              <CButton color="primary">Save changes</CButton>
            </CModalFooter>
          </CModal>
        </div>
        <AppFooter />
      </div>
    </div>
  );

}



export default ApprovalStatus;