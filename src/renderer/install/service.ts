import { AppPath, nodeFS, nodePath, YouComicProduct } from '@/global';
import { getInstallPath } from '@/utils/filepath';
import { unzipFile } from '@/utils/files';
import { addOrReplaceInstallApp } from '@/install/config';

export const installYouComicService = async ({filename}) => {
  const downloadFilePath  = nodePath.join(AppPath.DownloadPath,YouComicProduct.Service,filename)
  const installPath = getInstallPath(YouComicProduct.Service)
  await nodeFS.mkdirp(installPath)
  await unzipFile({filePath:downloadFilePath,output:installPath})
  await addOrReplaceInstallApp(YouComicProduct.Service,getInstallPath(YouComicProduct.Service),"main.exe")
}
