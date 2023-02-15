import { ContentLoader, FlexContainer, SearchBar } from "modules/app-ui";
import { useJoinedCommunitiesList } from "../hooks/useJoinedCommunitiesList";
import CommunityItem from "./CommunityItem";

export default function JoinedCommunitiesList() {

  const { data, error, loading } = useJoinedCommunitiesList();

  return (
    <FlexContainer>
      <SearchBar onSearch={()=>null} />
      <ContentLoader
        data={data}
        loading={loading}
        error={error}
        dir="col"
      >
        {(data) => data.map((d,i) => <CommunityItem key={i} {...d} />)}
      </ContentLoader>
    </FlexContainer>
  )
}