import axios from "axios";


const axiosClient = axios.create({

    baseURL: "http://localhost:8000",
    headers: {
        'Content-Type': 'application/json',
    }
});

const CreateNewResume=(data)=>axiosClient.post('/resumes/add',data)

const GetUserResume=(userEmail)=>axiosClient.get(`/resumes/fetch/all/${userEmail}`)

const UpdateResumeDetail=(id,data)=>axiosClient.put(`/user-resumes/${id}`,data)


const GetResumeById=(id)=>axiosClient.get(`/resumes/fetch/id/${id}`)

const DeleteResumeById=(id)=>axiosClient.delete(`/user-resumes/${id}`)

export default {CreateNewResume, GetUserResume, UpdateResumeDetail,GetResumeById, DeleteResumeById};