class Question {
  private title: string;
  private content: string;
  private publishDate: Date;
  private lastEdit: Date;
  private id: string;

  getDistanceFromPublishToLastEdit() {
    return this.lastEdit.getSeconds() - this.publishDate.getSeconds();
  }
}


