import { useEffect, useState } from "react";
import DailyNewsCard from "./DailyNewsCard";
import { getCoinNews } from "../../apis/CoinDetail/coinNews";

const DailyNews = () => {
    const ticker = "BTC";
    const [newsData, setNewsData] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [isError, setIsError] = useState(null);

    useEffect(() => {
        const fetchCoinNews = async () => {
            try {  
                setIsLoading(true);
                setIsError(null);
                const res = await getCoinNews(ticker, 0, 20);
                //console.log(res.data);
                setNewsData(res.data?.content || []);
            } catch (error) {
                console.log("백엔드 불러오기 실패 : ", error);
                setIsError(error);
            } finally {
                setIsLoading(false);
            }
        }
        fetchCoinNews();
    }, [ticker]);
    

    return (
        <div className="h-150 mt-6 border border-[#E0E0E0] bg-[#FFFFFF] p-8 rounded-sm flex flex-col gap-4">
            <h1 className="text-[20px] font-bold">
                최근 24시간 호재/악재 뉴스
            </h1>

            <div className="flex flex-col gap-4 overflow-scroll overflow-x-hidden">
                {isLoading ? (
                    <div className="py-8 text-center text-[14px] text-[#9E9E9E]">
                        로딩 중...
                    </div>
                ) : isError ? (
                    <div className="py-8 text-center text-[14px] text-[#FF4242]">
                        {isError}
                    </div>
                ) : (
                    newsData.map((news) => (
                        <DailyNewsCard 
                            key={news.id}
                            status={news.sentimentLabel}
                            title={news.title}
                            publisher={news.publisher}
                            reliability={news.sentimentScore}
                            time={news.publishedAt}
                        />
                    ))
                )}
            </div>
        </div>
    )
}

export default DailyNews;