import React from 'react';
import { connect, Dispatch } from 'dva';
import styles from './style.less'
import AppHeader from '@/components/Header';
import { AppItem } from '@/models/home';
import AppListItem from '@/components/AppItem';


interface BaseLayoutPropsType {
  dispatch: Dispatch,
  children:any
}

function BaseLayout({ dispatch,children }: BaseLayoutPropsType) {
  return (
      <div className={styles.main}>
        <div className={styles.headerWrap} >
          <AppHeader/>
        </div>
        <div className={styles.content}>
          {children}
        </div>
      </div>
  );
}

export default connect(({}) => ({}))(BaseLayout);
