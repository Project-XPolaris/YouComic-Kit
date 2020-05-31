import path from 'path';
import childProcess from 'child_process';
import Axios from 'axios';
import nodeFSD from 'fs-extra';
import unzipper from 'unzipper';
import os from 'os';
import http from 'http';
import open from 'open';
import { remote } from './utils/electron';

export const nodeHttp: typeof http = remote.require('http');
export const nodeFS: typeof nodeFSD = remote.require('fs-extra');
export const nodeChildProcess: typeof childProcess = remote.require('child_process');
export const nodePath: typeof path = remote.require('path');
export const app = remote.app;
export const nodeAxios: typeof Axios = remote.require('axios');
export const nodeUnzipper: typeof unzipper = remote.require('unzipper');
export const nodeOS: typeof os = remote.require('os');
export const nodeOpen: typeof open = remote.require('open');
const rootPath = nodePath.join(app.getPath("appData"),"YouComic")
console.log(rootPath)
export const AppPath = {
  AppPath: rootPath,
  DataPath: nodePath.join(rootPath),
  InstallPath: nodePath.join(rootPath, 'app'),
  DownloadPath: nodePath.join(rootPath, 'download'),
  ApplicationConfigPath: nodePath.join(rootPath, 'config.json'),
  InstallConfigName: 'apps.json',
};


export enum YouComicProduct {
  Service = 'service', Explore = 'explore', Supervisor = 'supervisor', Studio = 'studio'
}

export enum LocalStorageKeys {
  InstallPath = 'install_path',
  Repo = 'repo'
}

export const DefaultSetting = {
  mirror: 'http://glacial-lake-47898.herokuapp.com/static/version.json',
};
