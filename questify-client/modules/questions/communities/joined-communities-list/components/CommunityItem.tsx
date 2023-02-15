import { Avatar, Text } from "@nextui-org/react";
import { Badge, FlexColumn, FlexRow } from "modules/app-ui";
import { useRouter } from "next/router";
import { ICommunityItem } from "../interfaces/community-item.interface";

export default function CommunityItem({ id, name, lastQuestionTitle, newQuestions, profileImg } : ICommunityItem) {

  const router = useRouter();

  return (
    <FlexRow css={{
      bg: '$gray50',
      border: '1px solid $gray300',
      borderRadius: '$md',
      my: '$3',
      px: '$4',
      py: '$3',
      userSelect: 'none',
      transition: '$button',
      '&:hover': {
        bg: '$gray100',
        border: '1px solid $gray900'
      }
    }}
      onClick={()=>router.push('/communities/'+id)}
    >
      <FlexColumn>
        <Avatar squared text={name} src={profileImg} size="xl" />
      </FlexColumn>
      <FlexColumn css={{ flexGrow: 1, pr: '$5' }}>
        <FlexRow>
          <Text h3 css={{ flexGrow: 1 }}>{name}</Text>
          <FlexRow>
            <Badge content={`${newQuestions}`} round />
          </FlexRow>
        </FlexRow>
        <Text color="$gray700">
          {lastQuestionTitle}
        </Text>
      </FlexColumn>
    </FlexRow>
  )
}