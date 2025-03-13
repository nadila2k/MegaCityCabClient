import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import SignIn from "./pages/auth/SignIn";
import SignUp from "./pages/auth/SignUp";
import Welcome from "./pages/welcome";
import { Provider } from "react-redux";
import { store } from "./store/store";
import ProtectedRoute from "./components/ProtectedRoute";
import { ROLES } from "./constants/app.constants";
import PassengerLayout from "./layouts/PassengerLayout.jsx";
import Home from "./pages/passenger/Home/index.jsx";

function App() {
  const { PASSENGER } = ROLES;

  return (
    <Provider store={store}>
      <Router>
        <Routes>
          {/* Auth Routes */}
          <Route path="/sign-in" element={<SignIn />} />
          <Route path="/sign-up" element={<SignUp />} />

          {/* Passenger Routes */}
          <Route
            path="/passenger"
            element={
              <ProtectedRoute role={PASSENGER}>
                <PassengerLayout />
              </ProtectedRoute>
            }
          >
            <Route index element={<Home />} />
          </Route>

          {/* Driver Routes */}

          {/* Admin Routes */}

          {/* Comman Routes */}
          <Route path="/" element={<Welcome />} />
        </Routes>
      </Router>
    </Provider>
  );
}

export default App;
