import { useEditor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Placeholder from '@tiptap/extension-placeholder';
import Underline from '@tiptap/extension-underline';
import Image from '@tiptap/extension-image';
import Link from '@tiptap/extension-link';
import { TextDirection } from '@/plugins/tiptap-text-direction';

interface IEditorSettings {
  placholder?: string;
}

export function useRichTextEditor({ placholder } : IEditorSettings = {}) {
  return useEditor({
    extensions: [
      StarterKit.configure({
        heading: {
          levels: [4]
        }
      }),
      Placeholder.configure({
        placeholder: placholder || 'سوال خود را وارد کنید...'
      }),
      Link.configure({
        linkOnPaste: true
      }),
      Underline,
      TextDirection,
      Image.configure({
        inline: true
      })
    ]
  });
}