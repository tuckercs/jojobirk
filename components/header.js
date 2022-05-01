import React, { useRef, useEffect, useState } from 'react'
import Link from 'next/link'
import cx from 'classnames'
import { useRect } from '@reach/rect'

import { useSiteContext, useToggleMenu } from '@lib/context'
import { isBrowser } from '@lib/helpers'

import Icon from './icon'

const Header = ({ site, page, fixed, onSetup = () => {} }) => {
  const { isMenuOpen } = useSiteContext()
  const [headerHeight, setHeaderHeight] = useState(null)
  const [showNav, setShowNav] = useState(true)
  const toggleMenu = useToggleMenu()
  const headerRef = useRef()
  const headerRect = useRect(headerRef)

  useEffect(() => {
    if (headerRect) {
      setHeaderHeight(headerRect.height)
    }
  }, [headerRect])

  useEffect(() => {
    onSetup({ height: headerHeight })
  }, [headerHeight, onSetup])

  const handleScroll = () => {
    const screenHeight = window?.innerHeight
    const currentScroll = window?.scrollY
    setShowNav(currentScroll > screenHeight)
  }

  useEffect(() => {
    if (isBrowser) {
      window.addEventListener('scroll', handleScroll)
    }

    return () => {
      if (isBrowser) {
        window.removeEventListener('scroll', handleScroll)
      }
    }
  })

  return (
    <>
      <a href="#content" className="skip-link">
        Skip to Content
      </a>
      <section id="header" ref={headerRef} className={cx('', {})}>
        {/* DESKTOP */}
        <div className={cx('hidden sm:flex')}>
          <Link href={`/`} scroll={false}>
            <a className="" aria-label="Go Home">
              <div className="w-100">
                <Icon viewBox="0 0 79 30" color="#0000ff" name="Logo" />
              </div>
            </a>
          </Link>
        </div>

        {/* MOBILE */}
        <div className="flex justify-between items-center sm:hidden">
          <Link href={`/`} scroll={false}>
            <a aria-label="Go Home">
              <div className="w-75">
                <Icon viewBox="0 0 79 30" color="#0000ff" name="Logo" />
              </div>
            </a>
          </Link>
          <div className="w-40" onClick={() => toggleMenu(!isMenuOpen)}>
            <Icon viewBox="0 0 23 14" color="#0000ff" name="Hamburger" />
          </div>
        </div>
      </section>
    </>
  )
}

export default Header
