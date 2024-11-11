// src/models/status.ts

// 请求状态枚举
export enum RequestStatus {
  SUCCESS = 200,         // 请求成功
  TOKENErrorCode = 40001, // Token 过期
  AuthErrorCode = 5000, // 无权访问
  NoRouteErrorCode = 5001, // 无法找到路由
  LoginFaultErrorCode = 5002, // 登录失败
  RegisterFaultErrorCode = 5003, // 注册失败
  RegisterUserExistsErrorCode = 5004, // 用户已存在
  ConnectDatabaseErrorCode = 5005, // 连接数据库失败
  ParamsSendErrorCode = 5006, // 参数传递错误
  CaptchaErrorCode = 5007 // 验证码错误
}

export enum ErrorMessage {
  AuthError = "无权访问",
  NetWordError = "网络异常",
  CaptchaError = "验证码错误",
  TokenError = "Token 已过期",
  NoRouteError = "无法找到路由",
  LoginFaultError = "登录失败",
  RegisterFaultError = "注册失败",
  ParamsSendError = "参数传递异常",
  ConnectDatabaseError = "数据库连接失败",
  RegisterUserExistsError = "该用户已存在",
}

// 业务状态枚举
export enum BusinessStatus {
  ACTIVE = "active",     // 业务活跃
  INACTIVE = "inactive",  // 业务不活跃
  PENDING = "pending",    // 业务待处理
  COMPLETED = "completed", // 业务已完成
}

// 其他状态信息
export enum CommonStatus {
  LOADING = "loading",    // 加载中
  SUCCESS = "success",     // 成功
  ERROR = "error",         // 错误
}

export default function GetErrorMsg(errCode: RequestStatus): string {
  switch (errCode) {
    case RequestStatus.AuthErrorCode:
      return ErrorMessage.AuthError;
    case RequestStatus.ConnectDatabaseErrorCode:
      return ErrorMessage.ConnectDatabaseError;
    case RequestStatus.TOKENErrorCode:
      return ErrorMessage.TokenError;
    case RequestStatus.NoRouteErrorCode:
      return ErrorMessage.NoRouteError;
    case RequestStatus.LoginFaultErrorCode:
      return ErrorMessage.LoginFaultError;
    case RequestStatus.RegisterFaultErrorCode:
      return ErrorMessage.RegisterFaultError;
    case RequestStatus.ParamsSendErrorCode:
      return ErrorMessage.ParamsSendError;
    case RequestStatus.RegisterUserExistsErrorCode:
      return ErrorMessage.RegisterUserExistsError;
    case RequestStatus.CaptchaErrorCode:
      return ErrorMessage.CaptchaError;
  }
  return "";
}