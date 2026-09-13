import { useContext, useEffect, useState } from "react"
import { deleteEmployee } from "../services/userAPI"
import { EmployeeContext } from "../context/employeeContext"
import EditEmployee from "../component/editEmployee"
import { CiEdit } from "react-icons/ci";
import { MdDeleteForever } from "react-icons/md";


const EmployeeList = () => {

    const { getEmployeeData, employeeData, editingId, setEditingId, isEditForm, setIsEditForm } = useContext(EmployeeContext);
    const [employeeToDelete, setEmployeeToDelete] = useState(null)
    const employees = Array.isArray(employeeData) ? employeeData : []

    const handleDelete = async (id) => {
        try {
            const response = await deleteEmployee(id)
            console.log(response.data)
            await getEmployeeData()
            return response.data
        } catch (error) {
            console.log(error);
        }
    }

    const confirmDelete = async () => {
        if (!employeeToDelete) return

        await handleDelete(employeeToDelete._id)
        setEmployeeToDelete(null)
    }

    const handleStartEditing = (user) => {
        setEditingId(user._id)
        setIsEditForm(!isEditForm)
    }

    useEffect(() => {
        getEmployeeData()
    }, [getEmployeeData])

    return (
        <section className="mx-auto mb-8 max-w-7xl rounded-3xl bg-[#fffdf8]  md:p-4 sm:p-4">
            <div className="mb-6 flex items-end justify-between px-4 pt-2 md:p-2 sm:p-4 gap-4">
                <div className="md:text-left text-center">
                    <p className="text-sm font-black uppercase tracking-[0.2em] text-[#8a8c0a]">
                        Directory
                    </p>
                    <h1 className="mt-1 md:mt-0 text-3xl font-black">
                        Your team
                    </h1>
                </div>
                <span className="rounded-full bg-[#f4f0e8] px-3 py-1 text-sm font-bold text-[#68645c]">
                    {`${employeeData.length} total`}
                </span>
            </div>
            {employees.length
                ?
                <div className="overflow-x-auto ">
                    <div className="min-w-0 overflow-hidden rounded-2xl border border-[#e4dfd4] md:min-w-170">
                        <div className="grid grid-cols-5 text-center md:grid-cols-[0.5fr_2fr_1.3fr_1.2fr_1fr_1fr] gap-3 bg-[#222022] px-4 py-3 text-xs font-black uppercase tracking-wider text-[#f4f0e8] md:grid">
                            <span className="hidden md:block">S.no</span>
                            <span>Name</span>
                            <span>Phone</span>
                            <span>Salary</span>
                            <span className="col-span-2">Action</span>

                            {/* <span className="hidden md:block">Edit</span>
                        <span className="hidden md:block">Delete</span> */}
                        </div>
                        {employees.map((user, index) =>
                            <div key={user._id} className="grid grid-cols-5 items-center text-center gap-3 border-t  border-[#e4dfd4] px-4 py-4 text-sm md:grid-cols-[0.5fr_2fr_1.3fr_1.2fr_1fr_1fr]">
                                <span className="hidden md:block font-bold text-[#8a8c0a]">
                                    {String(index + 1).padStart(2, '0')}
                                </span>
                                <span className="font-bold">{user.employeeName}</span>
                                <span className="text-[#68645c] font-semibold">{user.phone}</span>
                                <span className="font-semibold">{Number(user.salary || 0).toLocaleString('en-IN')}</span>

                                <div className="md:hidden col-span-2 flex gap-1 w-full">
                                    {/* Edit Button  */}
                                    <button onClick={() => handleStartEditing(user)} className="w-full rounded-lg bg-[#faae62] px-3 py-2 font-bold - text-[#3e0856] md:w-auto">
                                        <CiEdit className="mx-auto text-lg" />
                                    </button>
                                    {/* Delete Button  */}
                                    <button onClick={() => setEmployeeToDelete(user)} className="w-full rounded-lg bg-[#f5d7d2] px-3 py-2 font-bold text-[#a5382c] md:w-auto">
                                        <MdDeleteForever className="mx-auto text-lg" />
                                    </button>
                                </div>
                                <button onClick={() => handleStartEditing(user)} className="w-full hidden md:block rounded-lg bg-[#faae62] px-3 py-2 font-bold - text-[#3e0856] md:w-auto">
                                    <CiEdit className="mx-auto text-lg" />
                                </button>
                                {/* Delete Button  */}
                                <button onClick={() => setEmployeeToDelete(user)} className="w-full hidden md:block rounded-lg bg-[#f5d7d2] px-3 py-2 font-bold text-[#a5382c] md:w-auto">
                                    <MdDeleteForever className="mx-auto text-lg" />
                                </button>
                            </div>
                        )}
                    </div>
                </div>
                :
                <div className="rounded-2xl bg-[#f4f0e8] p-8 text-center">
                    <p className="text-lg font-bold">No workers yet</p>
                    <p className="mt-1 text-sm text-[#68645c]">Add your first worker above to start building the directory.</p>
                </div>}
            {isEditForm && <EditEmployee id={editingId} />}
            {employeeToDelete && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#222022]/80 px-4 backdrop-blur-sm">
                    <div className="w-full max-w-md rounded-3xl bg-[#fffdf8] p-6 text-[#222022] shadow-2xl sm:p-8">
                        <p className="text-xs font-black uppercase tracking-[0.2em] text-[#a5382c]">Confirm deletion</p>
                        <h2 className="mt-2 text-2xl font-black">Remove this employee?</h2>
                        <p className="mt-2 text-sm text-[#68645c]">
                            This will permanently delete <strong>{employeeToDelete.employeeName}</strong> from your team.
                        </p>
                        <div className="mt-6 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
                            <button
                                type="button"
                                onClick={() => setEmployeeToDelete(null)}
                                className="rounded-xl border border-[#d9d3c8] px-4 py-3 font-bold text-[#68645c] transition hover:bg-[#f4f0e8]"
                            >
                                Cancel
                            </button>
                            <button
                                type="button"
                                onClick={confirmDelete}
                                className="rounded-xl bg-[#a5382c] px-4 py-3 font-black text-white transition hover:bg-[#843027]"
                            >
                                Delete employee
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </section>
    )
}

export default EmployeeList;