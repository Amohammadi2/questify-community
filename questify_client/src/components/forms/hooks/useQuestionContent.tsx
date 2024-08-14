import { $questionsApi } from "@/apis"
import { CacheManager } from "@/apollo/cache-manager"
import { useRichTextEditor } from "@/hooks/useRichTextEditor"
import { $userProfile } from "@/store/user-profile.store"
import { useCallback, useEffect, useState } from "react"
import { useRecoilValue } from "recoil"


export function useQuestionContent(qid: string|null) {

  // author info
  const userProfile = useRecoilValue($userProfile)

  // apis
  const questionsApi = useRecoilValue($questionsApi)

  // question data
  const [contentLoading, setContentLoading] = useState(false)
  const editor = useRichTextEditor({ placholder: "سوال خود را بپرسید..." })
  const [title, setTitle] = useState('')
  const [tags, setTags] = useState<string[]>([])

  // load questions content if we are editing an already existing question
  const populateQuestionContent = useCallback(() => {
    if (qid === null) return
    setContentLoading(true)
    questionsApi.questionsRetrieve({
      id: Number.parseInt(qid || '-1')
    })
    .catch(e => console.error(e))
    .then(res => {
      if (res) {
        setTitle(res.title)
        setTags(res.tags)
        console.log(editor)
        console.log("result: ",editor?.commands.setContent(res.htmlContent))
      }
    })
    .finally(() => setContentLoading(false))
  }, [qid, editor])

  useEffect(() => {
    populateQuestionContent()
  }, [qid, editor])


  const publishable = Boolean(
    !editor?.isEmpty &&
    Boolean(title) &&
    Boolean(tags.length)
  )


  // action functions
  const updateQuestion = useCallback(() => {
    return questionsApi.questionsUpdate({
      id: Number.parseInt(qid || '-1'),
      questionWriteRequest: {
        title,
        htmlContent: editor?.getHTML() || '',
        tags
      }
    })
    .then(res => {
      CacheManager.updateQuestion(res.id, { title, tags, content: editor?.getHTML() || '' })
    })
  }, [questionsApi, qid, title, tags, editor])

  const createQuestion = useCallback(() => {
    return questionsApi.questionsCreate({
      questionWriteRequest: {
        title,
        htmlContent: editor?.getHTML() || '',
        tags
      }
    })
    .then(res => {
      CacheManager.addQuestion(userProfile, res.id, { 
        content: editor?.getHTML() || '',
        title,
        tags
      })
    })
  }, [questionsApi, title, tags, editor])

  // create a new question or update an existing one
  const publishChanges = useCallback(() => {
    if (qid) {
      return updateQuestion()
    }
    else {
      return createQuestion()
    }
  }, [updateQuestion, createQuestion, qid])


  const clearForm = useCallback(() => {
    editor?.chain().clearContent().run()
    setTitle('')
    setTags([])
  }, [editor])


  return {
    loading: contentLoading,
    editor,
    titleState: [title, setTitle] as const,
    tagsState: [tags, setTags] as const,
    publishable,
    publishChanges,
    clearForm
  }

}