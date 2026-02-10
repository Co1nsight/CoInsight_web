const RoundButton = ({content, status }) => {
    const buttonColor = {
        positive: 'bg-[#FF4D66]',
        negative: 'bg-[#4073FF]',
        predict_success: 'bg-[#47D994]',
        predict_fail: 'bg-[#8C8C8C]'
    }

    const Icon = {
        positive: "mingcute:arrow-up-fill",
        negative: "mingcute:arrow-down-fill",
        predict_success: "mingcute:check-fill",
        predict_fail: "fa6-solid:xmark",
    }[status];

    return (
        <div className={`
            ${buttonColor[status]}
            px-3 py-2 flex items-center justify-center rounded-4xl text-[12px] text-white font-bold gap-1`
        }>
            <p>{content}</p>
            <iconify-icon 
                icon={Icon} 
                className="flex items-center text-[14px]"
            ></iconify-icon>
        </div>
    )
}

export default RoundButton;