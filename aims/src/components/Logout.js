import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Logout = ({ setUserType }) => {
  const navigate = useNavigate();

  useEffect(() => {
    setUserType("guest");
    navigate("/login");
  }, [setUserType, navigate]);

  return null;
};

export default Logout;