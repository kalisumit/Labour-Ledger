import { useContext, useEffect, useState } from 'react'
import { EmployeeContext } from '../context/employeeContext'
import { getAttendanceByRange } from '../services/userAPI'


const Salary = () => {
  const { employeeData, getEmployeeData, curDate } = useContext(EmployeeContext)

  const [endDate, setEndDate] = useState(curDate)
  const [attendanceByRange, setAttendanceByRange] = useState([])
  const [enteringManually, setEnteringManually] = useState(false)

  const [manualEntries, setManualEntries] = useState({})

  const getFirstDayOfMonth = (dateString) => {
    const date = new Date(dateString)
    return new Date(date.getFullYear(), date.getMonth(), 1).toISOString().split('T')[0]
  }
  const [startDate, setStartDate] = useState(() => getFirstDayOfMonth(curDate))

  useEffect(() => {
    const loadAttendance = async () => {
      try {
        const records = await getAttendanceByRange(startDate, endDate)
        setAttendanceByRange(Array.isArray(records) ? records : [])
      } catch (error) {
        console.error(error)
        setAttendanceByRange([])
      }
    }
    loadAttendance()
  }, [startDate, endDate, getEmployeeData])

  const handleManualChange = (employeeId, field, value) => {
    setManualEntries((prev) => (
      {
        ...prev, [employeeId]: {
          ...(prev[employeeId] || {}),
          [field]: value === "" ? "" : Number(value)
        }
      }
    ))
  }

  const totalDays = Math.max(1, Math.floor((new Date(endDate) - new Date(startDate)) / (1000 * 60 * 60 * 24)))


  const employeeSummary = employeeData.map((user) => {
    const records = attendanceByRange.filter(
      (item) => item?.employeeId?._id === user._id
    )

    const autoWorkingDays = records.filter((item) => item.status === "Present").length
    const autoOvertime = records.reduce((sum, item) => sum + Number(item.overTime || 0), 0)

    const workingDays = enteringManually ? Number(manualEntries[user._id]?.workingDays || 0) : autoWorkingDays;
    const overtime = enteringManually ? Number(manualEntries[user._id]?.overtime || 0) : autoOvertime

    const payableSalary = Math.round((Number(user.salary || 0) / 30 / 8) * (workingDays * 8 + overtime))

    return {
      ...user, workingDays, overtime, payableSalary
    }
  })

  const overallTotalSalary = employeeSummary.reduce((sum, user) => sum + Number(user.payableSalary || 0), 0)
  const formattedOverallTotalSalary = new Intl.NumberFormat("en-IN").format(overallTotalSalary)

  useEffect(() => {
    getEmployeeData()
  }, [startDate, endDate, getEmployeeData])

  return (
    <main className="min-h-screen bg-[#f4f0e8] px-4 py-6 text-[#222022] sm:px-6 lg:px-8">
      <section className="mx-auto max-w-7xl rounded-3xl bg-[#222022] p-5 text-[#f4f0e8] shadow-xl sm:p-8">
        <div className="mb-6 flex flex-col justify-between gap-3 sm:mb-7 sm:flex-row sm:items-end">
          <div>
            <p className="hidden text-sm font-black uppercase tracking-[0.2em] text-[#c3d809] sm:block">
              Payroll desk
            </p>
            <h1 className="text-2xl font-black sm:mt-1 sm:text-4xl">
              Salary calculator
            </h1>
            <p className="mt-1 hidden text-sm text-[#aaa5a0] sm:block">
              Review payable salary from attendance and overtime.
            </p>
          </div>
          <button className='w-full rounded-xl border border-[#faae62] px-4 py-3 text-sm font-bold text-[#faae62] sm:w-auto sm:py-2' onClick={() => setEnteringManually(!enteringManually)}>
            {enteringManually ? 'Use attendance data' : 'Calculate manually'}
            </button>
        </div>
        {
          !enteringManually && 
            <div className='w-full flex  gap-3 rounded-2xl bg-[#302e30] p-3 sm:flex sm:items-center justify-between sm:gap-4 sm:p-4'>

              <label className='flex min-w-0 flex-col gap-1 text-center text-xs font-bold text-[#aaa5a0] sm:text-xl sm:text-white'>{"From"}
                <input
                  type='date'
                  className='min-w-0 rounded-xl border-2 border-[#575457] bg-[#fffdf8] p-2 text-xs font-bold text-[#222022] sm:p-3 sm:text-sm'
                  value={startDate}
                  max={curDate}
                  onChange={(e) => {
                    const selectedDate = e.target.value;
                    setStartDate(selectedDate)
                  }} />
              </label>

              <p className='col-span-2 text-center text-sm font-bold text-[#faae62] sm:order-2 sm:text-xl sm:text-white'>Total Days: {totalDays}</p>
              <label className='order-2 flex min-w-0 flex-col gap-1 text-center text-xs font-bold text-[#aaa5a0] sm:order-3 sm:text-xl sm:text-white'>{"To"}
                <input
                  type='date'
                  className='min-w-0 rounded-xl border-2 border-[#575457] bg-[#fffdf8] p-2 text-xs font-bold text-[#222022] sm:p-3 sm:text-sm'
                  value={endDate}
                  max={curDate}
                  onChange={(e) => {
                    const selectedDate = e.target.value;
                    setEndDate(selectedDate)
                  }} />
              </label>
            </div>
        }
        <div className="mt-6 overflow-x-auto">
          <div className="min-w-0 overflow-hidden text-center rounded-2xl border border-[#575457] md:min-w-175">
            <div className="grid grid-cols-4 md:grid-cols-[0.5fr_2fr_1.1fr_1.1fr_1.1fr_1.2fr] md:gap-3 bg-[#f4f0e8] px-4 py-3 text-xs font-black uppercase tracking-wider text-[#222022]">
              <p className='hidden md:block'>S.No.</p>
              <p className='hidden md:block'>Employee Name</p>
              <p className='md:hidden'>Name</p>
              <p className='hidden md:block'>Salary</p>
              <p className='hidden md:block'>Working Days</p>
              <p className='md:hidden'>Days</p>
              <p>Overtime</p>
              <p> Total</p>
            </div>

            {
              employeeSummary.map((user, index) => (
                <div
                  key={user._id}
                  className="grid grid-cols-4 text-center items-center gap-x-4 gap-y-3 border-t border-[#575457] bg-[#302e30] px-4 py-4 text-sm md:grid-cols-[0.5fr_2fr_1.1fr_1.1fr_1.1fr_1.2fr]"
                >
                  <p className="hidden font-bold text-[#c3d809] md:block">{String(index + 1).padStart(2, '0')}</p>
                  <p className="truncate text-left md:text-center width-full font-bold  md:text-sm">{user.employeeName}</p>
                  {/* <p>{user.phone}</p> */}
                  <p className="hidden md:block">{Number(user.salary).toLocaleString('en-IN')}</p>
                  {!enteringManually ?
                    <p>
                      {user.workingDays}
                    </p>
                    :<div>
                    {/* <span className='md:hidden block pb-1 font-semibold text-amber-600'>Working Days : </span> */}
                    <input
                      type='number'
                      onChange={(e) => handleManualChange(user._id, "workingDays", e.target.value)}
                      value={manualEntries[user._id]?.workingDays ?? ""}
                      placeholder='0'
                      aria-label={`Working days for ${user.employeeName}`}
                        className='w-full rounded bg-white px-1 py-1 text-black md:w-[50%] md:p-0.5 mx-auto text-center' /></div>}
                  {!enteringManually ?
                    <p>{user.overtime}</p>
                    :
                    <div>
                      {/* <span className='md:hidden block pb-1 font-semibold text-amber-600'>Overtime : </span> */}
                      <input
                        type='number'
                        onChange={(e) => handleManualChange(user._id, "overtime", e.target.value)}
                        value={manualEntries[user._id]?.overtime ?? ""}
                        placeholder='0'
                        aria-label={`Overtime for ${user.employeeName}`}
                        className='w-full rounded bg-white px-1 py-1 text-black md:w-[50%] md:p-0.5 mx-auto text-center' />
                    </div>}
                  <div className='flex justify-center md:hidden' >
                    {/* <span className='p-2 font-semibold'>Salary :</span> */}
                    <p className="rounded-lg p-2  font-black text-center md:col-auto md:rounded-none md:bg-transparent md:p-0 ">{Number(user.payableSalary).toLocaleString('en-IN')}</p>
                  </div>
                  <p className="rounded-lg p-2 hidden md:block font-black text-center md:col-auto md:rounded-none md:bg-transparent md:p-0 ">{Number(user.payableSalary).toLocaleString('en-IN')}</p>
                </div>
              ))
            }
            <div className="grid grid-cols-2 items-center gap-3 border-t border-[#575457] bg-[#302e30] px-4 py-4 text-sm md:grid-cols-[0.5fr_2fr_1.1fr_1.1fr_1.1fr_1.2fr]">
              <p className="col-span-1 text-right font-bold md:col-start-5">Total salary:</p>
              <p className="rounded-xl bg-[#c3d809] p-2 text-center font-black text-[#222022]">Rs. {formattedOverallTotalSalary}</p>

            </div>
          </div>
        </div>
      </section>
    </main>
  )
}

export default Salary