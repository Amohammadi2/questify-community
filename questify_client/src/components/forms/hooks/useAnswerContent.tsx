import { $answersApi, $questionsApi } from "@/apis"
import { CacheManager } from "@/apollo/cache-manager"
import { useRichTextEditor } from "@/hooks/useRichTextEditor"
import { $userProfile } from "@/store/user-profile.store"
import { useCallback, useEffect, useState } from "react"
import { useRecoilValue } from "recoil"


export function useAnswerContent(qid: string|null, aid: string|null) {

  // author info
  const userProfile = useRecoilValue($userProfile)

  // apis
  const answersApi = useRecoilValue($answersApi)

  // question data
  const [contentLoading, setContentLoading] = useState(false)
  const editor = useRichTextEditor({ placholder: "پاسخ خود را بنویسید..." })

  // load questions content if we are editing an already existing question
  const populateAnswerContent = useCallback(() => {
    if (aid === null) return
    setContentLoading(true)
    answersApi.answersRetrieve({
      id: Number.parseInt(aid || '-1')
    })
    .catch(e => console.error(e))
    .then(res => {
      if (res) {
        editor?.commands.setContent(res.htmlContent)
      }
    })
    .finally(() => setContentLoading(false))
  }, [qid, aid, editor])

  useEffect(() => {
    populateAnswerContent()
  }, [qid, aid, editor])


  const publishable = !editor?.isEmpty

  // action functions
  const updateAnswer = useCallback(() => {
    return answersApi.answersUpdate({
      id: Number.parseInt(aid || '-1'),
      answerWriteRequest: {
        htmlContent: editor?.getHTML() || '',
      }
    })
    .then(res => {
      CacheManager.updateAnswer(res.id, editor?.getHTML()||'')
    })
  }, [answersApi, aid, editor])

  const createAnswer = useCallback(() => {
    return answersApi.answersCreate({
      answerWriteRequest: {
        htmlContent: editor?.getHTML() || '',
        question: Number.parseInt(qid || '-1')
      }
    })
    .then(res => {
      CacheManager.addAnswer(userProfile, res.id, Number.parseInt(qid||'-1'), editor?.getHTML() || '')
    })
  }, [answersApi, editor, qid])

  // create a new answer or update an existing one
  const publishChanges = useCallback(() => {
    if (aid) {
      return updateAnswer()
    }
    else {
      return createAnswer()
    }
  }, [updateAnswer, createAnswer, aid])


  const clearForm = useCallback(() => {
    editor?.chain().clearContent().run()
  }, [editor])


  return {
    loading: contentLoading,
    editor,
    publishable,
    publishChanges,
    clearForm
  }

}