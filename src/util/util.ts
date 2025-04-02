import axios, {
  AxiosError,
  AxiosInstance,
  AxiosResponse,
  InternalAxiosRequestConfig,
} from "axios";

export const ACCESS_TOKEN: string = "access_token";
export const TOKEN_CYBERSOFT: string =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0ZW5Mb3AiOiJUZXN0aW5nIDA0IiwiSGV0SGFuU3RyaW5nIjoiMDEvMTIvMjAyNSIsIkhldEhhblRpbWUiOiIxNzY0NTQ3MjAwMDAwIiwibmJmIjoxNzQwNTg5MjAwLCJleHAiOjE3NjQ2OTQ4MDB9.0mXLU2vygmpCOgJ_EA-Lr0C7fYh7fPC6gSUzVDLlrmg";

export const DOMAIN: string = "https://apistore.cybersoft.edu.vn/";

export const httpClient: AxiosInstance = axios.create({
  baseURL: DOMAIN,
  timeout: 30000,
});

httpClient.interceptors.request.use(
  (req: InternalAxiosRequestConfig<any>) => {
    const accessToken = localStorage.getItem(ACCESS_TOKEN);
    if (req.headers) {
      req.headers.set("Authorization", accessToken ? `${accessToken}` : "");
      req.headers.set("tokenCyberSoft", TOKEN_CYBERSOFT);
    }
    return req;
  },
  (err: AxiosError) => {
    return Promise.reject(err);
  }
);

httpClient.interceptors.response.use(
  (response: AxiosResponse) => {
    return response.data.content;
  },
  (error: AxiosError) => {
    // Xử lý lỗi
    if (error.response) {
      const { status } = error.response;

      // Xử lý các mã lỗi cụ thể
      switch (status) {
        case 401: // Unauthorized
          // Có thể thêm logic refresh token ở đây
          localStorage.removeItem(ACCESS_TOKEN);
          // Có thể redirect đến trang login
          window.location.href = "/login";
          break;

        case 403: // Forbidden
          // Xử lý khi không có quyền truy cập
          console.error("Bạn không có quyền truy cập tài nguyên này");
          break;

        case 404: // Not Found
          console.error("Không tìm thấy tài nguyên");
          break;

        case 500: // Server Error
          console.error("Lỗi server, vui lòng thử lại sau");
          break;
      }
    } else if (error.request) {
      // Request được gửi nhưng không nhận được response
      console.error("Không thể kết nối đến server");
    } else {
      // Lỗi trong quá trình setup request
      console.error("Lỗi:", error.message);
    }

    return Promise.reject(error);
  }
);
