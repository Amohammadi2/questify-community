import { Grid, IconButton } from "@mui/material";
import { useState } from "react";
import { KeyboardArrowUp as ArrowUp, KeyboardArrowDown as ArrowDown } from "@mui/icons-material";

export function VoteCounter() {
  const [votes, setVotes] = useState(0);

  return (
    <Grid container direction="row-reverse" justifyContent={'space-between'}>
      <IconButton color="success" size="small" onClick={e=>setVotes(votes+1)}>
        <ArrowUp />
      </IconButton>
      <IconButton size="small" disabled>
        {votes}
      </IconButton>
      <IconButton color="error" size="small" onClick={e=>setVotes(votes-1)}>
        <ArrowDown />
      </IconButton>
    </Grid>
  );
}