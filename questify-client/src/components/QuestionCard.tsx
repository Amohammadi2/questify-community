import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import {
  Avatar,
  Button,
  CardActionArea,
  CardActions,
  Grid,
  IconButton,
} from "@mui/material";
import { Bookmark, BookmarkBorder } from "@mui/icons-material";
import { useState } from "react";
import { VoteCounter } from "./VoteCounter";

export function QuestionCard() {
  const [saved, setSaved] = useState(false);
  const [hasSubscribed, setHasSubscribed] = useState(false);

  return (
    <Card sx={{ maxWidth: 600, my: 2 }} variant="outlined">
      <CardContent>
        <Grid container direction="row" alignItems="center">
          <Avatar />
          <Typography sx={{ mx: 1, flexGrow: "1" }}>
            Ashkan Mohammadi
          </Typography>
          <Grid item>
            <VoteCounter />
          </Grid>
        </Grid>
        <CardActionArea>
          <Typography gutterBottom variant="h5" component="div">
            معنی Lizard چیه؟
          </Typography>
          <Typography variant="body2" color="text.secondary">
            من یک سوال داشتم، این کلمه در درس 2 انگلیسی سال دهم اومده بود کسی می
            دونه معنی این کلمه چیه
          </Typography>
        </CardActionArea>
      </CardContent>
      <CardActions>
        <IconButton size="small" onClick={(e) => setSaved(!saved)}>
          {saved ? <Bookmark /> : <BookmarkBorder />}
        </IconButton>
        <Button
          color="secondary"
          size="small"
          variant={hasSubscribed ? "contained" : "outlined"}
          onClick={e=>setHasSubscribed(!hasSubscribed)}
        >
          {
            hasSubscribed
              ? 'درحال پیگیری'
              : 'پیگیری سوال'
          }
        </Button>
        {/* Todo: add tags here */}
      </CardActions>
    </Card>
  );
}
