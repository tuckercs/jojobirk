import React from 'react'
import { Article } from 'phosphor-react'

import customPortableText from '../../lib/custom-portable-text'

export default {
  title: 'Block Text',
  name: 'blockText',
  type: 'object',
  icon: () => <Article weight="duotone" />,
  fields: [
    customPortableText({
      title: 'content',
      name: 'content'
    })
  ],
  preview: {
    select: {
      content: 'content.0.children'
    },
    prepare({ content }) {
      console.log(content)
      return {
        title: 'Block Text',
        subtitle: content.length ? content[0].text : 'No content'
      }
    }
  }
}
