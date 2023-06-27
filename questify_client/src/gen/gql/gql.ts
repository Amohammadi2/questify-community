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
    "\n  query GetQuestionDetails($id: ID!, $answerAfter: String) {\n    question(id: $id) {\n      id\n      title\n      htmlContent\n      author {\n        id\n        username\n      }\n      created\n      updated\n      tags\n      answers(after: $answerAfter) {\n        pageInfo {\n          hasNextPage\n          endCursor\n        }\n        edges {\n          node {\n            id\n            htmlContent\n            created\n            updated\n            accepted\n            author {\n              id\n              username\n            }\n          }\n        }\n      }\n    }\n  }\n": types.GetQuestionDetailsDocument,
    "\n  query GetQuestionFeed ($after: String, $first: Int = 15) {\n    questions (after: $after, first: $first) {\n      pageInfo {\n        hasNextPage\n        endCursor\n      }\n      edges {\n        node {\n          id\n          title\n          tags\n          created\n          numAnswers\n          hasAcceptedAnswer\n          author {\n            username\n            id\n          }\n        }\n      }\n    }\n  }\n": types.GetQuestionFeedDocument,
    "\n        query AddAnswerToQuestion($qid: ID!) {\n          question(id: $qid) {\n            answers {\n              edges {\n                node {\n                  id\n                  htmlContent\n                  created\n                  updated\n                  accepted\n                  author {\n                    id\n                    username\n                  }\n                }\n              }\n            }\n          }\n        }\n      ": types.AddAnswerToQuestionDocument,
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
export function graphql(source: "\n  query GetQuestionDetails($id: ID!, $answerAfter: String) {\n    question(id: $id) {\n      id\n      title\n      htmlContent\n      author {\n        id\n        username\n      }\n      created\n      updated\n      tags\n      answers(after: $answerAfter) {\n        pageInfo {\n          hasNextPage\n          endCursor\n        }\n        edges {\n          node {\n            id\n            htmlContent\n            created\n            updated\n            accepted\n            author {\n              id\n              username\n            }\n          }\n        }\n      }\n    }\n  }\n"): (typeof documents)["\n  query GetQuestionDetails($id: ID!, $answerAfter: String) {\n    question(id: $id) {\n      id\n      title\n      htmlContent\n      author {\n        id\n        username\n      }\n      created\n      updated\n      tags\n      answers(after: $answerAfter) {\n        pageInfo {\n          hasNextPage\n          endCursor\n        }\n        edges {\n          node {\n            id\n            htmlContent\n            created\n            updated\n            accepted\n            author {\n              id\n              username\n            }\n          }\n        }\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query GetQuestionFeed ($after: String, $first: Int = 15) {\n    questions (after: $after, first: $first) {\n      pageInfo {\n        hasNextPage\n        endCursor\n      }\n      edges {\n        node {\n          id\n          title\n          tags\n          created\n          numAnswers\n          hasAcceptedAnswer\n          author {\n            username\n            id\n          }\n        }\n      }\n    }\n  }\n"): (typeof documents)["\n  query GetQuestionFeed ($after: String, $first: Int = 15) {\n    questions (after: $after, first: $first) {\n      pageInfo {\n        hasNextPage\n        endCursor\n      }\n      edges {\n        node {\n          id\n          title\n          tags\n          created\n          numAnswers\n          hasAcceptedAnswer\n          author {\n            username\n            id\n          }\n        }\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n        query AddAnswerToQuestion($qid: ID!) {\n          question(id: $qid) {\n            answers {\n              edges {\n                node {\n                  id\n                  htmlContent\n                  created\n                  updated\n                  accepted\n                  author {\n                    id\n                    username\n                  }\n                }\n              }\n            }\n          }\n        }\n      "): (typeof documents)["\n        query AddAnswerToQuestion($qid: ID!) {\n          question(id: $qid) {\n            answers {\n              edges {\n                node {\n                  id\n                  htmlContent\n                  created\n                  updated\n                  accepted\n                  author {\n                    id\n                    username\n                  }\n                }\n              }\n            }\n          }\n        }\n      "];

export function graphql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> = TDocumentNode extends DocumentNode<  infer TType,  any>  ? TType  : never;