import { useState } from "react";

const History = () => {
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
        </div>
    )
}

export default History;