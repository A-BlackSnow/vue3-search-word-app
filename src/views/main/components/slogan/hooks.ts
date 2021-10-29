const computeTime = (tarTime: {m: number, d: number}, examType: string, duration = 1) => {
  const nowDate = new Date();
  const nowTime = {
    m: nowDate.getMonth() + 1,
    d: nowDate.getDate(),
  };
  const targetDate = new Date();
  let days = 0;

  targetDate.setMonth(tarTime.m - 1);
  targetDate.setDate(tarTime.d);

  if (nowTime.m === tarTime.m && (nowTime.d >= tarTime.d && nowTime.d < tarTime.d + duration)) {
    return `${examType}加油`;
  }

  if (
    nowTime.m > tarTime.m
        || (nowTime.m === tarTime.m && nowTime.d >= tarTime.d + duration)) {
    targetDate.setFullYear(nowDate.getFullYear() + 1);
  }
  days = Math.ceil((targetDate.getTime() - nowDate.getTime()) / (1000 * 60 * 60 * 24));
  return `距离${examType}还有 ${days} 天`;
};

export default (selectedType: string): string => {
  switch (selectedType) {
    case '高中': {
      return computeTime({ m: 6, d: 7 }, '高考', 2);
    }

    case '四级': {
      return computeTime({ m: 12, d: 18 }, '四级考试');
    }

    case '六级': {
      return computeTime({ m: 12, d: 18 }, '六级考试');
    }

    case '考研': {
      return computeTime({ m: 12, d: 26 }, '考研考试');
    }

    default: {
      throw new TypeError('传入的值范围之外的值！');
    }
  }
};
