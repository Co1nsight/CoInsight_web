import { useEffect, useState } from "react";
import HistoryCard from "./HistoryCard";
import { getAiPredictions, getAccumulatePrediction } from "../../apis/CoinDetail/aihistory";
import OverallAcc from "./OverallAcc";
import TimeAcc from "./TimeAcc";

const History = ({ticker, currentPrice}) => {
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
    const [stats, setStats] = useState([]); // intervalStats 배열용
    const [summary, setSummary] = useState({ total: 0, success: 0, rate: 0 });


    useEffect(() => {
        const fetchAiHistory = async () => {
            try {
                setIsLoading(true);
                setIsError(null);
                const res = await getAiPredictions(ticker);
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

    useEffect(() => {
        const fetchAccHistory = async () => {
            try {
                const res = await getAccumulatePrediction(ticker);
                const data = res.data;

                // 1. 배열 부분만 따로 저장
                setStats(data.intervalStats || []);
                
                // 2. 나머지 요약 정보만 따로 저장
                setSummary({
                    total: data.totalPredictions,
                    success: data.totalSuccesses,
                    rate: data.overallSuccessRate
                });
            } catch (error) {
                console.error("백엔드 데이터 불러오기 실패 : ", error);
                setIsError("데이터를 불러오는 데 실패했습니다.");
                
            }
        }
        fetchAccHistory();
    }, [ticker]);

    const renderContent = () => {
        if (isLoading) {
            return (
                <div className="py-8 text-center text-[16px] text-[#8892B0]">
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
                <div className="py-8 text-center text-[16px] text-[#8892B0]">
                    AI 히스토리가 없습니다.
                </div>
            )
        }


        return predictionList.map((item) => {
      // 1. 선택된 시간(예: '1시간')에 해당하는 intervalType(예: 'HOUR_1')을 가져옵니다.
      const targetInterval = timeMapping[selectedTime];
      
      // 2. verifications 배열에서 해당 intervalType을 가진 객체를 찾습니다.
      const verification = item.verifications?.find(
        (v) => v.intervalType === targetInterval
      );

      // 데이터가 없는 경우를 대비한 예외 처리
      if (!verification) return null;

      return (
        <HistoryCard
          key={item.predictionId}
          ticker={ticker}
          predictionId={item.predictionId}
          // 전체 객체(item)에서 가져오는 데이터
          date={item.predictionDate}
          time={item.predictionTime}
          ai_prediction={item.predictionLabel} // AI 예측 결과 (NEUTRAL, POSITIVE 등)
          ai_status={item.predictionLabel}     // 상태값도 동일하게 사용
          
          // verification 객체 내부에서 가져오는 데이터
          actual_price={verification.priceAtVerification} // 검증 시점 가격
          prediction_result={verification.isSuccess ? "예측 성공" : "예측 실패"}
          prediction_status={verification.isSuccess ? "predict_success" : "predict_fail"}
          
          // 외부 props에서 받은 값
          current_price={currentPrice}
        />
      );
    });

    }

    const time_type = ["1시간", "3시간", "12시간", "24시간"];
    return (
        <>
        <div className="mt-8 border border-[#233554] bg-[#112240] p-8 rounded-sm flex flex-col">
            <div className="flex flex-row justify-between items-center">
                <div className="text-[20px] font-bold text-[#CCD6F6]">
                    AI 예측 히스토리
                </div>

                <div className="flex flex-row gap-3">
                    {time_type.map((time) => (
                        <div
                            key={time}
                            onClick={() => setSelectedTime(time)}
                            className={`border px-4 py-2 rounded-sm text-[14px] cursor-pointer flex items-center
                                ${selectedTime === time ? "text-[#0A192F] bg-[#64FFDA] border-transparent" : "border-[#233554] text-[#8892B0]"}`}
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

        <div className="mt-8 border border-[#233554] bg-[#112240] p-8 rounded-sm flex flex-col">
            <div className="flex flex-col gap-6">
                <div className="text-[20px] font-bold text-[#CCD6F6]">
                    AI 예측 누적 통계
                </div>

                <div className="flex flex-row gap-12">
                    <OverallAcc title={"총 예측 횟수"} value={summary.total}/>
                    <OverallAcc title={"예측 성공"} value={summary.success}/>
                    <OverallAcc title={"성공률"} value={summary.rate}/>
                </div>

                <div className="flex flex-col gap-6">
                    <div className="text-[16px] font-semibold text-[#CCD6F6]">
                        예측 간격 별 예측 성공률
                    </div>

                    <div className="flex flex-row gap-10">
                        {stats.map((e) => (
                            <TimeAcc 
                                key={e.intervalType} 
                                time={e.description} 
                                value={e.successRate} 
                            />
                        ))}
                    </div>
                </div>

            </div>
        </div>
        </>
    )
}

export default History;
