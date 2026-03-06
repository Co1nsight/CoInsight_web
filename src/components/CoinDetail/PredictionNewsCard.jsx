import RoundButton from "../common/RoundButton";

const PredictionNewsCard = ({status, title, publisher, time}) => {
    const labelType = {
        NEGATIVE : "negative",
        POSITIVE : "positive"
    }
    const contentType = {
        NEGATIVE : "악재",
        POSITIVE : "호재"
    }
    const formatTime = (t) => {
        const time = new Date(t);

        return `${time.getFullYear()}년 ${time.getMonth() + 1}월 ${time.getDate()}일
        ${time.getHours()}:${time.getMinutes()}`
    }


    return (
        <div className="flex flex-row items-center bg-white border border-[#EDEDED] px-4 py-2.5 gap-3">
            <div>
                <RoundButton status={labelType[status]} content={contentType[status]}/>
            </div>
            <div className="text-[#212121] text-[14px] font-medium">
                {title}
            </div>
            <div className="text-[#787878] text-[12px] flex items-center">
                {publisher} | {formatTime(time)}
            </div>
        </div>
    )
}

export default PredictionNewsCard;