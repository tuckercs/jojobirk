import React from 'react'
import { Browser } from 'phosphor-react'

import customPortableText from '../../lib/custom-portable-text'
import customImage from '../../lib/custom-image'

export default {
  title: 'Page',
  name: 'page',
  type: 'document',
  icon: () => <Browser weight="duotone" />,
  groups: [
    { title: 'Content', name: 'content', default: true },
    { title: 'Settings', name: 'settings' }
  ],
  fields: [
    {
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: Rule => Rule.required(),
      group: 'settings'
    },
    {
      title: 'URL Slug',
      name: 'slug',
      type: 'slug',
      description: '(required)',
      options: {
        source: 'title',
        maxLength: 96
      },
      validation: Rule => Rule.required(),
      group: 'settings'
    },
    customPortableText({
      title: 'content',
      name: 'content',
      group: 'content'
    }),
    customImage({
      title: 'portrait',
      name: 'portrait',
      group: 'content'
    }),
    {
      title: 'SEO / Share Settings',
      name: 'seo',
      type: 'seo',
      group: 'settings'
    }
  ],
  preview: {
    select: {
      title: 'title',
      slug: 'slug'
    },
    prepare({ title = 'Untitled', slug = {} }) {
      const path = `/${slug.current}`
      return {
        title,
        subtitle: slug.current ? path : '(missing slug)'
      }
    }
  }
}
