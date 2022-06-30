import { Injectable } from "@nestjs/common";

@Injectable()
export class FileUploadUtils {
  public getFilenameHash(filename: string): string {
    return filename;
  }
}