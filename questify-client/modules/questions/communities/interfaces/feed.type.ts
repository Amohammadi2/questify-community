export interface ISharedQuestionFeed {
  feedType: 'shared-space';
}
export interface ICommunityQuestionFeed {
  feedType: 'community-space';
  communityId: string;
}

export type IQuestionFeed = ISharedQuestionFeed | ICommunityQuestionFeed;