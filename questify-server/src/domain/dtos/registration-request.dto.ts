import { CredentialsDTO } from "./credentials.dto";

interface ManagerInfoDTO {
  name: string;
  phoneNumber: string;
  email: string
}


export class RegistrationRequestDTO {
  managerInfo: ManagerInfoDTO;
  credentials: CredentialsDTO;
  schoolName: string;
}