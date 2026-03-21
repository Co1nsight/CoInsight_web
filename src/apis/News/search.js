import { instance } from "../../utils/axios";

export const searchAll = async (keyword, cryptoLimit = 5, newsLimit = 5) => {
    try {
        const res = await instance.get("/api/v1/main/search", {
            params: { keyword, cryptoLimit, newsLimit },
        });
        return res.data;
    } catch (error) {
        console.error("통합 검색 실패: ", error);
        throw error;
    }
};
