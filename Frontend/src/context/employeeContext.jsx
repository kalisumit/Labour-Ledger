import { Children, createContext, useCallback, useState } from "react";
import { createEmployee, getEmployee, getEmployeeById, updateEmployee } from "../services/userAPI";

export const EmployeeContext = createContext()

export const EmployeeProvider = ({ children }) => {
    const [employeeData, setEmployeeData] = useState([])
    const [editingId, setEditingId] = useState(null)
    const [isEditForm, setIsEditForm] = useState(false)
    const [isLoading, setIsLoading] = useState(false)

    const getToday = () => new Date().toISOString().split('T')[0]
    const [curDate,setCurDate] = useState(getToday())

    
    const getEmployeeData = useCallback(async () => {
        setIsLoading(true)
        try {
            const response = await getEmployee()
            // console.log(response)

            const employees = Array.isArray(response)
                ? response
                : Array.isArray(response?.employees)
                    ? response.employees
                    : []

            setEmployeeData(employees)
        } catch (error) {
            console.error(error)
            setEmployeeData([])
        } finally {
            setIsLoading(false)
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
            return await createEmployee(data)
        } catch (error) {
            console.error("Error in Creating employee:", error)
            throw error
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
        isLoading,
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
