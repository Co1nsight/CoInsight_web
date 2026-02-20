import { useEffect, useState } from "react";
import Navbar from "../components/common/Navbar";
import CoinChart from "../components/CoinDetail/CoinChart";
import History from "../components/CoinDetail/History";
import { getCoinInfo } from "../apis/CoinDetail/coinInfo";
import BasicLogo from "../assets/pixelarticons--coin.svg";
import DailyNews from "../components/CoinDetail/DailyNews";
import { useParams } from "react-router-dom";

const CoinDetailPage = () => {
    const { ticker } = useParams();

    const [coinInfo, setCoinInfo] = useState({
        name: "",
        ticker1: "",
        logoURL: BasicLogo,
        currentPrice: "0",
        tradePrice: "0",
        fluctuationRange: "0",
        isPositive: true,
        date: "",
        time: ""
    })
    

    const formatPrice = (value) => {
        if (!value) return "0억";
        const formatPrice = Number(value) / 100000000;
        return `${formatPrice.toLocaleString(undefined, {maximumFractionDigits: 1})}억`;
    }

    useEffect (() => {
        const options = {method: 'GET', headers: {accept: 'application/json'}};

        const fetchCoinInfo = async () => {
            try {
                const res = await getCoinInfo(ticker);
                const {data, timestamp} = res;
                const today = new Date(timestamp);

                setCoinInfo(prev => ({
                    ...prev,
                    name: data.name,
                    ticker1: data.ticker,
                    logoURL: data.logoUrl,
                    currentPrice: Number(data.currentPrice).toLocaleString('ko-KR'),
                    tradePrice: formatPrice(data.tradingVolume),
                    date: `${today.getFullYear()}년 ${today.getMonth() + 1}월 ${today.getDate()}일`,
                    time: `${today.getHours()}:${today.getMinutes()}:${today.getSeconds()}`
                }));
            } catch (error) {
                console.error("데이터 호출 실패 : ", error);
            }
        }

        fetch(`https://api.bithumb.com/public/candlestick/BTC_KRW/1h`, options)
            .then(res => res.json())
            .then(res => {
                const data = res.data;
                const len = data.length;
                const currentPrice = parseFloat(data[len - 1][2]);
                const prevPrice = parseFloat(data[len - 2][2]);

                const changeRate = ((currentPrice - prevPrice) / prevPrice) * 100;
                setCoinInfo(prevInfo => ({
                    ...prevInfo,
                    fluctuationRange: changeRate.toFixed(2),
                    isPositive: changeRate >= 0
                }));
            })
            .catch(err => console.error(err));

        fetchCoinInfo();
    }, [ticker]);

    return  (
        <div>
            <Navbar />
            <div className="p-10">
                <div className="border border-[#E0E0E0] bg-[#FFFFFF] h-35 p-8 rounded-sm items-center justify-between flex flex-row">
                    <div className="flex flex-col">
                        <div className="flex flex-row items-center gap-2">
                            <div>
                                <img src={coinInfo.logoURL} alt="logo" className="w-10 h-10"/>
                            </div>
                            <div className="text-[36px] font-bold text-[#212121]">
                                {coinInfo.name}({coinInfo.ticker1})
                            </div>
                        </div>
                        

                        <div className="text-[16px] text-[#787878]">
                            {coinInfo.date} {coinInfo.time} 기준
                        </div>
                    </div>

                    <div className="flex flex-row gap-16">
                        <div className="flex flex-col gap-2">
                            <p className="text-[14px] text-[#787878]">현재가</p>
                            <p className="text-[28px] font-bold">₩{coinInfo.currentPrice}</p>
                        </div>

                        <div className="flex flex-col gap-2">
                            <p className="text-[14px] text-[#787878]">1시간 등락</p>
                            <p className={`text-[28px] font-bold ${coinInfo.isPositive ? `text-[#FF4242]` : `text-[#4073FF]`}`}>{coinInfo.fluctuationRange}%</p>
                        </div>

                        <div className="flex flex-col gap-2">
                            <p className="text-[14px] text-[#787878]">24시간 거래대금</p>
                            <p className="text-[28px] font-bold">₩{coinInfo.tradePrice}</p>
                        </div>
                    </div>
                </div>

                <History ticker={ticker}/>
                <DailyNews ticker={ticker}/>
                <CoinChart ticker={ticker}/>
            </div>
        </div>
    )
}

export default CoinDetailPage;