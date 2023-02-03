import ListView from "modules/app-ui/components/ListView";
import useInvitationList from "../graphql/useInvitationList";
import { IInvitationData } from "../interfaces/invitation-data.interface";
import Invitation from "./Invitation";
import CreateInvitationModal from "./CreateInvitationModal";

export default function InvitationList() {
  const { data, error, loading }  = useInvitationList();

  return (
    <>
    <CreateInvitationModal />
    <ListView
      <IInvitationData[]>
      data={data}
      error={error}
      loading={loading}
      title="لیست کد های دعوت"
    >
      {(data) => data.map(d => {
        return <Invitation {...d} />
      })}
    </ListView>
    </>
  )
}