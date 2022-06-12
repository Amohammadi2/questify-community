interface IVerficationInfoModel {
  userId: string;
  verificationCode: string;
  expiresAt: Date
}

export class VerificationInfoModel implements IVerficationInfoModel {
  public userId: string;
  public verificationCode: string;
  public expiresAt: Date;

  constructor(props: IVerficationInfoModel) {
    Object.assign(this, props);
  }
}