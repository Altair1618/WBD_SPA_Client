import { createBrowserRouter } from "react-router-dom";

import { Approvals } from "@/pages/approvals/approvals";
import { Courses } from "@/pages/courses/courses";
import { CreateCourse } from "@/pages/courses/createCourse";
import { Course } from "@/pages/courses/id/course";
import { EditCourse } from "@/pages/courses/id/editCourse";
import { Login } from "@/pages/login/login";
import { Register } from "@/pages/register/register";
import { Subscriptions } from "@/pages/subscriptions/subscriptions";
import { Test } from "@/pages/test/test";

export const router = createBrowserRouter([
  {
    // TODO: Delete This Route if Project is Done
    path: '/test',
    element: <Test />,
  },
  {
    // TODO: Halaman Login
    path: '/login',
    element: <Login />,
  },
  {
    // TODO: Halaman Register
    path: '/register',
    element: <Register />,
  },
  {
    // TODO: Halaman List Subscription Request bagi User (Admin Only)
    path: '/subscriptions',
    element: <Subscriptions />,
  },
  {
    // TODO: Halaman List Register Approval Request bagi Pengajar (Admin Only)
    path: '/approvals',
    element: <Approvals />,
  },
  {
    // TODO: Halaman List Course Premium yang dibuat dan Tombol Create, Edit, Delete (Pengajar Only)
    path: '/courses',
    element: <Courses />,
  },
  {
    // TODO: Halaman List Enrolled Student dan Tombol Beri Sertifikat (Pengajar Only) 
    path: '/courses/:id',
    element: <Course />,
  },
  {
    // TODO: Halaman Form Create Course (Pengajar Only)
    path: '/courses/create',
    element: <CreateCourse />,
  },
  {
    // TODO: Halaman Form Edit Course (Pengajar Only)
    path: '/courses/:id/edit',
    element: <EditCourse />,
  }
]);
