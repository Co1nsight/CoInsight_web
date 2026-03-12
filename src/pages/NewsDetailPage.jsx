import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Navbar from "../components/common/Navbar";
import RoundButton from "../components/common/RoundButton";
import { getNewsDetail } from "../apis/News/detail";

const sentimentMap = {
    POSITIVE: { label: "호재", status: "positive" },
    NEGATIVE: { label: "악재", status: "negative" },
    NEUTRAL:  { label: "중립", status: "neutral"  },
};

const formatDate = (dateStr) => {
    if (!dateStr) return "";
    const d = new Date(dateStr);
    return `${d.getFullYear()}년 ${d.getMonth() + 1}월 ${d.getDate()}일 ${String(d.getHours()).padStart(2, "0")}:${String(d.getMinutes()).padStart(2, "0")}`;
};

const NewsDetailPage = () => {
    const { id } = useParams();
    const nav = useNavigate();
    const [news, setNews] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetch = async () => {
            try {
                setLoading(true);
                const res = await getNewsDetail(id);
                setNews(res.data);
            } catch (err) {
                setError("뉴스를 불러오는데 실패했습니다.");
                console.error(err);
            } finally {
                setLoading(false);
            }
        };
        fetch();
    }, [id]);

    const sentiment = sentimentMap[news?.analysis?.sentimentLabel] || sentimentMap.NEUTRAL;
    const confidence = Math.round((news?.analysis?.sentimentScore || 0) * 100);

    return (
        <div>
            <Navbar />
            <div className="p-10 min-w-[1200px]">
                {loading ? (
                    <div className="py-20 text-center text-[#8892B0]">로딩 중...</div>
                ) : error ? (
                    <div className="py-20 text-center text-[#FF4242]">{error}</div>
                ) : news && (
                    <div className="flex flex-col gap-6">

                        {/* 뉴스 본문 카드 */}
                        <div className="border border-[#233554] bg-[#112240] rounded-sm p-8">
                            {/* 감성 배지 + 제목 */}
                            <div className="flex items-center gap-3 mb-3">
                                <RoundButton content={sentiment.label} status={sentiment.status} />
                            </div>
                            <h1 className="text-[28px] font-bold text-[#CCD6F6] mb-3 leading-snug">
                                {news.title}
                            </h1>

                            {/* 메타 정보 */}
                            <div className="flex items-center gap-3 text-[13px] text-[#8892B0] mb-6">
                                <span>{formatDate(news.publishedAt)}</span>
                                <span>|</span>
                                <span>출처: {news.publisher}</span>
                                <span>|</span>
                                <span className="text-[#64FFDA]">신뢰도: {confidence}%</span>
                            </div>

                            {/* 본문 */}
                            <p className="text-[15px] text-[#CCD6F6] leading-relaxed mb-6">
                                {news.content}
                            </p>

                            {/* 원문 링크 */}
                            {news.originalLink && (
                                <a
                                    href={news.originalLink}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center gap-1 text-[13px] text-[#64FFDA] hover:underline"
                                >
                                    원문 보기
                                    <iconify-icon icon="mingcute:external-link-line" className="text-[14px]" />
                                </a>
                            )}
                        </div>

                        {/* 영향 받는 코인 */}
                        <div className="border border-[#233554] bg-[#112240] rounded-sm p-8">
                            <h2 className="text-[20px] font-bold text-[#CCD6F6] mb-4">영향 받는 코인</h2>
                            {news.relatedCryptos?.length === 0 ? (
                                <p className="text-[#8892B0] text-[14px]">관련 코인 정보가 없습니다.</p>
                            ) : (
                                <div>
                                    <div className="grid grid-cols-[1fr_120px] px-4 py-2 text-[13px] text-[#8892B0] border-b border-[#233554]">
                                        <span>코인명</span>
                                        <span className="text-center">예상 영향</span>
                                    </div>
                                    {news.relatedCryptos.map((coin) => (
                                        <div
                                            key={coin.ticker}
                                            className="grid grid-cols-[1fr_120px] px-4 py-4 border-b border-[#233554] last:border-b-0 items-center cursor-pointer hover:bg-[#1E3A5F] transition-colors"
                                            onClick={() => nav(`/coindetail/${coin.ticker}`)}
                                        >
                                            <div className="flex items-center gap-3">
                                                <div className="w-8 h-8 rounded-full bg-[#1E3A5F] flex items-center justify-center overflow-hidden flex-shrink-0">
                                                    {coin.logoUrl ? (
                                                        <img
                                                            src={coin.logoUrl}
                                                            alt={coin.name}
                                                            className="w-full h-full object-cover"
                                                            onError={(e) => {
                                                                e.target.style.display = "none";
                                                                e.target.parentElement.innerHTML = `<span class="text-[11px] font-bold text-[#8892B0]">${coin.ticker.slice(0, 2)}</span>`;
                                                            }}
                                                        />
                                                    ) : (
                                                        <span className="text-[11px] font-bold text-[#8892B0]">{coin.ticker.slice(0, 2)}</span>
                                                    )}
                                                </div>
                                                <span className="text-[15px] text-[#CCD6F6]">{coin.name} ({coin.ticker})</span>
                                            </div>
                                            <div className="flex justify-center">
                                                <RoundButton content={sentiment.label} status={sentiment.status} />
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>

                        {/* AI 분석 */}
                        <div className="border border-[#233554] bg-[#112240] rounded-sm p-8">
                            <h2 className="text-[20px] font-bold text-[#CCD6F6] mb-4">AI 종합 분석</h2>
                            <p className="text-[14px] text-[#8892B0] leading-relaxed">
                                {news.analysis?.summary || "분석 정보가 없습니다."}
                            </p>
                        </div>

                    </div>
                )}
            </div>
        </div>
    );
};

export default NewsDetailPage;
