/* eslint-disable camelcase */

export interface IPart {
  part: string;
  means: string[];
}

export interface wSymbol {
  ph_en: string;
  ph_am: string;
  ph_other: string;
  ph_en_mp3: string;
  ph_am_mp3: string;
  ph_tts_mp3: string;
  ph_en_mp3_bk: string;
  ph_am_mp3_bk: string;
  ph_tts_mp3_bk: string;
  parts: IPart[];
}

export interface BaseInfo {
  word_name: string;
  is_CRI: string;
  symbols: wSymbol[];
  word_tag: number[];
  translate_type: number;
  frequence: number;
  exchange?: {
    [key: string]: string[];
  };
}

export interface Sentence {
  id: number;
  type: number;
  cn: string;
  en: string;
  from: string;
  ttsUrl: string;
  ttsSize: number;
  likeNum: number;
}

export interface IFindWordResData {
  _id?: string;
  word: string;
  base_info?: BaseInfo;
  sentences: Sentence[] | null
}
