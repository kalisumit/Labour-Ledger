import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { loginContractor } from '../services/userAPI'

const Login = () => {
  const [data, setData] = useState({ email: "", password: "" })
  const [error, setError] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const navigate = useNavigate()

  const handleInput = (e) => {
    const { name, value } = e.target
    setData((prev) => {
      return { ...prev, [name]: value }
    })
    // console.log(data)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError("")
    setIsSubmitting(true)

    try {
      const response = await loginContractor(data)
      localStorage.setItem("token", response.token)
      localStorage.setItem("contractor", JSON.stringify(response.user))
      window.dispatchEvent(new Event('contractor-session-change'))
      navigate('/home', { replace: true })
    } catch (error) {
      setError(error.response?.data?.message || "Unable to login. Please check your credentials.")
    } finally {
      setIsSubmitting(false)
    }
  }
  return (
    <main className="min-h-[calc(100vh-72px)] bg-[#f4f0e8] px-4 py-6 text-[#222022] sm:px-5 sm:py-12">
      <div className="mx-auto grid max-w-5xl overflow-hidden rounded-3xl bg-[#222022] shadow-2xl md:grid-cols-[1.05fr_0.95fr] md:rounded-4xl">
        <section className="relative flex min-h-72 flex-col justify-between overflow-hidden p-6 text-[#f4f0e8] sm:min-h-123 sm:p-12">
          <div className="absolute -right-24 -top-24 h-72 w-72 rounded-full bg-[#c3d809] opacity-90" />
          <div className="absolute -bottom-28 -left-20 h-64 w-64 rounded-full border-[3rem] border-[#faae62] opacity-80" />
          <div className="relative">
            <p className="mb-6 text-sm font-bold uppercase tracking-[0.3em] text-[#c3d809]">Labour Ledger</p>
            <h1 className="max-w-md text-4xl font-black leading-[0.95] tracking-tight sm:text-6xl">Your workforce, in view.</h1>
            <p className="mt-4 max-w-sm text-base leading-6 text-[#ddd8ce] sm:mt-6 sm:text-lg sm:leading-7">Sign in to manage your team, track attendance, and keep every detail close at hand.</p>
          </div>
          <div className="relative flex items-center gap-3 text-sm font-semibold text-[#faae62]">
            <span className="h-2 w-2 rounded-full bg-[#c3d809]" />
            Contractor workspace
          </div>
        </section>

        <section className="bg-[#fffdf8] p-6 sm:p-12">
          <div className="mb-10">
            <p className="mb-2 text-sm font-bold uppercase tracking-[0.2em] text-[#8a8c0a]">Welcome back</p>
            <h2 className="text-2xl font-black tracking-tight text-[#222022] sm:text-3xl">Log in to continue</h2>
            <p className="mt-2 text-[#68645c]">Use your contractor account credentials.</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label htmlFor="email" className="mb-2 block text-sm font-bold text-[#38352f]">Email address</label>
              <input id="email" onChange={handleInput} value={data.email} className="w-full rounded-xl border-2 border-[#e4dfd4] bg-[#f8f5ee] px-4 py-3.5 outline-none transition focus:border-[#c3d809]" name="email" type="email" autoComplete="email" required />
            </div>
            <div>
              <label htmlFor="password" className="mb-2 block text-sm font-bold text-[#38352f]">Password</label>
              <input id="password" onChange={handleInput} value={data.password} className="w-full rounded-xl border-2 border-[#e4dfd4] bg-[#f8f5ee] px-4 py-3.5 outline-none transition focus:border-[#c3d809]" name="password" type="password" autoComplete="current-password" required />
            </div>
            {error && <p role="alert" className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-semibold text-red-700">{error}</p>}
            <button type="submit" disabled={isSubmitting} className="w-full rounded-xl bg-[#faae62] px-5 py-3.5 font-black text-[#3e0856] transition hover:bg-[#ffc17d] disabled:cursor-not-allowed disabled:opacity-60">{isSubmitting ? "Logging in..." : "Log in to workspace"}</button>
          </form>
        </section>
      </div>
    </main>
  )
}

export default Login