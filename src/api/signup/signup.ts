import network from '../request';
import type { IGetVerifyCodeResData, ISignUpData, ISubmitSignUpResData } from './type';
import type { IResponseData } from '@/api/request/type';

export const getVerifyCode = (phoneNumber: string): Promise<IResponseData<IGetVerifyCodeResData>> => {
  return network.post({
    url: '/user/signup/sms_verification_code',
    data: { phoneNumber },
  }, {
    loadingText: '正在发送验证码...',
  });
};

export const submitSignUpData = (signData: ISignUpData): Promise<IResponseData<ISubmitSignUpResData>> => {
  return network.post({
    url: '/user/signup',
    data: signData,
  }, { loadingText: '正在注册中...' });
};
