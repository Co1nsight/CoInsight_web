import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import Navbar from "../components/common/Navbar";
import SearchBar from "../components/common/SearchBar";
import NewsCard from "../components/MainPage/NewsCard";
import { searchNews } from "../apis/News/search";

const SearchResultPage = () => {
    const [searchParams] = useSearchParams();
    const keyword = searchParams.get("keyword") || "";

    const [newsList, setNewsList] = useState([]);
    const [newsLoading, setNewsLoading] = useState(true);
    const [newsError, setNewsError] = useState(null);

    useEffect(() => {
        if (!keyword) return;

        const fetchSearch = async () => {
            try {
                setNewsLoading(true);
                setNewsError(null);
                const res = await searchNews(keyword, 0, 20);
                setNewsList(res.data?.content || []);
            } catch (err) {
                setNewsError("뉴스 검색에 실패했습니다.");
                console.error(err);
            } finally {
                setNewsLoading(false);
            }
        };
        fetchSearch();
    }, [keyword]);

    return (
        <div>
            <Navbar />
            <div className="p-8 min-w-[1200px]">
                {/* 검색바 */}
                <div className="max-w-[720px] mx-auto mb-8">
                    <SearchBar defaultKeyword={keyword} />
                </div>

                {/* 뉴스 검색 결과 */}
                <div className="max-w-[960px] mx-auto">
                    <div className="border border-[#E0E0E0] bg-white rounded-lg p-6">
                        <h2 className="text-[18px] font-bold text-[#212121] mb-2">
                            "{keyword}" 뉴스 검색 결과
                        </h2>
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
                                    검색 결과가 없습니다.
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

                    {/* 코인 검색 결과 (추후 추가) */}
                </div>
            </div>
        </div>
    )
}

export default SearchResultPage;
