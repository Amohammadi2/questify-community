/* eslint-disable */
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  /**
   * The `DateTime` scalar type represents a DateTime
   * value as specified by
   * [iso8601](https://en.wikipedia.org/wiki/ISO_8601).
   */
  DateTime: { input: any; output: any; }
  /**
   * Allows use of a JSON String for input / output from the GraphQL schema.
   *
   * Use of this type is *not recommended* as you lose the benefits of having a defined, static
   * schema (one of the key benefits of GraphQL).
   */
  JSONString: { input: any; output: any; }
};

export type AnswerType = RelayNode & {
  __typename?: 'AnswerType';
  accepted: Scalars['Boolean']['output'];
  author?: Maybe<UserType>;
  created: Scalars['DateTime']['output'];
  htmlContent: Scalars['String']['output'];
  /** The ID of the object */
  id: Scalars['ID']['output'];
  question?: Maybe<QuestionType>;
  updated: Scalars['DateTime']['output'];
};

export type AnswerTypeConnection = {
  __typename?: 'AnswerTypeConnection';
  /** Contains the nodes in this connection. */
  edges: Array<Maybe<AnswerTypeEdge>>;
  /** Pagination data for this connection. */
  pageInfo: PageInfo;
};

/** A Relay edge containing a `AnswerType` and its cursor. */
export type AnswerTypeEdge = {
  __typename?: 'AnswerTypeEdge';
  /** A cursor for use in pagination */
  cursor: Scalars['String']['output'];
  /** The item at the end of the edge */
  node?: Maybe<AnswerType>;
};

/** The Relay compliant `PageInfo` type, containing data necessary to paginate this connection. */
export type PageInfo = {
  __typename?: 'PageInfo';
  /** When paginating forwards, the cursor to continue. */
  endCursor?: Maybe<Scalars['String']['output']>;
  /** When paginating forwards, are there more items? */
  hasNextPage: Scalars['Boolean']['output'];
  /** When paginating backwards, are there more items? */
  hasPreviousPage: Scalars['Boolean']['output'];
  /** When paginating backwards, the cursor to continue. */
  startCursor?: Maybe<Scalars['String']['output']>;
};

export type Query = {
  __typename?: 'Query';
  hello?: Maybe<Scalars['String']['output']>;
  question?: Maybe<QuestionType>;
  questions?: Maybe<QuestionTypeConnection>;
};


export type QueryQuestionArgs = {
  id: Scalars['ID']['input'];
};


export type QueryQuestionsArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  htmlContent?: InputMaybe<Scalars['String']['input']>;
  htmlContent_Icontains?: InputMaybe<Scalars['String']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  title?: InputMaybe<Scalars['String']['input']>;
  title_Icontains?: InputMaybe<Scalars['String']['input']>;
  title_Istartswith?: InputMaybe<Scalars['String']['input']>;
};

export type QuestionType = RelayNode & {
  __typename?: 'QuestionType';
  answers?: Maybe<AnswerTypeConnection>;
  author?: Maybe<UserType>;
  created: Scalars['DateTime']['output'];
  hasAcceptedAnswer?: Maybe<Scalars['Boolean']['output']>;
  htmlContent: Scalars['String']['output'];
  /** The ID of the object */
  id: Scalars['ID']['output'];
  numAnswers?: Maybe<Scalars['Int']['output']>;
  tags: Scalars['JSONString']['output'];
  title: Scalars['String']['output'];
  updated: Scalars['DateTime']['output'];
};


export type QuestionTypeAnswersArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
};

export type QuestionTypeConnection = {
  __typename?: 'QuestionTypeConnection';
  /** Contains the nodes in this connection. */
  edges: Array<Maybe<QuestionTypeEdge>>;
  /** Pagination data for this connection. */
  pageInfo: PageInfo;
};

/** A Relay edge containing a `QuestionType` and its cursor. */
export type QuestionTypeEdge = {
  __typename?: 'QuestionTypeEdge';
  /** A cursor for use in pagination */
  cursor: Scalars['String']['output'];
  /** The item at the end of the edge */
  node?: Maybe<QuestionType>;
};

export type RelayNode = {
  /** The ID of the object */
  id: Scalars['ID']['output'];
};

export type UserType = RelayNode & {
  __typename?: 'UserType';
  answer: AnswerTypeConnection;
  dateJoined: Scalars['DateTime']['output'];
  email: Scalars['String']['output'];
  firstName: Scalars['String']['output'];
  /** The ID of the object */
  id: Scalars['ID']['output'];
  /** Designates whether this user should be treated as active. Unselect this instead of deleting accounts. */
  isActive: Scalars['Boolean']['output'];
  /** Designates whether the user can log into this admin site. */
  isStaff: Scalars['Boolean']['output'];
  /** Designates that this user has all permissions without explicitly assigning them. */
  isSuperuser: Scalars['Boolean']['output'];
  lastLogin?: Maybe<Scalars['DateTime']['output']>;
  lastName: Scalars['String']['output'];
  question: QuestionTypeConnection;
  /** Required. 150 characters or fewer. Letters, digits and @/./+/-/_ only. */
  username: Scalars['String']['output'];
};


export type UserTypeAnswerArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
};


export type UserTypeQuestionArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  htmlContent?: InputMaybe<Scalars['String']['input']>;
  htmlContent_Icontains?: InputMaybe<Scalars['String']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  title?: InputMaybe<Scalars['String']['input']>;
  title_Icontains?: InputMaybe<Scalars['String']['input']>;
  title_Istartswith?: InputMaybe<Scalars['String']['input']>;
};

