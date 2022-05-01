import React from 'react'
import BlockContent from '@sanity/block-content-to-react'

import Link from '@components/link'
import Photo from '@components/photo'

export const blockSerializers = {
  types: {
    block: (props) => {
      const { markDefs, style = 'normal' } = props.node

      // check if our block contains a button
      const hasButton =
        markDefs &&
        markDefs.some((c) => c._type === 'link' && c.isButton === true)

      // build our non-standard text styles

      if (style === 'bodyLarge') {
        return (
          <p className={cx('is-body-large', { 'has-btn': hasButton })}>
            {props.children}
          </p>
        )
      }

      if (style === 'bodySmall') {
        return (
          <p className={cx('is-body-small', { 'has-btn': hasButton })}>
            {props.children}
          </p>
        )
      }

      // go through our remaining, true header styles
      if (/^h\d/.test(style)) {
        return React.createElement(
          style,
          { className: hasButton ? 'has-btn' : null },
          props.children
        )
      }

      // handle all other blocks with the default serializer
      return BlockContent.defaultSerializers.types.block(props)
    },
    photo: ({ node }) => {
      return <Photo photo={node} />
    },
    horizontalRule: () => <hr />,
  },
  marks: {
    link: ({ mark, children }) => {
      const { type, page, url } = mark

      const href = {
        external: url,
        internal: page,
      }[type]

      return (
        <Link href={href} external={type === 'external'}>
          {children}
        </Link>
      )
    },
  },
}
