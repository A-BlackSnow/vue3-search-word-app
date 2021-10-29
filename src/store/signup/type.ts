export interface ISignUpState {
  nickname: string,
  passwd: string,
  phoneNumber: string,
  verifyCode: string,
}

export interface ICommitUpdateData {
  key: keyof ISignUpState,
  value: string,
}
