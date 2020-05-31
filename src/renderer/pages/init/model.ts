import { Effect, Subscription } from 'dva';
import { Reducer } from 'redux';
import { LocalStorageKeys } from '@/global';
import { router } from 'umi';
import { createConfigFile } from '@/services/config';

export interface initModelStateType {
}

export interface initModelType {
  namespace: string,
  reducers: {}
  state: initModelStateType
  effects: {
    apply: Effect
  }
  subscriptions: {
    setup: Subscription
  }
}

const initModel: initModelType = {
  namespace: 'init',
  state: {},
  subscriptions: {
    setup({ dispatch }) {

    },
  },
  effects: {
    * apply({ payload: { repo } }, { call, put, select }) {
      console.log(repo)
      yield call(createConfigFile, { repo });
      router.replace("/home")
    },
  },
  reducers: {},

};
export default initModel;
