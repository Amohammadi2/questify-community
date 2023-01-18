import { Modal, Input, Text, Button, Loading, styled} from '@nextui-org/react';
import { Badge, FlexColumn, FlexRow } from 'modules/app-ui';
import { useTagsReducer } from 'modules/questions/utils';
import { useState } from 'react';

interface IPublishModal {
  open: boolean;
  onClose: () => void;
  onPublish: (tags: string[]) => void;
  publishLoading: boolean
}

const RangeInput = styled('input', {});

export default function PublishModal({ open, onClose, onPublish, publishLoading }: IPublishModal) {

  const [tags, { addTag, removeTag }] = useTagsReducer();
  const [price, setPrice] = useState<number>(0);

  return (
    <Modal
      open={open}
      onClose={onClose}
      blur
    >
      <Modal.Header>
        <Text h3>تنظیمات انتشار</Text>
      </Modal.Header>
      <Modal.Body css={{ py: '$12' }}>
        <Text color="$gray700" css={{ textAlign: 'right' }}>در انتخاب تگ ها دقت کنید. تگ ها به ما کمک می کنند پرسش شما را به دست افراد مرتبط تر برسانیم</Text>
        <Input
          css={{ mt: '$8' }}
          labelPlaceholder="تا 5 تگ غیر تکراری وارد کنید"
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
        <FlexRow css={{ flexWrap: 'wrap' }}>
          {tags.map(t => <Badge key={t} content={t} dismissable onDismiss={() => removeTag(t)} />)}
        </FlexRow>
        <FlexColumn>
          <Text color="$gray700" css={{ textAlign: 'right' }}>برای درخواست پاسخ نام کاربری فرد مورد نظر را تایپ کنید</Text>
          <Input
            css={{ w: '100%', mt: '$8' }}
            labelPlaceholder="درخواست پاسخ"
          />
        </FlexColumn>
        <FlexColumn>
          <Text color="$gray700" css={{ textAlign: 'right' }}>بودجه خود را برای این سوال تعیین کنید. سوال های با بودجه بالاتر خیلی سریع تر جواب داده می شوند</Text>
          <FlexRow>
            <RangeInput
              type="range"
              min="0"
              max="10000"
              step="500"
              value={price}
              css={{ flexGrow: 1}}
              onChange={e=>setPrice(+(e.currentTarget.value))}
            />
            <Text css={{ px: '$5' }}>بودجه: {price} تومان</Text>
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

