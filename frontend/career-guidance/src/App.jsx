import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "./pages/careerpages/Login";
import Register from "./pages/careerpages/Register";
import Dashboard from "./pages/careerpages/Dashboard";
import InterestForm from "./pages/careerpages/InterestForm";
import PersonalityTest from "./pages/careerpages/PersonalityTest";
import CareerForm from "./pages/careerpages/CareerForm";
import CareerResult from "./pages/careerpages/CareerResult";
import AdminAuth from "./pages/Adminpages/AdminAuth";

import StudentProtectedRoute from "./auth/ProtectedRoute";
import AdminProtectedRoute from "./auth/AdminProtectedRoute";

import Layout from "./Authlayout/layout";
import AdminDashboard from "./pages/Adminpages/AdminDashboard";
import StudentsProfile from "./pages/Adminpages/StudentsProfile";
import StudentsFeedback from "./pages/Adminpages/StudentsFeedback";
import {AdminProvider} from "./context/AdminContext";
import Studentlayout from "./Authlayout/Studentlayout";
import AdminHelpPage from "./pages/Adminpages/AdminHelpPage";
const App = () => {
  return (
    <>
    <BrowserRouter>
      <AdminProvider>
        <Routes>
                 {/* 🔐 AUTH LAYOUT */}
        <Route element={<Studentlayout />}>

          <Route path="/" element={<Login />} />
z
          <Route path="/register" element={<Register />} />
          <Route path="/admin" element={<AdminAuth />} />

        </Route>

          {/* 🔓 PUBLIC ROUTES */}

          {/* 🔐 STUDENT PROTECTED ROUTES */}
          <Route
            path="/dashboard"
            element={
              <StudentProtectedRoute>
                <Dashboard />
              </StudentProtectedRoute>
            }
            />

          <Route
            path="/interest"
            element={
              <StudentProtectedRoute>
                <InterestForm />
              </StudentProtectedRoute>
            }
            />

          <Route
            path="/personality-test"
            element={
              <StudentProtectedRoute>
                <PersonalityTest />
              </StudentProtectedRoute>
            }
            />

          <Route
            path="/career-form"
            element={
              <StudentProtectedRoute>
                <CareerForm />
              </StudentProtectedRoute>
            }
            />

          <Route
            path="/career-result"
            element={
              <StudentProtectedRoute>
                <CareerResult />
              </StudentProtectedRoute>
            }
            />

          {/* 🔐 ADMIN PROTECTED ROUTES */}
          <Route
            path="/admin/layout"
            element={
              <AdminProtectedRoute>
                <Layout />
              </AdminProtectedRoute>
            }
            >
            <Route index element={<AdminDashboard />} />
            <Route path="students" element={<StudentsProfile />} />
            <Route path="feedback" element={<StudentsFeedback />} />
            <Route path="helppage" element={<AdminHelpPage/>}/>
          </Route>
        </Routes>
      </AdminProvider>
    </BrowserRouter>
            </>
  );
};

export default App;
