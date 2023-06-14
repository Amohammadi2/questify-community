import { useState } from "react"
import { ApiResponse } from "../utils/ApiResponse";

interface ApiCallSettings <Response> {
  before?: () => void
  then?: (res: Response) => void
  catch?: (err: any) => void
  finally?: () => void
}

export function useApi
  <CallbackType extends ()=>Promise<any>>
  (apiCallback: CallbackType, settings: ApiCallSettings<ApiResponse<CallbackType>> = {}) {
  const [loading, setLoading] = useState(false)
  const [response, setResponse] = useState<ApiResponse<CallbackType>|null>(null)
  const [error, setError] = useState<any>(null)

  return [
    () => {
      setLoading(true)
      settings.before && settings.before()
      apiCallback()
        .then(res => { settings.then && settings.then(res); setResponse(res) })
        .catch(err => { settings.catch && settings.catch(err); setError(err) })
        .finally(() => { settings.finally && settings.finally(); setLoading(false) })
    },
    {
      loading,
      response,
      error
    }
  ] as const
}