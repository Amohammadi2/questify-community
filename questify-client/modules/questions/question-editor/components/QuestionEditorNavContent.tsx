import { faFirstdraft } from "@fortawesome/free-brands-svg-icons";
import { faFileArchive, faTowerBroadcast } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button } from "@nextui-org/react";
import Link from "next/link";
import { useRecoilState, useRecoilValue } from "recoil";
import { emitter } from "../events";
import { canBePublishedAtom, isPublishModalOpenAtom } from '../editor-input';

export default function QuestionEditorNavContent() {
  
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
      <span style={{margin: '0px 5px'}}>انتشار</span>
      <FontAwesomeIcon style={{margin: '0px 5px'}} icon={faTowerBroadcast} />
    </Button>
    <Button flat size="sm" css={{ ml: '$7', minWidth: 'unset' }} color="primary" onClick={()=>emitter.publish('open-drafts-modal', {})}>
      <span style={{margin: '0px 5px'}}>چرک‌نویس ها</span>
      <FontAwesomeIcon style={{margin: '0px 5px'}} icon={faFileArchive} />
    </Button>
    </>
  );
}