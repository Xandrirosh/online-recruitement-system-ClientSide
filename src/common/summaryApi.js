export const baseURL = 'https://online-recruitement-system-serverside.onrender.com/';

const summaryApi = {
    register: {
        url: 'api/user/register',
        method: 'post'
    },
    login: {
        url: 'api/user/login',
        method: 'post'
    },  
    postJob: {
        url: 'api/job/create',
        method: 'post'
    },
    getJobs: {
        url: 'api/job/all',
        method: 'get'
    },
    applyJob: {
        url: 'api/applicant/apply/:jobId',
        method: 'post'
    },
    getJobStats: {
        url: 'api/job/stats',
        method: 'get'
    },
    getRecentApplicants: {
        url: 'api/applicant/recent',
        method: 'get'
    },
    getApplicantStats: {
        url: 'api/applicant/stats',
        method: 'get'
    },
    shortlistApplicant: {
        url: 'api/applicant/shortlist/:applicantId',
        method: 'put'
    },
    rejectApplicant: {
        url: 'api/applicant/reject/:applicantId',
        method: 'put'
    },
    getAllApplicants: {
        url: 'api/applicant/all',
        method: 'get'
    },
    scheduleInterview: {
        url: 'api/interview/schedule',
        method: 'post'  
    },
    getInterviewReport: {
        url: 'api/interview/report',
        method: 'get'
    },
    getSingleApplicant: {
        url: 'api/interview/single-applicant/:applicantId',
        method: 'get'
    },
    getMyInterviews: {
        url: 'api/interview/my-interviews/:userId',
        method: 'get'
    },
    

}

export default summaryApi