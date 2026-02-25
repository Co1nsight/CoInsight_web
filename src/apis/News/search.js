import { instance } from "../../utils/axios";

export const searchNews = async (keyword, page = 0, size = 20) => {
    try {
        const res = await instance.get("/api/v1/news/search", {
            params: { keyword, page, size },
        });
        return res.data;
    } catch (error) {
        console.error("뉴스 검색 실패: ", error);
        throw error;
    }
};
