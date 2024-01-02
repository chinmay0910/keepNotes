import { useState } from 'react'
import {
  BrowserRouter as Router,
  Route,
  Link,
  Routes
} from "react-router-dom";
import NoteState from './context/NoteState'

import './App.css'
import { NavigationBar, Home } from './components';
import { Signin } from './components/Signin';
import { Signup } from './components/Signup';
import Alert from './components/Alerts';

function App() {
  const [alert, setAlert] = useState(null);

  const showAlert = (message, type)=>{
    setAlert({
      msg: message,
      type: type
    })
    setTimeout(() => {
        setAlert(null);
    }, 1500);
}

  return (
    
    <>
      <NoteState>
        <Router>
          <NavigationBar />
          <Alert alert={alert}/>
          <Routes>
            <Route exact path='/' element={<Home showAlert={showAlert}/>} />
            <Route exact path='/about' element={<>Hello About</>} />
            <Route exact path='/signin' element={<Signin showAlert={showAlert}/>} />
            <Route exact path='/signup' element={<Signup showAlert={showAlert}/>} />

          </Routes>
        </Router>
      </NoteState>
    </>
  )
}

export default App
