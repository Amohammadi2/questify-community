// derieved from source:
// :ref: https://github.com/ueberdosis/tiptap/blob/main/packages/extension-text-align/src/text-align.ts

import { Extension } from '@tiptap/core'

export interface TextDirectionOptions {
  types: string[],
  directions: string[],
  defaultDirection: string,
}

declare module '@tiptap/core' {
  interface Commands<ReturnType> {
    textDirection: {
      /**
       * Set the text direction attributes
       */
      setTextDirection: (direction: string) => ReturnType
    }
  }
}

export const TextDirection = Extension.create<TextDirectionOptions>({
  name: 'textDirection',

  addOptions() {
    return {
      types: [
        'paragraph',
        'heading'
      ],
      directions: ['ltr', 'rtl'],
      defaultDirection: 'rtl',
    }
  },

  addGlobalAttributes() {
    return [
      {
        types: this.options.types,
        attributes: {
          textDirection: {
            default: this.options.defaultDirection,
            parseHTML: element => element.style.direction || this.options.defaultDirection,
            renderHTML: attributes => {
              if (attributes.textDirection === this.options.defaultDirection) {
                return {}
              }

              return { style: `direction: ${attributes.textDirection}` }
            },
          },
        },
      },
    ]
  },

  addCommands() {
    return {
      setTextDirection: (direction: string) => ({ commands }) => {
        if (!this.options.directions.includes(direction)) {
          return false
        }
        console.log("text direction", direction);
        return this.options.types.every(type => commands.updateAttributes(type, { textDirection: direction }))
      },
    }
  },

  // Review: we'll decide on keyboard shortcuts later
  // addKeyboardShortcuts() {
  //   return {
  //     'Mod-Shift-l': () => this.editor.commands.setTextDirection('ltr'),
  //     'Mod-Shift-r': () => this.editor.commands.setTextDirection('rtl')
  //   }
  // },
})