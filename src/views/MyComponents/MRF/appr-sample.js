{/* <CForm onSubmit={formSubmitHandler} >
                        <CRow className="align-items-center ml-5 ">

                            <CRow className="mb-3 col-sm-12">
                                <CCol className="col-sm-2"></CCol>
                                <CFormLabel htmlFor="inputPassword" className="col-sm-2 col-form-label">
                                    Position
                                </CFormLabel>
                                <div className="col-sm-6">
                                    <CFormControl
                                        type="text"
                                        onChange={positionChangeHandler}
                                        required
                                    />
                                </div>
                                <CCol className="col-sm-2"></CCol>
                            </CRow>
                            <CRow className="mb-3">
                                <CCol className="col-sm-2"></CCol>
                                <CFormLabel htmlFor="inputPassword" className="col-sm-2 col-form-label">
                                    Cooling Period
                                </CFormLabel>
                                <div className="col-sm-6">
                                    <CFormControl type="number"
                                        onChange={CoolingPeriodChangeHandler}
                                        required />
                                </div>
                                <CCol className="col-sm-2"></CCol>
                            </CRow>


                            <CRow className="mb-3">
                                <CCol className="col-sm-2"></CCol>
                                <CFormLabel htmlFor="inputPassword" className="col-sm-2 col-form-label">
                                    Turn Around Time
                                </CFormLabel>
                                <div className="col-sm-6">
                                    <CFormControl type="number"
                                        onChange={TATChangeHandler}
                                        required />
                                </div>
                                <CCol className="col-sm-2"></CCol>
                            </CRow>

                            <CRow className="mb-3">
                                <CCol className="col-sm-2"></CCol>
                                <CFormLabel className="col-sm-2 col-form-label" htmlFor="hirearchy_type">
                                    Hierarchy Type
                                </CFormLabel>
                                <CCol className="col-sm-6">
                                    <CFormSelect id="hirearchy_type" required
                                        onChange={(e) => { setHeirarchy(e.target.value); }}>
                                        <option>Choose...</option>
                                        <option value="Department">Department</option>
                                        <option value="Sub-Department">Sub-Department</option>
                                        <option value="Team">Team</option>
                                        <option value="Management">Management</option>
                                    </CFormSelect>
                                </CCol>
                                <CCol className="col-sm-2"></CCol>
                            </CRow>
                            <CRow className="mb-3">
                                <CCol className="col-sm-2"></CCol>
                                <CFormLabel className="col-sm-2 col-form-label" htmlFor="h_name">
                                    Hierarchy Name
                                </CFormLabel>
                                <CCol className="col-sm-6">
                                    <Select
                                        placeholder={heirarchy}
                                        options={hierarchyNameOptions.filter(hierarchy => hierarchy.type == heirarchy)}
                                        isSearchable
                                        // isClearable
                                        onChange={hiearchyNameChangeHandler}
                                    />
                                </CCol>
                                <CCol className="col-sm-2"></CCol>
                            </CRow>


                            <CRow >
                                <CCol className="col-sm-2"></CCol>
                                <CFormLabel className="col-sm-2 col-form-label mb-3" htmlFor="user_type">
                                    Branch:
                                </CFormLabel>
                                <CCol className="col-sm-6">
                                    <Select
                                        options={branchNameOptions}
                                        isSearchable
                                        // isClearable
                                        onChange={BranchChangeHandler}
                                        required
                                    />
                                </CCol>
                                <CCol className="col-sm-2"></CCol>
                            </CRow>



                            <CRow className="mb-3">
                                <CCol className="col-sm-2"></CCol>
                                <CFormLabel className="col-sm-2 col-form-label mb-3" htmlFor="user_type">
                                    Approver:
                                </CFormLabel>
                                <CCol className="mb-2">
                                    <CreatableSelect
                                        isMulti
                                        onChange={ApproverChangeHandler}
                                        options={ApproverNameOptions}
                                        ActionTypes='clear-option'
                                    />
                                </CCol>
                                <CCol className="col-sm-2"></CCol>
                            </CRow>

                            <CRow>
                                <CCol className="col-sm-6"></CCol>
                                <CCol>
                                    <CButton type="submit">Submit</CButton>
                                </CCol>
                                <CCol className="col-sm-4"></CCol>
                            </CRow>


                        </CRow>
                    </CForm> */}