import { instance } from "../../utils/axios";

export const getNewsDetail = async (id) => {
    try {
        const res = await instance.get(`/api/v1/news/${id}/detail`);
        return res.data;
    } catch (error) {
        console.error("뉴스 상세 불러오기 실패: ", error);
        throw error;
    }
};
