import React from 'react'
import Link from 'next/link'

import { useSiteContext, useToggleMenu } from '@lib/context'

import Drawer from '@components/drawer'
import Icon from '@components/icon'

const Menu = ({ data }) => {
  const { isMenuOpen } = useSiteContext()
  const toggleMenu = useToggleMenu()

  const handleClose = () => {
    toggleMenu(false)
  }

  return (
    <Drawer direction="left" isOpen={isMenuOpen} onClose={handleClose}>
      <section className="grid grid-cols-4">
        {/* MOBILE HEADER */}
        <div className="col-span-full flex justify-between items-center sm:hidden">
          <div className="w-75">
            <Icon viewBox="0 0 79 30" color="#ffef00" name="Logo" />
          </div>
          <div className="w-40" onClick={() => toggleMenu(!isMenuOpen)}>
            <Icon
              viewBox="0 0 23 14"
              color="#ffef00"
              name="Hamburger"
              className="rotate-45"
            />
          </div>
        </div>
      </section>
    </Drawer>
  )
}

export default Menu
