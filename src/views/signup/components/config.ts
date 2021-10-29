import type { FieldRule } from 'vant';

export const phoneInputRule: FieldRule[] = [
  {
    required: true,
    message: '手机号不能为空!',
  },
  {
    pattern: /\d{11}/,
    message: '手机号为11位纯数字!',
  },
  {
    pattern: /^1(3\d|4[5-9]|5[0-35-9]|6[2567]|7[0-8]|8\d|9[0-35-9])\d{8}$/,
    message: '手机号格式不正确!',
  },
];

export const passwdInputRule: FieldRule[] = [
  {
    required: true,
    message: '密码不能为空!',
  },
  {
    pattern: /^.{8,16}$/,
    message: '密码为8到16位!',
  },
  {
    pattern: /^[a-zA-Z0-9!?~,.]{8,16}$/,
    message: '包含非法字符，只允许字母、数字及!?~,.字符',
  },
];

export const nicknameInputRule: FieldRule[] = [
  {
    required: true,
    message: '昵称不能为空!',
  },
  {
    pattern: /^.{1,8}$/,
    message: '昵称为8到16位!',
  },
  {
    pattern: /^([\u4e00-\u9fa5]|[\u0021-\u007e]){1,8}$/,
    message: '昵称包含非法字符!',
  },
];

export const verifyCodeInputRule: FieldRule[] = [
  {
    required: true,
    message: '验证码不能为空',
  },
  {
    pattern: /^\d{6}$/,
    message: '验证码为6位纯数字!',
  },
];
