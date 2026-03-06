import { instance } from "../../utils/axios";

export const getCandleInfo = async (ticker, unit=1, count=200) => {
    try {
        const res = await instance.get(`/api/v1/market/candles/${ticker}?unit=${unit}&count=${count}`);
        //console.log(res.data);
        return res.data;
    } catch (error) {
        console.error("코인 분봉 차트 불러오기 실패: ", error);
        throw error;
    }
    
}