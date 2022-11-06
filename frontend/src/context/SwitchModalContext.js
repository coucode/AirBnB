import { createContext, useState } from 'react';

export const SwitchModalContext = createContext()

export const SwitchModalContextProvider = props => {
  const [liContext, setLiContext] = useState(null)
  const [suContext, setSuContext] = useState(null)


  const vals = {
    liContext, setLiContext, suContext, setSuContext
  }

  return (
    <SwitchModalContext.Provider value={{ ...vals }}>
      {props.children}
    </SwitchModalContext.Provider>
  )
}