import RoundButton from "../common/RoundButton";

const HistoryCard = ({date, time, ai_prediction, actual_result, prediction_result, ai_status, prediction_status}) => {
    return (
        <div className="w-full bg-[#FAFAFA] h-24 flex items-center px-6 justify-between">
            <div className="flex flex-col gap-2">
                <div className="font-medium">{time}</div>
                <div className="text-[#787878] text-[14px]">{date}</div>
            </div>

            <div className="flex flex-col justify-center items-center gap-2">
                <div>AI 예측</div>
                <RoundButton content={ai_prediction} status={ai_status}/>
            </div>

            <div className="flex flex-col justify-center items-center gap-2">
                <div>실제 결과</div>
                <div>{actual_result}%</div>
            </div>

            <div className="flex flex-col justify-center items-center gap-2">
                <div>예측 결과</div>
                <RoundButton content={prediction_result} status={prediction_status}/>
            </div>

            <div className="w-46 h-9 border border-[#E0E0E0] items-center flex justify-center rounded-sm text-[#787878] cursor-pointer">
                사용된 기사 보기 ▼
            </div>
        </div>
    )
}

export default HistoryCard;