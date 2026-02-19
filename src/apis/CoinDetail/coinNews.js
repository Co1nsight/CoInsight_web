import { instance } from "../../utils/axios";

export const getCoinNews = async (ticker, page=0, size=20) => {
    try {
        const res = await instance.get(`/api/v1/crypto/${ticker}/news`, {
            params: {page, size}
        });
        //console.log(res);
        return res.data;
    } catch (error) {
        console.error("코인 관련 뉴스 불러오기 실패: ", error);
        throw error;
    }
}