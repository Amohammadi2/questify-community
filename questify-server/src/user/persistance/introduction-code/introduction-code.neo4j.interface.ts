export interface IIntroductionCodeNeo4j {
  code: string;
}

export class IntroductionCodeNeo4j implements IIntroductionCodeNeo4j {
  public code: string;

  constructor({ code }: IIntroductionCodeNeo4j) {
    this.code = code;
  }
}