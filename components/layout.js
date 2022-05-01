import React, { useState, useEffect } from 'react'
import { m } from 'framer-motion'

import { isBrowser, isMobileSafari, useWindowSize } from '@lib/helpers'
import { pageTransitionSpeed } from '@lib/animate'

import HeadSEO from '@components/head-seo'
import Header from '@components/header'
import Menu from '@components/menu'

const variants = {
  initial: {
    opacity: 0,
  },
  enter: {
    opacity: 1,
    transition: {
      duration: pageTransitionSpeed / 1000,
      delay: 0.2,
      ease: 'linear',
      when: 'beforeChildren',
    },
  },
  exit: {
    opacity: 0,
    transition: {
      duration: pageTransitionSpeed / 1000,
      ease: 'linear',
      when: 'beforeChildren',
    },
  },
}

const Layout = ({ site = {}, page = {}, children }) => {
  // set window height var (w/ safari/iOS hack)
  const { height: windowHeight } = useWindowSize()
  const [lockHeight, setLockHeight] = useState(false)
  const hasChin = isMobileSafari()

  // set header height
  const [headerHeight, setHeaderHeight] = useState(null)

  useEffect(() => {
    if (isBrowser) {
      document.body.style.setProperty('--dvh', `${windowHeight * 0.01}px`)

      if (!lockHeight || !hasChin) {
        document.body.style.setProperty('--vh', `${windowHeight * 0.01}px`)
        setLockHeight(hasChin)
      }
    }
  }, [windowHeight, hasChin, lockHeight])

  return (
    <>
      <HeadSEO site={site} page={page} />
      <m.div
        key={page._id}
        initial="hide"
        animate="show"
        exit="hide"
        variants={variants}
        style={headerHeight ? { '--headerHeight': `${headerHeight}px` } : null}
      >
        <Menu />
        <Header />
        <main id="content">{children}</main>
      </m.div>
    </>
  )
}

export default Layout
