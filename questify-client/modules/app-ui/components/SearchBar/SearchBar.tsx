import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Input } from "@nextui-org/react";
import IconButton from "../IconButton";

interface ISearchBar {
  onSearch: (searchTerm: string) => void;
}

export default function SearchBar({ onSearch } : ISearchBar) {
  return (
    <Input
      css={{ my: '$5' }}
      type="search"
      bordered
      placeholder="جست‌وجو"
      contentRight={<IconButton><FontAwesomeIcon icon={faSearch} style={{color:'gray'}} /></IconButton>}
      onKeyDown={(e)=>{
        if (e.key == "Enter")
        onSearch(e.currentTarget.value);
      }}
      onBlur={(e)=>{
        onSearch(e.currentTarget.value);
      }}
    />
  )
}