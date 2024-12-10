import instance from "@/utils/http/request";
import { LoginParams, RegisterParams } from "@/utils/models/auth";

const useAuthClient = () => {
  return {
    login: async (params: LoginParams) => {
      // return await instance({
      //   url: "/api/v1/login",
      //   method: "post",
      //   data: params
      // });
      return {
        code: 200,
        msg: "login success",
        data: {
          Token: "sk-mock",
          UserID: "mock"
        }
      }
    },
    register: async (params: RegisterParams) => {
      return await instance({
        url: "/api/v1/register",
        method: "post",
        data: params
      });
    },
    captcha: async () => {
      return await instance({
        url: "/api/v1/captcha",
        method: "get"
      });
    },
    logout: async () => {
      return await instance({
        url: "/user/logout",
        method: "post"
      });
    }
  };
};

export default useAuthClient;