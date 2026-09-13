import { useEffect, useState, useRef } from 'react'
import { NavLink, Link, useLocation, useNavigate } from 'react-router-dom'
import full_logo from '../assets/full_logo.svg'

const links = ['Home', 'Team', 'Salary', 'Attendance']


const getStoredContractor = () => {
  const storedContractor = localStorage.getItem('contractor')
  return storedContractor ? JSON.parse(storedContractor) : null
}

const Navbar = () => {
  const [contractor, setContractor] = useState(getStoredContractor)
  const navigate = useNavigate()

  useEffect(() => {
    const refreshContractor = () => setContractor(getStoredContractor())
    window.addEventListener('contractor-session-change', refreshContractor)
    return () => window.removeEventListener('contractor-session-change', refreshContractor)
  }, [])

  const handleLogout = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('contractor')
    setContractor(null)
    navigate('/login', { replace: true })
  }

  const location = useLocation()

  const activeIndex = links.findIndex(
    (link) => `/${link.toLowerCase()}` === location.pathname
  )

  // Drop Down Menu on Mobile Screen 

  const UserMenu = ({ contractor, handleLogout }) => {
    const [isOpen, setIsOpen] = useState(false)
    const menuRef = useRef(null)

    useEffect(() => {
      const closeMenu = (event) => {
        if (!menuRef.current?.contains(event.target)) {
          setIsOpen(false)
        }
      }

      document.addEventListener('mousedown', closeMenu)
      return () => document.removeEventListener('mousedown', closeMenu)
    }, [])

    return (
      <div ref={menuRef} className="relative">
        <button
          type="button"
          onClick={() => setIsOpen((open) => !open)}
          className="flex items-center gap-2 rounded-lg px-3 py-2 text-[#faae62] transition hover:bg-[#3e3b3e]"
        >
          <span className="grid h-8 w-8 place-items-center rounded-full bg-[#c3d809] text-[#222022]">
            {contractor.username[0].toUpperCase()}
          </span>

          <span className="max-w-32 truncate">{contractor.username}</span>
          <span className={`transition-transform ${isOpen ? 'rotate-180' : ''}`}>
            ▼
          </span>
        </button>

        {isOpen && (
          <div className="absolute right-0 top-full z-50 mt-2 w-52 text-left rounded-xl border border-[#575457] bg-[#302e30] p-2 shadow-xl">
            <Link
              to="/create"
              className="block rounded-lg px-3 py-2 text-sm hover:bg-[#3e3b3e]"
              onClick={() => setIsOpen(false)}
            >
              Add Employee
            </Link>

            <Link
              to="/settings"
              className="block rounded-lg px-3 py-2 text-sm hover:bg-[#3e3b3e]"
              onClick={() => setIsOpen(false)}
            >
              Dashboard
            </Link>

            <button
              type="button"
              onClick={handleLogout}
              className="w-full rounded-lg px-3 py-2 text-left text-[#f5d7d2] transition hover:bg-[#8c3f3f] hover:text-white"
            >
              Log out
            </button>
          </div>
        )}
      </div>
    )
  }


  return (
    <>
      <nav className="sticky top-0 z-50 hidden flex-wrap items-center justify-between gap-3 bg-[#222022] px-4 py-3 text-[#f4f0e8] shadow-md sm:px-8 sm:py-4 lg:flex">
        <Link to={contractor ? '/home' : '/login'} className="text-lg font-black tracking-tight text-[#c3d809] sm:text-xl"><img src={full_logo} alt="Labour Ledger" className="h-10 w-auto object-contain sm:h-12 rounded-sm" /></Link>
        {contractor ? <div className="grid w-full grid-cols-4 gap-2 text-center text-xs font-bold sm:flex sm:w-auto sm:flex-1 sm:flex-wrap sm:items-center sm:justify-end sm:gap-6 sm:text-sm">
          {links.map((link) => <Link key={link} to={`/${link.toLowerCase()}`} className="rounded-md py-1 transition hover:text-[#faae62]">{link}</Link>)}
          <span className="hidden h-6 w-px bg-[#575457] sm:block" />
          <UserMenu
            contractor={contractor}
            handleLogout={handleLogout}
          />
        </div> : <div className="flex items-center gap-3 text-sm font-bold">
          <Link to="/signup" className="transition hover:text-[#faae62]">Create account</Link>
          <Link to="/login" className="rounded-lg bg-[#faae62] px-4 py-2 text-[#3e0856]">Log in</Link>
        </div>}
      </nav>



      {/* Mobile View  */}
      <nav className="sticky top-0 z-50 flex flex-wrap items-center justify-between gap-3 bg-[#222022] px-6 py-3 text-[#f4f0e8] shadow-md lg:hidden">
        <Link to={contractor ? '/home' : '/login'} className="text-lg font-black tracking-tight text-[#c3d809] sm:text-xl">
        <img
          src={full_logo}
          alt="Labour Ledger"
          className="h-9 w-auto object-contain"
        /></Link>
        {contractor ? (
          <UserMenu
            contractor={contractor}
            handleLogout={handleLogout}
          />
        )
          // <button type="button" onClick={handleLogout} className="rounded-lg border border-[#faae62] px-2 py-2 text-[#faae62] transition hover:bg-[#faae62] hover:text-[#222022] sm:px-3">Log out</button></>
          :
          <>
            <Link to="/signup" className="transition hover:text-[#faae62]">Create account</Link>
            <Link to="/login" className="rounded-lg bg-[#faae62] px-4 py-2 text-[#3e0856]">Log in</Link>
          </>}
        {contractor ? <div className="fixed inset-x-0 bottom-0 z-50 grid w-full grid-cols-4 bg-[#222022] py-3">
          <span
            className="absolute inset-y-2 w-1/4 rounded-md bg-[#faae62] transition-transform duration-300 ease-in-out"
            style={{
              left: '0.5rem',
              width: 'calc((100% - 1rem) / 4)',
              transform: `translateX(${Math.max(activeIndex, 0) * 100}%)`,
            }}
          />

          {links.map((link) => (
            <NavLink
              key={link}
              to={`/${link.toLowerCase()}`}
              className={({ isActive }) =>
                `relative z-10 py-2 text-center transition-colors font-bold duration-300 ${isActive
                  ? 'text-[#222022]'
                  : 'text-[#f4f0e8]  hover:text-[#faae62]'
                }`
              }
            >
              {link}
            </NavLink>
          ))}
        </div> : <div className="flex items-center gap-3 text-sm font-bold">
        </div>}
      </nav>
    </>
  )
}

export default Navbar