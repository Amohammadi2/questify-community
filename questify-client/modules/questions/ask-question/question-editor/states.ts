import { atom } from 'recoil';

// These states connect the navbar content with the ask question page component.
// They provide a way to communicate the state back and forth

export const isPublishModalOpenAtom = atom<boolean>({
  key: 'ask-question/is-publish-modal-open',
  default: false
})

export const canBePublishedAtom = atom<boolean>({
  key: 'ask-question/question-can-be-published',
  default: false
})
