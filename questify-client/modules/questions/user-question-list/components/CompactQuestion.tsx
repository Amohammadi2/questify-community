import { Avatar, Text } from "@nextui-org/react";
import { Badge, FlexColumn, FlexRow } from "modules/app-ui";
import Link from "next/link";
import { ICompactQuestion } from "../interfaces/compact-question.interface";

export default function CompactQuestion({ id, title, author, date, tags, nAnswers } : ICompactQuestion) {
  return (
    <FlexRow css={{ pt: '$10', pb: '$5', borderBottom: '1px solid $gray300' }}>
      <FlexColumn css={{ py: '$5', px: '$4'}}>
        <Link href={"/user-profile?id="+author.userId}>
          <Avatar
            zoomed
            src={author.profileImg}
            text={author.name}
            size="sm"
          />
        </Link>
      </FlexColumn>
      <FlexColumn>
        <Link href={'/question-details?qid='+id}>
          <Text h4 css={{ cursor: 'pointer' }}>{title}</Text>
        </Link>
        <Text color="$gray800" css={{ mx: '$4' }}>
          • {author.name}
          • {nAnswers} پاسخ
          • {date.toString()} {/* Todo: persian date */}
        </Text>
        <FlexRow>
          {tags.map(t => <Badge key={t} content={t} />)}
        </FlexRow>
      </FlexColumn>
    </FlexRow>
  )
}