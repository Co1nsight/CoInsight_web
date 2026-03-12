import { useState, useEffect, useCallback } from "react";
import Navbar from "../components/common/Navbar";
import SearchBar from "../components/common/SearchBar";
import NewsCard from "../components/MainPage/NewsCard";
import CoinListTable from "../components/MainPage/CoinListTable";
import { getNewsAnalysis } from "../apis/News/analysis";

const MainPage = () => {
    const [newsList, setNewsList] = useState([]);
    const [newsLoading, setNewsLoading] = useState(true);
    const [newsLoadingMore, setNewsLoadingMore] = useState(false);
    const [newsError, setNewsError] = useState(null);
    const [newsPage, setNewsPage] = useState(0);
    const [newsHasNext, setNewsHasNext] = useState(true);

    const fetchNews = useCallback(async (pageNum) => {
        try {
            if (pageNum === 0) setNewsLoading(true);
            else setNewsLoadingMore(true);
            setNewsError(null);
            const res = await getNewsAnalysis(pageNum, 10);
            setNewsList(prev => pageNum === 0 ? res.data?.content || [] : [...prev, ...(res.data?.content || [])]);
            setNewsHasNext(res.data?.hasNext ?? false);
        } catch (err) {
            setNewsError("뉴스를 불러오는데 실패했습니다.");
            console.error(err);
        } finally {
            if (pageNum === 0) setNewsLoading(false);
            else setNewsLoadingMore(false);
        }
    }, []);

    useEffect(() => {
        fetchNews(0);
    }, [fetchNews]);

    const loadMoreNews = () => {
        const next = newsPage + 1;
        setNewsPage(next);
        fetchNews(next);
    };

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
                        <div className="border border-[#233554] bg-[#112240] rounded-lg p-6">
                            <h2 className="text-[18px] font-bold text-[#CCD6F6] mb-2">AI 뉴스 분석</h2>
                            <div>
                                {newsLoading ? (
                                    <div className="py-8 text-center text-[14px] text-[#8892B0]">
                                        로딩 중...
                                    </div>
                                ) : newsError ? (
                                    <div className="py-8 text-center text-[14px] text-[#FF4242]">
                                        {newsError}
                                    </div>
                                ) : newsList.length === 0 ? (
                                    <div className="py-8 text-center text-[14px] text-[#8892B0]">
                                        뉴스가 없습니다.
                                    </div>
                                ) : (
                                    <>
                                        {newsList.map((news) => (
                                            <NewsCard
                                                key={news.id}
                                                id={news.id}
                                                title={news.title}
                                                sentimentLabel={news.sentimentLabel}
                                                sentimentScore={news.sentimentScore}
                                                relatedCryptos={news.relatedCryptos}
                                                publishedAt={news.publishedAt}
                                            />
                                        ))}
                                        {newsHasNext && (
                                            <div className="flex justify-center pt-3 border-t border-[#233554]">
                                                <button
                                                    onClick={loadMoreNews}
                                                    disabled={newsLoadingMore}
                                                    className="flex items-center gap-1 text-[13px] text-[#8892B0] hover:text-[#CCD6F6] transition-colors cursor-pointer disabled:opacity-50"
                                                >
                                                    {newsLoadingMore ? "로딩 중..." : (
                                                        <>
                                                            더보기
                                                            <iconify-icon icon="mingcute:down-fill" className="text-[12px]" />
                                                        </>
                                                    )}
                                                </button>
                                            </div>
                                        )}
                                    </>
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
