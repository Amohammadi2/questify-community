import { Injectable } from "@nestjs/common";

interface SchoolRegistrationForm {
  schoolName: string;
  managerName: string;
  managerEmail: string;
  managerPhoneNumber: string;
}

interface LimitOffsetPagination {
  limit: number;
  offset: number;
}

@Injectable()
export class RegistrationService {

  constructor(
    
  ) {}

  async saveRequest(req: SchoolRegistrationForm) {

  }

  async acceptRequest(requestId, accept:boolean=true) {

  }

  async getRequestList(accepted:boolean|null=null, pagination: LimitOffsetPagination) {

  }
  
}