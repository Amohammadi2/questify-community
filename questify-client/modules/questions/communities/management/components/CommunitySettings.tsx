import { FlexContainer } from "modules/app-ui";
import CommunityMemberBrowser from "./CommunityMemberBrowser";
import { CommunityProfileSettings } from './CommunityProfileSettings';

export interface ICommunityProfileSettingsProps {
  communityId: string;
}

interface ICommunitySettingsProps {
  communityId: string;
}

export default function CommunitySettings({ communityId } : ICommunitySettingsProps) {
  return (
    <FlexContainer>
      <CommunityProfileSettings communityId={communityId} />
      <CommunityMemberBrowser />
    </FlexContainer>
  );
}