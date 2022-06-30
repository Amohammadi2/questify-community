import { DynamicModule, Global, Module } from '@nestjs/common';
import { FileUploadService } from './file-upload.service';
import { FileUploadUtils } from './utils';

interface IFileUploadModuleConfig {
  uploadRoot: string;
  urlRoot: string;
}

@Global()
@Module({})
export class FileUploadModule {
  public static forRoot(config: IFileUploadModuleConfig): DynamicModule {
    return {
      module: FileUploadModule,
      providers: [
        FileUploadUtils,
        FileUploadService,
        {
          provide: 'UPLOAD_ROOT',
          useValue: config.uploadRoot
        },
        {
          provide: 'URL_ROOT',
          useValue: config.urlRoot
        }
      ],
      exports: [FileUploadService]
    }
  }
}
