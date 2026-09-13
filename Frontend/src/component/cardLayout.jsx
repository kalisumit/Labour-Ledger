import React, { useContext } from 'react'
import Card from './card'
import { EmployeeContext } from '../context/employeeContext.jsx'

const CardLayout = () => {

    const { employeeData } = useContext(EmployeeContext)
    // const salary = employeeData.reduce((acc=0,curr)=> { return curr.Number(salary) + acc})

    return (
        <div className='grid grid-cols-3 gap-5 mx-5 mt-5'>
            <Card title="Number of Employees" data={employeeData.length} />
            <Card title="Salary" data={employeeData.reduce((acc, curr) => { return curr.salary + acc }, 0)} />
            <Card title="Month" data="July" />
        </div>
    )
}

export default CardLayout