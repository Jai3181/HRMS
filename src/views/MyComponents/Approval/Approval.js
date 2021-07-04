// // import React from 'react';
// // import { MDBDataTable, MDBBtn } from 'mdbreact';

// // const Approval = () => {
// //     const data = {
// //         columns: [
// //             {
// //                 label: 'Position',
// //                 field: 'position',
// //                 sort: 'asc',
// //                 width: 200
// //             },

// //             {
// //                 label: 'Heirarchy ID',
// //                 field: 'heirarchyId',
// //                 sort: 'asc',
// //                 width: 50
// //             },
// //             {
// //                 label: 'Branch ID',
// //                 field: 'branchId',
// //                 sort: 'asc',
// //                 width: 50
// //             },
// //             {
// //                 label: 'Cooling Period',
// //                 field: 'date',
// //                 sort: 'asc',
// //                 width: 50
// //             },
// //             {
// //                 label: 'Verified',
// //                 field: 'verificationstatus',
// //                 sort: 'asc',
// //                 width: 100
// //             },
// //             {
// //                 label: 'TAT',
// //                 field: 'date',
// //                 sort: 'asc',
// //                 width: 50
// //             },
// //             {
// //                 label: '#',
// //                 field: 'id',
// //                 sort: 'asc',
// //                 width: 100
// //             }
// //         ],
// //         rows: [
// //             {

// //                 position: 'System Architect',
// //                 heirarchyId: "1010",
// //                 branchId: "2dfr34",
// //                 date: '20/12/22',
// //                 verificationstatus: "completed",
// //                 date: " 21/12/23"

// //             },
// //             {
// //                 name: 'Garrett Winters',
// //                 position: 'Accountant',
// //                 office: 'Tokyo',
// //                 age: '63',
// //                 date: '2011/07/25',
// //                 salary: '$170'
// //             },

// //         ]
// //     };

// //     return (
// //         <MDBDataTable
// //             striped
// //             bordered
// //             small
// //             data={data}
// //         />
// //     );
// // }


// // export default Approval;

import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import { MDBDataTableV5 } from 'mdbreact';
import {
    CButton, CCol, CForm, CFormControl, CRow, CFormLabel, CFormSelect, CFormCheck, CContainer,
    CTable, CTableHead, CTableBody, CTableHeaderCell, CTableDataCell, CTableRow,
    CSpinner, CModal, CModalHeader, CModalFooter, CModalTitle, CModalBody, CDropdown, CDropdownItem, CDropdownMenu, CDropdownToggle, CSidebar, CSidebarNav, CNavItem, CNavLink, CNavGroup, CCreateNavItem
} from '@coreui/react';




export default function Basic() {

    // onClick = () => {
    //     <Redirect to="/approvalform" />
    // }


    const [visible, setVisible] = React.useState(false);
    const [title, setTitle] = React.useState(null);
    const [heirarchy, setHeirarchy] = React.useState("");
    const [branch, setBranch] = React.useState("");

    useEffect(() => {
        fetch("https://dog.ceo/api/breeds/image/random")
            .then(response => response.json())
            .then(data => setTitle(data.message))

    }, [])




    const [datatable, setDatatable] = React.useState({
        columns: [
            {
                label: 'Position',
                field: 'position',
                sort: 'asc',
                width: 200
            },

            {
                label: 'Heirarchy ID',
                field: 'heirarchyId',
                sort: 'asc',
                width: 50
            },
            {
                label: 'Branch ID',
                field: 'branchId',
                sort: 'asc',
                width: 50
            },
            {
                label: 'Cooling Period',
                field: 'date',
                sort: 'asc',
                width: 50
            },
            {
                label: 'Verified',
                field: 'verificationstatus',
                sort: 'asc',
                width: 100
            },
            {
                label: 'TAT',
                field: 'date',
                sort: 'asc',
                width: 50
            },
            {
                label: 'Approver',
                field: 'text',
                sort: 'asc',
                width: 100
            },
            {
                label: '',
                field: 'id',
                sort: 'asc',
                width: 100
            },
        ],
        rows: [
            {
                name: 'Tiger Nixon',
                position: 'System Architect',
                office: 'Edinburgh',
                age: '61',
                date: '2011/04/25',
                salary: '$320',
                id: <Link to="/approvalform"><CButton>
                    open
                </CButton>
                </Link>
            },
            {
                name: 'Garrett Winters',
                position: 'Accountant',
                office: 'Tokyo',
                age: '63',
                date: '2011/07/25',
                salary: '$170',
            },
            {
                name: 'Tiger Nixon',
                position: 'System Architect',
                office: 'Edinburgh',
                age: '61',
                date: '2011/04/25',
                salary: '$320',
            },
            {
                name: 'Garrett Winters',
                position: 'Accountant',
                office: 'Tokyo',
                age: '63',
                date: '2011/07/25',
                salary: '$170',
            },
            {
                name: 'Tiger Nixon',
                position: 'System Architect',
                office: 'Edinburgh',
                age: '61',
                date: '2011/04/25',
                salary: '$320',
            },
            {
                name: 'Garrett Winters',
                position: 'Accountant',
                office: 'Tokyo',
                age: '63',
                date: '2011/07/25',
                salary: '$170',
            },

        ],
    });

    return (
        <>
            <MDBDataTableV5 hover entriesOptions={[5, 20, 25]} entries={5} pagesAmount={4} data={datatable} />






        </>


    );


}


