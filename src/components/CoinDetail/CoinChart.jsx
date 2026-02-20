import { init, dispose } from "klinecharts";
import { useEffect, useState, useRef } from "react";
import { getCandleInfo } from "../../apis/CoinDetail/chart";

const customStyles = {
    candle: {
        bar: {
            upColor: '#4073FF',
            downColor: '#FF4D66',
            upBorderColor: '#4073FF',
            downBorderColor: '#FF4D66',
            upWickColor: '#4073FF',
            downWickColor: '#FF4D66',               
        },
        priceMark: {
            last: {
                upColor: '#4073FF',
                downColor: '#FF4D66',
            },
            high: {
                color: '#4073FF',
            },
            low: {
                color: '#FF4D66',
            }
        }
    }
}

const CoinChart = ({ ticker }) => {
    const [coinInfo, setCoinInfo] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [isError, setIsError] = useState(false);
    const chartRef = useRef(null);

    const formatData = (data) => {
        return data.map(e => ({
            timestamp: e.timestamp,
            open: e.openPrice || e.opening_price,
            high: e.highPrice || e.high_price,
            low: e.lowPrice || e.low_price,
            close: e.closePrice || e.trade_price,
            volume: e.volume || e.candle_acc_trade_volume,
        })).reverse(); // 과거 -> 현재 순서로 바꾸기
    };

    const fetchCandleData = async (unit = 1) => {
        setIsLoading(true);
        setIsError(false);

        try {
            const res = await getCandleInfo(ticker, unit);
            if (res && res.data.length > 0) {
                const formattedData = formatData(res.data);
                setCoinInfo(formattedData);
            } else {
                setIsError(true);
            }
        } catch (error) {
            setIsError(true);
            console.error("데이터 불러오기 실패 : ", error);
        } finally {
            setIsLoading(false);
        }
    }

    const onClickMinute = () => fetchCandleData();  
    const onClickHour = () => fetchCandleData(60);
    const onClickFourHour = () => fetchCandleData(240);
    
    const onClickDay = () => {
        const options = {method: 'GET', headers: {accept: 'application/json'}};

        fetch(`https://api.bithumb.com/v1/candles/days?market=${ticker}&count=200`, options)
            .then(response => response.json())
            .then(response => {
                if (response && response.length > 0) {
                    const formattedData = formatData(response);
                    setCoinInfo(formattedData);
                }
            })
            .catch(err => console.error(err));
    }

    useEffect(() => {
        fetchCandleData();
    }, [ticker]);

    useEffect(() => {
        if (!coinInfo) return;

        if (!chartRef.current) {
            chartRef.current = init('chart', {styles: customStyles}); // 차트 생성
        }
        const chart = chartRef.current;
        chart.setStyles(customStyles)
        chart.setSymbol({ ticker: ticker })
        chart.setPeriod({ span: 1, type: 'day' })
        chart.setDataLoader({
            getBars: ({ callback}) => {
                callback(coinInfo)
            }
        })

        return () => {
            dispose('chart');
            chartRef.current = null;
        }
    }, [coinInfo, ticker]);

    return (
        <div className="mt-10">
            <div className="flex flex-row gap-4">
                <div className="font-semibold text-[20px]">
                    {ticker}
                </div>
                <div 
                    className="bg-[#1F78F2] px-2 py-1 rounded-sm text-white text-[12px] cursor-pointer flex items-center"
                    onClick={onClickMinute}    
                >
                    1분
                </div>
                <div 
                    className="bg-[#1F78F2] px-2 py-1 rounded-sm text-white text-[12px] cursor-pointer flex items-center"
                    onClick={onClickHour}
                >
                    1시간
                </div>
                <div 
                    className="bg-[#1F78F2] px-2 py-1 rounded-sm text-white text-[12px] cursor-pointer flex items-center"
                    onClick={onClickFourHour}    
                >
                    4시간
                </div>
                <div className="bg-[#1F78F2] px-2 py-1 rounded-sm text-white text-[12px] cursor-pointer flex items-center">
                    6시간
                </div>
                <div className="bg-[#1F78F2] px-2 py-1 rounded-sm text-white text-[12px] cursor-pointer flex items-center">
                    12시간
                </div>
                <div 
                    className="bg-[#1F78F2] px-2 py-1 rounded-sm text-white text-[12px] cursor-pointer flex items-center"
                    onClick={onClickDay}
                >
                    1일
                </div>
            </div>
            <div className="relative">
                {isError && (
                    <div className="absolute inset-0 z-10 flex flex-col items-center justify-center">
                        <p>데이터를 불러오는 데 실패했습니다.</p>
                        <button
                            onClick={() => fetchCandleData()}
                            className="mt-2 px-2 py-1 text-sm flex justify-center items-center bg-gray-200 rounded-md"
                        >
                            다시 시도하기
                        </button>
                    </div>
                )}
                {isLoading && <div className="absolute inset-0 z-10 bg-gray-100 animate-pulse"/>}
                <div id="chart" className="w-full h-150"/>
            </div>
        </div>
    )
}

export default CoinChart;
