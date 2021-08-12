import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom'
import '../MRF/MRFform.css';
import "../Approval/Approval.css";
import { MDBDataTableV5 } from 'mdbreact';
import { CContainer, CRow, CCol, CBadge, CButton, CFormCheck, CFormControl, CModalFooter, CModalBody, CModalTitle, CModalHeader, CModal, CForm } from '@coreui/react'
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
// import '@progress/kendo-theme-default/dist/all.css';


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
  const [value, setValue] = React.useState(0);
  const [activeStep, setActiveStep] = useState(0);
  const [stepsList, setStepsList] = useState([]);
  const [status, setStatus] = useState([]);
  const [checkList, setCheckList] = useState([])
  const [mdbDataRows, setMdbDataRows] = useState([])
  const [isFiltered, setIsFiltered] = useState(false)

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
    showData(endPoints.getApprovals).then(data => {
      setMrfData(data);

    }
    );
  }, []);



  const approver = [];
  const status1 = [];
  console.log("mrfData:", mrfData);
  const tableRows = []
  {
    mrfData?.map(item => {
      console.log(item.mrfRequestID.designation.positionID);
      tableRows.push({
        showButton: <CButton variant="ghost" color="primary" className="icon2" id={item.mrfRequestID._id}
          onClick={(event) => {
            setVisible(!visible);
            item.Approvers.map(data => {
              approver.push(data._id.name.firstName + " " + data._id.name.lastName);
              console.log(approver);
              setStepsList(stepsList.concat(approver, ["accepted"]));
            });
            let count = 0;
            console.log("before:", activeStep)
            for (let i = 0; i < item.Approvers.length; i++) {
              if (item.Approvers[i].status == "Accept") {
                setActiveStep(i + 1);
              }
              if (item.Approvers[i].status == "None") {
                setActiveStep(i);
                break;
              }
              // console.log("after:",activeStep)
            }
            // item.Approvers.map(data => {
            //   status1.push(data.status);
            //   setStatus(status1);
            // })
          }
          }>View</CButton>,
        position_id: item.mrfRequestID.designation.positionID.position,
        position_type: item.mrfRequestID.designation.positionType,
        hierarchy: item.mrfRequestID.hierarchyID.type + ": " + item.mrfRequestID.hierarchyID.name,
        reporting_manager: item.mrfRequestID.reportingManager.name.firstName + " " + item.mrfRequestID.reportingManager.name.lastName,
        startDate: item.mrfRequestID.startDate.toString().slice(0, 10),
        // endDate: item.endDate.toString().slice(0, 10),
        diversity: item.mrfRequestID.diversity,
        job_type: item.mrfRequestID.jobType,
        job_location: item.mrfRequestID.branchID.name + ", " + item.mrfRequestID.branchID.location
      })
    })
  }
  console.log("list:", stepsList)
  console.log("status:", status)
  // var step = 0;
  // for (let i = 0; i < status.length; i++) {
  //   console.log(status[i]);
  //   if (status[i] == "Accept") {
  //     step = i + 1
  //     // console.log(step);
  //     setActiveStep(step);

  //   }

  // }
  // console.log(step);

  // status.map((data, index) => {
  //   if (data == "Accept") {
  //     console.log("hello:", data, index);
  //   }
  // })






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
        field: 'reporting_manager',
        sort: 'disabled',
        width: 200,
      },
      {
        label: 'Start date',
        field: 'startDate',
        sort: 'disabled',
        width: 150,
      },
      // {
      //   label: 'End date',
      //   field: 'endDate',
      //   sort: 'disabled',
      //   width: 150,
      // },
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
    rows: isFiltered ? mdbDataRows : tableRows
  }
  const widerData = {
    columns: [
      ...dataTable.columns.map((col) => {
        col.width = 200;
        return col;
      }),
    ],
    rows: [...dataTable.rows],
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

  console.log("after:", activeStep)

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
                  <hr />
                  <CRow className="mt-4">
                    <CCol className="col-sm-4 mx-3">
                      <CButton type="submit" shape="rounded-pill" >APPLY</CButton>
                    </CCol>
                    <CCol className="col-sm-4 mx-3" >
                      <CButton onClick={clearFilterHandler} shape="rounded-pill" color="danger">CLEAR</CButton>
                    </CCol>
                  </CRow>
                </CForm>
              </CCol>

              <CCol className="col-sm-8 col-md-10 ">
                <div className="vertical"></div>
                <CContainer fluid >
                  <MDBDataTableV5 hover bordered entriesOptions={[5, 20, 25]} entries={5} pagesAmount={4} scrollX data={widerData} fullPagination />
                </CContainer>
              </CCol>
            </CRow>
          </CContainer>
          <CModal alignment="center" visible={visible}>
            <CModalHeader onDismiss={() => { setVisible(false); setStepsList([]) }}>
              <CModalTitle>Approval Status</CModalTitle>
            </CModalHeader>
            <CModalBody>
              <div className={classes.root}>
                <Stepper activeStep={activeStep} orientation="vertical">
                  {stepsList.map((label, index) => (
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

                {/* <CButton onClick={checkStatus}>update</CButton> */}
              </div>

              {/* <Stepper value={value} onChange={handleChange} items={items} /> */}

            </CModalBody>
            <CModalFooter>
              <CButton color="secondary" onClick={() => { setVisible(false); setStepsList([]) }}>
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