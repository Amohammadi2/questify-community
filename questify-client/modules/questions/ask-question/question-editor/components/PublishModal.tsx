import { Modal, Input, Text, Button, Loading} from '@nextui-org/react';
import { Badge, FlexRow } from 'modules/app-ui';
import { useReducer } from 'react';

interface IPublishModal {
  open: boolean;
  onClose: () => void;
  onPublish: (tags: string[]) => void;
  publishLoading: boolean
}

export default function PublishModal({ open, onClose, onPublish, publishLoading }: IPublishModal) {

  const [tags, { addTag, removeTag }] = useTags();

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
        <Input
          labelPlaceholder="تگ را وارد کنید"
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
          {tags.map(t => <Badge content={t} dismissable onDismiss={() => removeTag(t)} />)}
        </FlexRow>
        <FlexRow css={{ justifyContent: 'center' }}>
          <Button size="sm" css={{ mx: '$3'}} disabled={tags.length <= 0 || publishLoading} onClick={()=>onPublish(tags)}>
            {publishLoading ? <Loading size="sm" /> : "انتشار"}
          </Button>
          <Button size="sm" color="error" flat css={{ mx: '$3'}} onClick={()=>onClose()}>انصراف</Button>
        </FlexRow>
      </Modal.Body>
    </Modal>
  )
}


// :Q: maybe we can make this mechanism shared across the filtering system and post publish modal?
function useTags() {
  const [tags, dispatch] = useReducer<(state: string[], action: { type: 'add-tag' | 'remove-tag'; payload: string; }) => string[]>(
    (state, action) => {
      switch (action.type) {
        case "add-tag":
          if (state.includes(action.payload))
            return state;
          return [...state, action.payload];
        case "remove-tag":
          return state.filter(t => t != action.payload);
      }
    },
    []
  );

  return [tags, {
    addTag(tag: string) {
      dispatch({ type: 'add-tag', payload: tag })
    },
    removeTag(tag: string) {
      dispatch({ type: 'remove-tag', payload: tag })
    }
  }] as const;
}
