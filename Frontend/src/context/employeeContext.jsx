import { Children, createContext, useCallback, useState } from "react";
import { createEmployee, getEmployee, getEmployeeById, updateEmployee } from "../services/userAPI";

export const EmployeeContext = createContext()

export const EmployeeProvider = ({ children }) => {
    const [employeeData, setEmployeeData] = useState([])
    const [editingId, setEditingId] = useState(null)
    const [isEditForm, setIsEditForm] = useState(false)

    const getToday = () => new Date().toISOString().split('T')[0]
    const [curDate,setCurDate] = useState(getToday())

    
    const getEmployeeData = useCallback(async () => {
        try {
            const response = await getEmployee()
            console.log(response)

            const employees = Array.isArray(response)
                ? response
                : Array.isArray(response?.employees)
                    ? response.employees
                    : []

            setEmployeeData(employees)
        } catch (error) {
            console.error(error)
            setEmployeeData([])
        }
    }, [])
    
    const getEmployeeDataById = async (id) => {
        try {
            const response = await getEmployeeById(id)
            return response
        } catch (error) {
            console.error(error)
        }
    }
    
    const createEmployeeData = async (data) => {
        try {
            const response = await createEmployee(data)
            return response;
        } catch (error) {
            console.error("Error in Creating employee:", error)
        }
    }
    
    const editEmployeeData = async (data) => {
        try {
            const response = await updateEmployee(data)
            
            return response;
        } catch (error) {
            console.log(error)
        }
    }
    
    
    const shiftDate = (dateString,days) => {
        const date = new Date(dateString)
        date.setDate(date.getDate() + days)
        return date.toISOString().split('T')[0]
    }
    
    const values = {
        employeeData,
        editingId,
        isEditForm,
        curDate,
        setCurDate,
        setIsEditForm,
        setEditingId,
        setEmployeeData,
        getEmployeeData,
        createEmployeeData,
        editEmployeeData,
        getEmployeeById,
        getToday,
        shiftDate,
    }
    return <EmployeeContext.Provider value={values}>
        {children}
    </EmployeeContext.Provider>
}
