import { AppPath, nodeFS } from '@/global';


export const checkConfigIsExist = async () => {
  return await nodeFS.pathExists(AppPath.ApplicationConfigPath);
};

export const createConfigFile = async ({repo}) => {
  await nodeFS.mkdirp(AppPath.AppPath)
  await nodeFS.writeJSON(AppPath.ApplicationConfigPath, {
    repo,
  })
};
