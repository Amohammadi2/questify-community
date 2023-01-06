import { Entity } from "src/domain/shared/entity.absclass";

export interface SchoolInit {
  name: string;
  websiteAddress: string;
  description: string;
}

export interface SchoolRestore {
  name: string;
  websiteAddress: string;
  description: string;
}

export class School extends Entity<SchoolInit, SchoolRestore> {
  private name: string;
  private websiteAddress: string; // Todo:(VO)
  private description: string; // Todo:(VO) length checker

  init(data: SchoolInit): School {
    Object.assign(this, data);
    return this;
  }

  restore(data: SchoolRestore): School {
    super.restore(data);
    return this;
  }

  getFields(): SchoolRestore {
    return {
      name: this.name,
      websiteAddress: this.websiteAddress,
      description: this.description
    }
  }

  getName() { return this.name }
  setName(name: string) { this.name = name }

  getWebsiteAddress() { return this.websiteAddress }
  setWebsiteAddress(websiteAddress: string) { this.websiteAddress = websiteAddress }

  getDescription() { return this.description }
  setDescription(description: string) { this.description = description }
}