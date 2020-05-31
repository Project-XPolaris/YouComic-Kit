import { AppPath, nodeFS, nodePath, YouComicProduct } from '@/global';
import { getInstallPath } from '@/utils/filepath';
import { unzipFile } from '@/utils/files';
import { addOrReplaceInstallApp } from '@/install/config';

export const installYouComicExplore = async ({filename}) => {
  const downloadFilePath  = nodePath.join(AppPath.DownloadPath,YouComicProduct.Explore,filename)
  const installPath = getInstallPath(YouComicProduct.Explore)
  await nodeFS.mkdirp(installPath)
  await unzipFile({filePath:downloadFilePath,output:installPath})
  await addOrReplaceInstallApp(YouComicProduct.Explore,installPath,"main.exe")
}
