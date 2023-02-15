import { useState, useEffect } from 'react';
import { Text, Input } from "@nextui-org/react";
import { FlexRow, IconButton } from "modules/app-ui";
import Skeleton from 'react-loading-skeleton';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle, faEdit } from '@fortawesome/free-solid-svg-icons';

interface IEditableTextField {
  content: string;
  header?: boolean;
  onEditRequest: (newContent: string) => boolean; // you can reject the new input by returning false
}
export function EditableTextField({ header, onEditRequest, content }: IEditableTextField) {

  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [text, setText] = useState<string>('');

  useEffect(() => {
    setText(content);
  }, [content]);

  return (
    <FlexRow css={{ alignItems: 'center' }}>
      <IconButton
        css={{ ml: '$2', flexShrink: 0 }}
        onClick={() => {
          if (isEditing && onEditRequest(text))
            setIsEditing(false);
          else
            setIsEditing(true);
        }}
      >
        {!isEditing ? (
          <FontAwesomeIcon icon={faEdit} />
        )
          : (
            <FontAwesomeIcon icon={faCheckCircle} />
          )}
      </IconButton>
      {!isEditing
        ? (
          header
            ? (<Text
              css={{
                fontWeight: 'bold',
                fontSize: '25px',
                flexGrow: 1,
                '@sm': {
                  fontSize: '35px',
                }
              }}
            >
              {content || <Skeleton />}
            </Text>
            ) : (
              <Text css={{ flexGrow: 1 }}>{content || <Skeleton />}</Text>
            )
        )
        : (
          <Input
            size={header ? "xl" : 'md'}
            css={{ w: '100%', my: '$3' }}
            value={text}
            onChange={(e) => setText(e.target.value)}
            onKeyPress={(e) => {
              if (e.key == "Enter" && onEditRequest(text))
                setIsEditing(false);
            }} />
        )}
    </FlexRow>
  );
}
