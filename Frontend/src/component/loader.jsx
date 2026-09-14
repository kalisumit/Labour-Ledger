const Loader = ({ message = "Loading..." }) => {
    return (
        <main className="flex min-h-screen items-center justify-center bg-[#f4f0e8]">
            <div className="flex flex-col items-center gap-4">
                <div className="h-12 w-12 animate-spin rounded-full border-4 border-[#c3d809] border-t-[#222022]" />
                <p className="font-bold text-[#68645c]">{message}</p>
            </div>
        </main>
    )
}

export default Loader