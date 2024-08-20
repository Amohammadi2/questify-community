/* eslint-disable */
import * as types from './graphql';
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';

/**
 * Map of all GraphQL operations in the project.
 *
 * This map has several performance disadvantages:
 * 1. It is not tree-shakeable, so it will include all operations in the project.
 * 2. It is not minifiable, so the string of a GraphQL query will be multiple times inside the bundle.
 * 3. It does not support dead code elimination, so it will add unused operations.
 *
 * Therefore it is highly recommended to use the babel or swc plugin for production.
 */
const documents = {
    "\n        fragment CreateAuthor2 on UserType {\n          id\n          username\n          __typename\n        }\n      ": types.CreateAuthor2FragmentDoc,
    "\n        fragment AddQuestion on QuestionType {\n          id\n          title\n          htmlContent\n          tags\n          created\n          updated\n          numAnswers\n          hasAcceptedAnswer\n        }\n      ": types.AddQuestionFragmentDoc,
    "\n        query AddQuestionRef {\n          questions {\n            edges {\n              node {\n                id\n              }\n            }\n          }\n        }\n      ": types.AddQuestionRefDocument,
    "\n        fragment CreateAuthor1 on UserType {\n          id\n          __typename\n          username\n        }\n      ": types.CreateAuthor1FragmentDoc,
    "\n        fragment NewAnswer on AnswerType {\n          __typename\n          id\n          htmlContent\n          created\n          updated\n          accepted\n        }\n      ": types.NewAnswerFragmentDoc,
    "\n                  fragment NewNotification on NotificationType {\n                    __typename\n                    id\n                    seen\n                    message\n                  }\n                ": types.NewNotificationFragmentDoc,
    "\n  query GetMyQuestions($authorId: ID!, $after: String) {\n    questions(first: 20, after: $after, authorId: $authorId) {\n      pageInfo {\n        endCursor\n        hasNextPage\n      }\n      edges {\n        node {\n          id\n          title\n          created\n        }\n      }\n    }\n  }  \n": types.GetMyQuestionsDocument,
    "\n  query GetNotifsCount {\n    notificationCount\n  }\n": types.GetNotifsCountDocument,
    "\n  query GetNotifications($after: String) {\n    notifications(first: 20, after: $after) {\n      pageInfo {\n        hasNextPage\n        endCursor\n      }\n      edges {\n        node {\n          id\n          notifType\n          message\n          seen\n          timestamp\n          metadata\n        }\n      }\n    }\n  }\n": types.GetNotificationsDocument,
    "\n  query GetQuestionDetails($id: ID!, $answerAfter: String) {\n    question(id: $id) {\n      id\n      title\n      htmlContent\n      author {\n        id\n        username\n      }\n      created\n      updated\n      tags\n      answers(after: $answerAfter) {\n        pageInfo {\n          hasNextPage\n          endCursor\n        }\n        edges {\n          node {\n            id\n            htmlContent\n            created\n            updated\n            accepted\n            author {\n              id\n              username\n            }\n          }\n        }\n      }\n    }\n  }\n": types.GetQuestionDetailsDocument,
    "\n  query GetQuestionFeed ($after: String, $first: Int = 15, $searchTerm: String, $tags: [String!]) {\n    questions (after: $after, first: $first, title_Icontains: $searchTerm, tags: $tags) {\n      pageInfo {\n        hasNextPage\n        endCursor\n      }\n      edges {\n        node {\n          id\n          title\n          tags\n          created\n          numAnswers\n          hasAcceptedAnswer\n          author {\n            username\n            id\n          }\n        }\n      }\n    }\n  }\n": types.GetQuestionFeedDocument,
    "\n  query GetUserProfile {\n    me {\n      id\n      username\n      email\n      profile {\n        id\n        bio\n        profileImg\n      }\n    }\n  }\n": types.GetUserProfileDocument,
};

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 *
 *
 * @example
 * ```ts
 * const query = graphql(`query GetUser($id: ID!) { user(id: $id) { name } }`);
 * ```
 *
 * The query argument is unknown!
 * Please regenerate the types.
 */
