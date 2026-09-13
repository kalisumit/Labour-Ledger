import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { signupContractor } from '../services/userAPI'

const Signup = () => {
    const [contractor, setContractor] = useState({ username: "", password: "", email: "" })
    const [error, setError] = useState("")
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [isCreated, setIsCreated] = useState(false)
    const navigate = useNavigate()

    const handleInput = (e) => {
        const { name, value } = e.target
        setContractor((prev) => ({ ...prev, [name]: value }))
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        setError("")
        setIsCreated(false)
        setIsSubmitting(true)

        try {
            await signupContractor(contractor)
            setIsCreated(true)
            setTimeout(() => navigate('/login'), 1200)
        } catch (error) {
            setError(error.response?.data?.message || "Unable to create your account. Please try again.")
        } finally {
            setIsSubmitting(false)
        }
    }

    return (
        <main className="min-h-[calc(100vh-72px)] bg-[#f4f0e8] px-4 py-6 text-[#222022] sm:px-5 sm:py-12">
            <div className="mx-auto grid max-w-5xl overflow-hidden rounded-3xl bg-[#222022] shadow-2xl md:grid-cols-[0.95fr_1.05fr] md:rounded-[2rem]">
                <section className="relative flex min-h-72 flex-col justify-between overflow-hidden p-6 text-[#f4f0e8] sm:min-h-[560px] sm:p-12">
                    <div className="absolute -bottom-24 -right-20 h-72 w-72 rounded-full bg-[#faae62] opacity-90" />
                    <div className="absolute -left-24 -top-24 h-64 w-64 rounded-full border-[3rem] border-[#c3d809] opacity-80" />
                    <div className="relative">
                        <p className="mb-6 text-sm font-bold uppercase tracking-[0.3em] text-[#faae62]">Labour Ledger</p>
                        <h1 className="max-w-md text-4xl font-black leading-[0.95] tracking-tight sm:text-6xl">Build your team base.</h1>
                        <p className="mt-4 max-w-sm text-base leading-6 text-[#ddd8ce] sm:mt-6 sm:text-lg sm:leading-7">Create a contractor workspace designed to keep your people, pay, and attendance organised.</p>
                    </div>
                    <div className="relative text-sm font-semibold text-[#c3d809]">Start with one account. Grow from there.</div>
                </section>

                <section className="bg-[#fffdf8] p-6 sm:p-12">
                    <div className="mb-8">
                        <p className="mb-2 text-sm font-bold uppercase tracking-[0.2em] text-[#8a8c0a]">New workspace</p>
                        <h2 className="text-2xl font-black tracking-tight text-[#222022] sm:text-3xl">Create your account</h2>
                        <p className="mt-2 text-[#68645c]">Your worker dashboard is waiting.</p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-5">
                        <div>
                            <label htmlFor="username" className="mb-2 block text-sm font-bold text-[#38352f]">Your name</label>
                            <input onChange={handleInput} id="username" value={contractor.username} className="w-full rounded-xl border-2 border-[#e4dfd4] bg-[#f8f5ee] px-4 py-3.5 outline-none transition focus:border-[#c3d809]" name="username" type="text" autoComplete="name" required />
                        </div>
                        <div>
                            <label htmlFor="email" className="mb-2 block text-sm font-bold text-[#38352f]">Email address</label>
                            <input onChange={handleInput} id="email" value={contractor.email} className="w-full rounded-xl border-2 border-[#e4dfd4] bg-[#f8f5ee] px-4 py-3.5 outline-none transition focus:border-[#c3d809]" name="email" type="email" autoComplete="email" required />
                        </div>
                        <div>
                            <label htmlFor="password" className="mb-2 block text-sm font-bold text-[#38352f]">Password</label>
                            <input onChange={handleInput} id="password" value={contractor.password} className="w-full rounded-xl border-2 border-[#e4dfd4] bg-[#f8f5ee] px-4 py-3.5 outline-none transition focus:border-[#c3d809]" name="password" type="password" autoComplete="new-password" minLength="6" required />
                        </div>
                        {error && <p role="alert" className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-semibold text-red-700">{error}</p>}
                        {isCreated && <p role="status" className="rounded-xl border border-[#c3d809] bg-[#f3f7c9] px-4 py-3 text-sm font-semibold text-[#596000]">Account created. Taking you to login...</p>}
                        <button type="submit" disabled={isSubmitting || isCreated} className="w-full rounded-xl bg-[#faae62] px-5 py-3.5 font-black text-[#3e0856] transition hover:bg-[#ffc17d] disabled:cursor-not-allowed disabled:opacity-60">{isSubmitting ? "Creating account..." : "Create contractor account"}</button>
                    </form>
                    <p className="mt-6 text-center text-sm text-[#68645c]">Already have an account? <Link to="/login" className="font-bold text-[#8a8c0a] hover:underline">Log in</Link></p>
                </section>
            </div>
        </main>
    )
}

export default Signup