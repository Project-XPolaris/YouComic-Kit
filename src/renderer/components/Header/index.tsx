import React from 'react';
import logoImage from "../../assets/lab.png"
import styles from './style.less'
import { Button, Typography } from 'antd';
import { CloseOutlined, MinusOutlined } from '@ant-design/icons/lib';
import { remote } from '@/utils/electron';
import { app } from '@/global';
const { Title } = Typography;

interface AppHeaderPropsType {

}


export default function AppHeader({}: AppHeaderPropsType) {
  return (
    <div className={styles.main}>
      <div className={styles.windowAction}>

        <Button icon={<MinusOutlined />} type={'link'} className={styles.actionButton} onClick={() => {
          remote.BrowserWindow.getFocusedWindow().minimize();
        }}/>
        <Button icon={<CloseOutlined/>} type={'link'} className={styles.actionButton} onClick={() => {
          app.quit()
        }}/>
      </div>
      <img src={logoImage} className={styles.logo}/>
      <div className={styles.titleWrap}>
        <span className={styles.title}>YouComic</span>
      </div>
    </div>
  );
}
