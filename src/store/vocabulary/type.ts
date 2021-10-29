import type { IVocaItem } from '@/api/login/type';

export type ISortType = 'timeA' | 'timeDe' | 'nameA' | 'nameDe';
export type ISortFn = (itemA: any, itemB: any) => number;

export interface IVocaListItem {
  name: string,
  cTime: number,
  count: number,
}

export interface IVocaItemData {
  vocasItem: IVocaItem;
  vocaListItem: IVocaListItem;
}

export interface IVocaState {
  vocabularys: IVocaItem[],
  vocaList: IVocaListItem[],
  sortType: ISortType,
}
