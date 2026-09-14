import { useContext, useState } from "react";
import { EmployeeContext } from "../context/employeeContext";
import EmployeeList from "./employeList";
import { MdOutlineDone } from "react-icons/md";
import { Link } from "react-router-dom";


function CreateUser() {
    const [employee, setEmployee] = useState({ employeeName: "", salary: "", phone: "" })
    const [message, setMessage] = useState(null)

    const { getEmployeeData, createEmployeeData } = useContext(EmployeeContext)

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = { employeeName: employee.employeeName, salary: employee.salary, phone: employee.phone }

        try {
            await createEmployeeData(formData)
            // await getEmployeeData()
            setMessage({
                type: "success",
                text: `Worker created successfully!`,
            })
            setEmployee({ employeeName: "", salary: "", phone: "" })
        } catch (error) {
            console.error(error)
            setMessage({
                type: "error",
                text: "Failed to create worker .",
            })
        }
        setTimeout(() => setMessage(null), 3000)
    }

    const handleInput = (e) => {
        // const {name, value} = e.target;
        const name = e.target.name;
        const value = e.target.value;
        setEmployee((prev) => {
            return { ...prev, [name]: value }
        })
    }

    return (
        <>
        <section className="mx-4 my-6 rounded-3xl bg-[#222022] p-5 text-[#f4f0e8] shadow-xl sm:mx-auto sm:my-8 sm:max-w-7xl sm:p-8">
            <Link to="/create" className="w-fit rounded-xl bg-[#222022] px-5 py-3 text-sm font-black text-[#faae62] transition hover:bg-[#3a383a]">+ Add worker</Link>
            <div className="mb-7"><p className="text-sm font-black uppercase tracking-[0.2em] text-[#c3d809]">Team management</p><h1 className="mt-1 text-3xl font-black">Add a worker</h1><p className="mt-2 text-sm text-[#aaa5a0]">Create a profile so they appear in your payroll and attendance views.</p></div>
                {message && (
                    <div
                        role="status"
                        aria-live="polite"
                        className={`fixed right-5 top-5 z-50 w-[calc(100vw-2.5rem)] max-w-sm rounded-xl px-5 py-4 font-bold shadow-2xl ${message.type === "success"
                                ? "bg-[#c3d809] text-[#222022]"
                                : "bg-[#f5d7d2] text-[#a5382c]"
                            }`}
                    >
                        {message.text}
                    </div>
                )}
            <form className="grid gap-4 md:grid-cols-3" onSubmit={handleSubmit}>
                <div><label htmlFor="employeeName" className="mb-2 block text-sm font-bold">Full name</label><input id="employeeName" type="text" name="employeeName" required className="w-full rounded-xl border-2 border-[#575457] bg-[#302e30] px-4 py-3 outline-none focus:border-[#c3d809]" onChange={handleInput} value={employee.employeeName} /></div>
                <div><label htmlFor="salary" className="mb-2 block text-sm font-bold">Monthly salary</label><input id="salary" type="number" min="0" name="salary" required className="w-full rounded-xl border-2 border-[#575457] bg-[#302e30] px-4 py-3 outline-none focus:border-[#c3d809]" onChange={handleInput} value={employee.salary} /></div>
                <div><label htmlFor="phone" className="mb-2 block text-sm font-bold">Phone number</label><input id="phone" type="tel" name="phone" required className="w-full rounded-xl border-2 border-[#575457] bg-[#302e30] px-4 py-3 outline-none focus:border-[#c3d809]" onChange={handleInput} value={employee.phone} /></div>
                <button type="submit" className="w-full rounded-xl bg-[#faae62] px-5 py-3 font-black text-[#3e0856] transition hover:bg-[#ffc17d] md:col-span-3 md:w-auto md:justify-self-end">Save worker</button>
            </form>
        </section>
            {/* <EmployeeList/> */}
        </>
    )
}

export default CreateUser
