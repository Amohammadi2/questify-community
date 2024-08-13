import { isEnterKeyPressed } from "@/utils/is-enter-key-pressed"
import { Grid, Chip, InputBase} from "@mui/material"
import { useCallback } from "react"

export interface TagInputProps {
  tags: string[]
  setTags: (tags: string[]) => void
}

export function TagInput({tags, setTags} : TagInputProps) {

  const addTag = useCallback((e: React.KeyboardEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const tag = e.currentTarget.value
    if (isEnterKeyPressed(e) && tag != "" && !tags.includes(tag)) {
      setTags([...tags, e.currentTarget.value])
      e.currentTarget.value = ""
    }
  }, [tags])

  const removeTag = useCallback((tag: string) => {
    setTags(tags.filter(t => t!==tag))
  }, [tags])

  return (
    <Grid container direction="row">
        {tags.map(t => <Chip label={t} key={t} onDelete={()=>{removeTag(t)}} sx={{ mx: .5, my: .7 }}/>)}
        <InputBase placeholder="تگ های مورد نظر را وارد کنید" sx={{ flexGrow: 1, ml: 2 }} onKeyDown={addTag}/>
    </Grid>
  )
}