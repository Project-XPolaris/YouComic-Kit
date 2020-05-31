import { Effect, Subscription } from 'dva';
import { Reducer } from 'redux';
import { checkConfigIsExist } from '@/services/config';
import { router } from 'umi';

export interface StartModelStateType {
}

export interface StartModelType {
  namespace: string,
  reducers: {}
  state: StartModelStateType
  effects: {
    init: Effect
  }
  subscriptions: {
    setup: Subscription
  }
}

const StartModel: StartModelType = {
  namespace: 'start',
  state: {},
  subscriptions: {
    setup({ dispatch }) {
      dispatch({
        type:"init"
      })
    },
  },
  effects: {
    * init(_, { call, put, select }) {
      const isConfigExist = yield call(checkConfigIsExist,{})
      if (!isConfigExist){
        router.replace("/init")
      }else{
        router.replace("/home")
      }
    },
  },
  reducers: {},
};
export default StartModel;
