import React from 'react';
// import { AppContent, AppSidebar, AppFooter, AppHeader2 } from '../../components/index'
import { AppContent, AppSidebar, AppFooter, AppHeader2 } from './components/index'
import { CContainer, CRow, CCol, CWidgetBrand } from '@coreui/react'
function Settings(props) {
  return (
    <div className="wrapper d-flex flex-column min-vh-100 bg-light">
      <AppHeader2 />
      <div className="body flex-grow-1 px-3">
        <CContainer>
          <h1>Settings</h1>
        </CContainer >
      </div>
      {/* <AppFooter /> */}
    </div>
  );
}

export default Settings;