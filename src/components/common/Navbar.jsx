import { useNavigate } from "react-router-dom";

const Navbar = () => {
    const nav = useNavigate();
    return (
        <div className="w-full h-16 flex flex-row items-center px-8 bg-[#0A192F] border-b border-[#233554] min-w-[1200px]">
            <div className="text-[24px] font-bold cursor-pointer text-[#64FFDA]" onClick={() => nav("/")}>
                CoInsight
            </div>
        </div>
    )
}

export default Navbar;
