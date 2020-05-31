import React from 'react';
import { connect } from 'dva';
import styles from './style.less';
import AppHeader from '@/components/Header';
import AppListItem from '@/components/AppItem';
import { AppItem, HomeModelStateType } from '@/models/home';

interface HomePagePropsType {
  dispatch: any
  home: HomeModelStateType
}

function Index({ home, dispatch }: HomePagePropsType) {
  return (

    <div className={styles.content}>
      {home.appItems.map((item: AppItem) => {
        return (
          <AppListItem
            key={item.key}
            name={item.name}
            description={item.description}
            status={item.status}
            downloadProgress={item.downloadProgress}
            onStart={() => {
              dispatch({
                type: 'home/startApp',
                payload: {
                  key: item.key,
                },
              });
            }}
            onStop={() => {
              dispatch({
                type: 'home/stopApp',
                payload: {
                  key: item.key,
                },
              });
            }}
            onDownload={() => {
              dispatch({
                type: 'home/downloadApp',
                payload: {
                  key: item.key,
                },
              });
            }}
            onUninstall={() => {
              dispatch({
                type: 'home/uninstall',
                payload: {
                  product: item.key,

                },
              });
            }}
            message={item.message}
            actions={item.actions}
          />
        );
      })}
    </div>
  );
}

// @ts-ignore
export default connect(({ home }) => ({ home }))(Index);
