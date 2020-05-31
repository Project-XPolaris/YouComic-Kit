import React from 'react';
import styles from './style.less';
import { Button, Divider, Progress,Modal } from 'antd';
import appIcon from '../../assets/lab.png';
import { AppStatus } from '@/models/home';
import { DeleteOutlined, DownloadOutlined, PauseOutlined, RightOutlined } from '@ant-design/icons/lib';

const {confirm} = Modal
interface AppItemPropsType {
  name: string
  description: string
  onStart: () => void
  onStop: () => void
  onDownload: () => void
  onUninstall: () => void
  message?: string
  actions?: any
  status: AppStatus
  downloadProgress: any
}


export default function AppItem({ name, description, status, onStart, onDownload, onUninstall, onStop, downloadProgress,message,actions }: AppItemPropsType) {
  const onItemDelete = () => {
    confirm({
      title:"删除确认",
      okText:"删除",
      cancelText:"取消",
      onOk:() => {
        onUninstall()
      }
    })
  }
  const renderActions = () => {
    if (status === AppStatus.Stop) {
      return (
        <div>
          <Button shape={'circle'} icon={<RightOutlined/>} onClick={onStart} className={styles.appButton}/>
          <Button shape={'circle'} icon={<DeleteOutlined/>} onClick={onItemDelete} className={styles.appButton}/>
        </div>
      );
    }
    if (status === AppStatus.NotInstall) {
      return (
        <div>
          <Button shape={'circle'} icon={<DownloadOutlined/>} onClick={onDownload} className={styles.appButton}/>
        </div>
      );
    }
    if (status === AppStatus.Downloading) {
      return (
        <div>
          <Progress type="circle" percent={downloadProgress} width={32}/>
        </div>
      );
    }
    if (status === AppStatus.Running) {
      return (
        <div>
          <Button shape={'circle'} icon={<PauseOutlined/>} onClick={onStop} className={styles.appButton}/>
        </div>
      );
    }
  };
  return (
    <div className={styles.main}>
      <div className={styles.content}>
        <div className={styles.left}>
          <img src={appIcon} className={styles.appIcon}/>
          <div className={styles.appInfo}>
            <div className={styles.appName}>{name}</div>
            <div className={styles.description}>{description}</div>
          </div>
        </div>
        {renderActions()}
      </div>
      {
        message &&
        <div className={styles.message}>{message}</div>
      }
      {
        actions &&
        <div className={styles.actionContainer}>
          {actions.map((item:any,idx) => (
            <Button onClick={item.onClick} key={idx}>{item.name}</Button>
          ))}
        </div>
      }
      <Divider className={styles.divider}/>
    </div>
  );
}
