import { instance } from "../../utils/axios";

export const getTickers = async (page = 0, size = 10) => {
    try {
        const res = await instance.get("/api/v1/main/cryptos", {
            params: { page, size },
        });
        return res.data;
    } catch (error) {
        console.error("코인 시세 목록 불러오기 실패: ", error);
        throw error;
    }
};
