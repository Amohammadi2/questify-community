import { QuestionRead } from "@/gen"
import { faBell, faCheckSquare } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { Avatar, Button, Card, CardActionArea, Chip, Grid, IconButton, Stack, Typography } from "@mui/material"
import { useNavigate } from "react-router-dom"

type QuestionSummaryProps = QuestionRead

export default function QuestionSummary({ author, created, title, numAnswers, tags, id, hasAcceptedAnswer } : any) {
  
  const navigate = useNavigate()

  const goToDetailsPage = () => navigate('/question-details/'+id)
  
  return (
    <Card sx={{ width: '100%', px: 1.5, py: 2, my: 1.5, borderRadius: 0, borderBottom: '1px solid gray' }} elevation={0}>
      <Stack direction="row" alignItems="center">
        <Avatar sx={{ mr: 1, width: 30, height: 30 }} src={author.profile.profileImg} />
        <Stack>
          <div>{author.username}</div>
        </Stack>
      </Stack>
      <CardActionArea sx={{ py: .8, my: 1}} onClick={goToDetailsPage}>
        <Typography variant="h6" color="blue">{title}</Typography>
      </CardActionArea>
      <Grid item sx={{ flexGrow: 1, }}>
        {JSON.parse(tags).map((t:any) => (
          <Chip key={t} label={'#'+t} sx={{ mx: .3 }} variant="outlined"/>
        ))}
      </Grid>
      <Stack direction="row" alignItems="center" sx={{ mt: 1}}>
        <IconButton sx={{ mr: .5, fontSize: 19}}>
          <FontAwesomeIcon icon={faBell} style={{ color: "gray" }}/>
        </IconButton>
        <FontAwesomeIcon icon={faCheckSquare} style={{ color: hasAcceptedAnswer ? 'green' : 'rgb(200,200,200)' }}/>
        <Typography sx={{ mx: .7, fontSize: 13}}>{numAnswers} پاسخ</Typography>
        <div style={{flexGrow:1}}></div>
        <Typography>{new Date(created).toLocaleDateString('fa-IR')}</Typography>
      </Stack>
    </Card>
  )
}