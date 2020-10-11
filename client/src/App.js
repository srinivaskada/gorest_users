import React, { useContext } from 'react'
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom'
import './App.css'
import Dashboard from './Components/Dashboard'
import { AppStateContext } from './Contexts/AppStateContext'

import 'bootstrap/dist/css/bootstrap.min.css'


const App = () => {
  const { state:  { isAuthenticated } } = useContext(AppStateContext)
  return (
    <>
      <div className='App'>
        <Router>
          <Switch>
            <Route
              exact
              path="/"
              render={() => <Redirect to='/dashboard' />}
            />
            <Route path='/dashboard' component={Dashboard} />
          </Switch>
        </Router>
      </div>
    </>
  )
}

export default App
