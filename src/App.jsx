import {  BrowserRouter as Router } from "react-router-dom"
import RoutesApp from "./routes/RoutesApp"
import { InsuranceProvider } from "./context/InsuranceContext"

function App() {

  return (
    <InsuranceProvider>
      <Router>
        <RoutesApp />
      </Router>
    </InsuranceProvider>
  )
}

export default App
