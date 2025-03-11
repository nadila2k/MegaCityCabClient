import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import SignIn from "./pages/auth/SignIn";
import SignUp from "./pages/auth/SignUp";
import Welcome from "./pages/welcome";

function App() {
  return (
    <Router>
      <Routes>
        {/* Auth Routes */}
        <Route path="/sign-in" element={<SignIn />} />
        <Route path="/sign-up" element={<SignUp />} />

        {/* Comman Routes */}
        <Route path="/"  element={<Welcome/>}/>

      </Routes>
    </Router>
  );
}

export default App;
