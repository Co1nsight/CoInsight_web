import { useEffect, useState } from "react";
import HistoryCard from "./HistoryCard";
import { getAiPredictions } from "../../apis/CoinDetail/aihistory";

const History = ({ticker, currentPrice}) => {
    //mock data
    // const mockData= [
    //     {id: 1, date: "2026.02.08", time: "16:00", prediction: "호재", result: "53", isSuccess: true},
    //     {id: 2, date: "2026.02.08", time: "16:30", prediction: "호재", result: "54", isSuccess: true},
    //     {id: 3, date: "2026.02.08", time: "17:00", prediction: "악재", result: "42", isSuccess: false},
    // ]
    const timeMapping = {
        "1시간": "HOUR_1",
        "3시간": "HOUR_3",
        "12시간": "HOUR_12",
        "24시간": "HOUR_24",
    }
    const [selectedTime, setSelectedTime] = useState("1시간");
    const [predictionList, setPredictionList] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [isError, setIsError] = useState(null);

    useEffect(() => {
        const fetchAiHistory = async () => {
            try {
                setIsLoading(true);
                setIsError(null);
                const res = await getAiPredictions(ticker);
                //console.log(res);
                setPredictionList(res.data?.content || []);

            } catch (error) {
                console.error("백엔드 데이터 불러오기 실패 : ", error);
                setIsError("데이터를 불러오는 데 실패했습니다.");
            } finally {
                setIsLoading(false);
            }
        }

        fetchAiHistory();
    }, [ticker]);
    console.log(predictionList);

    const renderContent = () => {
        if (isLoading) {
            return (
                <div className="py-8 text-center text-[16px] text-[#9E9E9E]">
                    AI 예측 히스토리를 불러오는 중입니다.
                </div>
            )
        }
        if (isError) {
            return (
                <div className="py-8 text-center text-[16px] text-[#FF4242]">
                    {isError}
                </div>
            )
        }
        if (predictionList.length === 0) {
            return (
                <div className="py-8 text-center text-[16px] text-[#9E9E9E]">
                    AI 히스토리가 없습니다.
                </div>
            )
        }

        return (
        predictionList.map((item) => {
            const targetInterval = timeMapping[selectedTime]; //HOUR_1
            const verification = item.verifications?.find(v => v.intervalType === targetInterval);
            if (!verification) return null;
           
            return (
            <HistoryCard 
                key={item.predictionId}
                date={item.predictionDate}
                time={item.predictionTime}
                ai_prediction={item.predictionLabel}
                ai_status={item.predictionLabel}
                actual_price={verification.priceAtVerification}
                current_price={currentPrice}
                prediction_result={verification.isSuccess ? "예측 성공" : "예측 실패"}
                prediction_status={verification.isSuccess ? "predict_success" : "predict_fail"}
            />
            )
        })
    );
    }

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
                {renderContent()}
            </div>
        </div>
    )
}

export default History;