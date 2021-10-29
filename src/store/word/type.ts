import type { IPart } from '@/api/word/type';

export interface IWordTransData
{
  word: string;
  parts: IPart[];
}

export interface IWordState {
  searchHistory: IWordTransData[];
}
