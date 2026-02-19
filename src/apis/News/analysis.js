import { instance } from "../../utils/axios";

export const getNewsAnalysis = async (page = 0, size = 20) => {
    try {
        const res = await instance.get("/api/v1/news/analysis", {
            params: { page, size },
        });
        return res.data;
    } catch (error) {
        console.error("뉴스 분석 목록 불러오기 실패: ", error);
        throw error;
    }
};
