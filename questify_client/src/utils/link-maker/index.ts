export class LinkMaker {

  public static login() {
    return '/login'
  }

  public static questions() {
    return '/questions'
  }

  public static ask() {
    return '/ask'
  }

  public static editQuestion(questionId: string | number) {
    return `/edit-question/${questionId}`
  }
  
  public static questionDetails(questionId: string | number) {
    return `/question-details/${questionId}`
  }
  
  public static answer(questionId: string | number) {
    return `/answer/${questionId}`
  }

  public static editAnswer(answerId: string | number) {
    return `/edit-answer/${answerId}`
  }
}