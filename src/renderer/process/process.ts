import childProcess from 'child_process';
import { nodeChildProcess, YouComicProduct } from '@/global';

export const processPool: { [key: string]: childProcess.ChildProcess } = {};
export const processEventSubscription: Array<(type: string, tag: string, data?: any) => void> = [];

export const startYouComicService = (entry, workPath) => {
  console.log({ entry, workPath });
  if (processPool['service']) {
    processPool['service'].kill();
  }
  const { execFile } = nodeChildProcess;
  const child = execFile(entry, { cwd: workPath }, (error, stdout, stderr) => {
    if (error) {
      throw error;
    }
    console.log(stdout);
  });
  child.stdout.on('data', (data) => {
    processEventSubscription.forEach(((subscriber) => subscriber('stdout', 'service', data)));
  });
  child.on('exit', () => {
    processEventSubscription.forEach(((subscriber) => subscriber('exit', 'service')));
  });
  processPool['service'] = child;
};

export const stopYouComicService = () => {
  if (processPool['service']) {
    processPool['service'].kill();
  }
};

export const startYouComicSupervisor = (entry, workPath) => {
  console.log({ entry, workPath });
  if (processPool[YouComicProduct.Supervisor]) {
    processPool[YouComicProduct.Supervisor].kill();
  }
  const { execFile } = nodeChildProcess;
  const child = execFile(entry, { cwd: workPath }, (error, stdout, stderr) => {
    if (error) {
      throw error;
    }
    console.log(stdout);
  });
  child.stdout.on('data', (data) => {
    processEventSubscription.forEach(((subscriber) => subscriber('stdout', YouComicProduct.Supervisor, data)));
  });
  child.on('exit', () => {
    processEventSubscription.forEach(((subscriber) => subscriber('exit', YouComicProduct.Supervisor)));
  });
  processPool[YouComicProduct.Supervisor] = child;
};

export const stopYouComicSupervisor = () => {
  if (processPool[YouComicProduct.Supervisor]) {
    processPool[YouComicProduct.Supervisor].kill();
  }
};

export const startYouComicExplore = (entry, workPath) => {
  console.log({ entry, workPath });
  if (processPool[YouComicProduct.Explore]) {
    processPool[YouComicProduct.Explore].kill();
  }
  const { execFile } = nodeChildProcess;
  const child = execFile(entry, { cwd: workPath }, (error, stdout, stderr) => {
    if (error) {
      throw error;
    }
    console.log(stdout);
  });

  processEventSubscription.forEach(((subscriber) => subscriber('start', YouComicProduct.Explore, {})));

  child.stdout.on('data', (data) => {
    processEventSubscription.forEach(((subscriber) => subscriber('stdout', YouComicProduct.Explore, data)));
  });
  child.on('exit', () => {
    processEventSubscription.forEach(((subscriber) => subscriber('exit', YouComicProduct.Explore)));
  });
  processPool[YouComicProduct.Explore] = child;
};

export const stopYouComicExplore = () => {
  if (processPool[YouComicProduct.Explore]) {
    processPool[YouComicProduct.Explore].kill();
  }
};
