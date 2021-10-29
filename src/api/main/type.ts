export interface IBasicItem {
  id: number;
  title: string;
  provenance: string;
  cover: string;
}

export interface Datum {
  daily: IBasicItem[];
  listening: IBasicItem[];
  course: IBasicItem[];
  reading: IBasicItem[];
  news: IBasicItem[];
  blog: IBasicItem[];
}
