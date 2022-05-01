import React, { createContext, useContext, useState } from 'react'

const initialContext = {
  isMenuOpen: false,
}

// Set context
const SiteContext = createContext({
  context: initialContext,
  setContext: () => null,
})

const SiteContextProvider = ({ children }) => {
  const [context, setContext] = useState({
    ...initialContext,
  })

  return (
    <SiteContext.Provider
      value={{
        context,
        setContext,
      }}
    >
      {children}
    </SiteContext.Provider>
  )
}

// Access our global store states
function useSiteContext() {
  const { context } = useContext(SiteContext)
  return context
}

function useToggleMenu() {
  const {
    context: { isMenuOpen },
    setContext,
  } = useContext(SiteContext)

  async function toggleMenu() {
    setContext((prevState) => {
      return { ...prevState, isMenuOpen: !isMenuOpen }
    })
  }
  return toggleMenu
}

export { SiteContextProvider, useSiteContext, useToggleMenu }
