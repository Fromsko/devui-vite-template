import useAuthClient from "@/utils/http/auth";
import { LoginParams, RegisterParams, ResponseData } from "@/utils/models/auth";


export const authClient = useAuthClient();

export enum eventType {
  Login = "login",
  Register = "register",
}

export declare type hookParams = {
  viewName: eventType,
  formData: LoginParams | RegisterParams,
  callBack: (finished: boolean, resp: ResponseData | string) => void
}

export const useHook = async (params: hookParams) => {
  let instance: ResponseData;
  try {
    switch (params.viewName) {
      case eventType.Register:
        instance = await authClient.register(
          params.formData as RegisterParams
        );
        break;
      case eventType.Login:
      default:
        instance = await authClient.login(
          params.formData as LoginParams
        );
    }
    params.callBack(true, instance);
  } catch (err) {
    params.callBack(false, err as string);
  }
};
