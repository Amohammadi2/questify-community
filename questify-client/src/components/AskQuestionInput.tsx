import { Paper, TextField } from "@mui/material";

export interface IAskQuestionInput {
  label: string;
  placeholder: string;
}

// Todo: increase the height of the input once the user focueses on the input and show a form dialog
export function AskQuestionInput({ label, placeholder }: IAskQuestionInput) {

  

  return (
    <Paper
      sx={{
        position: "fixed",
        width: "400px",
        bottom: "80px",
        left: "50%",
        transform: "translateX(-50%)",
      }}
    >
      <TextField
        variant="filled"
        color="info"
        label={label}
        sx={{ width: "100%" }}
        placeholder={placeholder} />
    </Paper>
  );
}
