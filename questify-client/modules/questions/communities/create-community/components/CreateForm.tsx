import { faCheck } from "@fortawesome/free-solid-svg-icons";
import { Input, Text, Textarea, Button } from "@nextui-org/react";
import { BtnSideIcon, FlexColumn } from "modules/app-ui";
import { useState } from "react";

export default function CreateForm() {
  
  const [name, setName] = useState('');
  const [desc, setDesc] = useState('');
  
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
        maxWidth: '440px',
        textAlign: 'center'
      }}
    >
      <Text h2>تاسیس انجمن</Text>
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