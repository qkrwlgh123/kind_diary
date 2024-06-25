import axiosInstance from "../axios/axiosInstance";
import axios, { AxiosError } from "axios";

/** 새 목표 생성 요청 함수 */
export const handleRequestAddObject = async (name: string, date: string) => {
  try {
    const response = await axiosInstance.post("/api/object/add", {
      data: { object: name, date },
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
