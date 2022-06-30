import { Inject, Injectable } from '@nestjs/common';
import { createWriteStream, ReadStream, unlink } from 'fs';
import { FileUpload } from 'graphql-upload';
import { getUID } from 'src/utils/get-uid';
import { IFileInfo } from './interfaces/file-info.interface';
import { FileUploadUtils } from './utils';


@Injectable()
export class FileUploadService {

  constructor(
    private readonly utils: FileUploadUtils,
    @Inject('UPLOAD_ROOT') private readonly uploadRoot: string,
    @Inject('URL_ROOT') private readonly urlRoot: string
  ) {}

  public async storeFile(directory: string, fileInfo: FileUpload) {
    return await new Promise<IFileInfo>((resolve, reject) => {

      const filename = this.utils.getFilenameHash(fileInfo.filename)
      const urlPortion = `${directory}/${filename}`;
      const path = `${this.uploadRoot}${urlPortion}`;

      const destination = createWriteStream(path)
        .on('finish', () => {
          resolve({
            id: getUID(),
            filename,
            path,
            url: `${this.urlRoot}${urlPortion}`
          });
        })
        .on('error', (err) => {
          reject(err);
        })

      fileInfo.createReadStream().pipe(destination);
    })
  }

  public async storeMultiple(directory: string, files: FileUpload[]) {
    const results = files.map(file => {
      return this.storeFile(directory, file);
    })

    return Promise.all(results);
  }

  public async unlink(filePath: string) {
    return new Promise<boolean>((resolve, reject) => {
      unlink(filePath, (err) => {
        if (err) resolve(false);
        resolve(true);
      })
    })
  }

  public async unlinkMultiple(fileInfos: IFileInfo[]): Promise<boolean> {
    const operations = await Promise.all(fileInfos.map(info => this.unlink(info.path)))
    // even if any of the operations fails, returns false to notify
    return operations.reduce((previousOperationSucceeded, currentOperationSucceeded) => previousOperationSucceeded && currentOperationSucceeded);
  }
}
