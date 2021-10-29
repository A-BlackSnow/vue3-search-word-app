export interface ISignUpData {
  nickname: string,
  passwd: string,
  phoneNumber: string,
  verifyCode: string,
}

export interface IGetVerifyCodeResData {
  isSentSMS?: boolean
}

export interface ISubmitSignUpResData {
  isSignUp?: boolean
}
