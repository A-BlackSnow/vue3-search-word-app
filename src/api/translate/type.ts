export interface ITranslateParams {
  translateText: string;
  to: string;
  from: string;
}

export interface ITrasnlateResData {
  from: string;
  to: string;
  // eslint-disable-next-line
  trans_result: {
    src: string;
    dst: string;
  }[];
}

export type ITranslateRes = ITrasnlateResData | Record<string, never>;
