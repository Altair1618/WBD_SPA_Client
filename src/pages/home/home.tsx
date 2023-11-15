import { isAuthenticated } from "@/lib/auth";
import { UserTypes } from "@/lib/userTypes";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export function Home() {
  const navigate = useNavigate();

  const handler = async () => {
    if (!isAuthenticated()) {
      navigate('/login');
      return;
    }

    let user;
    try {
      const url = `${import.meta.env.VITE_REST_SERVICE}/self`;

      await fetch(url, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
        .then((res) => res.json())
        .then((res) => {
          if (res.status === "success") {
            user = res.data;
          } else {
            navigate('/login');
            return;
          }
        }
      );

      if (!user) {
        navigate('/login');
        return;
      }
    } catch (error) {
      console.log(error);
      navigate('/login');
      return;
    }

    if (user['user']['tipe'] === UserTypes.admin) {
      navigate('/subscriptions');
    } else if (user['user']['tipe'] === UserTypes.pengajar) {
      navigate('/courses');
    } else {
      navigate('/login');
    }
  }

  useEffect(() => {
    handler();
  }, []);

  return (
    <></>
  );
}