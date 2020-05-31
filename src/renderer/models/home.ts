import { Effect, Subscription } from 'dva';
import { Reducer } from 'redux';
import { nodeChildProcess, YouComicProduct } from '@/global';
import childProcess from 'child_process';

import {
  processEventSubscription,
  startYouComicExplore,
  startYouComicService,
  startYouComicSupervisor,
  stopYouComicExplore,
  stopYouComicService,
  stopYouComicSupervisor,
} from '@/process/process';
import { downloadEventSubscription, downloadFile } from '@/services/download';
import { unzipFile } from '@/utils/files';
import { eventDispatchMap } from '@/process/dispatcher';
import { getDownloadUrl } from '@/version/version';
import { getInstallPathWithoutOS } from '@/utils/filepath';
import { InstallYouComicStudio } from '@/install/studio';
import { getInstallConfig } from '@/install/config';
import { installYouComicService } from '@/install/service';
import { installYouComicSupervisor, uninstallApp } from '@/install/supervisor';
import { installYouComicExplore } from '@/install/explore';

export enum AppStatus {
  NotInstall = 'NotInstall', Downloading = 'Downloading', Stop = 'Stop', Start = 'Start', Running = 'Running'
}

export interface AppProcess {

}

export interface AppItem {
  name: string
  description: string
  key: YouComicProduct
  status: AppStatus
  process?: childProcess.ChildProcess
  downloadProgress: number
  message?: string
  actions?: any[]
}

export interface HomeModelStateType {
  appItems: AppItem[]
}

const Apps: AppItem[] = [
  {
    key: YouComicProduct.Service,
    name: 'YouComic Service',
    description: 'core service',
    status: AppStatus.NotInstall,
    downloadProgress: 0,
  },
  {
    key: YouComicProduct.Explore,
    name: 'YouComic Web',
    description: 'explore your comic library',
    status: AppStatus.NotInstall,
    downloadProgress: 0,
  },
  {
    key: YouComicProduct.Supervisor,
    name: 'YouComic Supervisor',
    description: 'manage your comic library',
    status: AppStatus.NotInstall,
    downloadProgress: 0,
  },
  {
    key: YouComicProduct.Studio,
    name: 'YouComic Studio',
    description: 'edit or upload your comic',
    status: AppStatus.NotInstall,
    downloadProgress: 0,
  },
];

export interface HomeModelType {
  namespace: string;
  reducers: {
    updateAppStatus: Reducer
    attachProcess: Reducer
    updateProgress: Reducer
    setApps: Reducer
    setAction: Reducer
    setMessage: Reducer
    clearActionAndMessage: Reducer
  };
  state: HomeModelStateType;
  effects: {
    startApp: Effect
    stopApp: Effect
    installApp: Effect
    downloadApp: Effect
    unzipApp: Effect
    init: Effect
    uninstall: Effect
  };
  subscriptions: {
    service: Subscription
    setup: Subscription
    downloadSubscription: Subscription
  };
}

