import { MailerService } from "@nestjs-modules/mailer";
import { Injectable } from "@nestjs/common";
import { UserModel } from "src/user/models/user.model";

interface VerificationEmailPayload {
  user: UserModel;
  code: string;
}

@Injectable()
export class MailService {

  constructor(
    public readonly mailerService: MailerService,
  ) {}

  public async sendVerificationEmail({ user, code }: VerificationEmailPayload) {
    return await this.mailerService.sendMail({
      to: user.email,
      subject: "Questify verification code",
      template: "./templates/verification-code.hbs",
      context: {
        name: user.username,
        code: code
      }
    });
  }
}