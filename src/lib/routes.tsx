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
import { Home } from "@/pages/home/home";
import { ProtectedRoute } from "@/components/route/protectedRoute";
import { UserTypes } from "./userTypes";

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Home />,
  },
  {
    // TODO: Delete This Route if Project is Done
    path: '/test',
    element: <Test />,
  },
  {
    path: '/login',
    element: <Login />,
  },
  {
    path: '/register',
    element: <Register />,
  },
  {
    // TODO: Halaman List Subscription Request bagi User (Admin Only)
    path: '/subscriptions',
    element: (
      <ProtectedRoute role={UserTypes.admin}>
        <Subscriptions />
      </ProtectedRoute>
    ),
  },
  {
    // TODO: Halaman List Register Approval Request bagi Pengajar (Admin Only)
    path: '/approvals',
    element: (
      <ProtectedRoute role={UserTypes.admin}>
        <Approvals />
      </ProtectedRoute>
    ),
  },
  {
    // TODO: Halaman List Course Premium yang dibuat dan Tombol Create, Edit, Delete (Pengajar Only)
    path: '/courses',
    element: (
      <ProtectedRoute role={UserTypes.pengajar}>
        <Courses />
      </ProtectedRoute>
    ),
  },
  {
    // TODO: Halaman List Enrolled Student dan Tombol Beri Sertifikat (Pengajar Only) 
    path: '/courses/:id',
    element: (
      <ProtectedRoute role={UserTypes.pengajar}>
        <Course />
      </ProtectedRoute>
    ),
  },
  {
    // TODO: Halaman Form Create Course (Pengajar Only)
    path: '/courses/create',
    element: (
      <ProtectedRoute role={UserTypes.pengajar}>
        <CreateCourse />
      </ProtectedRoute>
    ),
  },
  {
    // TODO: Halaman Form Edit Course (Pengajar Only)
    path: '/courses/:id/edit',
    element: (
      <ProtectedRoute role={UserTypes.pengajar}>
        <EditCourse />
      </ProtectedRoute>
    ),
  }
]);
