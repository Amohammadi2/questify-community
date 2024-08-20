import { faUpload } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Paper, Typography } from "@mui/material";

export interface ImageInputProps {
  onUpload: (file: File) => void
  value: File|null
}


export default function ImageInput({onUpload, value} : ImageInputProps) {
  
  const handleDrop = (e: React.DragEvent<any>) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    onUpload(file)
  };

  
  return (
    <>
      <input type="file" style={{ display: 'none' }} id="upload-file" onChange={e=>onUpload((e.currentTarget.files ? e.currentTarget.files[0] : null) as unknown as File)}/>
      <label htmlFor="upload-file">
        <Paper
          sx={{ width: '200px', height: '300px', display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column', cursor: 'pointer', backgroundColor: 'rgb(250,250,250)'}}
          onDrop={handleDrop}
        >
          <FontAwesomeIcon
            icon={faUpload}
            style={{ fontSize: '32px'}}
          />
          <Typography sx={{ textAlign: 'center', mt: 2 }}>{value ? `${value.name}` : 'فایل را به اینجا بکشید یا برای انتخاب کلیک کنید'}</Typography>
        </Paper>
      </label>
    </>
  )
}