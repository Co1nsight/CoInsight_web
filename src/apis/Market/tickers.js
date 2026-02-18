import { instance } from "../../utils/axios";

export const getTickers = async (marketType = "KRW", sortBy = "tradeValue") => {
    try {
        const res = await instance.get("/api/v1/market/tickers", {
            params: { marketType, sortBy },
        });
        return res.data;
    } catch (error) {
        console.error("코인 시세 목록 불러오기 실패: ", error);
        throw error;
    }
};
