import RoundButton from "../common/RoundButton";

const NewsCard = ({ status, title, coin, time, confidence }) => {
    const tagContent = status === "positive" ? "호재" : "악재";

    return (
        <div className="py-5 border-b border-[#F0F0F0] last:border-b-0 cursor-pointer hover:bg-[#FAFAFA] transition-colors px-2">
            <div className="flex flex-row items-start gap-3">
                <div className="mt-0.5">
                    <RoundButton content={tagContent} status={status} />
                </div>
                <div className="flex flex-col gap-1.5">
                    <p className="text-[15px] font-semibold text-[#212121] leading-snug">
                        {title}
                    </p>
                    <p className="text-[13px] text-[#9E9E9E]">
                        영향 코인: {coin} | {time} | 신뢰도: {confidence}%
                    </p>
                </div>
            </div>
        </div>
    )
}

export default NewsCard;
