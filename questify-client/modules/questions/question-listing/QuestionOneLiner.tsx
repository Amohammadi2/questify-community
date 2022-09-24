import { faBookmark, faHeart } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button, styled } from "@nextui-org/react";
import { Badge, FlexColumn, FlexRow } from "modules/app-ui";
import Link from "next/link";

const QuestionOneLinerUI = styled('div', {
  d: 'flex',
  justifyContent: 'space-between',
  cursor: 'pointer'
})

const QuestionStats = styled('div', {
  d: 'flex'
})

const IconColumn = styled(FlexColumn, {
  mx: '$3',
  d: 'none',
  '@sm': {
    d: 'flex'
  }
})

interface QuestionOneLinerProps {
  id: string;
  title: string;
}

export default function QuestionOneLiner({ id, title } : QuestionOneLinerProps) {
  return (
    <Link href={"/question-details?qid="+id}>
      <FlexColumn css={{ my: '$5', borderTop: '1px solid $gray100', borderBottom: '1px solid $gray100', py: '$5', px: '$5', }}>
        <QuestionOneLinerUI>
          <FlexRow css={{ alignItems: 'center', justifyContent: 'center'}}><strong>{title}</strong></FlexRow>
          <QuestionStats>
            <FlexColumn css={{ mx: '$3', alignItems: 'center', justifyContent: 'center' }}>
              <Badge content="5 پاسخ" />
            </FlexColumn>
            <IconColumn>
              <FontAwesomeIcon icon={faHeart} />
              <span>23</span>
            </IconColumn>
            <IconColumn>
              <FontAwesomeIcon icon={faBookmark} />
              <span>42</span>
            </IconColumn>
          </QuestionStats>
        </QuestionOneLinerUI>
        <FlexRow css={{ my: '$1' }}>
          {new Array(3).fill(<Badge content="تگ مثال" />)}
        </FlexRow>
      </FlexColumn>
    </Link>
  );
}