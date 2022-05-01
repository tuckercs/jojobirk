import React, { useState, useEffect, useRef } from 'react'
import Router from 'next/router'
import ReactDOM from 'react-dom'
import { imageBuilder } from '@lib/sanity'

// use a Portal for overlays
export function InPortal({ id, children }) {
  const [hasMounted, setHasMounted] = useState(false)

  useEffect(() => {
    setHasMounted(true)
  }, [])

  if (!hasMounted) return null

  return ReactDOM.createPortal(children, document.querySelector(`#${id}`))
}

// conditionally wrap a component with another
export const ConditionalWrapper = ({ condition, wrapper, children }) => {
  return condition ? wrapper(children) : children
}

// Truncate text
export function truncate(str, num) {
  return str.split(' ').splice(0, num).join(' ')
}

// wrap incremental
export function wrap(index, length) {
  if (index < 0) {
    index = length + (index % length)
  }
  if (index >= length) {
    return index % length
  }
  return index
}

/*  ------------------------------ */
/*  Client helpers
/*  ------------------------------ */

export const isBrowser = typeof window !== 'undefined'

export function isMobileSafari() {
  if (!isBrowser) return

  return navigator.userAgent.match(/(iPod|iPhone|iPad)/) &&
    navigator.userAgent.match(/AppleWebKit/)
    ? true
    : false
}

export function useWindowSize() {
  function getSize() {
    return {
      width: isBrowser ? window.innerWidth : 0,
      height: isBrowser ? window.innerHeight : 0,
    }
  }

  const [windowSize, setWindowSize] = useState(getSize)

  useEffect(() => {
    if (!isBrowser) return

    function handleResize() {
      setWindowSize(getSize())
    }

    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, []) // Empty array ensures that effect is only run on mount and unmount

  return windowSize
}

// restore previous scroll position after page change
export function useScrollRestoration(router, delay) {
  const restorePosition = useRef({})

  const saveScrollPosition = (url, pos) => {
    restorePosition.current = {
      ...restorePosition.current,
      [url]: pos,
    }
  }

  const updateScrollPosition = (url, restore, shouldRestore) => {
    const position = restore.current[url]

    // if we have a saved position and it's a history change, restore position, otherwise set to 0
    setTimeout(() => {
      requestAnimationFrame(() => {
        window.scrollTo({ top: position && shouldRestore ? position : 0 })
      })
    }, delay + 100)
  }

  useEffect(() => {
    let shouldScrollRestore = false
    window.history.scrollRestoration = 'manual'

    const onBeforeUnload = (event) => {
      saveScrollPosition(router.asPath, window.scrollY)
      delete event['returnValue']
    }

    const onRouteChangeStart = () => {
      saveScrollPosition(router.asPath, window.scrollY)
    }

    const onRouteChangeComplete = (url, { shallow }) => {
      // Bail if we're just changing URL parameters
      if (shallow) return

      updateScrollPosition(url, restorePosition, shouldScrollRestore)

      // reset if we should restore the scroll position
      shouldScrollRestore = false
    }

    // save scroll position on route change
    window.addEventListener('beforeunload', onBeforeUnload)
    Router.events.on('routeChangeStart', onRouteChangeStart)

    // restore scroll position after route change completes
    Router.events.on('routeChangeComplete', onRouteChangeComplete)

    // if it's a history change, set to restore scroll position to "true"
    Router.beforePopState((state) => {
      shouldScrollRestore = true
      state.options.scroll = false
      return true
    })

    return () => {
      window.removeEventListener('beforeunload', onBeforeUnload)
      Router.events.off('routeChangeStart', onRouteChangeStart)
      Router.events.off('routeChangeComplete', onRouteChangeComplete)
      Router.beforePopState(() => true)
    }
  }, [])
}

/*  ------------------------------ */
/*  Image helpers
/*  ------------------------------ */

export function buildSrc(image, { width, height, format, quality }) {
  let imgSrc = imageBuilder.image(image)

  if (width) {
    imgSrc = imgSrc.width(Math.round(width))
  }

  if (height) {
    imgSrc = imgSrc.height(Math.round(height))
  }

  if (format) {
    imgSrc = imgSrc.format(format)
  }

  if (quality) {
    imgSrc = imgSrc.quality(quality)
  }

  return imgSrc.fit('max').auto('format').url()
}

export function buildSrcSet(image, { srcSizes, aspect, format, quality }) {
  const sizes = srcSizes.map((width) => {
    let imgSrc = buildSrc(image, {
      ...{ width },
      height: aspect && Math.round(width * aspect) / 100,
      ...{ format },
      ...{ quality },
    })

    if (format) {
      imgSrc = imgSrc.format(format)
    }

    return `${imgSrc} ${width}w`
  })

  return sizes.join(',')
}
