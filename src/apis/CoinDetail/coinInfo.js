import { instance } from "../../utils/axios";

export const getCoinInfo = async (ticker) => {
    try {
        const res = await instance.get(`/api/v1/crypto/${ticker}`);
        //console.log(res);
        return res.data;
    } catch (error) {
        console.error("코인 정보 불러오기 실패: ", error);
        throw error;
    }
    
}