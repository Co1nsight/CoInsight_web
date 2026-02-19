import RoundButton from "../common/RoundButton";

const DailyNewsCard = ({status, title, publisher, reliability, time}) => {
    const labelType = {
        NEGATIVE : "negative",
        POSITIVE : "positive"
    }

    const contentType = {
        NEGATIVE : "악재",
        POSITIVE : "호재"
    }
    
    const CalculateTime = (t) => {
        const getTime = new Date(t);
        const milliSeconds = new Date() - getTime;
        const seconds = milliSeconds / 1000;
        if (seconds < 60) return `방금 전`;
        const minutes = seconds / 60;
        if (minutes < 60) return `${Math.floor(minutes)}분 전`;
        const hours = minutes / 60;
        if (hours < 24) return `${Math.floor(hours)}시간 전`;
        const days = hours / 24;
        if (days < 7) return `${Math.floor(days)}일 전`;
        else return `한참 전`;
    };

    return (
        <div className="flex flex-col bg-[#FAFAFA] px-4 py-4 gap-2 cursor-pointer">
            <div className="flex flex-row items-center gap-3">
                <RoundButton status={labelType[status]} content={contentType[status]}/>
                <div className="text-[16px] font-semibold">
                    {title}
                </div>
            </div>

            <div className="flex flex-row gap-1 items-center text-[#7A7A7A] text-[14px]">
                <div>{CalculateTime(time)}</div>
                |
                <div>신뢰도: {reliability}</div>
                |
                <div>출처: {publisher}</div>
            </div>
        </div>
    )
}

export default DailyNewsCard;