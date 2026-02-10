import { useState } from "react";
import HistoryCard from "./HistoryCard";

const History = () => {
    //mock data
    const mockData= [
        {id: 1, date: "2026.02.08", time: "16:00", prediction: "호재", result: "53", isSuccess: true},
        {id: 2, date: "2026.02.08", time: "16:30", prediction: "호재", result: "54", isSuccess: true},
        {id: 3, date: "2026.02.08", time: "17:00", prediction: "악재", result: "42", isSuccess: false},
    ]

    const [selectedTime, setSelectedTime] = useState("1h");
    const time_type = ["1시간", "3시간", "12시간", "24시간"];
    return (
        <div className="mt-8 border border-[#E0E0E0] bg-[#FFFFFF] p-8 rounded-sm flex flex-col">
            <div className="flex flex-row justify-between items-center">
                <div className="text-[20px] font-bold">
                    AI 예측 히스토리
                </div>

                <div className="flex flex-row gap-3">
                    {time_type.map((time) => (
                        <div 
                            key={time}
                            onClick={() => setSelectedTime(time)}
                            className={`border border-[#E0E0E0] px-4 py-2 rounded-sm text-[14px] cursor-pointer flex items-center
                                ${selectedTime === time ? "text-white bg-[#1F78F2] border-none" : "border-[#E0E0E0] text-[#616161]"}`}
                        >
                            {time}
                        </div>
                    ))}
                </div>
            </div>

            <div className="flex flex-col gap-7 mt-6">
                {mockData.map((item) => (
                    <HistoryCard 
                        key={item.id}
                        date={item.date}
                        time={item.time}
                        ai_prediction={item.prediction}
                        ai_status={item.prediction.includes("호재") ? "positive" : "negative"}
                        actual_result={item.result}
                        prediction_result={item.isSuccess ? "예측 성공" : "예측 실패"}
                        prediction_status={item.isSuccess ? "predict_success" : "predict_fail"}
                    />
                ))}
            </div>
        </div>
    )
}

export default History;