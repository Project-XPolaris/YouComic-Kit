import { AppPath, nodeOS, nodePath, YouComicProduct } from '@/global';

export function getInstallPath(tag:YouComicProduct){
  const osDir : string = {
    "win32":"windows64",
    "linux":"linux64",
    "darwin":"darwin64"
  }[nodeOS.platform()]

  const productDir : string = {
    [YouComicProduct.Service]:"service",
    [YouComicProduct.Explore]:"explore",
    [YouComicProduct.Supervisor]:"supervisor",
    [YouComicProduct.Studio]:"studio",
  }[tag]
  return nodePath.join(AppPath.InstallPath,productDir,osDir)
}

export function getInstallPathWithoutOS(tag:YouComicProduct){

  const productDir : string = {
    [YouComicProduct.Service]:"service",
    [YouComicProduct.Explore]:"explore",
    [YouComicProduct.Supervisor]:"supervisor",
    [YouComicProduct.Studio]:"studio",
  }[tag]
  return nodePath.join(AppPath.InstallPath,productDir)
}
export function getDownloadPath() {

}
