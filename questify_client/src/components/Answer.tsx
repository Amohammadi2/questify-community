import { AnswerRead } from "@/gen"
import { faCheckSquare, faPen, faTrashCan } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { Avatar, Grid, IconButton, Typography } from "@mui/material"

interface AnswerProps extends AnswerRead {
  opMode?: boolean;
  authorMode?: boolean;
}

export default function Answer({ htmlContent, author, id, created, updated, accepted, opMode=false, authorMode=false } : AnswerProps) {
  return (
    <Grid container direction="column" sx={{ boxShadow: 1, borderRadius: 3, py: 2, px: 2.5, mt: 2 }}>
      <Grid container direction="row" alignItems={'center'} sx={{ mb: 2 }}>
        <Avatar alt={author.username} />
        <Typography sx={{ flexGrow: 1, ml: 1 }}>{author.username}</Typography>
      </Grid>
      <Grid container direction="row" alignItems='center'>
        {opMode && <Grid item sx={{ mr: 2 }}>
          <FontAwesomeIcon
            icon={faCheckSquare}
            style={{
              color: accepted ? 'green' : 'rgb(220,220,220)'
            }}
          />
        </Grid>}
        <Grid item>
          <div dangerouslySetInnerHTML={{ __html: htmlContent }} style={{ fontFamily: 'Harmattan' }} />
        </Grid>
      </Grid>
      {authorMode && <Grid container direction="row" sx={{ borderTop: '1px solid rgb(230,230,230)', mt: 2, pt: 1.5 }}>
        <IconButton sx={{ mr: .5 }}>
          <FontAwesomeIcon
            icon={faTrashCan}
            style={{ fontSize: 16 }}
          />
        </IconButton>
        <IconButton sx={{ mr: .5 }}>
          <FontAwesomeIcon
            icon={faPen}
            style={{ fontSize: 16 }}
          />
        </IconButton>
      </Grid>}
    </Grid>
  )
}