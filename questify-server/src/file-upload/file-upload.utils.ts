import { Injectable } from "@nestjs/common";

@Injectable()
export class FileUploadUtils {
  public getFilenameHash(filename: string): string {
    // Todo: implement file name hashing functionality
    return filename;
  }
}