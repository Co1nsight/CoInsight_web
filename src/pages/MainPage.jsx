import Navbar from "../components/common/Navbar";
import NewsSearchBar from "../components/MainPage/NewsSearchBar";
import NewsCard from "../components/MainPage/NewsCard";
import CoinSearchBar from "../components/MainPage/CoinSearchBar";
import CoinListTable from "../components/MainPage/CoinListTable";

const dummyNews = [
    { status: "positive", title: "비트코인, SEC 현물 ETF 승인 임박...가격 급등 전망", coin: "BTC", time: "2시간 전", confidence: 87 },
    { status: "negative", title: "이더리움 메인넷 업데이트 지연, 투자자 우려 확산", coin: "ETC", time: "1일 전", confidence: 94 },
    { status: "negative", title: "리플 메인넷 업데이트 지연, 투자자 우려 확산", coin: "XRP", time: "3일 전", confidence: 94 },
    { status: "negative", title: "리플 메인넷 업데이트 지연, 투자자 우려 확산", coin: "XRP", time: "3일 전", confidence: 94 },
    { status: "negative", title: "리플 메인넷 업데이트 지연, 투자자 우려 확산", coin: "XRP", time: "3일 전", confidence: 94 },
    { status: "negative", title: "리플 메인넷 업데이트 지연, 투자자 우려 확산", coin: "XRP", time: "3일 전", confidence: 94 },
    { status: "negative", title: "리플 메인넷 업데이트 지연, 투자자 우려 확산", coin: "XRP", time: "3일 전", confidence: 94 },
];

const MainPage = () => {
    return (
        <div>
            <Navbar />
            <div className="flex flex-row gap-6 p-8">
                {/* 왼쪽: 뉴스 영역 */}
                <div className="flex-1 flex flex-col gap-5">
                    <NewsSearchBar />
                    <div className="border border-[#E0E0E0] bg-white rounded-lg p-6">
                        <h2 className="text-[18px] font-bold text-[#212121] mb-2">AI 뉴스 분석</h2>
                        <div>
                            {dummyNews.map((news, index) => (
                                <NewsCard
                                    key={index}
                                    status={news.status}
                                    title={news.title}
                                    coin={news.coin}
                                    time={news.time}
                                    confidence={news.confidence}
                                />
                            ))}
                        </div>
                    </div>
                </div>

                {/* 오른쪽: 코인 시세 영역 */}
                <div className="flex-1 flex flex-col gap-5">
                    <CoinSearchBar />
                    <CoinListTable />
                </div>
            </div>
        </div>
    )
}

export default MainPage;