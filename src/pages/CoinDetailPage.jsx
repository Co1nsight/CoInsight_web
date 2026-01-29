import { useEffect, useState } from "react";
import Navbar from "../components/common/Navbar";
import CoinChart from "../components/CoinDetail/CoinChart";

const CoinDetailPage = () => {
    const coinName = "KRW-BTC";
    const [currentPrice, setCurrentPrice] = useState(0);
    const [tradePrice, setTradePrice] = useState(0);
    const [fluctuationRange, setFluctuationRange] = useState(0);
    const [isPositive, setIsPositive] = useState(true);

    const formatPrice = (value) => {
        if (!value) return "0억";
        const formatPrice = Number(value) / 100000000;
        return `${formatPrice.toLocaleString(undefined, {maximumFractionDigits: 1})}억`;
    }

    useEffect (() => {
        const options = {method: 'GET', headers: {accept: 'application/json'}};

        fetch(`https://api.bithumb.com/v1/ticker?markets=${coinName}`, options)
            .then(response => response.json())
            .then(response => {
                //console.log(response);
                const formattedPrice = formatPrice(response[0].acc_trade_price_24h);
                setTradePrice(formattedPrice);
                const p = response[0].trade_price.toLocaleString('ko-KR');
                setCurrentPrice(p);
            })
            .catch(err => console.error(err));

        fetch(`https://api.bithumb.com/public/candlestick/BTC_KRW/1h`, options)
            .then(res => res.json())
            .then(res => {
                const data = res.data;
                const len = data.length;
                const currentPrice = parseFloat(data[len - 1][2]);
                const prevPrice = parseFloat(data[len - 2][2]);

                const changeRate = ((currentPrice - prevPrice) / prevPrice) * 100;
                setFluctuationRange(changeRate.toFixed(2));
                if (changeRate < 0) setIsPositive(false);
            })
            .catch(err => console.error(err));
    }, [coinName]);

    return  (
        <div>
            <Navbar />
            <div className="p-10">
                <div className="border border-[#E0E0E0] bg-[#FFFFFF] h-35 p-8 rounded-sm items-center justify-between flex flex-row">
                    <div className="flex flex-col">
                        <div className="text-[36px] font-bold text-[#212121]">
                            비트코인(BTC)
                        </div>

                        <div className="text-[16px] text-[#787878]">
                            2026년 01월 23일
                        </div>
                    </div>

                    <div className="flex flex-row gap-16">
                        <div className="flex flex-col gap-2">
                            <p className="text-[14px] text-[#787878]">현재가</p>
                            <p className="text-[28px] font-bold">₩{currentPrice}</p>
                        </div>

                        <div className="flex flex-col gap-2">
                            <p className="text-[14px] text-[#787878]">1시간 등락</p>
                            <p className={`text-[28px] font-bold ${isPositive ? `text-[#FF4242]` : `text-[#4073FF]`}`}>{fluctuationRange}%</p>
                        </div>

                        <div className="flex flex-col gap-2">
                            <p className="text-[14px] text-[#787878]">24시간 거래대금</p>
                            <p className="text-[28px] font-bold">₩{tradePrice}</p>
                        </div>
                    </div>
                </div>

                <CoinChart coinName={coinName}/>
            </div>
        </div>
    )
}

export default CoinDetailPage;