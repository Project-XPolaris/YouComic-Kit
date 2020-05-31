import { AppPath, nodeFS, nodeOS, nodePath, YouComicProduct } from '@/global';
import { getInstallPath } from '@/utils/filepath';

export const checkYouComicProductExist = async (product:YouComicProduct) => {
  const installPath = getInstallPath(product);
  console.log(nodePath.join(installPath, 'main'))
  try {
    await nodeFS.promises.stat(nodePath.join(installPath, 'main.exe'));
  } catch (e) {
    return false;
  }
  return true;
};
