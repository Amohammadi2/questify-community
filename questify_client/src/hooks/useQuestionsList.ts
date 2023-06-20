import { $questionsApi } from "@/apis"
import { useCallback, useEffect, useState } from "react"
import { useRecoilState, useRecoilValue } from "recoil"
import { useApi } from "./useApi"
import { $questionsList, $questionsPage } from "@/store/questions.store"
import { QuestionRead } from "@/gen"
import { uniqify } from "../utils/uniqify"

export function useQuestionsList() {
  const questionsApi = useRecoilValue($questionsApi)
  const [page, setPage] = useRecoilState($questionsPage)
  const [questions,setQuestions] = useRecoilState($questionsList)

  const apiCallback = useCallback(() => {
    return questionsApi.questionsList({
      limit: 15,
      offset: 15 * (page - 1)
    })
  }, [page])

  const [fetchQuestions, { response, loading, error }] = useApi(apiCallback)

  // fetcher
  useEffect(() => {
    fetchQuestions()
  }, [page])

  // response tracker
  useEffect(() => {
    if (response?.results) {
      const combinedList = [...questions, ...response.results]
      // remove duplicate results from the array
      const mergedList = uniqify(combinedList, 'id')
      console.log('Merged the list')
      setQuestions(mergedList)
    }
  }, [response])

  const hasMore = Boolean(response?.next)

  const loadMore = () => {
    setPage(p => p+1)
  }

  return {
    page,
    questions,
    hasMore,
    loadMore,
    error,
    loading
  }
}