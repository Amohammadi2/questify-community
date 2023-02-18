import { useState, useEffect } from 'react';
import { Text, Input, Textarea } from "@nextui-org/react";
import { FlexRow, IconButton } from "modules/app-ui";
import Skeleton from 'react-loading-skeleton';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle, faEdit } from '@fortawesome/free-solid-svg-icons';

interface IEditableTextField {
  content: string;
  header?: boolean;
  bold?: boolean;
  multiline?: boolean;
  onEditRequest: (newContent: string) => boolean; // you can reject the new input by returning false
}

export default function EditableTextField({ header=false, onEditRequest, content, multiline=false, bold=false }: IEditableTextField) {

  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [text, setText] = useState<string>('');

  useEffect(() => {
    setText(content);
  }, [content]);


  const input = !multiline ? (
    <Input
      size={header ? "xl" : 'md'}
      css={{ my: '$3', flexGrow: 1 }}
      value={text}
      onChange={(e) => setText(e.target.value)}
      onKeyPress={(e) => {
        if (e.key == "Enter" && onEditRequest(text))
          setIsEditing(false);
      }}
    />
  ) : (
    <Textarea
      size={header ? "xl" : 'md'}
      css={{ my: '$3', flexGrow: 1 }}
      value={text}
      onChange={(e) => setText(e.target.value)}
      minRows={5}
      maxRows={8}
      onKeyPress={(e) => {
        if (e.shiftKey && e.key == "Enter" && onEditRequest(text))
          setIsEditing(false);
      }}
    />
  );
  return (
    <FlexRow css={{ alignItems: 'center', flexGrow: 1 }}>
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
              <Text css={{ flexGrow: 1, fontWeight: bold ? 'bold' : '$normal' }}>{content || <Skeleton />}</Text>
            )
        )
        : (input)}
    </FlexRow>
  );
}
