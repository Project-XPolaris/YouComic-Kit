import { nodeFS, nodeUnzipper } from '@/global';

export const unzipFile = async ({filePath,output}) => {
  await nodeFS.mkdirp(output);
  await nodeFS.createReadStream(filePath)
    .pipe(nodeUnzipper.Extract({path:output}))
    .promise()
};


