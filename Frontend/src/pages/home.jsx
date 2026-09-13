import { useContext, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { EmployeeContext } from '../context/employeeContext'
import EmployeeList from './employeList'
import CreateUser from './createUser'

const Home = () => {
  const { employeeData, getEmployeeData } = useContext(EmployeeContext)

  useEffect(() => {
    getEmployeeData()
  }, [getEmployeeData])

  const employees = Array.isArray(employeeData) ? employeeData : []
  const salaries = employees.map((employee) => Number(employee.salary) || 0)
  const totalPayroll = salaries.reduce((total, salary) => total + salary, 0)
  const averageSalary = employees.length ? totalPayroll / employees.length : 0
  const highestSalary = salaries.length ? Math.max(...salaries) : 0
  const salaryBands = [
    { label: 'Under 25k', min: 0, max: 25000, color: 'bg-[#c3d809]' },
    { label: '25k - 50k', min: 25000, max: 50000, color: 'bg-[#faae62]' },
    { label: 'Over 50k', min: 50000, max: Infinity, color: 'bg-[#8a8c0a]' },
  ].map((band) => ({
    ...band,
    count: salaries.filter((salary) => salary >= band.min && salary < band.max).length,
  }))
  const recentEmployees = [...employees]
    .sort((first, second) => new Date(second.createdAt || 0) - new Date(first.createdAt || 0))
    .slice(0, 5)

  const formatCurrency = (value) => `Rs. ${Math.round(value).toLocaleString('en-IN')}`

  return (
    <main className="min-h-screen bg-[#f4f0e8] px-4 py-6 text-[#222022] sm:px-6 lg:px-8">
      <section className="mx-auto max-w-7xl mb-5">
        <div className="mb-7 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
          <div>
            <p className="mb-2 text-sm font-black uppercase tracking-[0.25em] text-[#8a8c0a]">Contractor overview</p>
            <h1 className="max-w-3xl text-3xl font-black tracking-tight sm:text-5xl">Good work starts with a clear view.</h1>
            <p className="mt-2 text-[#68645c]">Monitor your workforce and monthly payroll at a glance.</p>
          </div>
          {/* <Link to="/create" className="w-fit rounded-xl bg-[#222022] px-5 py-3 text-sm font-black text-[#faae62] transition hover:bg-[#3a383a]">+ Add worker</Link> */}
        </div>

        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          <article className="rounded-2xl bg-[#222022] p-5 text-[#f4f0e8] shadow-lg">
            <p className="text-sm font-bold text-[#c3d809]">Total workers</p>
            <p className="mt-5 text-4xl font-black">{employees.length}</p>
            <p className="mt-2 text-sm text-[#aaa5a0]">Active people on your list</p>
          </article>
          <article className="rounded-2xl bg-[#faae62] p-5 text-[#3e0856] shadow-lg">
            <p className="text-sm font-bold">Monthly payroll</p>
            <p className="mt-5 text-3xl font-black">{formatCurrency(totalPayroll)}</p>
            <p className="mt-2 text-sm text-[#6d3c32]">Based on current salaries</p>
          </article>
          <article className="rounded-2xl bg-[#c3d809] p-5 text-[#222022] shadow-lg">
            <p className="text-sm font-bold">Average salary</p>
            <p className="mt-5 text-3xl font-black">{formatCurrency(averageSalary)}</p>
            <p className="mt-2 text-sm text-[#596000]">Across your workforce</p>
          </article>
          <article className="rounded-2xl border-2 border-[#222022] bg-[#fffdf8] p-5 shadow-lg">
            <p className="text-sm font-bold text-[#8a8c0a]">Highest salary</p>
            <p className="mt-5 text-3xl font-black">{formatCurrency(highestSalary)}</p>
            <p className="mt-2 text-sm text-[#68645c]">Top current salary</p>
          </article>
        </div>

        <div className="mt-6 grid gap-6 lg:grid-cols-[1.15fr_0.85fr]">
          <section className="rounded-2xl bg-[#fffdf8] p-5  sm:p-6 shadow-inner shadow-[#222022]/40">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-sm font-black uppercase tracking-[0.18em] text-[#8a8c0a]">Salary trend</p>
                <h2 className="mt-1 text-xl font-black sm:text-2xl">Where payroll is concentrated</h2>
              </div>
              <span className="rounded-full bg-[#f4f0e8] px-3 py-1 text-xs font-bold text-[#68645c]">Current mix</span>
            </div>
            <div className="mt-8 space-y-5">
              {salaryBands.map((band) => {
                const width = employees.length ? `${Math.max((band.count / employees.length) * 100, band.count ? 8 : 0)}%` : '0%'
                return <div key={band.label}>
                  <div className="mb-2 flex justify-between text-sm font-bold"><span>{band.label}</span><span>{band.count} worker{band.count === 1 ? '' : 's'}</span></div>
                  <div className="h-3 overflow-hidden rounded-full bg-[#eee9df]"><div className={`h-full rounded-full ${band.color} transition-all`} style={{ width }} /></div>
                </div>
              })}
            </div>
            {!employees.length && <p className="mt-6 rounded-xl bg-[#f4f0e8] p-4 text-sm text-[#68645c]">Add your first worker to see salary distribution.</p>}
          </section>

          <section className="rounded-2xl bg-[#222022] p-5 text-[#f4f0e8] shadow-[inset_0_2px_8px_rgba(0,0,0,0.35)] sm:p-6">
            <p className="text-sm font-black uppercase tracking-[0.18em] text-[#faae62]">Workforce pulse</p>
            <h2 className="mt-1 text-2xl font-black">Recent additions</h2>
            <div className="mt-6 space-y-4">
              {recentEmployees.map((employee, index) => <div key={employee._id} className="flex items-center gap-3">
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#c3d809] text-sm font-black text-[#222022]">{index + 1}</span>
                <div className="min-w-0 flex-1"><p className="truncate font-bold">{employee.employeeName}</p><p className="text-xs text-[#aaa5a0]">{employee.phone}</p></div>
                <span className="text-sm font-bold text-[#faae62]">{formatCurrency(Number(employee.salary) || 0)}</span>
              </div>)}
              {!recentEmployees.length && <p className="rounded-xl bg-[#3a383a] p-4 text-sm text-[#aaa5a0]">Your newest workers will appear here.</p>}
            </div>
          </section>
        </div>
      </section>

      <EmployeeList />

      <CreateUser />
    </main>
  )
}

export default Home