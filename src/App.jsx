import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import SignIn from "./pages/auth/SignIn";
import SignUp from "./pages/auth/SignUp";
import Welcome from "./pages/welcome";
import { useDispatch } from "react-redux";
import ProtectedRoute from "./components/ProtectedRoute";
import { ROLES } from "./constants/app.constants";
import Home from "./pages/passenger/Home/index.jsx";
import AdminHome from "./pages/admin/Home/index.jsx";
import DriverHome from "./pages/driver/Home/index.jsx";

import PassengerLayout from "./layouts/PassengerLayout/index.jsx";
import AdminLayout from "./layouts/AdminLayout/index.jsx";
import VehicleType from "./pages/admin/VehicleType/index.jsx";
import { vehicleTypeListThunk } from "./store/thunks/vehicleTypeThunks.js";
import Booking from "./pages/passenger/Booking/index.jsx";
import useAuth from "./hooks/useAuth.jsx";
import { useEffect } from "react";
import DriverLayout from "./layouts/DriverLayout/index.jsx";
import PickBooking from "./pages/driver/PickBooking/index.jsx";

function App() {
  const { PASSENGER, ADMIN, DRIVER } = ROLES;
  const dispatch = useDispatch();
  const { isAuthenticated } = useAuth();

  useEffect(() => {
    if (isAuthenticated) {
      dispatch(vehicleTypeListThunk());
    }
  }, [isAuthenticated]);

  return (
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
          <Route path="booking" element={<Booking />} />
        </Route>

        {/* Driver Routes */}
        <Route
          path="/driver"
          element={
            <ProtectedRoute role={DRIVER}>
              <DriverLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<DriverHome />} />
          <Route path="pick-booking" element={<PickBooking />} />
        </Route>

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
  );
}

export default App;
