import { Paper, TextField } from "@mui/material";
import { styled } from "@mui/material/styles";
import { useRef, useState } from "react";
import { useClickAway } from "react-use";

export interface IAskQuestionInput {
  label: string;
  placeholder: string;
}

const AskQuestionDialog = styled(Paper)(({ theme }) => {
  return {
    position: "fixed",
    width: "400px",
    bottom: "80px",
    left: "50%",
    transform: "translateX(-50%)",
    transition: 'all .3s ease-out',
    '&.focused': {
      height: '400px',
      backgroundColor: 'red',
    }
  };
})

// Todo: increase the height of the input once the user focueses on the input and show a form dialog
export function AskQuestionInput({ label, placeholder }: IAskQuestionInput) {

  const [focused, setFocused] = useState(false);
  const r = useRef()
  useClickAway(r, () => setFocused(false));

  return (
    <AskQuestionDialog ref={r} className={focused ? 'focused' : ''}>
      <TextField
        variant="filled"
        color="info"
        label={label}
        sx={{ width: "100%" }}
        placeholder={placeholder}
        onFocus={()=>setFocused(true)}
      />
    </AskQuestionDialog>
  );
}
