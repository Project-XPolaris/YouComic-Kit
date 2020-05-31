import { AppPath, nodeAxios, nodeFS, nodeOS } from '@/global';

export async function getDownloadUrl({tag}) {
  const {repo} = await nodeFS.readJSON(AppPath.ApplicationConfigPath)
  const resp =  await nodeAxios.get(repo)
  return resp.data[tag][nodeOS.platform()]
}
