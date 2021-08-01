const baseLink = "https://crm1728.herokuapp.com";


// const baseLink = "https://dd56d3af5dac.ngrok.io";
// const baseLink = "https://ce7ec507aeda.ngrok.io";



// const baseLink = "https://c0b69601469e.ngrok.io";


const endPoints = {
    loginURL: baseLink + "/login",
    registerURL: baseLink + "/super-admin/add",
    searchHierarchy: baseLink + "/hierarchy",
    removeHierarchy: baseLink + "/hierarchy",
    addHierarchy: baseLink + "/hierarchy",
    searchBranch: baseLink + "/branch",
    removeBranch: baseLink + "/branch",
    addBranch: baseLink + "/branch",
    searchUser: baseLink + "/user",
    removeUser: baseLink + "/user",
    addUser: baseLink + "/user",
    searchMrf: baseLink + '/mrfrequest',
    addMrf: baseLink + "/mrfrequest",
    searchApproval: baseLink + "/approvalmatrix",
    addApprovalMatrix: baseLink + "/approvalmatrix",
    showApprovalMatrix: baseLink + "/approvalmatrix",
    deleteApprovalMatrix: baseLink + "/approvalmatrix",
    getUserProfile: baseLink + "/userprofile",
    postUserProfile: baseLink + "/userprofile",
    patchUserProfile: baseLink + "/userprofile",
    searchUserProfile: baseLink + "/userprofile",
    getApprovals: baseLink + "/approval",

}

module.exports = endPoints;