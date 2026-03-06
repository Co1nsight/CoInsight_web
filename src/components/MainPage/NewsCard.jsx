import RoundButton from "../common/RoundButton";

const sentimentMap = {
    POSITIVE: { label: "호재", status: "positive" },
    NEGATIVE: { label: "악재", status: "negative" },
    NEUTRAL: { label: "중립", status: "neutral" },
};

const formatTimeAgo = (dateStr) => {
    const now = new Date();
    const date = new Date(dateStr);
    const diffMs = now - date;
    const diffMin = Math.floor(diffMs / 60000);
    const diffHour = Math.floor(diffMs / 3600000);
    const diffDay = Math.floor(diffMs / 86400000);

    if (diffMin < 60) return `${diffMin}분 전`;
    if (diffHour < 24) return `${diffHour}시간 전`;
    return `${diffDay}일 전`;
};

const NewsCard = ({ title, sentimentLabel, sentimentScore, relatedCryptos, publishedAt }) => {
    const sentiment = sentimentMap[sentimentLabel] || sentimentMap.NEUTRAL;
    const coinNames = relatedCryptos?.map(c => c.ticker).join(", ") || "-";
    const confidence = Math.round((sentimentScore || 0) * 100);

    return (
        <div className="py-5 border-b border-[#F0F0F0] last:border-b-0 cursor-pointer hover:bg-[#FAFAFA] transition-colors px-2">
            <div className="flex flex-row items-start gap-3">
                <div className="mt-0.5">
                    <RoundButton content={sentiment.label} status={sentiment.status} />
                </div>
                <div className="flex flex-col gap-1.5">
                    <p className="text-[16px] font-medium text-[#212121] leading-snug">
                        {title}
                    </p>
                    <p className="text-[13px] text-[#9E9E9E]">
                        영향 코인: {coinNames} | {formatTimeAgo(publishedAt)} | 신뢰도: {confidence}%
                    </p>
                </div>
            </div>
        </div>
    )
}

export default NewsCard;

