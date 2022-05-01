import React, { useEffect } from 'react'
import Router from 'next/router'
import Head from 'next/head'
import { LazyMotion, domAnimation, AnimatePresence } from 'framer-motion'

import 'focus-visible'
import '../styles/app.css'

import { isBrowser, useScrollRestoration } from '@lib/helpers'
import { pageTransitionSpeed } from '@lib/animate'
import { SiteContextProvider } from '@lib/context'

// Console Credits
console.log(
  '%c💽 Site Credits \n\n Design: Tucker Schoos \n Development: Tucker Schoos \n\n– https://alright.studio',
  'display:block;font-family:courier;font-size:12px;font-weight:bold;line-height:1;color:black;'
)

const Site = ({ Component, pageProps, router }) => {
  // Handle scroll position on history change
  useScrollRestoration(router, pageTransitionSpeed)

  const { data } = pageProps

  return (
    <LazyMotion features={domAnimation}>
      <SiteContextProvider data={{ ...data?.site }}>
        <AnimatePresence
          exitBeforeEnter
          onExitComplete={() => {
            document.body.classList.remove('overflow-hidden')
          }}
        >
          <Component key={router.asPath.split('?')[0]} {...pageProps} />
        </AnimatePresence>
      </SiteContextProvider>
    </LazyMotion>
  )
}

// Site wrapped with Context Providers
const MyApp = ({ Component, pageProps, router }) => {
  return <Site Component={Component} pageProps={pageProps} router={router} />
}

export default MyApp
