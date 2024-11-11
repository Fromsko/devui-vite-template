import config from "@/utils/config";
import { log } from "@/utils/log/web_log";
import GetErrorMsg, { ErrorMessage, RequestStatus } from "@/utils/models/status";
import axios, { AxiosRequestConfig, AxiosResponse, InternalAxiosRequestConfig } from "axios";
import { ResponseData } from "@/utils/models/auth";

class RequestManager {
  private service;

  constructor() {
    this.service = axios.create();

    this.initializeRequestInterceptor();
    this.initializeResponseInterceptor();

    this.setBaseUrl();
    this.setupRequestMethods();
  }

  request = async <T = any>(options: AxiosRequestConfig): Promise<T> => {
    if (options.method?.toLowerCase() === "get") {
      options.params = options.data;
    }
    return this.service(options);
  };

  private initializeRequestInterceptor() {
    this.service.interceptors.request.use((req: InternalAxiosRequestConfig) => {
      const token = this.getToken();
      if (token) {
        req.headers.Authorization = token;
      }
      return req;
    }, error => {
      return Promise.reject(error);
    });
  }

  private initializeResponseInterceptor() {
    this.service.interceptors.response.use((res: AxiosResponse) => {
      const { code, msg }: ResponseData = res.data;
      if ((code) === RequestStatus.SUCCESS) {
        return res.data;
      } else {
        return this.handleError(code, msg);
      }
    }, error => {
      return Promise.reject(ErrorMessage.TokenError);
    });
  }

  private getToken(): string | undefined {
    log.warning("使用的模拟 Token");
    return "bear fromsko";
  }

  private handleError(code: number, msg: string): Promise<never> {
    return Promise.reject(
      GetErrorMsg(code)
    );
  }

  private setBaseUrl() {
    if (config.useMock === "true") {
      this.service.defaults.baseURL = config.mockApi;
    } else {
      this.service.defaults.baseURL = config.baseApi;
    }
  }

  private setupRequestMethods() {
    // 动态添加请求方法
    ["get", "post", "put", "delete"].forEach((method) => {
      (this as any)[method] = (url: string, data?: any, options?: AxiosRequestConfig) => {
        return this.request({
          url,
          data,
          method,
          ...options
        });
      };
    });
  }
}

const manager = new RequestManager();

export default manager.request;
