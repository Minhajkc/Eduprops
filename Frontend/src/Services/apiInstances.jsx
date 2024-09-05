import axios from "axios";

const StudentInstance = axios.create({
    baseURL: "http://localhost:3000",
    headers: {
        "Content-Type": "application/json", 
        },
        timeout: 10000,
        withCredentials: true
})

const MentorInstance = axios.create({
    baseURL: "http://localhost:3000/Mentor/",
    headers: {
        'Content-Type': 'multipart/form-data'
      },
        timeout: 10000,
        withCredentials: true     
})

const AdminInstance = axios.create({
    baseURL: "http://localhost:3000/Admin/",
    
    
        timeout:120000,
        withCredentials: true  
})

export { StudentInstance, MentorInstance, AdminInstance };