import { useState, useEffect } from "react";
import Navbar from "../components/common/Navbar";
import SearchBar from "../components/common/SearchBar";
import NewsCard from "../components/MainPage/NewsCard";
import CoinListTable from "../components/MainPage/CoinListTable";
import { getNewsAnalysis } from "../apis/News/analysis";

const MainPage = () => {
    const [newsList, setNewsList] = useState([]);
    const [newsLoading, setNewsLoading] = useState(true);
    const [newsError, setNewsError] = useState(null);

    useEffect(() => {
        const fetchNews = async () => {
            try {
                setNewsLoading(true);
                setNewsError(null);
                const res = await getNewsAnalysis(0, 20);
                setNewsList(res.data?.content || []);
            } catch (err) {
                setNewsError("뉴스를 불러오는데 실패했습니다.");
                console.error(err);
            } finally {
                setNewsLoading(false);
            }
        };
        fetchNews();
    }, []);

    return (
        <div>
            <Navbar />
            <div className="p-8 min-w-[1200px]">
                {/* 통합 검색바 */}
                <div className="mb-6">
                    <SearchBar />
                </div>

                <div className="flex flex-row gap-6">
                    {/* 왼쪽: 뉴스 영역 */}
                    <div className="flex-1 flex flex-col gap-5">
                        <div className="border border-[#E0E0E0] bg-white rounded-lg p-6">
                            <h2 className="text-[18px] font-bold text-[#212121] mb-2">AI 뉴스 분석</h2>
                            <div>
                                {newsLoading ? (
                                    <div className="py-8 text-center text-[14px] text-[#9E9E9E]">
                                        로딩 중...
                                    </div>
                                ) : newsError ? (
                                    <div className="py-8 text-center text-[14px] text-[#FF4242]">
                                        {newsError}
                                    </div>
                                ) : newsList.length === 0 ? (
                                    <div className="py-8 text-center text-[14px] text-[#9E9E9E]">
                                        뉴스가 없습니다.
                                    </div>
                                ) : (
                                    newsList.map((news) => (
                                        <NewsCard
                                            key={news.id}
                                            title={news.title}
                                            sentimentLabel={news.sentimentLabel}
                                            sentimentScore={news.sentimentScore}
                                            relatedCryptos={news.relatedCryptos}
                                            publishedAt={news.publishedAt}
                                        />
                                    ))
                                )}
                            </div>
                        </div>
                    </div>

                    {/* 오른쪽: 코인 시세 영역 */}
                    <div className="flex-1 flex flex-col gap-5">
                        <CoinListTable />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default MainPage;


