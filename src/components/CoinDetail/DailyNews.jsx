import { useEffect, useState } from "react";
import DailyNewsCard from "./DailyNewsCard";
import { getCoinNews } from "../../apis/CoinDetail/coinNews";

const DailyNews = ({ticker}) => {
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
                setIsError("데이터를 불러오는 중에 문제가 발생했습니다.");
            } finally {
                setIsLoading(false);
            }
        }
        fetchCoinNews();
    }, [ticker]);

    const renderContent = () => {
        if (isLoading) {
            return (
                <div className="py-8 text-center text-[16px] text-[#9E9E9E]">
                    뉴스를 불러오는 중입니다.
                </div>
            )
        }
        if (isError) {
            return (
                <div className="py-8 text-center text-[16px] text-[#FF4242]">
                    {isError}
                </div>
            )
        }
        if (newsData.length === 0) {
            return (
                <div className="py-8 text-center text-[16px] text-[#9E9E9E]">
                    등록된 뉴스가 없습니다.
                </div>
            )
        }

        return newsData.map((news) => (
            <DailyNewsCard 
                key={news.newsId}
                status={news.sentimentLabel}
                title={news.title}
                publisher={news.publisher}
                reliability={news.sentimentScore}
                time={news.publishedAt}
            />
        ))
    }
    

    return (
        <div className="h-150 mt-6 border border-[#E0E0E0] bg-[#FFFFFF] p-8 rounded-sm flex flex-col gap-4">
            <h1 className="text-[20px] font-bold">
                최근 24시간 호재/악재 뉴스
            </h1>

            <div className="flex flex-col gap-4 overflow-scroll overflow-x-hidden">
                {renderContent()}
            </div>
        </div>
    )
}

export default DailyNews;