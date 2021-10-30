export interface Pictures {
  m: string;
  l: string;
  s: string;
  banners: string;
}

export interface WeekInfo {
  week: string;
  date: string;
  flag: string;
}

export interface TimeInfo {
  // eslint-disable-next-line
  last_title: string;
  // eslint-disable-next-line
  next_title: number;
  // eslint-disable-next-line
  week_info: WeekInfo[];
}

export interface ISentenceData {
  _id: string;
  pictures: Pictures;
  timeInfo: TimeInfo;
  title: string;
  content: string;
  note: string;
  tts: string;
}

export interface IDailySentencesResData {
  sentences: ISentenceData[];
}
