import { faCheck } from "@fortawesome/free-solid-svg-icons";
import { Input, Text, Textarea, Button, Switch } from "@nextui-org/react";
import { BtnSideIcon, Filler, FlexColumn, FlexRow } from "modules/app-ui";
import { useState } from "react";

export default function CreateForm() {
  
  const [name, setName] = useState('');
  const [desc, setDesc] = useState('');
  const [isPrivate, setIsPrivate] = useState(false);
  
  return (
    <FlexColumn
      css={{
        bg: '$white',
        boxShadow: '$md',
        borderRadius: '$md',
        border: '1px solid $gray100',
        py: '$8',
        px: '$5',
        justifyContent: 'center',
        w: '100%',
        maxWidth: '340px',
        textAlign: 'center'
      }}
    >
      <Text h3>تاسیس انجمن</Text>
      <Input
        css={{ mt: '$7' }}
        placeholder="نام انجمن"
        value={name}
        onChange={(e)=>setName(e.target.value)}
      />
      <Textarea
        css={{ mt: '$7' }}
        placeholder="توضیحات..."
        minRows={3}
        maxRows={5}
        maxLength={150}
        value={desc}
        onChange={(e)=>setDesc(e.target.value)}
      />
      <FlexRow css={{ mt: '$5', alignItems: 'center' }}>
        <Text>خصوصی سازی انجمن</Text>
        <Filler />
        <Switch />
      </FlexRow>
      <Button
        disabled={!name || !desc}
        css={{ mt: '$7' }}
      >
        <BtnSideIcon icon={faCheck} />
        تاسیس انجمن
      </Button>
    </FlexColumn>
  )
}