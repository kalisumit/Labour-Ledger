import { useContext, useEffect } from 'react'
import { EmployeeContext } from '../context/employeeContext'
import { getAttendanceByDate, markAttendance } from '../services/userAPI'
import { useState } from 'react'

const Attendence = () => {
    const { employeeData, getEmployeeData, curDate, setCurDate, getToday, shiftDate } = useContext(EmployeeContext)

    const [attendanceData, setAttendanceData] = useState([])
    const [draftData, setDraftData] = useState({})
    const [isEditing, setIsEditing] = useState(false)
    const [isTodaysLocked, setIsTodayLocked] = useState(false)


    const today = getToday();
    const isPastDate = curDate < today;

    const changeDate = (date) => {
        setCurDate(date)
        setIsEditing(false)
        setIsTodayLocked(false)
    }

    useEffect(() => {
        getEmployeeData();
    }, [getEmployeeData])

    useEffect(() => {
        const loadAttendance = async () => {
            try {
                const response = await getAttendanceByDate(curDate)
                const safeResponse = Array.isArray(response) ? response : [];
                // console.log(response)
                setAttendanceData(response);

                const draft = {};
                safeResponse.forEach((item) => {
                    if (item?.employeeId?._id) {
                        draft[item.employeeId._id] = {
                            status: item.status,
                            overTime: item.overTime ?? 0
                        }
                    }
                })
                setDraftData(draft)
                setAttendanceData(safeResponse)
            } catch (error) {
                console.log(error)
                setAttendanceData([])
                setDraftData({})
            }
        }
        if (curDate) loadAttendance();
    }, [curDate])

    const handleChangeAttendance = (employeeId, status) => {
        setDraftData((prev) => ({
            ...prev,
            [employeeId]: {
                ...(prev[employeeId] ?? {}),
                status,
            }
        }));
    }

    const handleSubmitAttendance = async () => {
        try {
            for (const [employeeId, value] of Object.entries(draftData)) {
                if (!value?.status || !["Present", "Absent"].includes(value.status)) {
                    continue
                }
                await markAttendance(
                    employeeId,
                    curDate,
                    value.status,
                    Number(value.overTime ?? 0)
                );
            }

            const response = await getAttendanceByDate(curDate);
            setAttendanceData(response);
            setIsEditing(false);
            if (curDate === today) setIsTodayLocked(true);
        } catch (error) {
            console.error(error);
        }
    };

    const handleChangeOvertime = (employeeId, overTime) => {
        setDraftData((prev) => ({
            ...prev,
            [employeeId]: {
                ...(prev[employeeId] ?? {}),
                overTime,
            },
        }));
    };


    return (
        <main className='min-h-screen bg-[#f4f0e8] px-4 py-6 text-[#222022] sm:px-6 lg:px-8'>
            <section className='mx-auto max-w-7xl rounded-3xl bg-[#222022] p-5 text-[#f4f0e8] shadow-xl sm:p-8 '>
                <div className="mb-7 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
                    <div className='text-center md:text-left'>
                        <p className="text-sm  font-black uppercase tracking-[0.2em] text-[#c3d809]">
                            Daily operations
                        </p>
                        <h1 className="mt-1 text-3xl font-black sm:text-4xl">
                            Employee attendance
                        </h1>
                        <p className="mt-2 text-sm text-[#aaa5a0]">
                            Record presence and overtime for your workforce.
                        </p>
                    </div>
                    <div className="flex justify-center md:justify-start items-center gap-3 ">
                        <span className="text-sm text-[#aaa5a0]">{attendanceData.length} Marked</span>

                        {isPastDate && !isEditing && <button onClick={() => setIsEditing(true)} className="rounded-xl border border-[#faae62] px-4  py-2 font-bold text-[#faae62]">
                            Mark Attendance
                        </button>}
                    </div>
                </div>
                <div className="flex items-center justify-around gap-3 rounded-2xl bg-[#302e30] p-3 ">
                    <button className='rounded-lg px-3 py-2 text-sm md:text-2xl font-bold text-[#faae62] active:bg-[#919091] hover:bg-[#3e3b3e]' onClick={() => changeDate(shiftDate(curDate, -1))}>
                        ← Previous
                    </button>
                    <input
                        type='date'
                        className='rounded-xl border-2 border-[#575457] bg-[#fffdf8] p-3 font-bold text-[#222022]'
                        value={curDate}
                        max={today}
                        onChange={(e) => {
                            const selectedDate = e.target.value;
                            if (selectedDate <= getToday()) {
                                changeDate(selectedDate);
                            }
                        }} />
                    <button
                        className={`rounded-lg px-3 py-2 text-sm font-bold ${curDate >= today ? 'text-[#767676]' : 'text-[#FAAE62] active:bg-[#919091] hover:bg-[#3e3b3e] '}`}
                        onClick={() => {
                            const next = shiftDate(curDate, 1)
                            changeDate(next > today ? today : next)
                        }}
                        disabled={curDate >= today}>
                        {'Next →'}
                    </button>
                </div>
                <div className="mt-6 overflow-x-auto">
                    <div className="min-w-0 space-y-2 md:min-w-190">
                        <div className="hidden grid-cols-[0.5fr_2fr_1.2fr_1fr_1.4fr_1.4fr] gap-3 px-4 py-3 text-xs font-black uppercase tracking-wider text-[#aaa5a0] md:grid">
                            <span>S.no</span>
                            <span>Worker</span>
                            <span>Salary</span>
                            <span>Overtime</span>
                            <span>Attendance</span>
                            <span>Status</span>
                        </div>
                        {employeeData.map((user, index) => {
                            const attendance = draftData[user._id] || {};
                            const status = attendance.status || 'default';
                            const overTime = attendance.overTime ?? 0;
                            const canEdit = !isPastDate ? !isTodaysLocked || isEditing : isEditing;
                            return <div
                                key={user._id}
                                className={` ${status == "default" ? 'bg-[#575457]' : status == "Absent" ? 'bg-[#6d1919]' : 'bg-[#445622]'} grid grid-cols-4 text-center md:text-left items-center gap-3 rounded-2xl px-4 py-3 md:grid-cols-[0.5fr_2fr_1.2fr_1fr_1.4fr_1.4fr]`}>
                                <p className="hidden md:block font-bold text-[#c3d809] md:col-auto">{String(index + 1).padStart(2, '0')}</p>
                                <p className="font-bold md:col-auto">{user.employeeName}</p>
                                <p className='hidden lg:block font-semibold'>{Number(user.salary).toLocaleString('en-IN')}</p>
                                {!canEdit && <p className=''>Overtime: {overTime}</p>}
                                {
                                    canEdit ? (
                                        <>
                                            <input
                                                type="number"
                                                min="0"
                                                placeholder='Overtime'
                                                value={draftData[user._id]?.overTime ?? ""}
                                                onChange={(e) => handleChangeOvertime(user._id, e.target.value)}
                                                className='w-full rounded-2xl bg-white p-2 text-center text-black md:w-[65%]'
                                            />


                                            <button
                                                onClick={() => handleChangeAttendance(user._id, "Present")}
                                                className="w-full rounded-lg bg-[#c3d809] px-3 py-2 text-sm font-black text-[#222022] md:w-auto"
                                            >
                                                Present
                                            </button>
                                            <button
                                                onClick={() => handleChangeAttendance(user._id, "Absent")}
                                                className="w-full rounded-lg bg-[#faae62] px-3 py-2 text-sm font-black text-[#3e0856] md:w-auto"
                                            >
                                                Absent
                                            </button>
                                        </>
                                    ) : (<>

                                            <button className={`w-full rounded-lg ${status == "default" ? "bg-[#5a5d58]" : status == "Present" ? "bg-[#21de10]" : "bg-[#f53c04]"} px-3 py-2 text-sm font-bold text-[#222022] md:w-auto`} disabled>
                                            {status == "default" ? "Locked" : status == "Present" ? "Present" : "Absent"}
                                        </button>
                                    </>

                                    )
                                }
                            </div>
                        })}</div></div>

                <button
                    onClick={handleSubmitAttendance}
                    className="mt-6 w-full rounded-xl bg-[#faae62] px-6 block py-3 sm:ml-auto font-black text-[#3e0856] sm:w-auto"
                >
                    Save attendance
                </button>
            </section>
        </main>
    )
}

export default Attendence