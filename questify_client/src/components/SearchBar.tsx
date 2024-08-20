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

const $currentlySearchedParams = atom({
  key: 'currently-searched-params',
  default: {
    tags: [] as string[],
    searchTerm: null as null|string
  }
})


export interface ISearchBarProps {
  onSearch: (searchTerm: string|null, tags: string[]) => void
}

export function SearchBar({ onSearch } : ISearchBarProps) {
  
  const [searchTerm, setSearchTerm] = useRecoilState($searchTerm)
  const [tags, setTags] = useRecoilState($tags)
  const [currentlySearchedParams, setCurrentlySearchedParams] = useRecoilState($currentlySearchedParams)

  useEffect(() => {
    // Note: we convert tags array to string to compare them, this method is also
    // sensitive to the ordering of tags which means if the order of tags changes it
    // will trigger a search request to the server but considering the fact that
    // our UI does not support reordering of tags and there's no point for a user to
    // try to do that eaither, there's no reason to worry about it XD
    if (searchTerm != currentlySearchedParams.searchTerm || tags.toString() != currentlySearchedParams.tags.toString()) {
      console.log("onSearch is triggered")
      onSearch(searchTerm, tags)
      setCurrentlySearchedParams({
        searchTerm, tags
      })
    }
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