import { Button, Grid, Paper, TextField, Badge } from "@mui/material";
import { styled } from "@mui/material/styles";
import { useRef, useState } from "react";
import { useClickAway } from "react-use";
import { FileAttachmentDialog } from "./FileAttachmentDialog";


export interface IAskQuestionInput {
  label: string;
  placeholder: string;
}

const AskQuestionDialog = styled(Paper)(() => {
  return {
    position: "fixed",
    display: 'flex',
    flexDirection: 'column',
    overflowY: 'hidden',
    width: "400px",
    bottom: "80px",
    height: '56px',
    left: "50%",
    transform: "translateX(-50%)",
    transition: 'all .3s ease-out',
    '&.focused': {
      height: '400px',
    }
  };
})

export function AskQuestionInput({ label, placeholder }: IAskQuestionInput) {
  
  
  // control the file attachement dialog
  const [attachments, setAttachments] = useState<File[]>([]);
  const [attachmentOpen, setAttachmentOpen] = useState(false);
  
  // control the UI
  const [focused, setFocused] = useState(false);
  const dialogRef = useRef<HTMLDivElement>(null);
  useClickAway(dialogRef, () => {
    if (!attachmentOpen) {
      setFocused(false);
    }
  });

  // form handling
  const [questionTitle, setQuestionTitle] = useState('');
  const [questionBody, setQuestionBody] = useState('');

  const cleanUpForm = () => {
    setQuestionTitle('');
    setQuestionBody('');
    setAttachments([]);
  }

  const exitForm = () => {
    cleanUpForm();
    setFocused(false);
  }


  return (
    <AskQuestionDialog ref={dialogRef} className={focused ? 'focused' : ''}>
      <TextField
        onChange={e=>setQuestionTitle(e.target.value)}
        value={questionTitle}
        variant="filled"
        color="info"
        label={label}
        sx={{ width: "100%" }}
        placeholder={placeholder}
        onFocus={() => setFocused(true)}
      />
      <TextField
        onChange={e=>setQuestionBody(e.target.value)}
        value={questionBody}
        multiline
        variant="standard"
        color="info"
        sx={{ flexGrow: '1', '.MuiInput-root': { height: '100%' } }} 
        inputProps={{
          style: {
            height: '100%'
          }
        }}
        placeholder="توضیحات سوال را وارد کنید..."
      />
      <Grid container direction="row" sx={{ py: 1, px: 1 }}>
        <Button variant="outlined" color="error" sx={{ ml: 1 }} onClick={()=>exitForm()}>لغو</Button>
        <Button variant="contained" color="secondary" sx={{ ml: 1 }} onClick={()=>setAttachmentOpen(true)}>
          <Badge badgeContent={attachments.length} color="info">
            ضمیمه
          </Badge>
        </Button>
        <Button variant="contained" sx={{ ml: 1 }}>ارسال</Button>
      </Grid>
      <FileAttachmentDialog 
        isOpen={attachmentOpen} 
        onClose={()=>setAttachmentOpen(false)}
        attachments={attachments}
        setAttachments={setAttachments}
      />
    </AskQuestionDialog>
  );
}
