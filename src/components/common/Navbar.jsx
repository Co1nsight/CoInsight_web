import { useNavigate } from "react-router-dom";

const Navbar = () => {
    const nav = useNavigate();
    return (
        <div className="w-full h-16 flex flex-row justify-between items-center px-8 bg-[#1F78F2] text-white min-w-[1200px]">
            <div className="text-[24px]">
                CoinSight
            </div>

            <div className="flex flex-row justify-around gap-8">
                <div
                    onClick={() => nav("/")}
                    className="cursor-pointer"
                >
                    메인
                </div>
                <div
                    onClick={() => nav("/game")}
                    className="cursor-pointer"
                >
                    게임
                </div>
                <div
                    onClick={() => nav("/leaderboard")}
                    className="cursor-pointer"
                >
                    리더보드
                </div>
            </div>
        </div>
    )
}

export default Navbar;