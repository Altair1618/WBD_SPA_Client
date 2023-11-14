import { getToken, isAuthenticated } from "@/lib/auth";
import { UserTypes } from "@/lib/userTypes";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

interface PrivateRouteProps {
  role: UserTypes;
  children: JSX.Element;
};

export function PrivateRoute(props: PrivateRouteProps) {
  const navigate = useNavigate();
  
  if (!isAuthenticated()) {
    navigate("/login");
    return;
  }

  const token = getToken();

  const fetchData = async () => {
    try {
      const response = await fetch(`${process.env.REST_SERVICE}/self`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      let data = await response.json();

      if (data['status'] === 'error') {
        navigate("/login");
        return;
      }

      data = data['data'];
      if (data['role'] !== props.role) {
        navigate("/login");
        return;
      }
    } catch (error) {
      console.log(error);
      navigate("/login");
      return;
    }
  }

  useEffect(() => {
    fetchData();
  }, []);

  return props.children;
}