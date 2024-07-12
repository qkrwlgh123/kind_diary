import axiosInstance from "../axios/axiosInstance";
import axios, { AxiosError } from "axios";

/** 종합 달성률 요청 함수 */
export const handleRequestGeneralAchievementResult = async (
  todayDate: string
) => {
  try {
    const response = await axiosInstance.post("/api/achievement/general", {
      data: { todayDate },
    });
    return response.data;
  } catch (err) {
    // 에러가 AxiosError 타입인지 확인
    if (axios.isAxiosError(err)) {
      const axiosError = err as AxiosError;
      console.error("Axios error:", axiosError.message);

      if (axiosError.response) {
        console.error("Status code:", axiosError.response.status);
        console.error("Response data:", axiosError.response.data);
      }
    } else {
      console.error("Unexpected error:", err);
    }
    throw err;
  }
};
