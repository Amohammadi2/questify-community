export interface ISchoolQuestionFeed {
  feedType: 'school-space';
  schoolId: string;
}
export interface ISharedQuestionFeed {
  feedType: 'shared-space';
}
export interface ICommunityQuestionFeed {
  feedType: 'community-space';
  communityId: string;
}

export type IQuestionFeed = ISchoolQuestionFeed | ISharedQuestionFeed | ICommunityQuestionFeed;