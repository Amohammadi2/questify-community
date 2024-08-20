import { Grid, InputBase } from "@mui/material";

export interface ITitleInputProps {
  title: string;
  setTitle: (title: string) => void;
}

export function TitleInput({ title, setTitle } : ITitleInputProps) {
  return (
    <Grid container direction="row">
      <InputBase
        placeholder="عنوان سوال را وارد کنید..."
        sx={{ fontSize: 35, mb:2, flexGrow:1}}
        value={title}
        onChange={e=>setTitle(e.currentTarget.value)}
      />
    </Grid>
  )
}