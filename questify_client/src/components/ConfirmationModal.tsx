import { ModalProps } from '@/interfaces/ModalProps.interface';
import { LoadingButton } from '@mui/lab';
import { Button, Dialog, DialogActions } from '@mui/material';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

export interface ConfirmationModalProps extends ModalProps {
  title?: string
  content?: string
  actionText?: string
  negativeAction?: boolean
  loading?: boolean
  onConfirm: () => void
}

export default function ConfirmationModal({ open, onClose, title, content, actionText, onConfirm, negativeAction=false, loading=false } : ConfirmationModalProps) {
  return (
    <Dialog
      open={open}
      onClose={onClose}
      aria-labelledby={title}
      aria-describedby={content}
    >
      <DialogTitle id="alert-dialog-title">
        {title}
      </DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          {content}
        </DialogContentText>
      </DialogContent>
      <DialogActions sx={{ justifyContent: 'right' }}>
        <Button onClick={onClose} autoFocus={negativeAction} disabled={loading}>بازگشت</Button>
        <LoadingButton onClick={() => { onConfirm(); onClose() }} autoFocus={!negativeAction} color={negativeAction ? 'error' : 'success'} loading={loading}>
          {actionText}
        </LoadingButton>
      </DialogActions>
    </Dialog>
  );
}