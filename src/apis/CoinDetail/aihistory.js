import { instance } from "../../utils/axios";

export const getAiPredictions = async (ticker) => {
    try {
        const res = await instance.get(`/api/v1/crypto/${ticker}/predictions`);
        //console.log(res);
        return res.data;
    } catch (error) {
        console.error("코인 예측 히스토리 불러오기 실패: ", error);
        throw error;
    }
}

export const getPredictionNews = async (ticker, predictionId) => {
    try {
        const res = await instance.get(`/api/v1/crypto/${ticker}/predictions/${predictionId}/news`);
        console.log(res);
        return res.data;
    } catch (error) {
        console.error("예측에 사용된 뉴스 목록 조회 실패 : ", error);
        throw error;
    }
}