import { faSearch } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { Divider, Grid, IconButton, InputBase, Paper } from "@mui/material"
import { atom, useRecoilState } from "recoil"
import { TagInput } from "./forms/components/TagInput"
import { useEffect } from "react"


const $searchTerm = atom<string|null>({
  key: 'search-term',
  default: null
})

const $tags = atom<string[]>({
  key: 'tags',
  default: []
})


export interface ISearchBarProps {
  onSearch: (searchTerm: string|null, tags: string[]) => void
}

export function SearchBar({ onSearch } : ISearchBarProps) {
  
  const [searchTerm, setSearchTerm] = useRecoilState($searchTerm)
  const [tags, setTags] = useRecoilState($tags)
  
  useEffect(() => {
    onSearch(searchTerm, tags)
  }, [tags])

  return (
    <Grid container direction="column" sx={{ mt: 3}}>
      <Paper
        component="form"
        sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', mb: 2}}
        onSubmit={e=>{
          e.preventDefault()
          onSearch(searchTerm, tags)
        }}
      >
        <IconButton type="submit" sx={{ p: '10px' }} aria-label="search">
          <FontAwesomeIcon icon={faSearch} />
        </IconButton>
        <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
        <InputBase
          sx={{ ml: 1, flex: 1 }}
          placeholder="جستجو در سوالات..."
          inputProps={{ 'aria-label': 'جستجو در سوالات' }}
          value={searchTerm}
          onChange={e=>setSearchTerm(e.currentTarget.value)}
        />
      </Paper>
      <TagInput {...{tags, setTags}} />
      <Divider />
    </Grid>
  )
}