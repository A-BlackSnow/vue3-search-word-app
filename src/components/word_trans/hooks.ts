import store from '@/store/index';
import type { IFindWordResData } from '@/api/word/type';
import type { IWordTransData } from '@/store/word/type';
import type {
  IBasicWordData, IParaphraseWordData, IExchangeWordData, IEditedWordData,
} from './type';

export const commitHistory = (wordTrans: IWordTransData): void => {
  store.commit('wordModule/addHistory', wordTrans);
};

export const changeWordData = (sourceData: IFindWordResData): IEditedWordData => {
  const wordData = sourceData.base_info;
  const basicData: IBasicWordData = { word_name: '' };
  const { sentences } = sourceData;
  let exchangeData: IExchangeWordData;
  let paraphraseData: IParaphraseWordData = [];

  if (wordData) {
    basicData.word_name = wordData.word_name;
    basicData.frequence = wordData.frequence;

    const wordTag = wordData.word_tag;
    if (wordTag && wordTag instanceof Array) {
      const tags = [6, 1, 2, 0, 4, 5, 3];
      basicData.word_tag = tags.filter((rTag) => {
        const findRes = wordTag.find((cTag) => cTag === rTag);
        return findRes !== undefined;
      });
    }

    const wordSymbol = wordData.symbols[0];
    if (wordSymbol) {
      basicData.ph_en = wordSymbol.ph_en;
      basicData.ph_am = wordSymbol.ph_am;
      basicData.ph_other = wordSymbol.ph_other;
      basicData.ph_en_mp3 = wordSymbol.ph_en_mp3 ?? wordSymbol.ph_en_mp3_bk;
      basicData.ph_am_mp3 = wordSymbol.ph_am_mp3 ?? wordSymbol.ph_am_mp3_bk;
      basicData.ph_tts_mp3 = wordSymbol.ph_tts_mp3 ?? wordSymbol.ph_tts_mp3_bk;

      paraphraseData = wordSymbol.parts;
    }

    exchangeData = wordData.exchange;
  }

  return {
    basicData,
    paraphraseData,
    exchangeData,
    sentences,
  };
};
