/**
 * The purpose of this class is to standardize the process of link generation.
 * This way, we won't have any difficulties to change url paths in the future.
 */
export class LinkMaker {
  static askQuestion() {}
  static login() {}
  static bookmarks() {}
  static community(cid: string) { return '/communities/'+cid }
  static communitySettings(cid: string) { return '/communities/'+cid+'/settings' }
  static createCommunity() { return '/create-community ' }
  static inProgressList() {}
  static index() {}
  static myQuestions() {}
  static accountSettings() {}
  static questionDetails(qid) {}
  static userProfile() {}
  static answerQuestion(qid: string) { return '/answer-question?qid='+qid }
}