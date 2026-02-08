const RoundButton = ({content, status}) => {
    const buttonColor = {
        positive: 'bg-[#FF4D66]',
        negative: 'bg-[#4073FF]',
        predict_success: 'bg-[#47D994]',
        predict_fail: 'bg-[#8C8C8C]'
    }

    return (
        <div className={`
            ${buttonColor[status]}
            px-3 py-2.5 flex items-center justify-center rounded-4xl text-[12px] text-white font-bold`
        }>
            {content}
        </div>
    )
}

export default RoundButton;