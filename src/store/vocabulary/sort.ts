// import type { IVocaWordItem } from '@/api/login/type';
import type { IVocaListItem, ISortType, ISortFn } from './type';

const timeAscendSortFn: ISortFn = (itemA: IVocaListItem, itemB: IVocaListItem) => {
  return itemA.cTime - itemB.cTime;
};

const timeDescendSortFn: ISortFn = (itemA: IVocaListItem, itemB: IVocaListItem) => {
  return itemB.cTime - itemA.cTime;
};

const nameDescendSortFn: ISortFn = (itemA: IVocaListItem, itemB: IVocaListItem) => {
  return itemB.name.localeCompare(itemA.name, 'zh');
};

const nameAscendSortFn: ISortFn = (itemA: IVocaListItem, itemB: IVocaListItem) => {
  return itemA.name.localeCompare(itemB.name, 'zh');
};

export default (vocaList: IVocaListItem[], sortType: ISortType): IVocaListItem[] => {
  let sortFn: ISortFn | null = null;

  switch (sortType) {
    case 'timeA':
      sortFn = timeAscendSortFn;
      break;
    case 'timeDe':
      sortFn = timeDescendSortFn;
      break;
    case 'nameA':
      sortFn = nameAscendSortFn;
      break;
    case 'nameDe':
      sortFn = nameDescendSortFn;
      break;
    default:
      throw new TypeError('参数错误');
  }

  return vocaList.sort(sortFn as ISortFn);
};
