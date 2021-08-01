export const initialState = {
    selectedMRF: {},
    positions: {},
    users: {},
    hierarchies: {},
    branchName: {},
    branchLocation: {},
    selectedApproval: "",
    token: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MGY1NTIzYjljMmNhZjAwMTUxMDQyNTIiLCJlbWFpbCI6ImpheWt1bWFyOTI0NkBnbWFpbC5jb20iLCJSb2xlIjoiU3VwZXItQWRtaW4iLCJpYXQiOjE2Mjc4MDM2MTgsImV4cCI6MTYyNzgzOTYxOH0.IaXHeLEW7ySXAUKV5PmrHf0DT19SWhKuVKIR1wO16b4",
    userRole: "",
}

const StateReducer = (reducerState, action) => {
    console.log("state ::", reducerState)
    switch (action.type) {
        case "USER_LOGIN":
            console.log("user_login")
            return {
                ...reducerState,
                token: action.token,
                userRole: action.role
            }
        case "VIEW_MRF":
            console.log("view_mrf")
            return {
                ...reducerState,
                selectedMRF: action.mrf,
                positions: action.positions,
                users: action.users,
                hierarchies: action.hierarchies,
                branchName: action.branchName,
                branchLocation: action.branchLocation
            }
        case "CREATE_MRF":
            console.log("create_mrf")
            return {
                ...reducerState,
                positions: action.positions,
                users: action.users,
                hierarchies: action.hierarchies,
                branchName: action.branchName,
                branchLocation: action.branchLocation
            }
        case "VIEW_APPROVAL":
            console.log("view approval")
            return {
                ...reducerState,
                selectedApproval: action.approvalID,

            }
        default:
            return reducerState
    }
}
export default StateReducer;