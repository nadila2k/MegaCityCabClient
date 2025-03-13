import { useSelector } from "react-redux";

const useAuth = () => {
  const { isAuthenticated, user } = useSelector((state) => state.auth);

  return {
    isAuthenticated,
    role: user?.roles || "",
    user: user || null,
  };
};

export default useAuth;
