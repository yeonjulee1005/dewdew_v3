import { nodeInputRule, mergeAttributes } from '@tiptap/vue-3'
import { Image } from '@tiptap/extension-image'

declare module '@tiptap/core' {
  interface Commands<ReturnType> {
    media: {
      setImage: (options: {
        src?: string;
        alt?: string;
        title?: string;
        width?: string;
        float?: string;
        centered?: string;
        href?: string;
        video?: string;
      }) => ReturnType;
    };
  }
}

const IMAGE_INPUT_REGEX = /!\[(.+|:?)\]\((\S+)(?:(?:\s+)["'](\S+)["'])?\)/

export const useTiptapImage = () => {
  const BaseCustomMediaNode = Image.extend({
    draggable: true,
    name: 'media',
    addAttributes () {
      return {
        ...this.parent?.(),
        float: {
          default: null,
          parseHTML: (element) => {
            element.getAttribute('float')
          },
          renderHTML: (attributes) => {
            return {
              float: attributes.float,
              style: `float: ${attributes.float}`
            }
          }
        },
        video: {
          default: 'false',
          parseHTML: (element) => {
            element.getAttribute('video')
          },
          renderHTML: (attributes) => {
            return {
              video: attributes.video
            }
          }
        },
        href: {
          default: undefined,
          parseHTML: (element) => {
            element.getAttribute('href')
          },
          renderHTML: (attributes) => {
            return {
              href: attributes.href
            }
          }
        }
      }
    },
    parseHTML () {
      return [
        {
          tag: 'div',
          getAttrs (dom) {
            if (typeof dom === 'string') { return {} }
            const wrapperElement = dom as HTMLElement

            let imageElement:
            | HTMLImageElement
            | HTMLVideoElement
            | null = wrapperElement.querySelector('img')
            if (!imageElement) {
              imageElement = wrapperElement.querySelector('video')
            }
            const titleElement = wrapperElement.querySelector('div')
            const linkElement = wrapperElement.querySelector('a')
            const href = linkElement?.getAttribute('href')
            const float = imageElement?.getAttribute('float')
            const alt = imageElement ? imageElement.getAttribute('alt') : null
            const src = imageElement ? imageElement.getAttribute('src') : null
            const title = titleElement ? titleElement.textContent : null
            return { alt, src, title, href, float }
          }
        },
        { tag: 'img[src]' }
      ]
    },
    renderHTML ({ HTMLAttributes }) {
      return [
        'div',
        [
          HTMLAttributes.href ? 'a' : 'div',
          {
            href: HTMLAttributes.href,
            target: '_blank',
            rel: 'noopener noreferrer nofollow'
          },
          HTMLAttributes.video === 'true'
            ? [
              'video',
              mergeAttributes(this.options.HTMLAttributes, HTMLAttributes, {
                controls: true
              })
            ]
            : [
              'img',
              mergeAttributes(this.options.HTMLAttributes, HTMLAttributes)
            ]
        ]
      ]
    },
    addInputRules () {
      return [
        nodeInputRule({
          find: IMAGE_INPUT_REGEX,
          type: this.type,
          getAttributes: (match) => {
            const [alt, src, title] = match
            return {
              src,
              alt,
              title
            }
          }
        })
      ]
    },
    addCommands () {
      return {
        setImage: options => ({ commands }) => {
          // src가 포함 되지 않았을 경우, 기존에 존재하는 컨텐츠를 표시
          if (!options.src) {
            return commands.updateAttributes('media', options)
          }
          // 아닐 경우, 새 컨텐츠를 추가
          return commands.insertContent({
            type: this.type.name,
            attrs: options
          })
        }
      }
    }
  }).configure({
    inline: true,
    HTMLAttributes: {
      class: 'editor-media'
    }
  })

  return { BaseCustomMediaNode }
}
