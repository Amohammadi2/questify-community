import { Entity } from "src/domain/shared/entity.absclass";

export interface SchoolInit {
  name: string;
  websiteAddress: string;
}

export interface SchoolRestore {
  name: string;
  websiteAddress: string;
}

export class School extends Entity<SchoolInit, SchoolRestore> {
  private name: string;
  private websiteAddress: string; // Todo:(VO)

  init(data: SchoolInit): School {
    Object.assign(this, data);
    return this;
  }

  getFields(): SchoolRestore {
    return {
      name: this.name,
      websiteAddress: this.websiteAddress
    }
  }

  getName() { return this.name }
  setName(name: string) { this.name = name }

  getWebsiteAddress() { return this.websiteAddress }
  setWebsiteAddress(websiteAddress: string) { this.websiteAddress = websiteAddress }
}