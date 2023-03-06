import { FlexContainer } from "modules/app-ui";
import CommunityGeneralSettings from "./CommunityGeneralSettings";
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
      <CommunityGeneralSettings communityId={communityId} />
      <CommunityMemberBrowser communityId={communityId}/>
    </FlexContainer>
  );
}