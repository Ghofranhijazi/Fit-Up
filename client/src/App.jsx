import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";
import {
  Home,
  Register,
  Login,
  Logout,
  UserProfile,
  GymProfile,
  NurseryProfile,
  About,
  Contact,
  Navbar,
  Footer,
  GymListingPage,
  NurseryListingPage,
  NurseryDetailsPage,
  GymDetailsPage,
  PlansPage,
  GymRegistrationForm,
  NurseryRegistrationForm,
  BookingPage,
} from "../src/components";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ErrorPage from './components/ErrorPage'; 
import { Helmet } from 'react-helmet';


import AdminLayout from "./components/AdminDash/AdminLayout";
import Dashboard from "./components/AdminDash/Dashboard";
import UsersPage from "./components/AdminDash/UsersPage";
import BookingsPage from "./components/AdminDash/BookingsPage";
import ReviewsPage from "./components/AdminDash/ReviewsPage";
import Analytics from "./components/AdminDash/Analytics";
import JoinRequests from "./components/AdminDash/JoinRequests";
import ContactMessages from "./components/AdminDash/ContactMessages";

import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setUser } from "./Redux/userSlice"; 



function App() {
  const dispatch = useDispatch();

   // ✅ استرجاع بيانات المستخدم من localStorage عند أول تحميل للتطبيق
   useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      const userData = JSON.parse(storedUser);
      dispatch(setUser(userData));
    }
  }, []);

  const router = createBrowserRouter([
    {
      path: "/",
      element: (
        <>
          <Navbar /> 
          <Home />
          <Footer /> 
        </>
      ),
        errorElement: <ErrorPage />
    },
    {
      path: "/UserProfile",
      element: (
        <>
          <Navbar />
          <UserProfile />
          <Footer />
        </>
      ),
        errorElement: <ErrorPage />
    },
    {
      path: "/GymProfile",
      element: (
        <>
          <Navbar />
          <GymProfile />
          <Footer />
        </>
      ),
        errorElement: <ErrorPage />
    },
    {
      path: "/NurseryProfile",
      element: (
        <>
          <Navbar />
          <NurseryProfile />
          <Footer />
        </>
      ),
        errorElement: <ErrorPage />
    },

    {
      path: "/About",
      element: (
        <>
          <Navbar />
          <About />
          <Footer />
        </>
      ),
    },
    {
      path: "/Contact",
      element: (
        <>
          <Navbar />
          <Contact />
          <Footer />
        </>
      ),
        errorElement: <ErrorPage />
    },

    {
      path: "/GymListingPage",
      element: (
        <>
          <Navbar />
          <GymListingPage />
          <Footer />
        </>
      ),
        errorElement: <ErrorPage />
    },
    {
      path: "/NurseryListingPage",
      element: (
        <>
          <Navbar />
          <NurseryListingPage />
          <Footer />
        </>
      ),
        errorElement: <ErrorPage />
    },
    {
      path: "/NurseryDetailsPage/:id",
      element: (
        <>
          <Navbar />
          <NurseryDetailsPage />
          <Footer />
        </>
      ),
        errorElement: <ErrorPage />
    },
    {
      path: "/gym-details/:id",
      element: (
        <>
          <Navbar />
          <GymDetailsPage/>
          <Footer />
        </>
      ),
        errorElement: <ErrorPage />
    },
    {
      path: "/choose-plan",
      element: (
        <>
          <Navbar />
          <PlansPage/>
          <Footer />
        </>
      ),
        errorElement: <ErrorPage />
    },
    {
      path: "/GymRegistrationForm",
      element: (
        <>
          <Navbar />
          <GymRegistrationForm/>
          <Footer />
        </>
      ),
        errorElement: <ErrorPage />
    },
    {
      path: "/NurseryRegistrationForm",
      element: (
        <>
          <Navbar />
          <NurseryRegistrationForm/>
          <Footer />
        </>
      ),
        errorElement: <ErrorPage />
    },
    {
      path: "/Booking/:type/:id",
      element: (
        <>
          <Navbar />
          <BookingPage/>
          <Footer />
        </>
      ),
        errorElement: <ErrorPage />
    },
    {
      path: "/logout",
      element: <Logout />,
        errorElement: <ErrorPage />
    },
    {
      path: "/login",
      element: <Login />,
        errorElement: <ErrorPage />
    },
    {
      path: "/register",
      element: <Register />,
        errorElement: <ErrorPage />
    },
    {
      path: "/admin",
      element: <AdminLayout />,
      children: [
        { index: true, element: <Dashboard /> },
        { path: "users", element: <UsersPage /> },
        { path: "bookings", element: <BookingsPage /> },
        { path: "reviews", element: <ReviewsPage /> },
        { path: "analytics", element: <Analytics /> },
        { path: "JoinRequests", element: <JoinRequests /> },
        { path: "contact-messages", element: <ContactMessages /> },
      ],
        errorElement: <ErrorPage />
    },
  ]);

  return  <>

  <Helmet>
<title>Gym & Nursery Platform</title>
<meta name="description" content="A platform for easily booking gyms and nurseries online." />
<meta name="keywords" content="Gym clubs, nurseries, booking, subscription, sports, children" />
<meta name="author" content="Gym & Nursery Team" />
<meta property="og:title" content="Gym & Nursery Platform" />
<meta property="og:description" content="A smart platform that combines gym and nursery services in one place." />
</Helmet>

      <RouterProvider router={router} />
      <ToastContainer position="top-right" autoClose={3000} hideProgressBar={false} newestOnTop={false} closeOnClick pauseOnFocusLoss draggable pauseOnHover />
    </>
}

export default App;


