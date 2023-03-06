import { faCheck, faTimes } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button, Grid, Loading, Text, Textarea } from "@nextui-org/react";
import { Badge, Filler, FlexColumn, FlexRow, ProfileSummery } from "modules/app-ui";
import { IUserSummery } from "modules/questions/shared/interfaces/user-summery.interface";
import { IUserVote } from "modules/questions/shared/interfaces/user-vote.interface";
import { ReactNode, useState } from "react";
import { IComment } from "../interfaces/comment.interface";
import Comment from "./Comment";
import ScoreCounter from "./ScoreCounter";


interface IDetailsViewProps {
  loading: boolean;
  author: IUserSummery;
  header?: ReactNode | ReactNode[];
  content: string;
  score: number;
  userVote: IUserVote;
  publishDate: Date;
  tags?: string[];
  comments: IComment[];
  profileSide?: ReactNode | ReactNode[];
  counterBottom?: ReactNode | ReactNode[];
}

export default function PostDetails({ author, header, content, score, userVote, publishDate, tags, comments, loading, profileSide, counterBottom }: IDetailsViewProps) {

  const [comment, setComment] = useState('');

  if (loading)
    return (
      <Grid.Container direction="column" css={{ width: '100%', height: '100%' }} justify="center" alignItems="center">
        <Loading size="lg" />
        <Text size="sm" color="$gray500">درحال بارگذاری</Text>
      </Grid.Container>
    );

  return (
    <FlexColumn css={{ my: '$8' }}>
      <FlexRow>
        <FlexColumn css={{ borderLeft: '1px solid $gray500', alignItems: 'center', justifyContent: 'center' }}>
          <ScoreCounter score={score} userVote={userVote} />
          {counterBottom}
        </FlexColumn>
        <FlexColumn css={{ flexGrow: 1, px: '$3' }}>
          <ProfileSummery
            img={author.profileImg}
            id={author.userId}
            text={author.name}
            sideContent={profileSide || <></>}
            css={{ borderBottom: '1px solid $gray50 ' }}
          />
          <FlexColumn css={{ flexGrow: 1, justifyContent: 'center' }}>
            {header}
          </FlexColumn>
        </FlexColumn>
      </FlexRow>
      <FlexColumn dangerouslySetInnerHTML={{ __html: content }} css={{ py: '$5' }} />
      <FlexRow css={{ alignItems: 'center', flexDirection: 'column', '@sm': { flexDirection: 'row' } }}>
        <Text color="$gray700">تاریخ انتشار: {publishDate.toISOString()}</Text>
        {tags && (
          <FlexRow css={{ alignItems: 'center', mx: '$5', color: '$gray700' }}>
            تگ ها: 
            {tags?.map(t => <Badge content={t} key={t} />)}
          </FlexRow>
        )}
      </FlexRow>
      <FlexColumn>
        {comments.map((c, i) => <Comment key={i} {...c} />)}
      </FlexColumn>
      <FlexColumn css={{ my: '$5' }}>
        <Textarea
          onChange={e=>setComment(e.target.value)}
          value={comment}
          minRows={3}
          maxRows={10}
          placeholder={'افزودن نظر'}
        />
        <FlexRow css={{ mt: '$5' }}>
          <Button size="sm" css={{ mr: '$3' }} disabled={!comment}>
            <FontAwesomeIcon
              icon={faCheck}
              style={{ margin: '0 5px'}}
            />
            ارسال نظر
          </Button>
          <Button size="sm" css={{ mr: '$3' }} color="error" disabled={!comment} flat>
            <FontAwesomeIcon
              icon={faTimes}
              style={{ margin: '0 5px'}}
            />
            انصراف
          </Button>
        </FlexRow>
      </FlexColumn>
    </FlexColumn>
  );
}