export function graphql(source: string): unknown;

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n        fragment CreateAuthor2 on UserType {\n          id\n          username\n          __typename\n        }\n      "): (typeof documents)["\n        fragment CreateAuthor2 on UserType {\n          id\n          username\n          __typename\n        }\n      "];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n        fragment AddQuestion on QuestionType {\n          id\n          title\n          htmlContent\n          tags\n          created\n          updated\n          numAnswers\n          hasAcceptedAnswer\n        }\n      "): (typeof documents)["\n        fragment AddQuestion on QuestionType {\n          id\n          title\n          htmlContent\n          tags\n          created\n          updated\n          numAnswers\n          hasAcceptedAnswer\n        }\n      "];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n        query AddQuestionRef {\n          questions {\n            edges {\n              node {\n                id\n              }\n            }\n          }\n        }\n      "): (typeof documents)["\n        query AddQuestionRef {\n          questions {\n            edges {\n              node {\n                id\n              }\n            }\n          }\n        }\n      "];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n        fragment CreateAuthor1 on UserType {\n          id\n          __typename\n          username\n        }\n      "): (typeof documents)["\n        fragment CreateAuthor1 on UserType {\n          id\n          __typename\n          username\n        }\n      "];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n        fragment NewAnswer on AnswerType {\n          __typename\n          id\n          htmlContent\n          created\n          updated\n          accepted\n        }\n      "): (typeof documents)["\n        fragment NewAnswer on AnswerType {\n          __typename\n          id\n          htmlContent\n          created\n          updated\n          accepted\n        }\n      "];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n                  fragment NewNotification on NotificationType {\n                    __typename\n                    id\n                    seen\n                    message\n                  }\n                "): (typeof documents)["\n                  fragment NewNotification on NotificationType {\n                    __typename\n                    id\n                    seen\n                    message\n                  }\n                "];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query GetMyQuestions($authorId: ID!, $after: String) {\n    questions(first: 20, after: $after, authorId: $authorId) {\n      pageInfo {\n        endCursor\n        hasNextPage\n      }\n      edges {\n        node {\n          id\n          title\n          created\n        }\n      }\n    }\n  }  \n"): (typeof documents)["\n  query GetMyQuestions($authorId: ID!, $after: String) {\n    questions(first: 20, after: $after, authorId: $authorId) {\n      pageInfo {\n        endCursor\n        hasNextPage\n      }\n      edges {\n        node {\n          id\n          title\n          created\n        }\n      }\n    }\n  }  \n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query GetNotifsCount {\n    notificationCount\n  }\n"): (typeof documents)["\n  query GetNotifsCount {\n    notificationCount\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query GetNotifications($after: String) {\n    notifications(first: 20, after: $after) {\n      pageInfo {\n        hasNextPage\n        endCursor\n      }\n      edges {\n        node {\n          id\n          notifType\n          message\n          seen\n          timestamp\n          metadata\n        }\n      }\n    }\n  }\n"): (typeof documents)["\n  query GetNotifications($after: String) {\n    notifications(first: 20, after: $after) {\n      pageInfo {\n        hasNextPage\n        endCursor\n      }\n      edges {\n        node {\n          id\n          notifType\n          message\n          seen\n          timestamp\n          metadata\n        }\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query GetQuestionDetails($id: ID!, $answerAfter: String) {\n    question(id: $id) {\n      id\n      title\n      htmlContent\n      author {\n        id\n        username\n      }\n      created\n      updated\n      tags\n      answers(after: $answerAfter) {\n        pageInfo {\n          hasNextPage\n          endCursor\n        }\n        edges {\n          node {\n            id\n            htmlContent\n            created\n            updated\n            accepted\n            author {\n              id\n              username\n            }\n          }\n        }\n      }\n    }\n  }\n"): (typeof documents)["\n  query GetQuestionDetails($id: ID!, $answerAfter: String) {\n    question(id: $id) {\n      id\n      title\n      htmlContent\n      author {\n        id\n        username\n      }\n      created\n      updated\n      tags\n      answers(after: $answerAfter) {\n        pageInfo {\n          hasNextPage\n          endCursor\n        }\n        edges {\n          node {\n            id\n            htmlContent\n            created\n            updated\n            accepted\n            author {\n              id\n              username\n            }\n          }\n        }\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query GetQuestionFeed ($after: String, $first: Int = 15, $searchTerm: String, $tags: [String!]) {\n    questions (after: $after, first: $first, title_Icontains: $searchTerm, tags: $tags) {\n      pageInfo {\n        hasNextPage\n        endCursor\n      }\n      edges {\n        node {\n          id\n          title\n          tags\n          created\n          numAnswers\n          hasAcceptedAnswer\n          author {\n            username\n            id\n          }\n        }\n      }\n    }\n  }\n"): (typeof documents)["\n  query GetQuestionFeed ($after: String, $first: Int = 15, $searchTerm: String, $tags: [String!]) {\n    questions (after: $after, first: $first, title_Icontains: $searchTerm, tags: $tags) {\n      pageInfo {\n        hasNextPage\n        endCursor\n      }\n      edges {\n        node {\n          id\n          title\n          tags\n          created\n          numAnswers\n          hasAcceptedAnswer\n          author {\n            username\n            id\n          }\n        }\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query GetUserProfile {\n    me {\n      id\n      username\n      email\n      profile {\n        id\n        bio\n        profileImg\n      }\n    }\n  }\n"): (typeof documents)["\n  query GetUserProfile {\n    me {\n      id\n      username\n      email\n      profile {\n        id\n        bio\n        profileImg\n      }\n    }\n  }\n"];

export function graphql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> = TDocumentNode extends DocumentNode<  infer TType,  any>  ? TType  : never;