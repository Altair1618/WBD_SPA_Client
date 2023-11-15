import { getToken, isAuthenticated } from "@/lib/auth";
import { UserTypes } from "@/lib/userTypes";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

interface ProtectedRouteProps {
  role: UserTypes;
  children: JSX.Element;
};

export function ProtectedRoute(props: ProtectedRouteProps) {
  const navigate = useNavigate();
  const token = getToken();

  const auth = async () => {
    if (!isAuthenticated()) {
      navigate("/login");
      return;
    }
  
    try {
      const response = await fetch(`${import.meta.env.VITE_REST_SERVICE}/self`, {
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
      if (data['user']['tipe'] !== props.role) {
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
    auth();
  }, []);

  return props.children;
}