import React, { useState } from 'react'
import NextImage from 'next/image'
import cx from 'classnames'

import { buildSrc } from '@lib/helpers'

const Image = ({
  alt,
  src,
  width,
  height,
  layout = 'responsive',
  objectFit = 'cover',
  lazyBoundary = '0px',
  quality = 90,
  ...props
}) => {
  // state of our image load (used for animation purposes)
  const [isLoaded, setIsLoaded] = useState(false)

  if (!src) return null

  // warn if there's no alt text provided
  if (!alt && !src?.alt) console.warn('Image missing alt text: ', src)

  const isStatic = typeof src === 'string' ? true : false

  // calculate our image aspect ratio
  const imgAspectRatio =
    typeof width === 'number' && typeof height === 'number'
      ? (height / width) * 100
      : !isStatic
      ? 100 / (src?.customRatio || src?.aspectRatio)
      : null

  // calculate our image dimensions (if not "fill" layout)
  const imgWidth = layout !== 'fill' ? width ?? 2000 : null
  const imgHeight =
    layout !== 'fill'
      ? height ?? imgAspectRatio
        ? Math.round(imgWidth * imgAspectRatio) / 100
        : null
      : null

  // build our image URL
  const imgUrl = isStatic
    ? src
    : buildSrc(src, { width: imgWidth, height: imgHeight, quality })

  // calculate our image alt text
  const imgAlt = alt ?? src?.alt

  // define our loader to use
  const loader = !isStatic
    ? {
        loader: ({ width }) => {
          return (
            buildSrc(src, {
              width,
              height: Math.round(width * imgAspectRatio) / 100,
              quality,
            }) + `&width=${width}`
          )
        },
      }
    : {}

  return (
    <div
      className={cx('block transition-opacity duration-200 ease-linear', {
        'opacity-0': !isLoaded,
      })}
    >
      <NextImage
        alt={imgAlt}
        src={imgUrl}
        width={imgWidth}
        height={imgHeight}
        layout={layout}
        objectFit={objectFit}
        lazyBoundary={lazyBoundary}
        onLoadingComplete={() => setIsLoaded(true)}
        {...loader}
        {...props}
      />
    </div>
  )
}

export default Image
