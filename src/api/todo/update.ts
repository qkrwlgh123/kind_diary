import axiosInstance from "../axios/axiosInstance";
import axios, { AxiosError } from "axios";

/** 할일 수정 요청 함수 */
export const handleRequestUpdateTodo = async (todoId: number, name: string) => {
  try {
    const response = await axiosInstance.put("/api/todo/update", {
      data: { todoId, name },
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
