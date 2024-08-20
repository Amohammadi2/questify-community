import { QuestionRead } from "@/gen";
import { atom } from "recoil";

export const $questionsList = atom<QuestionRead[]>({
  key: 'questions-list',
  default: [],
})

export const $questionsPage = atom<number>({
  key: 'questions-page',
  default: 1,
})

export const $questionsHasNext = atom<boolean>({
  key: 'questions-has-next',
  default: true
})