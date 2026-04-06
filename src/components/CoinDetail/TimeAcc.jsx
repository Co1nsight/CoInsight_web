const TimeAcc = ({time, value}) => {
    return (
        <div className="flex flex-col bg-[#0A192F] w-35 px-4 pb-2 pt-3 gap-1">
            <div className="text-[12px] text-white">
                {time}
            </div>

            <div className="text-[20px] font-bold text-white">
                {value}%
            </div>
        </div>
    )
}

export default TimeAcc;