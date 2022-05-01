import React from 'react'
import { Image } from 'phosphor-react'

import customImage from '../../lib/custom-image'

export default {
  title: 'Divider Image',
  name: 'dividerImage',
  type: 'object',
  icon: () => <Image weight="duotone" />,
  fields: [customImage()],
  preview: {
    select: {
      photo: 'photo'
    },
    prepare({ photo }) {
      return {
        title: 'Divider Image',
        media: photo
      }
    }
  }
}
