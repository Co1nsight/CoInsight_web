import { useState, useEffect, useCallback } from "react";
import { getTickers } from "../../apis/Market/tickers";
import { useNavigate } from "react-router-dom";

const formatPrice = (price) => {
    if (price == null) return "-";
    return price.toLocaleString("ko-KR");
};

const formatTradeValue = (value) => {
    if (value == null) return "-";
    const eok = value / 100000000;
    if (eok >= 1) {
        return `${Math.round(eok).toLocaleString("ko-KR")}억`;
    }
    return value.toLocaleString("ko-KR");
};

const formatChangeRate = (rate) => {
    if (rate == null) return "-";
    const percent = (rate * 100).toFixed(2);
    return rate >= 0 ? `+${percent}` : percent;
};

const CoinListTable = () => {
    const nav = useNavigate();

    const [coins, setCoins] = useState([]);
    const [loading, setLoading] = useState(true);
    const [loadingMore, setLoadingMore] = useState(false);
    const [error, setError] = useState(null);
    const [page, setPage] = useState(0);
    const [hasNext, setHasNext] = useState(true);

    const fetchCoins = useCallback(async (pageNum) => {
        try {
            if (pageNum === 0) setLoading(true);
            else setLoadingMore(true);
            setError(null);
            const res = await getTickers(pageNum);
            setCoins(prev => pageNum === 0 ? res.data?.content || [] : [...prev, ...(res.data?.content || [])]);
            setHasNext(res.data?.hasNext ?? false);
        } catch (err) {
            setError("시세 정보를 불러오는데 실패했습니다.");
            console.error(err);
        } finally {
            if (pageNum === 0) setLoading(false);
            else setLoadingMore(false);
        }
    }, []);

    useEffect(() => {
        fetchCoins(0);
    }, [fetchCoins]);

    const loadMore = () => {
        const next = page + 1;
        setPage(next);
        fetchCoins(next);
    };


    return (
        <div className="border border-[#E0E0E0] bg-white rounded-lg">
            {/* Header */}
            <div className="flex flex-row items-center justify-between px-6 py-4 border-b border-[#F0F0F0]">
                <h2 className="text-[18px] font-bold text-[#212121]">코인 시세</h2>
            </div>

            {/* Table Header */}
            <div className="grid grid-cols-[2fr_1fr_1fr_1fr] px-6 py-3 text-[13px] text-[#9E9E9E] border-b border-[#F0F0F0]">
                <span>코인명</span>
                <span className="text-right">가격</span>
                <span className="text-right">등락폭</span>
                <span className="text-right">거래대금</span>
            </div>

            {/* Table Rows */}
            {loading ? (
                <div className="px-6 py-8 text-center text-[14px] text-[#9E9E9E]">
                    로딩 중...
                </div>
            ) : error ? (
                <div className="px-6 py-8 text-center text-[14px] text-[#FF4242]">
                    {error}
                </div>
            ) : (
                <>
                    {coins.map((coin, index) => (
                        <div
                            key={`${coin.ticker}-${index}`}
                            className="grid grid-cols-[2fr_1fr_1fr_1fr] px-6 py-4 border-b border-[#F0F0F0] last:border-b-0 hover:bg-[#FAFAFA] transition-colors cursor-pointer items-center"
                            onClick={() => nav(`/coindetail/${coin.ticker}`)}
                        >
                            <span className="text-[14px] font-medium text-[#212121] flex items-center gap-2">
                                <img src={coin.logoUrl} alt={coin.name} className="w-6 h-6 shrink-0" onError={(e) => { e.target.style.visibility = "hidden"; }} />
                                {coin.name} ({coin.ticker})
                            </span>
                            <span className="text-[14px] text-[#212121] text-right">
                                ₩{formatPrice(coin.currentPrice)}
                            </span>
                            <span className={`text-[14px] font-semibold text-right ${coin.changeRate >= 0 ? "text-[#FF4242]" : "text-[#4073FF]"
                                }`}>
                                {formatChangeRate(coin.changeRate)}%
                            </span>
                            <span className="text-[14px] text-[#787878] text-right">
                                ₩{formatTradeValue(coin.tradingVolume24h)}
                            </span>
                        </div>
                    ))}
                    {hasNext && (
                        <div className="flex justify-center py-3 border-t border-[#F0F0F0]">
                            <button
                                onClick={loadMore}
                                disabled={loadingMore}
                                className="flex items-center gap-1 text-[13px] text-[#787878] hover:text-[#212121] transition-colors cursor-pointer disabled:opacity-50"
                            >
                                {loadingMore ? "로딩 중..." : (
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
    )
}

export default CoinListTable;

