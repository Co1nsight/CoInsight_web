import { useNavigate } from "react-router-dom";

const Navbar = () => {
    const nav = useNavigate();
    return (
        <div className="w-full h-16 flex flex-row items-center px-8 bg-[#1F78F2] text-white min-w-[1200px]">
            <div className="text-[24px] font-bold cursor-pointer" onClick={() => nav("/")}>
                CoInsight
            </div>
        </div>
    )
}

export default Navbar;