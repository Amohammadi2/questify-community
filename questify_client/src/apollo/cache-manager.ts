import { gql } from "@apollo/client";
import { client } from "./client";
import { UserRetrieve } from "@/gen";
import { AnswerTypeConnection } from "@/gen/gql/graphql";

export type ContentAggregate = {
  content: string
  tags: Array<string>
  title: string
}

export class CacheManager {
  
  public static addQuestion(author: UserRetrieve|null, id: number, { content, tags, title } : ContentAggregate) {
    const authorRef = client.writeFragment({
      id: `UserType:${author?.id}`,
      fragment: gql`
        fragment CreateAuthor on UserType {
          id
          username
          __typename
        }
      `,
      data: {
        id: `${author?.id}`,
        username: author?.username,
        __typename: 'UserType'
      }
    })
    const questionRef = client.writeFragment({
      id: `QuestionType:${id}`,
      fragment: gql`
        fragment AddQuestion on QuestionType {
          id
          title
          htmlContent
          tags
          created
          updated
          numAnswers
          hasAcceptedAnswer
        }
      `,
      data: {
        __typename: 'QuestionType',
        htmlContent: content,
        tags: JSON.stringify(tags),
        title,
        id: `${id}`,
        created: new Date().toLocaleDateString('fa-IR'),
        updated: new Date().toLocaleDateString('fa-IR'),
        author: authorRef,
        numAnswers: 0,
        hasAcceptedAnswer: false
      }
    })
    client.cache.updateQuery({
      query: gql`
        query AddQuestionRef {
          questions {
            edges {
              node {
                id
              }
            }
          }
        }
      `
    }, (data) => {
      return {
        questions: {
          edges: [{ node: { __ref: questionRef, id: `${id}` } }, ...(data?.questions?.edges || [])]
        }
      }
    })
  }

  public static updateQuestion(id: number, {title, content, tags} : ContentAggregate) {
    client.cache.modify({
      id: client.cache.identify({ __typename: 'QuestionType', id: `${id}`}),
      fields: {
        title() {
          return title
        },
        htmlContent() {
          return content
        },
        tags() {
          return JSON.stringify(tags)
        }
      }
    })
  }

  public static addAnswer(author: UserRetrieve|null, id: number, qid: number, content: string) {
    const authorRef = client.cache.writeFragment({
      id: `UserType:${author?.id}`,
      fragment: gql`
        fragment CreateAuthor on UserType {
          id
          __typename
          username
        }
      `,
      data: {
        id: `${author?.id}`,
        __typename: "UserType",
        username: author?.username
      }
    })
    const newAnswerRef = client.cache.writeFragment({
      fragment: gql`
        fragment NewAnswer on AnswerType {
          __typename
          id
          htmlContent
          created
          updated
          accepted
        }
      `,
      data: {
        __typename: 'AnswerType',
        id: `${id}`,
        htmlContent: content,
        created: new Date().toLocaleDateString('fa-IR'),
        updated: new Date().toLocaleDateString('fa-IR'),
        accepted: false,
        author: authorRef
      }
    },)
    client.cache.modify({
      id: client.cache.identify({__typename: 'QuestionType', id: qid.toString() }),
      fields: {
        numAnswers(n) { return n+1 },
        answers(answersConnection: AnswerTypeConnection) {
          return {
            ...answersConnection,
            edges: [{
              node: newAnswerRef
            }, ...answersConnection.edges]
          } as AnswerTypeConnection
        }
      }
    })
  }

  public static updateAnswer(id: number, content: string) {
    client.cache.modify({
      id: client.cache.identify({ __typename: 'AnswerType', id: id.toString() || '' }),
      fields: {
        htmlContent() {
          return content
        }
      }
    })
  }

}