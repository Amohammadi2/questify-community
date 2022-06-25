import { Grid, IconButton } from "@mui/material";
import { useState } from "react";
import { KeyboardArrowUp as ArrowUp, KeyboardArrowDown as ArrowDown } from "@mui/icons-material";

export function VoteCounter() {
  const [votes, setVotes] = useState(0);

  return (
    <Grid direction="column" justifyContent={'space-between'} sx={{ height: '40px' }}>
      <IconButton size="small" onClick={e=>setVotes(votes+1)}>
        <ArrowUp />
      </IconButton>
      <IconButton size="small" disabled>
        {votes}
      </IconButton>
      <IconButton size="small" onClick={e=>setVotes(votes-1)}>
        <ArrowDown />
      </IconButton>
    </Grid>
  );
}