export interface IIntroductionCodeModel {
  code: string;
}

export class IntroductionCodeModel implements IIntroductionCodeModel {
  public readonly code: string;
  
  constructor({ code }: IIntroductionCodeModel) {
    this.code = code;
  }
}