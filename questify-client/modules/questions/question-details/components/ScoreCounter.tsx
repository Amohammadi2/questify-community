import { faArrowDown, faArrowUp } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { FlexColumn, FlexRow, IconButton } from "modules/app-ui";
import { useState, useEffect } from "react";


interface IScoreCounterProps {
  score: number;
  userVote: 'up' | 'down' | null;
}

export default function ScoreCounter({ score: _score, userVote: _userVote } : IScoreCounterProps) {
  
  const [score, setScore] = useState<number>(0);
  const [userVote, setUserVote] = useState<'up'|'down'| null>(null);

  useEffect(() => {
    setScore(_score);
  }, [_score])

  useEffect(() => {
    setUserVote(_userVote);
  }, [_userVote])

  const upvote = () => {
    setScore(s => s+1);
    setUserVote('up');
  }

  const downvote = () => {
    setScore(s => s-1);
    setUserVote('down');
  }
  
  return (
    <FlexColumn css={{ justifyContent: 'center', px: '$3' }}>
      <IconButton
        css={{ color: userVote === 'up' ? '$black' : '$gray700' }}
        onClick={()=>upvote()}
      >
        <FontAwesomeIcon icon={faArrowUp} />
      </IconButton>
      <FlexRow css={{ color: score < 0 ? '$red700' : score === 0 ? '$gray800' : '$green700', justifyContent: 'center', direction: 'ltr'}}>
        {score}
      </FlexRow>
      <IconButton
        css={{ color: userVote === 'down' ? '$black' : '$gray700' }}
        onClick={()=>downvote()}
      >
        <FontAwesomeIcon icon={faArrowDown} />
      </IconButton>
    </FlexColumn>
  )
}