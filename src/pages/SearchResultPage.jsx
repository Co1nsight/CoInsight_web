import { useState, useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import Navbar from "../components/common/Navbar";
import SearchBar from "../components/common/SearchBar";
import NewsCard from "../components/MainPage/NewsCard";
import { searchAll } from "../apis/News/search";

const SearchResultPage = () => {
    const [searchParams] = useSearchParams();
    const nav = useNavigate();
    const keyword = searchParams.get("keyword") || "";

    const [cryptos, setCryptos] = useState([]);
    const [newsList, setNewsList] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (!keyword) return;

        const fetchSearch = async () => {
            try {
                setLoading(true);
                setError(null);
                const res = await searchAll(keyword);
                setCryptos(res.data?.cryptos || []);
                setNewsList(res.data?.news || []);
            } catch (err) {
                setError("검색에 실패했습니다.");
                console.error(err);
            } finally {
                setLoading(false);
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

                <div className="max-w-[960px] mx-auto flex flex-col gap-6">
                    {loading ? (
                        <div className="py-8 text-center text-[14px] text-[#9E9E9E]">로딩 중...</div>
                    ) : error ? (
                        <div className="py-8 text-center text-[14px] text-[#FF4242]">{error}</div>
                    ) : (
                        <>
                            {/* 코인 검색 결과 */}
                            <div className="border border-[#E0E0E0] bg-white rounded-lg p-6">
                                <h2 className="text-[18px] font-bold text-[#212121] mb-4">
                                    "{keyword}" 코인 검색 결과
                                </h2>
                                {cryptos.length === 0 ? (
                                    <div className="py-6 text-center text-[14px] text-[#9E9E9E]">
                                        검색 결과가 없습니다.
                                    </div>
                                ) : (
                                    <div className="flex flex-col gap-2">
                                        {cryptos.map((coin) => (
                                            <div
                                                key={coin.ticker}
                                                className="flex items-center gap-3 py-3 px-2 border-b border-[#F0F0F0] last:border-b-0 cursor-pointer hover:bg-[#FAFAFA] transition-colors"
                                                onClick={() => nav(`/coindetail/${coin.ticker}`)}
                                            >
                                                <div className="w-8 h-8 rounded-full bg-[#F0F0F0] flex items-center justify-center overflow-hidden flex-shrink-0">
                                                    {coin.logoUrl ? (
                                                        <img
                                                            src={coin.logoUrl}
                                                            alt={coin.name}
                                                            className="w-full h-full object-cover"
                                                            onError={(e) => {
                                                                e.target.style.display = "none";
                                                                e.target.parentElement.innerHTML = `<span class="text-[11px] font-bold text-[#9E9E9E]">${coin.ticker.slice(0, 2)}</span>`;
                                                            }}
                                                        />
                                                    ) : (
                                                        <span className="text-[11px] font-bold text-[#9E9E9E]">{coin.ticker.slice(0, 2)}</span>
                                                    )}
                                                </div>
                                                <div>
                                                    <p className="text-[15px] font-medium text-[#212121]">{coin.name}</p>
                                                    <p className="text-[13px] text-[#9E9E9E]">{coin.ticker}</p>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>

                            {/* 뉴스 검색 결과 */}
                            <div className="border border-[#E0E0E0] bg-white rounded-lg p-6">
                                <h2 className="text-[18px] font-bold text-[#212121] mb-2">
                                    "{keyword}" 뉴스 검색 결과
                                </h2>
                                {newsList.length === 0 ? (
                                    <div className="py-6 text-center text-[14px] text-[#9E9E9E]">
                                        검색 결과가 없습니다.
                                    </div>
                                ) : (
                                    newsList.map((news) => (
                                        <NewsCard
                                            key={news.id}
                                            title={news.title}
                                            sentimentLabel={news.sentimentLabel}
                                            publishedAt={news.publishedAt}
                                        />
                                    ))
                                )}
                            </div>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
};

export default SearchResultPage;
