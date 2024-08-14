import { faCheck, faTimes } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { LoadingButton } from "@mui/lab";
import { Button, Grid, Typography } from "@mui/material";
import { useCallback, useState } from "react";

export interface IConfirmationButtonGroupProps {
  publishable: boolean;
  cancelable: boolean;
  onPublish: () => Promise<any>;
  onCancel: () => void;
  publishText: string;
  cancelText: string;
}


export function ConfirmationButtonGroup({ publishable, cancelable, onPublish, onCancel, publishText } : IConfirmationButtonGroupProps) {
  
  const [loading, setLoading] = useState(false)

  const handlePublish = useCallback(() => {
    setLoading(true)
    onPublish().finally(() => setLoading(false))
  }, [loading, setLoading, onPublish])
  
  return (
    <Grid container sx={{ mt: 2 }}>
      <LoadingButton variant="outlined" color="primary" sx={{ mr: 1}} onClick={handlePublish} loading={loading} disabled={!publishable}>
        <Typography sx={{ mr: 1 }}>{publishText}</Typography>
        <FontAwesomeIcon
          icon={faCheck}
        />
      </LoadingButton>
      <Button variant="outlined" color="error" sx={{ mr: 1}} onClick={onCancel} disabled={!cancelable}>
        <Typography sx={{ mr: 1 }}>انصراف</Typography>
        <FontAwesomeIcon
            icon={faTimes}
        />
      </Button>
    </Grid>
  )
}