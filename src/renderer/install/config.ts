import { AppPath, nodeFS, nodePath, YouComicProduct } from '@/global';

export const createInstallAppConfig = async () => {
  const appInstallConfigPath = nodePath.join(AppPath.DataPath, AppPath.InstallConfigName);
  await nodeFS.writeJSON(appInstallConfigPath, {});
};
export const getInstallConfig = async () => {
  const appInstallConfigPath = nodePath.join(AppPath.DataPath, AppPath.InstallConfigName);
  const isExist = await nodeFS.pathExists(appInstallConfigPath);
  if (!isExist){
    await nodeFS.mkdirp(AppPath.AppPath)
    await createInstallAppConfig();
  }
  return await nodeFS.readJson(appInstallConfigPath);
};
export const removeAppFromConfig = async (product:YouComicProduct) => {
  const appInstallConfigPath = nodePath.join(AppPath.DataPath, AppPath.InstallConfigName);
  const config = await getInstallConfig();
  config[product] = undefined
  await nodeFS.writeJSON(appInstallConfigPath,config)
}
export const addOrReplaceInstallApp = async (product: YouComicProduct, workPath: string, entry: string) => {
  const appInstallConfigPath = nodePath.join(AppPath.DataPath, AppPath.InstallConfigName);
  const config = await getInstallConfig();
  await nodeFS.writeJSON(appInstallConfigPath, { ...config, [product]: { workPath, entry } });
};
