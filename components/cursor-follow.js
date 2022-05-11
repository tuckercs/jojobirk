import React, { useState, useCallback, useEffect } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import cx from 'classnames'

import { InPortal } from '@lib/helpers'

const CursorFollow = ({
  isActive = true,
  hasButton = false,
  cursorContent,
  children,
  className,
  ...rest
}) => {
  const [isVisible, setIsVisible] = useState(false)
  const [coords, setCoords] = useState({ x: null, y: null })

  const onClick = useCallback(
    ({ target }) => {
      const bounds = target.getBoundingClientRect()
      setCoords({
        x: isVisible ? null : bounds.x + bounds.width / 2,
        y: isVisible ? null : bounds.y + bounds.height / 2,
      })
    },
    [isVisible, isActive]
  )
  const onMouseEnter = useCallback(() => setIsVisible(isActive), [isActive])
  const onMouseLeave = useCallback(() => setIsVisible(false), [])
  const onMouseMove = useCallback(({ clientX, clientY }) => {
    setCoords({ x: clientX, y: clientY })
  }, [])

  useEffect(() => {
    if (!isVisible) {
      setCoords({ x: null, y: null })
    }
  }, [isVisible])

  useEffect(() => {
    setIsVisible(isActive)
  }, [isActive])

  return (
    <>
      {hasButton ? (
        <motion.button
          onHoverStart={onMouseEnter}
          onHoverEnd={onMouseLeave}
          onMouseMove={onMouseMove}
          onClick={onClick}
          className={cx(className, { 'is-hovering': isVisible })}
          {...rest}
        >
          {children}
        </motion.button>
      ) : (
        <motion.div
          onHoverStart={onMouseEnter}
          onHoverEnd={onMouseLeave}
          onMouseMove={onMouseMove}
          onClick={onClick}
          className={cx(className, { 'is-hovering': isVisible })}
          {...rest}
        >
          {children}
        </motion.div>
      )}

      <InPortal id="tooltip">
        <AnimatePresence exitBeforeEnter>
          {isVisible && coords.x !== null && (
            <motion.div
              initial={{ x: coords.x, y: coords.y, opacity: 0, scale: 0.8 }}
              animate={{
                x: coords.x,
                y: coords.y,
                opacity: 1,
                scale: 1,
              }}
              exit={{
                opacity: 0,
                scale: 1.1,
              }}
              transition={{
                duration: 0.6,
                ease: [0.19, 1.0, 0.22, 1.0],
                opacity: {
                  duration: 0.3,
                },
                scale: {
                  duration: 0.3,
                },
              }}
              className="cursor"
            >
              <div className="cursor--content">{cursorContent}</div>
            </motion.div>
          )}
        </AnimatePresence>
      </InPortal>
    </>
  )
}

export default CursorFollow
