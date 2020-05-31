import { getInstallPath } from '@/utils/filepath';
import { AppPath, nodeFS, nodePath, YouComicProduct } from '@/global';
import { addOrReplaceInstallApp } from '@/install/config';

export const InstallYouComicStudio = async ({filename}) => {
  console.log(filename)
  //get down load folder
  const downloadPath  = nodePath.join(AppPath.DownloadPath,YouComicProduct.Studio)
  const installPath  = getInstallPath(YouComicProduct.Studio)
  console.log(downloadPath)
  console.log(installPath)
  await nodeFS.mkdirp(installPath)
  await nodeFS.promises.copyFile(nodePath.join(downloadPath,filename),nodePath.join(installPath,filename))
  await addOrReplaceInstallApp(YouComicProduct.Studio,installPath,filename)
};
