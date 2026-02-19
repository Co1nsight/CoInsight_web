import DailyNewsCard from "./DailyNewsCard";

const DailyNews = () => {
    return (
        <div className="mt-6 border border-[#E0E0E0] bg-[#FFFFFF] p-8 rounded-sm flex flex-col gap-4">
            <h1 className="text-[20px] font-bold">
                최근 24시간 호재/악재 뉴스
            </h1>

            <div className="flex flex-col gap-4">
                <DailyNewsCard 
                    status={"POSITIVE"} 
                    title={"비트코인 ETF 승인 임박...기관 투자자 관심 급증"}
                    publisher={"코인뉴스"}
                    reliability={"67%"}
                    time={"2026-02-11T09:30:00"}
                />
                <DailyNewsCard 
                    status={"POSITIVE"} 
                    title={"비트코인 ETF 승인 임박...기관 투자자 관심 급증"}
                    publisher={"코인뉴스"}
                    reliability={"67%"}
                    time={"2026-02-10T09:30:00"}
                />
                <DailyNewsCard 
                    status={"NEGATIVE"} 
                    title={"비트코인 ETF 승인 임박...기관 투자자 관심 급증"}
                    publisher={"코인뉴스"}
                    reliability={"67%"}
                    time={"2026-02-11T09:30:00"}
                />
            </div>
        </div>
    )
}

export default DailyNews;