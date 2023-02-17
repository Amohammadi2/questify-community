import { Modal, Input, Text, Button, Loading, styled} from '@nextui-org/react';
import { Badge, FlexColumn, FlexRow } from 'modules/app-ui';
import { useValueList } from 'modules/questions/utils';
import { useState } from 'react';

interface IPublishModal {
  open: boolean;
  onClose: () => void;
  onPublish: (tags: string[]) => void;
  publishLoading: boolean
}

const RangeInput = styled('input', {});

export default function PublishModal({ open, onClose, onPublish, publishLoading }: IPublishModal) {

  const [tags, { add: addTag, remove: removeTag }] = useValueList();
  const [answerRequests, { add: addAnswerRequest, remove: removeAnswerRequest}] = useValueList();
  const [title, setTitle] = useState('');

  return (
    <Modal
      open={open}
      onClose={onClose}
      blur
      preventClose
      closeButton
    >
      <Modal.Header>
        <Text h3>تنظیمات انتشار</Text>
      </Modal.Header>
      <Modal.Body css={{ py: '$12' }}>
        <FlexColumn>
          <Input
            css={{ mt: '$3' }}
            placeholder="عنوان نوشته را وارد کنید."
            bordered
            enterKeyHint="done"
          />
        </FlexColumn>
        <FlexColumn>
          <Text color="$gray700" css={{ textAlign: 'right' }}>در انتخاب تگ ها دقت کنید. تگ ها به ما کمک می کنند پرسش شما را به دست افراد مرتبط تر برسانیم</Text>
          <Input
            css={{ mt: '$3' }}
            placeholder="تا 5 تگ غیر تکراری وارد کنید"
            bordered
            enterKeyHint="done"
            onKeyDown={e => {
              if (e.key === "Enter") {
                addTag((e.target as HTMLInputElement).value);
                (e.target as HTMLInputElement).value = ''; // reset the field for the next tag
              }
            }}
            disabled={tags.length >= 5}
          />
          <FlexRow css={{ flexWrap: 'wrap', mt: '$3' }}>
            {tags.map(t => <Badge key={t} content={t} dismissable onDismiss={() => removeTag(t)} />)}
          </FlexRow>
        </FlexColumn>
        <FlexColumn>
          <Text color="$gray700" css={{ textAlign: 'right' }}>برای درخواست پاسخ نام کاربری فرد مورد نظر را تایپ کنید</Text>
          <Input
            css={{ w: '100%', mt: '$3' }}
            placeholder="درخواست پاسخ"
            enterKeyHint="done"
            onKeyDown={e => {
              if (e.key === "Enter") {
                addAnswerRequest((e.target as HTMLInputElement).value);
                (e.target as HTMLInputElement).value = ''; // reset the field for the next tag
              }
            }}
            disabled={answerRequests.length >= 5}
          />
          <FlexRow css={{ flexWrap: 'wrap', mt: '$3' }}>
            {answerRequests.map(a => <Badge key={a} content={a} dismissable onDismiss={() => removeAnswerRequest(a)} />)}
          </FlexRow>
        </FlexColumn>
        <FlexRow css={{ justifyContent: 'center' }}>
          <Button size="sm" css={{ mx: '$3'}} disabled={tags.length <= 0 || publishLoading} onClick={()=>{onPublish(tags)}}>
            {publishLoading ? <Loading size="sm" /> : "انتشار"}
          </Button>
          <Button size="sm" color="error" flat css={{ mx: '$3'}} onClick={()=>onClose()}>انصراف</Button>
        </FlexRow>
      </Modal.Body>
    </Modal>
  )
}

