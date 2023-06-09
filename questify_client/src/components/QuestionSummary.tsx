import { QuestionRead } from "@/gen";
import { faCheckSquare } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Avatar, Card, CardActionArea, Chip, Grid, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

interface QuestionSummaryProps extends QuestionRead {}

export default function QuestionSummary({ author, created, title, numAnswers, tags, id } : QuestionSummaryProps) {
  
  const navigate = useNavigate()

  const goToDetailsPage = () => navigate('/question-details/'+id)
  
  return (
    <Card sx={{ width: '100%', px: 1.5, py: 2, my: 1.5 }}>
      <Grid container direction="row" alignItems="center">
        <Avatar sx={{ mr: 2 }} />
        <Typography>{author.username}</Typography>
        <CardActionArea sx={{ py: .8, my: 1}} onClick={goToDetailsPage}>
          <Typography variant="h6">{title}</Typography>
        </CardActionArea>
      </Grid>
      <Grid container direction="row" alignItems="center">
        <FontAwesomeIcon icon={faCheckSquare} style={{ color: 'rgb(200,200,200)' }}/>
        <Typography sx={{ mx: .7 }}>{numAnswers} پاسخ</Typography>
        <Grid item sx={{ flexGrow: 1, }}>
          {tags.map(t => (
            <Chip key={t} label={t} sx={{ mx: .3 }} variant="outlined"/>
          ))}
        </Grid>
        <Typography>{created.toString()}</Typography>
      </Grid>
    </Card>
  )
}