export type GetQuestionDetailsQueryVariables = Exact<{
  id: Scalars['ID']['input'];
  answerAfter?: InputMaybe<Scalars['String']['input']>;
}>;


export type GetQuestionDetailsQuery = { __typename?: 'Query', question?: { __typename?: 'QuestionType', id: string, title: string, htmlContent: string, created: any, updated: any, tags: any, author?: { __typename?: 'UserType', id: string, username: string } | null, answers?: { __typename?: 'AnswerTypeConnection', pageInfo: { __typename?: 'PageInfo', hasNextPage: boolean, endCursor?: string | null }, edges: Array<{ __typename?: 'AnswerTypeEdge', node?: { __typename?: 'AnswerType', id: string, htmlContent: string, created: any, updated: any, accepted: boolean, author?: { __typename?: 'UserType', id: string, username: string } | null } | null } | null> } | null } | null };

export type GetQuestionFeedQueryVariables = Exact<{
  after?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
}>;


export type GetQuestionFeedQuery = { __typename?: 'Query', questions?: { __typename?: 'QuestionTypeConnection', pageInfo: { __typename?: 'PageInfo', hasNextPage: boolean, endCursor?: string | null }, edges: Array<{ __typename?: 'QuestionTypeEdge', node?: { __typename?: 'QuestionType', id: string, title: string, tags: any, created: any, numAnswers?: number | null, hasAcceptedAnswer?: boolean | null, author?: { __typename?: 'UserType', username: string, id: string } | null } | null } | null> } | null };

export type AddQuestionFragment = { __typename?: 'QuestionType', id: string, title: string, htmlContent: string, tags: any, created: any, updated: any, numAnswers?: number | null, hasAcceptedAnswer?: boolean | null, author?: { __typename?: 'UserType', id: string, username: string } | null } & { ' $fragmentName'?: 'AddQuestionFragment' };

export type AddQuestionRefQueryVariables = Exact<{ [key: string]: never; }>;


export type AddQuestionRefQuery = { __typename?: 'Query', questions?: { __typename?: 'QuestionTypeConnection', edges: Array<{ __typename?: 'QuestionTypeEdge', node?: { __typename?: 'QuestionType', id: string } | null } | null> } | null };

export const AddQuestionFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"AddQuestion"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"QuestionType"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"htmlContent"}},{"kind":"Field","name":{"kind":"Name","value":"tags"}},{"kind":"Field","name":{"kind":"Name","value":"created"}},{"kind":"Field","name":{"kind":"Name","value":"updated"}},{"kind":"Field","name":{"kind":"Name","value":"numAnswers"}},{"kind":"Field","name":{"kind":"Name","value":"hasAcceptedAnswer"}},{"kind":"Field","name":{"kind":"Name","value":"author"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"username"}}]}}]}}]} as unknown as DocumentNode<AddQuestionFragment, unknown>;
export const GetQuestionDetailsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetQuestionDetails"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"answerAfter"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"question"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"htmlContent"}},{"kind":"Field","name":{"kind":"Name","value":"author"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"username"}}]}},{"kind":"Field","name":{"kind":"Name","value":"created"}},{"kind":"Field","name":{"kind":"Name","value":"updated"}},{"kind":"Field","name":{"kind":"Name","value":"tags"}},{"kind":"Field","name":{"kind":"Name","value":"answers"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"after"},"value":{"kind":"Variable","name":{"kind":"Name","value":"answerAfter"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"pageInfo"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"hasNextPage"}},{"kind":"Field","name":{"kind":"Name","value":"endCursor"}}]}},{"kind":"Field","name":{"kind":"Name","value":"edges"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"node"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"htmlContent"}},{"kind":"Field","name":{"kind":"Name","value":"created"}},{"kind":"Field","name":{"kind":"Name","value":"updated"}},{"kind":"Field","name":{"kind":"Name","value":"accepted"}},{"kind":"Field","name":{"kind":"Name","value":"author"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"username"}}]}}]}}]}}]}}]}}]}}]} as unknown as DocumentNode<GetQuestionDetailsQuery, GetQuestionDetailsQueryVariables>;
export const GetQuestionFeedDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetQuestionFeed"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"after"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"first"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}},"defaultValue":{"kind":"IntValue","value":"15"}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"questions"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"after"},"value":{"kind":"Variable","name":{"kind":"Name","value":"after"}}},{"kind":"Argument","name":{"kind":"Name","value":"first"},"value":{"kind":"Variable","name":{"kind":"Name","value":"first"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"pageInfo"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"hasNextPage"}},{"kind":"Field","name":{"kind":"Name","value":"endCursor"}}]}},{"kind":"Field","name":{"kind":"Name","value":"edges"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"node"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"tags"}},{"kind":"Field","name":{"kind":"Name","value":"created"}},{"kind":"Field","name":{"kind":"Name","value":"numAnswers"}},{"kind":"Field","name":{"kind":"Name","value":"hasAcceptedAnswer"}},{"kind":"Field","name":{"kind":"Name","value":"author"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"username"}},{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]}}]}}]}}]} as unknown as DocumentNode<GetQuestionFeedQuery, GetQuestionFeedQueryVariables>;
export const AddQuestionRefDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"AddQuestionRef"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"questions"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"edges"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"node"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]}}]}}]} as unknown as DocumentNode<AddQuestionRefQuery, AddQuestionRefQueryVariables>;