import { init, dispose } from "klinecharts";
import { useEffect, useState, useRef } from "react";

const CoinChart = ({coinName}) => {
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

    const [coinInfo, setCoinInfo] = useState(null);
    const chartRef = useRef(null);

    const formatData = (data) => {
        return data.map(e => ({
            timestamp: e.timestamp,
            open: e.opening_price,
            high: e.high_price,
            low: e.low_price,
            close: e.trade_price,
            volume: e.candle_acc_trade_volume,
        })).reverse(); // 과거 -> 현재 순서로 바꾸기
    };

    const onClickMinute = () => {
        const options = {method: 'GET', headers: {accept: 'application/json'}};

        fetch(`https://api.bithumb.com/v1/candles/minutes/1?market=${coinName}&count=200`, options)
            .then(response => response.json())
            .then(response => {
                //console.log(response)
                if (response && response.length > 0) {
                    const formattedData = formatData(response);
                    setCoinInfo(formattedData);
                }
            })
            .catch(err => console.error(err));
    }
        

    const onClickHour = () => {
        const options = {method: 'GET', headers: {accept: 'application/json'}};

        fetch(`https://api.bithumb.com/v1/candles/minutes/60?market=${coinName}&count=200`, options)
            .then(response => response.json())
            .then(response => {
                //console.log(response)
                if (response && response.length > 0) {
                    const formattedData = formatData(response);
                    setCoinInfo(formattedData);
                }
            })
            .catch(err => console.error(err));
    }

    const onClickFourHour = () => {
        const options = {method: 'GET', headers: {accept: 'application/json'}};

        fetch(`https://api.bithumb.com/v1/candles/minutes/240?market=${coinName}&count=200`, options)
            .then(response => response.json())
            .then(response => {
                //console.log(response)
                if (response && response.length > 0) {
                    const formattedData = formatData(response);
                    setCoinInfo(formattedData);
                }
            })
            .catch(err => console.error(err));
    }

    const onClickDay = () => {
        const options = {method: 'GET', headers: {accept: 'application/json'}};

        fetch(`https://api.bithumb.com/v1/candles/days?market=${coinName}&count=200`, options)
            .then(response => response.json())
            .then(response => {
                //console.log(response)
                if (response && response.length > 0) {
                    const formattedData = formatData(response);
                    setCoinInfo(formattedData);
                }
            })
            .catch(err => console.error(err));
    }

    useEffect(() => {
        const options = {method: 'GET', headers: {accept: 'application/json'}};

        fetch(`https://api.bithumb.com/v1/candles/minutes/1?market=${coinName}&count=200`, options)
            .then(response => response.json())
            .then(response => {
                //console.log(response)
                if (response && response.length > 0) {
                    const formattedData = formatData(response);
                    setCoinInfo(formattedData);
                }
            })
            .catch(err => console.error(err));
    }, [coinName]);

    useEffect(() => {
        if (!coinInfo) return;

        if (!chartRef.current) {
            chartRef.current = init('chart', {styles: customStyles}); // 차트 생성
        }
        const chart = chartRef.current;
        chart.setStyles(customStyles)
        chart.setSymbol({ ticker: coinName })
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
    }, [coinInfo, coinName]);



    return (
        <div className="mt-10">
            <div className="flex flex-row gap-4">
                <div className="font-semibold text-[20px]">
                    {coinName}
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
            <div>
                <div id="chart" className="w-full h-150"/>
            </div>
        </div>
    )
}

export default CoinChart;
