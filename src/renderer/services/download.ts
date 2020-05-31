import { AppPath, nodeFS, nodeHttp, nodePath } from '@/global';

const downloadPool = [];
export const downloadEventSubscription: Array<(type: string, tag: string, data?: any) => void> = [];
export const downloadFile = async (url,fileName,product) => {
  const downloadDir = nodePath.join(AppPath.DownloadPath, product);
  await nodeFS.mkdirp(downloadDir);
  const writer = nodeFS.createWriteStream(
    nodePath.join(downloadDir,fileName),
  );
  const request = await nodeHttp.get(url, function(response) {
    response.pipe(writer);
    const totalLength = response.headers['content-length'];
    let downloadSize = 0;
    let lastProgress = 0;
    response.on('data', (chunk) => {
      downloadSize += chunk.length;
      let progress = Number(((downloadSize / totalLength) * 100).toFixed());
      if (lastProgress != progress) {
        lastProgress = progress;
        downloadEventSubscription.forEach(sub => sub('progress', product, { progress }));
      }
      console.log(progress)
    });

    response.on("end",() => {
      writer.close()
      downloadEventSubscription.forEach(sub => sub('done', product, { progress:100,filename:fileName,path:nodePath.join(downloadDir,fileName) }));
    })
  });
};
