import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";
import { SendVerificationCodeCommand } from "../commands/send-verification-code";
import { MailerService } from "@nestjs-modules/mailer";

@CommandHandler(SendVerificationCodeCommand)
export class SendVerificationCodeHandler implements ICommandHandler<SendVerificationCodeCommand> {
  
  constructor(
    private readonly mailerService: MailerService
  ) {}
  
  public async execute(command: SendVerificationCodeCommand) {
    return await this.mailerService.sendMail({
      to: command.user.email,
      subject: "Questify verification code",
      template: "./../templates/verification-code.hbs",
      context: {
        name: command.user.username,
        code: command.code
      }
    })
  }
}