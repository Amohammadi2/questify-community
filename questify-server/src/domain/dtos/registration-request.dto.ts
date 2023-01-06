import { CredentialsDTO } from "./credentials.dto";

interface ManagerInfoDTO {
  name: string;
  phoneNumber: string;
  email: string
}

interface SchoolInfoDTO {
  name: string;
  description: string;
  websiteAddress: string;
}

export class RegistrationRequestDTO {
  managerInfo: ManagerInfoDTO;
  credentials: CredentialsDTO;
  schoolInfo: SchoolInfoDTO;
}