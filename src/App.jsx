import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import SignIn from "./pages/auth/SignIn";
import SignUp from "./pages/auth/SignUp";
import Welcome from "./pages/welcome";
import { Provider } from "react-redux";
import { persistor, store } from "./store/store";
import ProtectedRoute from "./components/ProtectedRoute";
import { ROLES } from "./constants/app.constants";
import Home from "./pages/passenger/Home/index.jsx";
import AdminHome from "./pages/admin/Home/index.jsx";
import { PersistGate } from "redux-persist/integration/react";
import PassengerLayout from "./layouts/PassengerLayout/index.jsx";
import AdminLayout from "./layouts/AdminLayout/index.jsx";
import VehicleType from "./pages/admin/VehicleType/index.jsx";

function App() {
  const { PASSENGER, ADMIN } = ROLES;

  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
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
            <Route
              path="/admin"
              element={
                <ProtectedRoute role={ADMIN}>
                  <AdminLayout />
                </ProtectedRoute>
              }
            >
              <Route index element={<AdminHome />} />
              <Route path="vehicle-type" element={<VehicleType />} />
            </Route>

            {/* Comman Routes */}
            <Route path="/" element={<Welcome />} />
          </Routes>
        </Router>
      </PersistGate>
    </Provider>
  );
}

export default App;
