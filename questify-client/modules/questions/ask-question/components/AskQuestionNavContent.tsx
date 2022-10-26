import { Button } from "@nextui-org/react";
import Link from "next/link";
import { useRecoilState, useRecoilValue } from "recoil";
import { canBePublishedAtom, isPublishModalOpenAtom } from '../question-editor';

export default function AskQuestionNavContent() {
  
  const canBePublished = useRecoilValue(canBePublishedAtom);
  const [isPublishModalOpen, setIsPublishModalOpen] = useRecoilState(isPublishModalOpenAtom);
  
  return (
    <>
    <Button
      disabled={!canBePublished || isPublishModalOpen}
      onPress={()=>setIsPublishModalOpen(true)}
      size="sm"
      css={{ ml: '$7', minWidth: 'unset' }}
    >
      انتشار
    </Button>
    <Link href="/drafts-list">
      <Button flat size="sm" css={{ ml: '$7', minWidth: 'unset' }} color="primary">پیش‌نویس ها</Button>
    </Link>
    </>
  );
}