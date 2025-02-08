import { $questionsApi } from "@/apis";
import { CacheManager } from "@/apollo/cache-manager";
import { $userProfile } from "@/store/user-profile.store";
import { faArrowDown, faArrowUp } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Grid, IconButton, Typography } from "@mui/material";
import { useRecoilValue } from "recoil";

export interface IVoteCounterProps {
  upvotes: number;
  downvotes: number;
  myVote: 'up' | 'down' | 'none'
  qid: string;
}

export default function VoteCounter({ upvotes, downvotes, qid, myVote } : IVoteCounterProps) {

  const questionsApi = useRecoilValue($questionsApi)
  const userProfile = useRecoilValue($userProfile)

  const castVote = async (vote: 'up' | 'down' | 'none') => {
    const result = await questionsApi.questionsVoteCreate({
      id: Number.parseInt(qid),
      voteRequest: {
        vote
      }
    })
    .catch(console.error) // Todo: handle error
    if (result) {
      const { upvotes, downvotes } = result
      CacheManager.updateQuestionVote(Number.parseInt(qid), upvotes, downvotes, vote)
    }
  }

  return (
    <Grid container direction="column" alignItems="center" justifyContent="center" sx={{ width: '45px' }}>
      <IconButton onClick={() => castVote(myVote == 'up' ? 'none' : 'up')} color={myVote == 'up' ? 'success' : 'default'} disabled={!userProfile?.username}>
        <FontAwesomeIcon icon={faArrowUp} />
      </IconButton>
      <Typography color="success">{upvotes}</Typography>
      <Typography color="error">{downvotes}</Typography>
      <IconButton onClick={() => castVote(myVote == 'down' ? 'none' : 'down')} color={myVote == 'down' ? 'error' : 'default'} disabled={!userProfile?.username}>
        <FontAwesomeIcon icon={faArrowDown} />
      </IconButton>
    </Grid>
  )
}