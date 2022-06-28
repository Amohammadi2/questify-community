import { useRef } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { Delete, FileUploadRounded } from "@mui/icons-material";
import { IconButton, List, ListItem, ListItemText, Typography } from '@mui/material';
import { FileUploader } from "react-drag-drop-files";
import { AppListItemButton } from './AppListItemButton';
import { useState } from 'react';

interface IFileAttachmentDialogProps {
  isOpen: boolean;
  onClose: () => void;
  attachments: File[],
  setAttachments: (files: File[]) => void;
}

export function FileAttachmentDialog({ isOpen, onClose, attachments, setAttachments }: IFileAttachmentDialogProps) {

  const inputRef = useRef<HTMLInputElement | null>(null);

  const handleFiles = (e: any) => {
    const data: File[] = [];
    for (let i=0; i<e.target.files.length; i++) {
      data.push(e.target.files[i]);
    }
    setAttachments(data);
  }

  const handleDeleteFile = (file: File) => {
    const remainingFiles = attachments.filter((otherFile) => file.name != otherFile.name);
    setAttachments(remainingFiles);
  }

  const cancelForm = () => {
    setAttachments([])
    onClose();
  };
  
  return (
    <Dialog open={isOpen} onClose={onClose}>
      <DialogTitle>ضمیمه سازی فایل</DialogTitle>
      <DialogContent sx={{ minWidth: '400px' }}>
        <DialogContentText>
          لطفا فایل های مورد نظرتان را انتخاب کنید
        </DialogContentText>
        <input ref={inputRef} type="file" multiple onChange={handleFiles} id="file-input" hidden />
        <Button 
          color="secondary"
          variant="outlined"
          startIcon={<FileUploadRounded />}
          sx={{ width: '100%', my: 2}}
          onClick={e=>inputRef.current?.click()}
        >
          <div style={{ margin: '0px 8px'}}>
            افزودن فایل به عنوان ضمیمه 
          </div>
        </Button>
        <List>
        {attachments.map((file) => {
          return (
            <ListItem key={file.name}>
              <ListItemText>{file.name}</ListItemText>
              <IconButton sx={{ mx: 1.3}} onClick={()=>handleDeleteFile(file)}>
                <Delete />
              </IconButton>
            </ListItem>
          )
        })}
        </List>
      </DialogContent>
      <DialogActions>
        <Button onClick={cancelForm} color="error" variant="outlined" sx={{ mx: .7 }}>لغو</Button>
        <Button onClick={onClose} color="primary" variant="outlined" sx={{ mx: .7 }}>انجام</Button>
      </DialogActions>
    </Dialog>
  );
}
