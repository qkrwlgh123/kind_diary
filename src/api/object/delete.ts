import axiosInstance from "../axios/axiosInstance";
import axios, { AxiosError } from "axios";

/** 목표 삭제 요청 함수 */
export const handleRequestDeleteObject = async (objectId: number) => {
  try {
    const response = await axiosInstance.delete("/api/object/delete", {
      data: { objectId },
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
