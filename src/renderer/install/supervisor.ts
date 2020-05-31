import { AppPath, nodeFS, nodePath, YouComicProduct } from '@/global';
import { getInstallPath } from '@/utils/filepath';
import { unzipFile } from '@/utils/files';
import { addOrReplaceInstallApp, removeAppFromConfig } from '@/install/config';

export const installYouComicSupervisor = async ({filename}) => {
  const downloadFilePath  = nodePath.join(AppPath.DownloadPath,YouComicProduct.Supervisor,filename)
  const installPath = getInstallPath(YouComicProduct.Supervisor)
  await nodeFS.mkdirp(installPath)
  await unzipFile({filePath:downloadFilePath,output:installPath})
  await addOrReplaceInstallApp(YouComicProduct.Supervisor,installPath,"main.exe")
}

export const uninstallApp = async ({product}) => {
  console.log(product)
  await nodeFS.remove(getInstallPath(product))
  //rewrite app list
  await removeAppFromConfig(product)
}
