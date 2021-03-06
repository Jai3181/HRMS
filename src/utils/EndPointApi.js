const baseLink = "https://crm1728.herokuapp.com";
// const baseLink = "https://0f0b3e63240c.ngrok.io";



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
    getApprovals: baseLink + "/mrfapproval",


    viewApprovals: baseLink + "/approval",

    

    getRecruiter: baseLink + "/recruitermanagement",

    settings: baseLink + "/settings"


}

module.exports = endPoints;