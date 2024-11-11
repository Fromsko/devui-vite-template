/**
 File: auth.ts
 Description: Auth model define
 */

export declare interface User {
  id: number;
  username: string;
  email: string;
  role: "admin" | "user";
}

export declare interface RegisterParams {
  username: string;
  password: string;
  captcha: string;
  captchaID: string;
}

export declare interface LoginParams {
  username: string;
  password: string;
}


export declare interface RespCaptchaType {
  captcha: string;
  captchaID: string;
}

export declare interface RespTokenType {
  Token: string;
  UserID: string;
}

export declare interface RespErrType {
  "type": string;
  "err": string;
}

export declare interface ResponseData {
  code: number;
  msg: string;
  data: RespTokenType | RespCaptchaType;
  err?: RespErrType;
}
