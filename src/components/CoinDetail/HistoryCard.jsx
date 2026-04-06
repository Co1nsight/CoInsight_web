import 'iconify-icon';
import RoundButton from "../common/RoundButton";
import { useState, useMemo } from 'react';
import PredictionNewsCard from './PredictionNewsCard';
import { getPredictionNews } from '../../apis/CoinDetail/aihistory';

const HistoryCard = ({ ticker, predictionId, date, time, ai_prediction, actual_price, current_price, prediction_result, ai_status, prediction_status }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [usedNews, setUsedNews] = useState([]);
    
    // 페이지네이션 관련 상태
    const [currentPage, setCurrentPage] = useState(1);
    const ITEMS_PER_PAGE = 5;

    // --- 데이터 계산 로직 ---
    const totalPages = Math.ceil(usedNews.length / ITEMS_PER_PAGE);
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    const currentNews = usedNews.slice(startIndex, startIndex + ITEMS_PER_PAGE);

    const LabelToContent = { UP: '호재', DOWN: '악재', NEUTRAL: '중립' }
    const LabelToStatus = { UP: 'positive', DOWN: 'negative', NEUTRAL: 'neutral' }

    const StatusConfig = {
        positive: { color: 'text-[#FF4D66]', icon: "mingcute:arrow-up-fill" },
        negative: { color: 'text-[#4073FF]', icon: "mingcute:arrow-down-fill" },
        neutral: { color: 'text-[#8892B0]', icon: null }
    };

    const { rate, status } = useMemo(() => {
        if (!actual_price || !current_price) return { rate: "0.00", status: "neutral" };
        const upDownrate = ((current_price - actual_price) / actual_price) * 100;
        let currentStatus = "neutral";
        if (upDownrate > 0) currentStatus = "positive";
        else if (upDownrate < 0) currentStatus = "negative";
        return { rate: upDownrate.toFixed(2), status: currentStatus }
    }, [actual_price, current_price]);

    const onClickOpen = async () => {
        setIsOpen(!isOpen);
        // 이미 데이터를 불러왔다면 다시 호출하지 않음 (선택 사항)
        if (!isOpen && usedNews.length === 0) {
            try {
                const res = await getPredictionNews(ticker, predictionId);
                setUsedNews(res.data || []);
                setCurrentPage(1); // 데이터를 새로 받을 때 1페이지로 초기화
            } catch (error) {
                console.error("데이터 받아오기 실패 : ", error);
            }
        }
    }

    return (
        <div className="w-full bg-[#0A192F] flex flex-col border-b border-[#233554] last:border-0">
            <div className='w-full flex justify-between items-center px-6 py-5'>
                <div className="flex flex-col gap-2">
                    <div className="font-medium text-[#CCD6F6]">{time.split("T")[1].split(":")[0]}:{time.split("T")[1].split(":")[1]}</div>
                    <div className="text-[#8892B0] text-[14px]">{date}</div>
                </div>

                <div className="flex flex-col justify-center items-center gap-2">
                    <div className="text-[#CCD6F6] text-[12px]">AI 예측</div>
                    <RoundButton content={LabelToContent[ai_prediction]} status={LabelToStatus[ai_status]} />
                </div>

                <div className="flex flex-col justify-center items-center gap-2">
                    <div className="text-[#CCD6F6] text-[12px]">실제 결과</div>
                    <div className={`flex flex-row gap-1 items-center font-bold ${StatusConfig[status].color}`}>
                        {rate}%
                        {StatusConfig[status].icon && <iconify-icon icon={StatusConfig[status].icon}></iconify-icon>}
                    </div>
                </div>

                <div className="flex flex-col justify-center items-center gap-2">
                    <div className="text-[#CCD6F6] text-[12px]">예측 결과</div>
                    <RoundButton content={prediction_result} status={prediction_status} />
                </div>

                <div
                    className="w-46 h-9 border border-[#233554] items-center flex flex-row justify-center rounded-sm text-[#8892B0] cursor-pointer gap-2 hover:border-[#64FFDA] hover:text-[#64FFDA] transition-colors"
                    onClick={onClickOpen}
                >
                    <p className="text-[14px]">사용된 기사 보기</p>
                    <iconify-icon icon={isOpen ? "mingcute:up-line" : "mingcute:down-line"}></iconify-icon>
                </div>
            </div>

            {/* 펼쳐지는 기사 목록 영역 */}
            {isOpen && (
                <div className='flex flex-col bg-[#112240] border-t border-[#233554] px-6 py-5 gap-4'>
                    <div className='flex justify-between items-center'>
                        <p className='font-semibold text-[16px] text-[#CCD6F6]'>
                            이 예측에 사용된 기사 <span className="text-[#64FFDA] text-[14px] ml-2">{usedNews.length}</span>
                        </p>
                        
                        {/* 페이지네이션 컨트롤 */}
                        {totalPages > 1 && (
                            <div className='flex items-center gap-4 text-[#8892B0]'>
                                <button 
                                    onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                                    disabled={currentPage === 1}
                                    className={`flex items-center hover:text-[#64FFDA] disabled:opacity-30 disabled:hover:text-[#8892B0]`}
                                >
                                    <iconify-icon icon="mingcute:left-line" width="20"></iconify-icon>
                                </button>
                                <span className='text-[14px] font-medium'>
                                    <span className='text-[#64FFDA]'>{currentPage}</span> / {totalPages}
                                </span>
                                <button 
                                    onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                                    disabled={currentPage === totalPages}
                                    className={`flex items-center hover:text-[#64FFDA] disabled:opacity-30 disabled:hover:text-[#8892B0]`}
                                >
                                    <iconify-icon icon="mingcute:right-line" width="20"></iconify-icon>
                                </button>
                            </div>
                        )}
                    </div>

                    <div className='flex flex-col gap-2'>
                        {currentNews.length > 0 ? (
                            currentNews.map((news) => (
                                <PredictionNewsCard
                                    key={news.newsId}
                                    newsId={news.newsId}
                                    status={news.sentimentLabel}
                                    displayLabel={news.sentimentDisplayLabel}
                                    title={news.title}
                                    publisher={news.publisher}
                                    time={news.publishedAt}
                                />
                            ))
                        ) : (
                            <p className="text-[#8892B0] text-[14px] py-8 text-center">
                                로딩 중이거나 사용된 기사가 없습니다.
                            </p>
                        )}
                    </div>
                </div>
            )}
        </div>
    )
}

export default HistoryCard;