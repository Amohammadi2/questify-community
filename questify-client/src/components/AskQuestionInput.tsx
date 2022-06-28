import { Button, Grid, Paper, TextField, Badge, Stack, Chip, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";
import { useRef, useState } from "react";
import { FileUploader } from "react-drag-drop-files";
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
  
  // control the slides
  const [activeSlide, setActiveSlide] = useState(1);
  
  // control the file attachement dialog
  const [attachments, setAttachments] = useState<File[]>([]);
  const [attachmentOpen, setAttachmentOpen] = useState(false);
  
  // control the focus
  const [focused, setFocused] = useState(false);
  const dialogRef = useRef<HTMLDivElement>(null);
  useClickAway(dialogRef, () => {
    if (!attachmentOpen) {
      setActiveSlide(1);
      setFocused(false);
    }
  });

  
  // form handling
  const [questionTitle, setQuestionTitle] = useState('');
  const [questionBody, setQuestionBody] = useState('');
  const [tags, setTags] = useState<string[]>([]);
  const [coverImage, setCoverImage] = useState<File | null>(null);
  
  const addTag = (newTag: string) => {
    if (!tags.includes(newTag)) // no duplicate tags are allowed
      setTags([...tags, newTag]);
  } 

  const removeTag = (tag: string) => {
    setTags(tags.filter(t => t != tag));
  }

  const cleanUpForm = () => {
    setQuestionTitle('');
    setQuestionBody('');
    setTags([]);
    setAttachments([]);
    setCoverImage(null);
  }
  
  const exitForm = () => {
    cleanUpForm();
    setFocused(false);
  }

  const handleFormSubmit = () => {
    // Todo: connect back to the back-end service
    console.log("DATA TO SUBMIT: ", {
      questionTitle,
      questionBody,
      tags,
      coverImage,
      attachments
    })
  }
  
  
  return (
    <AskQuestionDialog ref={dialogRef} className={focused ? 'focused' : ''}>
      { activeSlide == 1 &&
        <Stack direction="column" sx={{ height: '100%' }}>
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
            <Button variant="contained" sx={{ ml: 1 }} onClick={()=>setActiveSlide(2)} disabled={!(questionBody && questionTitle)}>ادامه</Button>
          </Grid>
          <FileAttachmentDialog 
            isOpen={attachmentOpen} 
            onClose={()=>setAttachmentOpen(false)}
            attachments={attachments}
            setAttachments={setAttachments}
          />
        </Stack>
      }
      { activeSlide === 2 &&
        <Stack direction="column" sx={{ height: '100%', px: 2, py: 2 }}>
          <Typography variant="h6" mb={2}>انتخاب تصویر نمایه</Typography>
          <FileUploader types={['jpg', 'png', 'img']} handleChange={(file: File) => setCoverImage(file)} />
          <Typography my={1}>تگ های پست:</Typography>
          <div>
            {tags.map(tag => (
              <Chip 
                key={tag}  
                label={tag} 
                sx={{ mx: .5, my: .4}}
                onDelete={()=>removeTag(tag)}
              />
            ))}
          </div>
          <TextField
            disabled={tags.length >= 3}
            sx={{ mt: 2 }}
            variant="filled" 
            label="ایجاد تگ" 
            placeholder="یک تگ وارد کرده و enter را بزنید"
            onKeyDown={(e:any) => {
              if (e.key == "Enter") {
                addTag(e.target.value);
                e.target.value = "";
              }
            }}
          />
          <div style={{ flexGrow: '1'}}> </div>
          <Stack direction="row">
            <Button 
              variant="outlined"
              color="error" 
              sx={{ ml:0.5 }}
              onClick={()=>setActiveSlide(1)}
            >
              برگشت
            </Button>
            <Button 
              variant="contained" 
              sx={{ flexGrow: '1', mr:0.5 }} 
              disabled={tags.length == 0} 
              onClick={handleFormSubmit}
            >
              ارسال
            </Button>
          </Stack>
        </Stack>
      }
    </AskQuestionDialog>
  );
}
