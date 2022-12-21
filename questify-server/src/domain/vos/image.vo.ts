import { IFileStorageService } from "../integrations/file-storage.integration";

export class Image {

  constructor(
    private readonly fileStorageService: IFileStorageService
  ) {}

  public init() {} // Todo: implement this method
}