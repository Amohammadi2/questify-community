import { faBookmark, faHeart } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button, styled } from "@nextui-org/react";
import { Badge, FlexColumn, FlexRow } from "modules/app-ui";
import Link from "next/link";

const QuestionOneLinerUI = styled('div', {
  py: '$8',
  px: '$5',
  borderTop: '1px solid $gray100',
  borderBottom: '1px solid $gray100',
  d: 'flex',
  justifyContent: 'space-between',
  cursor: 'pointer'
})

const QuestionStats = styled('div', {
  d: 'flex',

})

interface QuestionOneLinerProps {
  id: string;
  title: string;
}

export default function QuestionOneLiner({ id, title } : QuestionOneLinerProps) {
  return (
    <Link href={"/question-details?qid="+id}>
      <QuestionOneLinerUI>
        <FlexRow css={{ alignItems: 'center', justifyContent: 'center'}}><strong>{title}</strong></FlexRow>
        <QuestionStats>
          <FlexColumn css={{ mx: '$3', alignItems: 'center', justifyContent: 'center' }}>
            <Badge content="5 پاسخ" />
          </FlexColumn>
          <FlexColumn css={{ mx: '$3' }}>
            <FontAwesomeIcon icon={faHeart} />
            <span>23</span>
          </FlexColumn>
          <FlexColumn css={{ mx: '$3' }}>
            <FontAwesomeIcon icon={faBookmark} />
            <span>42</span>
          </FlexColumn>
        </QuestionStats>
      </QuestionOneLinerUI>
    </Link>
  );
}