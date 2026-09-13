import { useContext, useState } from 'react'
import { EmployeeContext } from '../context/employeeContext';
import { updateEmployee } from '../services/userAPI';

const EditEmployee = ({ id }) => {

    const { employeeData, setEditingId, getEmployeeData, setIsEditForm, isEditForm } = useContext(EmployeeContext)

    const employer = employeeData.find((s) => id == s._id)

    const [salary, setSalary] = useState(employer?.salary ?? "")
    const [phone, setPhone] = useState(employer?.phone ?? "")
    const [employeeName, setEmployeeName] = useState(employer?.employeeName ?? "")
    // console.log(employer)

    const handleEdit = async (id) => {
        try {
            const response = await updateEmployee(id, { employeeName, phone, salary })
            // console.log(response)
            getEmployeeData()
            setEditingId(null)
            setIsEditForm(!isEditForm)
            return response.data
        } catch (error) {
            console.log(error)
        }
    }
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#222022]/80 px-4 py-6 backdrop-blur-sm">
            <form
                onSubmit={(e) => { e.preventDefault(); handleEdit(id) }}
                className="w-full max-w-md rounded-3xl bg-[#fffdf8] p-6 text-[#222022] shadow-2xl sm:p-8"
            >
                <div className="mb-6 flex items-start justify-between gap-4">
                    <div>
                        <p className="text-xs font-black uppercase tracking-[0.2em] text-[#8a8c0a]">Team directory</p>
                        <h2 className="mt-1 text-2xl font-black">Edit employee</h2>
                        <p className="mt-1 text-sm text-[#68645c]">Update the employee details below.</p>
                    </div>
                    <button
                        type="button"
                        aria-label="Close edit form"
                        onClick={() => setIsEditForm(!isEditForm)}
                        className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-[#f4f0e8] text-xl text-[#68645c] transition hover:bg-[#faae62] hover:text-[#222022]"
                    >
                        &times;
                    </button>
                </div>

                <div className="space-y-4">
                    <label className="block text-sm font-bold">
                        Employee name
                        <input
                            type="text"
                            name="username"
                            required
                            className="mt-1 w-full rounded-xl border border-[#d9d3c8] bg-white px-3 py-3 font-normal outline-none transition focus:border-[#8a8c0a] focus:ring-2 focus:ring-[#c3d809]/40"
                            onChange={(e) => setEmployeeName(e.target.value)}
                            value={employeeName}
                        />
                    </label>

                    <label className="block text-sm font-bold">
                        Salary
                        <input
                            type="number"
                            name="salary"
                            min="0"
                            required
                            className="mt-1 w-full rounded-xl border border-[#d9d3c8] bg-white px-3 py-3 font-normal outline-none transition focus:border-[#8a8c0a] focus:ring-2 focus:ring-[#c3d809]/40"
                            onChange={(e) => setSalary(e.target.value)}
                            value={salary}
                        />
                    </label>

                    <label className="block text-sm font-bold">
                        Phone
                        <input
                            type="tel"
                            name="phone"
                            required
                            className="mt-1 w-full rounded-xl border border-[#d9d3c8] bg-white px-3 py-3 font-normal outline-none transition focus:border-[#8a8c0a] focus:ring-2 focus:ring-[#c3d809]/40"
                            onChange={(e) => setPhone(e.target.value)}
                            value={phone}
                        />
                    </label>
                </div>

                <button className="mt-6 w-full rounded-xl bg-[#c3d809] px-4 py-3 font-black text-[#222022] transition hover:bg-[#aebf08]">
                    Save changes
                </button>
            </form>
        </div>
    )
}

export default EditEmployee