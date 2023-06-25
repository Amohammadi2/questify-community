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
      limit: 20,
      offset: 20 * (page - 1)
    })
  }, [page])

  const [fetchQuestions, { response, loading, error }] = useApi(apiCallback)
  
  const hasMore = Boolean(response?.next)

  useEffect(() => {
    // The purpose of this code is to prevent extra fetches when the component remounts.
    // If we still haven't reached the end of the list and we have fetched the current page,
    // then the number of questions must equal 15 * page.
    // The other possibility is that we have reached the end of the list and we have already
    // fetched the last page which then we can conclude that the number of questions must
    // be greater than the number of questions fetched through the previous pages (if it is not so
    // it means the last page is still remaining)
    if ((hasMore && questions.length == 15 * page) || (!hasMore && questions.length > (15 * (page - 1)))) {
      console.log('- Should not be fetched')
      return
    
    }
    console.log('+ Should be fetched')
    fetchQuestions()
  }, [page, questions])

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


  const loadMore = () => {
    setPage(p => p+1)
  }

  const refresh = () => {
    console.log('refresh triggerd')
    setQuestions([])
    setPage(1)
  }

  return {
    page,
    questions,
    hasMore,
    loadMore,
    error,
    loading,
    refresh
  }
}