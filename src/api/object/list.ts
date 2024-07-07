import axiosInstance from "../axios/axiosInstance";
import axios, { AxiosError } from "axios";

/** 월별 목표 리스트 호출 함수 */
export const handleRequestObjectList = async (
  yearMonth: string,
  handleLoadingIndicator?: (value: boolean) => void
) => {
  if (handleLoadingIndicator) handleLoadingIndicator(true); // 요청이 시작되면 로딩 상태를 true로 설정

  try {
    const response = await axiosInstance.post("/api/object/list", {
      data: { yearMonth },
    });
    if (handleLoadingIndicator) handleLoadingIndicator(false); // 요청이 성공하면 로딩 상태를 false로 설정
    return response.data;
  } catch (err) {
    if (handleLoadingIndicator) handleLoadingIndicator(false); // 요청 중 오류가 발생하면 로딩 상태를 false로 설정

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
