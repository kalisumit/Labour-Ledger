import Navbar from "./component/navbar.jsx"
import CreateUser from "./pages/createUser.jsx"
import { Navigate, Route, BrowserRouter as Router, Routes } from 'react-router-dom'
import Home from "./pages/home.jsx"
import Attendence from "./pages/attendence.jsx"
import Salary from "./pages/salary.jsx"
import Login from "./pages/login.jsx"
import Signup from "./pages/signup.jsx"
import EmployeeList from "./pages/employeList.jsx"

const ProtectedRoute = ({ children }) => {
  return localStorage.getItem('token') ? children : <Navigate to="/login" replace />
}

function App() {

  return (
    <Router>
      <Navbar />
      <div className="pb-15 md:pb-0">
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path='/home' element={<ProtectedRoute><Home /></ProtectedRoute>} />
        <Route path='/attendance' element={<ProtectedRoute><Attendence /></ProtectedRoute>} />
        <Route path='/create' element={<ProtectedRoute><CreateUser /></ProtectedRoute>} />
        <Route path='/salary' element={<ProtectedRoute><Salary /></ProtectedRoute>} />
          <Route path='/team' element={<ProtectedRoute><EmployeeList /></ProtectedRoute>}/>
        <Route path="*" element={<Navigate to={localStorage.getItem('token') ? '/home' : '/login'} replace />} />
      </Routes>
      </div>
    </Router>
  )
}

export default App
