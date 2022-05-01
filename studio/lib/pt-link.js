import { Button } from '@components/block-renders'

export default {
  title: 'Link',
  name: 'link',
  type: 'object',
  blockEditor: {
    render: Button,
  },
  fields: [
    {
      title: 'Link Type',
      name: 'type',
      type: 'string',
      options: {
        list: [
          { title: 'Internal Page', value: 'internal' },
          { title: 'External URL', value: 'external' },
        ],
      },
      initialValue: 'internal',
      validation: (Rule) => Rule.required(),
    },
    {
      title: 'Page',
      name: 'page',
      type: 'reference',
      to: [{ type: 'page' }],
      options: {
        disableNew: true,
      },
      hidden: ({ parent }) => parent.type !== 'internal',
    },
    {
      title: 'URL',
      name: 'url',
      type: 'url',
      validation: (Rule) =>
        Rule.uri({
          scheme: ['http', 'https', 'mailto', 'tel'],
        }),
      hidden: ({ parent }) => parent.type !== 'external',
    },
    {
      title: 'Style as Button?',
      name: 'isButton',
      type: 'boolean',
      initialValue: false,
    },
    {
      name: 'styles',
      type: 'object',
      fields: [
        {
          title: 'Button Style',
          name: 'style',
          type: 'string',
          options: {
            list: [
              { title: 'Default', value: 'btn' },
              { title: 'Primary', value: 'btn is-primary' },
              { title: 'Text', value: 'btn is-text' },
            ],
            layout: 'radio',
          },
        },
      ],
      hidden: ({ parent }) => !parent.isButton,
    },
  ],
}
