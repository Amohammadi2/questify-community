import { QuestionRead } from "@/gen"
import { faCheckSquare } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { Avatar, Button, Card, CardActionArea, Chip, Grid, Stack, Typography } from "@mui/material"
import { useNavigate } from "react-router-dom"

type QuestionSummaryProps = QuestionRead

export default function QuestionSummary({ author, created, title, numAnswers, tags, id } : QuestionSummaryProps) {
  
  const navigate = useNavigate()

  const goToDetailsPage = () => navigate('/question-details/'+id)
  
  return (
    <Card sx={{ width: '100%', px: 1.5, py: 2, my: 1.5 }}>
      <Stack direction="row" alignItems="center">
        <Avatar sx={{ mr: 1 }} />
        <Stack>
          <div>{author.username}</div>
          <Typography>{created.toLocaleDateString('fa-IR')}</Typography>
        </Stack>
      </Stack>
      <CardActionArea sx={{ py: .8, my: 1}} onClick={goToDetailsPage}>
        <Typography variant="h6">{title}</Typography>
      </CardActionArea>
      <Grid item sx={{ flexGrow: 1, }}>
        {tags.map(t => (
          <Chip key={t} label={'#'+t} sx={{ mx: .3 }} variant="outlined"/>
        ))}
      </Grid>
      <Stack direction="row" alignItems="center" sx={{ mt: 1}}>
        <FontAwesomeIcon icon={faCheckSquare} style={{ color: 'rgb(200,200,200)' }}/>
        <Typography sx={{ mx: .7 }}>{numAnswers} پاسخ</Typography>
        <div style={{flexGrow:1}}></div>
        <Button>پیگیری</Button>
      </Stack>
    </Card>
  )
}