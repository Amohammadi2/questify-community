import { Text } from "@nextui-org/react";
import { ContentLoader } from "modules/app-ui";
import { useCommunityMembers } from "../hooks/useCommunityMembers";
import { MemberProfileSummery } from "./MemberProfileSummery";

export default function CommunityMemberBrowser(communityId: string) {

  const { data, error, loading } = useCommunityMembers(communityId);

  return (
    <>
      <Text h3 css={{ py: '$5' }}>اعضاء</Text>
      <ContentLoader
        dir="col"
        data={data}
        error={error}
        loading={loading}
      >
        {(data) => (
          data.map((d,i) => (
            <MemberProfileSummery key={i} {...d} />
          ))
        )}
      </ContentLoader>
    </>
  )
}