import { nodeOpen, YouComicProduct } from '@/global';
import { AppStatus } from '@/models/home';

export const eventDispatchMap = {
  [YouComicProduct.Supervisor]: {
    'need_install': (dispatch, data) => {
      dispatch({
        type: 'setMessage',
        payload: {
          key: YouComicProduct.Supervisor,
          message: '管理服务需要执行初始化配置',
        },
      });
      dispatch({
        type: 'setAction',
        payload: {
          key: YouComicProduct.Supervisor,
          actions: [
            {
              name: '打开设置',
              onClick: () => {
                nodeOpen(`http://localhost:${data.port.replace(":","")}`);
              },
            },
          ],
        },
      });
      dispatch({
        type:"updateAppStatus",
        payload:{
          key:YouComicProduct.Supervisor,
          status:AppStatus.Running
        }
      })
    },
    'start_success': (dispatch, data) => {
      dispatch({
        type: 'setMessage',
        payload: {
          key: YouComicProduct.Supervisor,
          message: `服务启动成功，地址为http://localhost:${data.port.replace(":","")}`,
        },
      });
      dispatch({
        type: 'setAction',
        payload: {
          key: YouComicProduct.Supervisor,
          actions: [
            {
              name: '打开',
              onClick: () => {
                nodeOpen(`http://localhost:${data.port.replace(":","")}`);
              },
            },
          ],
        },
      });
      dispatch({
        type:"updateAppStatus",
        payload:{
          key:YouComicProduct.Supervisor,
          status:AppStatus.Running
        }
      })
    },
  },
  [YouComicProduct.Explore]: {
    'need_install': (dispatch, data) => {
      dispatch({
        type: 'setMessage',
        payload: {
          key: YouComicProduct.Explore,
          message: '服务需要执行初始化配置',
        },
      });
      dispatch({
        type: 'setAction',
        payload: {
          key: YouComicProduct.Explore,
          actions: [
            {
              name: '打开设置',
              onClick: () => {
                nodeOpen(`http://localhost:${data.port.replace(":","")}`);
              },
            },
          ],
        },
      });
      dispatch({
        type:"updateAppStatus",
        payload:{
          key:YouComicProduct.Explore,
          status:AppStatus.Running
        }
      })
    },
    'start_success': (dispatch, data) => {
      dispatch({
        type: 'setMessage',
        payload: {
          key: YouComicProduct.Explore,
          message: `服务启动成功，地址为http://localhost:${data.port.replace(":","")}`,
        },
      });
      dispatch({
        type:"updateAppStatus",
        payload:{
          key:YouComicProduct.Explore,
          status:AppStatus.Running
        }
      })
    },
  },
  [YouComicProduct.Service]: {
    'need_install': (dispatch, data) => {
      dispatch({
        type: 'setMessage',
        payload: {
          key: YouComicProduct.Service,
          message: '需要执行初始化配置',
        },
      });
      dispatch({
        type: 'setAction',
        payload: {
          key: YouComicProduct.Service,
          actions: [
            {
              name: '打开设置',
              onClick: () => {
                nodeOpen(`http://localhost:${data.port}`);
              },
            },
          ],
        },
      });
      dispatch({
        type:"updateAppStatus",
        payload:{
          key:YouComicProduct.Service,
          status:AppStatus.Running
        }
      })
    },
    'start_success': (dispatch, data) => {
      dispatch({
        type: 'setMessage',
        payload: {
          key: YouComicProduct.Service,
          message: `服务启动成功，地址为http://localhost:${data.port}`,
        },
      });
      dispatch({
        type:"updateAppStatus",
        payload:{
          key:YouComicProduct.Service,
          status:AppStatus.Running
        }
      })
    },
  },
};
