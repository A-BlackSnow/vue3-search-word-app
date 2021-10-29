/* eslint-disable camelcase */
import type { IPart } from '@/api/word/type';

export interface IBasicWordData {
  word_name: string;
  word_tag?: number[];
  frequence?: number;
  ph_en?: string;
  ph_am?: string;
  ph_other?: string;
  ph_en_mp3?: string;
  ph_am_mp3?: string;
  ph_tts_mp3?: string;
}

export type IParaphraseWordData = IPart[] | never[];

export type IExchangeWordData = {
  [key: string]: string[],
} | undefined;

export interface ISentence {
  id: number;
  type: number;
  cn: string;
  en: string;
  from: string;
  ttsUrl: string;
  ttsSize: number;
  likeNum: number;
}

export type ISentences = ISentence[] | null

export interface IEditedWordData {
  basicData: IBasicWordData;
  paraphraseData: IParaphraseWordData;
  exchangeData: IExchangeWordData;
  sentences: ISentences;
}
