import { Avatar, Loading, Text } from "@nextui-org/react";
import { APIStats } from "@utils/api-utils";
import { Filler } from "modules/app-ui";
import { useState } from "react";
import FlexRow from "modules/app-ui/components/FlexRow";
import { ICommuityProfile } from "../../interfaces/community-profile.interface";
import { ManagementMenu } from "./ManagementMenu";
import { MemberListModal } from "./MemberListModal";
import { InvitationModal } from "./InvitationModal";


export interface IEnvHeader {
  profileData: APIStats<ICommuityProfile>;
}

export default function CommunityProfile({ profileData } : IEnvHeader) {
  
  const { data, loading, error }  = profileData;
  const [memberListModalOpen, setMemberListModalOpen] = useState(false);
  const [invitationModalOpen, setInvitationModalOpen] = useState(false);

  return (
    <>
      <MemberListModal isOpen={memberListModalOpen} onClose={()=>setMemberListModalOpen(false)} />
      <InvitationModal isOpen={invitationModalOpen} onClose={()=>setInvitationModalOpen(false)} />
      <FlexRow
        css={{
          bg: '$gray50',
          borderRadius: '$md',
          alignItems: 'center',
          py: '$3',
          px: '$2'
        }}
      >
        {
          loading
          ? (
            <>
              <Loading size="md" css={{ mx: '$2' }} />
              <Text>در حال بارگزاری ...</Text>
            </>
          )
          : error
          ? (
            <>
              <Text color="error">{error}</Text>
            </>
          )
          : (
            <>
              <Avatar
                src={data?.profileImg}
                text={data?.name}
                css={{ mx: '$2' }}
              />
              <Text b css={{ mx: '$2' }}>{data?.name}</Text>
              <Filler />
              <ManagementMenu
                openMemberListModal={()=>setMemberListModalOpen(true)}
                openInvitationModal={()=>setInvitationModalOpen(true)}
              />
            </>
          )
        }
      </FlexRow>
    </>
  )
}
