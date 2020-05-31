import React from 'react';
import { connect, Dispatch } from 'dva';
import { StartModelStateType } from '@/pages/start/model';
import { LoadingOutlined } from '@ant-design/icons/lib';
import { Spin } from 'antd';
import styles from './style.less'

interface StartPagePropsType {
  dispatch: Dispatch,
  start:StartModelStateType
}

function StartPage({ dispatch }: StartPagePropsType) {
  return (
    <div>
      <div className={styles.content}>
        <Spin indicator={<LoadingOutlined spin className={styles.indicator} />} />
        <div className={styles.text}>正在加载应用</div>
      </div>
    </div>
  );
}

export default connect(({start}:any) => ({start}))(StartPage);
