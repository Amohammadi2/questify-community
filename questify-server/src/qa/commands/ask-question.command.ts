export class AskQuestionCommand {
  constructor(public readonly props: {
    title: string;
    content: string;
    tags: string[];
    author: string;
  }) {}
}