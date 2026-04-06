const OverallAcc = ({title, value}) => {
    const unit = title == "성공률" ? "%" : "회";

    return (
        <div className="flex flex-col w-50 h-20 px-2.5 pb-2.5 gap-2">
            <div className="text-white">
                {title}
            </div>
            <div className="font-bold text-[36px] text-white">
                {value}{unit}
            </div>
        </div>
    )
}

export default OverallAcc;