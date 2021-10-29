// 随机数，返回字符串形式，前导零填充
export const generateRandom = (minNum: number, maxNum: number, isZeroPadding = true): string => {
  const range = maxNum - minNum;

  const randomNum = (Math.random() * range + minNum).toFixed();

  if (isZeroPadding) {
    const zeroNumber = maxNum.toString().length - randomNum.length;
    return Array(zeroNumber + 1).join('0') + randomNum;
  }
  return randomNum;
};

// 随机数，返回数字新式
export const generateRandomNum = (minNum: number, maxNum: number): number => {
  return parseInt(generateRandom(minNum, maxNum, false), 10);
};
