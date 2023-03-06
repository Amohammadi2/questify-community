import { useEffect } from 'react';
import { useMockAPI } from "@utils/mock/useMockAPI";
import { LinkMaker } from "modules/link-maker";
import { INotification } from "../interfaces/INotification";

export function useNotifications() {
  const [ fetchData, stats ] = useMockAPI<void, INotification[]>({
    delay: 800,
    handler: () => {
      return [
        {
          id: 'r35cc',
          img: '/imgs/snow-fall.jpg',
          message: 'فرهاد علیمی به سوال شما پاسخی داد',
          action: {
            type: 'redirect',
            redirectUrl: LinkMaker.questionDetails('some-fake-id')
          }
        },
        {
          id: 'sfe',
          img: '/imgs/snow-fall.jpg',
          message: 'نصرت حاجی پور زیر سوال شما نظری نوشت',
          action: {
            type: 'redirect',
            redirectUrl: LinkMaker.questionDetails('some-fake-id')
          }
        },
        {
          id: '43543f5',
          message: 'فرهاد علیمی به سوال شما پاسخ داد',
          action: {
            type: 'redirect',
            redirectUrl: LinkMaker.questionDetails('some-fake-id')
          }
        }
      ] as INotification[];
    }
  })

  useEffect(() => {
    fetchData();
  }, [])

  return stats;
}