import { useNavigate } from "react-router-dom";

const Navbar = () => {
    const nav = useNavigate();
    return (
        <div className="w-full h-16 flex flex-row items-center px-8 bg-[#0A192F] border-b border-[#233554] min-w-[1200px]">
            <div className="flex items-center gap-3 cursor-pointer" onClick={() => nav("/")}>
                <img src="/logo.png" alt="CoInsight" className="h-10 w-10 object-contain" />
                <span className="text-[24px] font-semibold text-[#64FFDA]">CoInsight</span>
            </div>
        </div>
    )
}

export default Navbar;
