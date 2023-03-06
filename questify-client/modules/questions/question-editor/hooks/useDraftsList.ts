import { useMockAPI } from "@utils/mock/useMockAPI";
import { useEffect } from "react";
import { IDraftItem } from "../interfaces/IDraftItem";

export function useDraftsList() {
  const [fetchData, stats] = useMockAPI<void, IDraftItem[]>({
    delay: 500,
    handler: () => {
      const sample: IDraftItem = {
        id: 'some-fake-id'+ new Date().toISOString(),
        lastEditDate: new Date(),
        numberOfWords: 132 + Math.floor(Math.random() * 30),
        previewText: 'یک نمونه از پیش نویس'
      }
      return new Array(15).fill(sample);
    }
  })

  useEffect(() => {
    fetchData();
  }, [])

  return stats;
}