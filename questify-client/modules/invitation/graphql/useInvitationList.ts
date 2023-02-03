import { useMockAPI } from "@utils/mock/useMockAPI";
import { useEffect } from "react";
import { IInvitationData } from "../interfaces/invitation-data.interface";

export default function useInvitationList() {
  const [fetchList, stats] = useMockAPI<void, IInvitationData[]>({
    delay: 1000,
    handler: () => {
      return new Array<IInvitationData>(30).fill({
        destination: 'مدرسه ملاصدرا',
        expirationDate: new Date(),
        title: 'ورود دانش آموزان مدرسه ملاصدرا'
      })
    }
  })
  useEffect(()=>{ fetchList() }, [])
  return stats;
}