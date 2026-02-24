const RoundButton = ({ content, status }) => {
    const buttonColor = {
        positive : 'bg-[#FF4D66]',
        negative: 'bg-[#4073FF]',
        neutral: 'bg-[#9E9E9E]',
        predict_success: 'bg-[#47D994]',
        predict_fail: 'bg-[#8C8C8C]'
    }

    const Icon = {
        positive: "mingcute:arrow-up-fill",
        negative: "mingcute:arrow-down-fill",
        neutral: "null",
        predict_success: "mingcute:check-fill",
        predict_fail: "fa6-solid:xmark",
    }[status];

    return (
        <div className={`
            ${buttonColor[status]}
            px-3 h-7 flex items-center justify-center rounded-4xl text-[11px] text-white font-bold gap-0.5 whitespace-nowrap w-fit`
        }>
            <p className="leading-none shrink-0">{content}</p>
            <div className="flex items-center justify-center">
                <iconify-icon
                    icon={Icon}
                    className="text-[13px] flex"
                ></iconify-icon>
            </div>
        </div>
    )
}

export default RoundButton;