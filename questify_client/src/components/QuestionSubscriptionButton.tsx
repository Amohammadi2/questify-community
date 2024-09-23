import { $questionsApi } from "@/apis";
import { CacheManager } from "@/apollo/cache-manager";
import { $userProfile } from "@/store/user-profile.store";
import { faBell } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { IconButton } from "@mui/material";
import { useCallback } from "react";
import { useRecoilValue } from "recoil";

export interface IQuestionSubscriptionButtonProps {
  qid: string;
  isSubscribed: boolean;
  authorId: string;
}

export default function QuestionSubscriptionButton({ qid, isSubscribed, authorId } : IQuestionSubscriptionButtonProps) {
  
  const qidNum = Number.parseInt(qid)
  const questionsApi = useRecoilValue($questionsApi)
  const userProfile = useRecoilValue($userProfile)

  const toggleSubscription = useCallback(() => {
    // optimistic user feedback (we won't wait for the api request to complete)
    CacheManager.updateQuestionSubscription(qidNum, !isSubscribed)
    questionsApi.questionsSubscribeCreate({
      id: qidNum,
      subscribeRequestRequest: {
        subscribe: !isSubscribed
      }
    })
    .catch(e => {
      // revert the changes to cache
      CacheManager.updateQuestionSubscription(qidNum, isSubscribed)
      // Todo: user feedback toast here
    })
  }, [questionsApi, qid, isSubscribed])

  if (userProfile?.id == Number.parseInt(authorId)) {
    return null; // users should not be able to subscribe to their own questions
  }
  
  return (
    <IconButton sx={{ mr: .5, fontSize: 19}} onClick={toggleSubscription}>
      <FontAwesomeIcon icon={faBell} style={{ color: isSubscribed ? 'orange' : 'gray' }}/>
    </IconButton>
  )
}