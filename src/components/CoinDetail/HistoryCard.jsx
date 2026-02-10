import 'iconify-icon';
import RoundButton from "../common/RoundButton";
import { useState } from 'react';
import PredictionNewsCard from './PredictionNewsCard';

const HistoryCard = ({date, time, ai_prediction, actual_result, prediction_result, ai_status, prediction_status}) => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className="w-full bg-[#FAFAFA] flex flex-col">
            <div className='w-full flex justify-between items-center px-6 py-5'>
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

                <div 
                    className="w-46 h-9 border border-[#E0E0E0] items-center flex flex-row justify-center rounded-sm text-[#787878] cursor-pointer gap-2"
                    onClick={() => setIsOpen(!isOpen)}    
                >
                    <p>사용된 기사 보기</p>
                    {isOpen ? 
                        (<iconify-icon icon="mingcute:up-line" className="text-[#787878]"></iconify-icon>) : 
                        (<iconify-icon icon="mingcute:down-line" className="text-[#787878]"></iconify-icon>)
                    }
                </div>
            </div>

            {isOpen && (
                <div className='flex flex-col border border-[#EDEDED] shadow-sm rounded-md gap-2 px-6 py-5'>
                    <p className='font-semibold text-[16px]'>
                        이 예측에 사용된 기사
                    </p>

                    <div className='flex flex-col gap-2'>
                        <PredictionNewsCard 
                            status={"NEGATIVE"}
                            title={"비트코인 사상 최고가 경신, 10만 달러 돌파"}
                            publisher={"코인데스크"}
                            time={"2025-01-15T09:30:00"}
                        />
                        <PredictionNewsCard 
                            status={"NEGATIVE"}
                            title={"비트코인 사상 최고가 경신, 10만 달러 돌파"}
                            publisher={"코인데스크"}
                            time={"2025-01-15T09:30:00"}
                        />
                        <PredictionNewsCard 
                            status={"NEGATIVE"}
                            title={"비트코인 사상 최고가 경신, 10만 달러 돌파"}
                            publisher={"코인데스크"}
                            time={"2025-01-15T09:30:00"}
                        />
                    </div>
                </div>
            )}
        </div>
    )
}

export default HistoryCard;