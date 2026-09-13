import axios from "axios"

const API_BASE_URL = import.meta.env.VITE_API_URL

const API_URL = `${API_BASE_URL}/employee`
const ATTENDANCE_URL = `${API_BASE_URL}/employee/attendance`
const LOGIN_URL = `${API_BASE_URL}/auth`

export const createEmployee = async (data) => {
    const response = await axios.post(API_URL, data, { headers: getAuthHeaders() })
    return response.data;
}

export const getEmployee = async () => {
    const response = await axios.get(API_URL, { headers: getAuthHeaders() })
    return response.data;
}

export const getEmployeeById = async (id) => {
    const response = await axios.get(`${API_URL}/${id}`, { headers: getAuthHeaders() })
    return response.data;
}

export const updateEmployee = async (id, data) => {
    const response = await axios.put(`${API_URL}/${id}`, data, { headers: getAuthHeaders() })
    return response.data;
}

export const deleteEmployee = async (id) => {
    const response = await axios.delete(`${API_URL}/${id}`, { headers: getAuthHeaders() })
    return response.data;
}

export const markAttendance = async (employeeId, dateKey, status, overTime = 0) => {
    const response = await axios.post(`${ATTENDANCE_URL}`, { employeeId, dateKey, status, overTime }, { headers: getAuthHeaders() })
    return response.data
}

export const getAttendanceByDate = async (dateKey) => {
    const response = await axios.get(`${ATTENDANCE_URL}/${dateKey}`, { headers: getAuthHeaders() })
    return response.data;
}

export const getAttendanceByRange = async (startDate, endDate) => {
    const response = await axios.get(`${ATTENDANCE_URL}/range/${startDate}/${endDate}`, { headers: getAuthHeaders() })
    return response.data;
}

export const loginContractor = async (data) => {
    const response = await axios.post(`${LOGIN_URL}/login`, data)
    return response.data;
}

export const getContractorData = async () => {
    const response = await axios.get(`${LOGIN_URL}`)
    return response.data
}

export const signupContractor = async (data) => {
    const response = await axios.post(`${LOGIN_URL}/signup`, data)
}

const getAuthHeaders = () => {
    const token = localStorage.getItem("token")
    return { Authorization: `Bearer ${token}` }
}