const HomeModel: HomeModelType = {
  namespace: 'home',
  state: {
    appItems: [],
  },
  subscriptions: {
    setup({ dispatch, history }) {
      dispatch({
        type: 'init',
      });

    },
    service({ dispatch, history }) {
      processEventSubscription.pop();
      processEventSubscription.push((type, tag, data) => {
        //handle with signal
        console.log({ type, tag, data });
        try {
          const eventData = JSON.parse(data);
          console.log(tag);
          console.log(eventData);
          console.log(eventDispatchMap[tag]);
          if (eventData.signal) {
            eventDispatchMap[tag][eventData.signal](dispatch, eventData);
            console.log(eventData.signal);
          }
        } catch (e) {
          console.log(e);
        }



        if (type === 'exit' && tag === 'service') {
          dispatch({
            type: 'updateAppStatus',
            payload: {
              key: 'service',
              status: AppStatus.Stop,
            },
          });
        }
      });
    },
    downloadSubscription({ dispatch, history }) {
      downloadEventSubscription.pop();
      downloadEventSubscription.push((type, tag, data) => {
        console.log(type, tag);
        console.log(data);
        dispatch({
          type: 'updateProgress',
          payload: {
            key: tag,
            progress: data.progress,
          },
        });
        if (type === 'done') {
          dispatch({
            type: 'installApp',
            payload: {
              key: tag,
              path: data.path,
              filename: data.filename,
            },
          });
        }
      });
    },
  },
  effects: {
    * init(_, { call, put, select }) {
      const installAppsConfig = yield call(getInstallConfig);
      //check apps
      Apps.forEach(async (app) => {
        if (installAppsConfig[app.key]) {
          app.status = AppStatus.Stop;
        }
      });
      yield put({
        type: 'setApps',
        payload: {
          apps: [...Apps],
        },
      });
    },
    * startApp({ payload: { key } }, { call, put, select }) {
      const installConfig = yield call(getInstallConfig, {});
      if (key === 'service') {
        if (installConfig.service) {
          startYouComicService(installConfig.service.entry, installConfig.service.workPath);
        }
      } else if (key === 'studio') {
        const { execFile, exec } = nodeChildProcess;
        if (installConfig.studio) {
          console.log(installConfig.studio);
          const child = execFile(installConfig.studio.entry, { cwd: installConfig.studio.workPath }, (error, stdout, stderr) => {
            if (error) {
              throw error;
            }
            console.log(stdout);
          });

        }
        return;
      } else if (key === YouComicProduct.Supervisor) {
        startYouComicSupervisor(installConfig[YouComicProduct.Supervisor].entry, installConfig[YouComicProduct.Supervisor].workPath);
      } else if (key === YouComicProduct.Explore) {
        startYouComicExplore(installConfig[YouComicProduct.Explore].entry, installConfig[YouComicProduct.Explore].workPath);
      }

    },
    * stopApp({ payload: { key } }, { call, put, select }) {
      console.log(key);
      if (key === 'service') {
        stopYouComicService();
      }
      if (key === YouComicProduct.Supervisor) {
        stopYouComicSupervisor();
      }
      if (key === YouComicProduct.Explore) {
        stopYouComicExplore();
      }
      yield put({
        type: 'clearActionAndMessage',
        payload: {
          key,
        },
      });
      yield put({
        type: 'updateAppStatus',
        payload: {
          key,
          status: AppStatus.Stop,
        },
      });
    },
    * uninstall({ payload: { product } }, { call, put, select }) {
      yield call(uninstallApp, { product });
      yield put({
        type:"clearActionAndMessage",
        payload:{
          key:product
        }
      })
      yield put({
        type:"updateAppStatus",
        payload:{
          key:product,
          status:AppStatus.NotInstall
        }
      })
    },
    * installApp({ payload: { key, path, filename } }, { call, put, select }) {
      if (key === YouComicProduct.Studio) {
        yield call(InstallYouComicStudio, { filename });
      }
      if (key === YouComicProduct.Service) {
        yield call(installYouComicService, { filename });
      }
      if (key === YouComicProduct.Supervisor) {
        yield call(installYouComicSupervisor, { filename });
      }
      if (key === YouComicProduct.Explore) {
        yield call(installYouComicExplore, { filename });
      }
      // clear download file

      yield put({
        type: 'updateAppStatus',
        payload: {
          key,
          status: AppStatus.Stop,
        },
      });
    },
    * downloadApp({ payload: { key } }, { call, put, select }) {
      const { file, url } = yield call(getDownloadUrl, { tag: key });
      if (file && url) {
        downloadFile(url, file, key);
        yield put({
          type: 'updateAppStatus',
          payload: {
            key,
            status: AppStatus.Downloading,
          },

        });
      }
    },
    * unzipApp({ payload: { tag, path } }, { call, put, select }) {
      console.log({ tag, path });
      yield call(unzipFile, {
        filePath: path,
        output: getInstallPathWithoutOS(tag),
      });
      yield put({
        type: 'updateAppStatus',
        payload: {
          key: tag,
          status: AppStatus.Stop,
        },
      });
    },
  },
  reducers: {
    updateAppStatus(state: HomeModelStateType, { payload: { key, status } }): HomeModelStateType {
      console.log(key,status)
      return {
        ...state,
        appItems: [
          ...state.appItems.map((item: AppItem) => {
            if (item.key === key) {
              return {
                ...item,
                status,
              };
            }
            return item;
          }),
        ],
      };
    },
    attachProcess(state, { payload: { key, process } }) {
      return {
        ...state,
        appItems: [
          ...state.appItems.map((item: AppItem) => {
            if (item.key === key) {
              return {
                ...item,
                process,
              };
            }
            return item;
          }),
        ],
      };
    },
    updateProgress(state: HomeModelStateType, { payload: { key, progress } }): HomeModelStateType {
      return {
        ...state,
        appItems: [
          ...state.appItems.map(item => {
            if (item.key === key) {
              return {
                ...item,
                downloadProgress: progress,
              };
            }
            return {
              ...item,
            };
          }),
        ],
      };
    },
    setApps(state: HomeModelStateType, { payload: { apps } }): HomeModelStateType {
      return {
        ...state,
        appItems: apps,
      };
    },
    setAction(state: HomeModelStateType, { payload: { key, actions } }): HomeModelStateType {
      return {
        ...state,
        appItems: [
          ...state.appItems.map((item) => {
            if (item.key === key) {
              return {
                ...item,
                actions,
              };
            }
            return {
              ...item,
            };
          }),
        ],
      };
    },
    setMessage(state: HomeModelStateType, { payload: { key, message } }): HomeModelStateType {
      return {
        ...state,
        appItems: [
          ...state.appItems.map((item) => {
            if (item.key === key) {
              return {
                ...item,
                message,
              };
            }
            return {
              ...item,
            };
          }),
        ],
      };
    },
    clearActionAndMessage(state: HomeModelStateType, { payload: { key } }): HomeModelStateType {
      return {
        ...state,
        appItems: [
          ...state.appItems.map((item) => {
            if (item.key === key) {
              return {
                ...item,
                message: undefined,
                actions: [],
              };
            }
            return {
              ...item,
            };
          }),
        ],
      };
    },
  },
};
export default HomeModel;
