import React, { useState, useEffect, createContext } from 'react'
import Axios from 'axios'
import { BASE_URL } from '../environment'

export const AppStateContext = createContext()

const AppStateContextProvider = props => {
  const [state, setState] = useState({
    users: []
  })
  const customStateSetter = newState =>
    setState(ps => ({
      ...ps,
      ...newState
    }))
  const initiallizeAppstate = async () => {
    const token = localStorage.getItem('token')
    if(token) {
      customStateSetter({
        isAuthenticated: true,
        token,
        userDetails: JSON.parse(localStorage.getItem('userDetails'))
      })
    }
  }
  useEffect(() => {
    initiallizeAppstate()
  }, [state.token])
  return (
    <AppStateContext.Provider
      value={{
        state,
        setState: customStateSetter,
      }}
    >
      {props.children}
    </AppStateContext.Provider>
  )
}

export default AppStateContextProvider
