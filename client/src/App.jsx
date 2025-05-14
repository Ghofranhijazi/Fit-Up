import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";
import {
  Home,
  Register,
  Login,
  Logout,
  Payment,
  UserProfile,
  GymProfile,
  NurseryProfile,
  // Profile,
  About,
  Contact,
  JoinUs,
  Navbar,
  Footer,
  GymListingPage,
  GymIndoorNurseryListingPage,
  NurseryListingPage,
  GymIndoorNurseryDetailsPage,
  NurseryDetailsPage,
  GymDetailsPage,
  PlansPage,
  GymRegistrationForm,
  NurseryRegistrationForm,
  BookingPage,
} from "../src/components";

import AdminLayout from "./components/AdminDash/AdminLayout";
import Dashboard from "./components/AdminDash/Dashboard";
import UsersPage from "./components/AdminDash/UsersPage";
import BookingsPage from "./components/AdminDash/BookingsPage";
import ReviewsPage from "./components/AdminDash/ReviewsPage";
import Analytics from "./components/AdminDash/Analytics";
import JoinRequests from "./components/AdminDash/JoinRequests";


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
    },
    {
      path: "/Payment",
      element: (
        <>
          <Navbar />
          <Payment />
          <Footer />
        </>
      ),
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
    },
    // {
    //   path: "/Profile",
    //   element: (
    //     <>
    //       <Navbar />
    //       <Profile />
    //       <Footer />
    //     </>
    //   ),
    // },
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
    },
    {
      path: "/JoinUs",
      element: (
        <>
          <Navbar />
          <JoinUs />
          <Footer />
        </>
      ),
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
    },
    {
      path: "/GymIndoorNurseryListingPage",
      element: (
        <>
          <Navbar />
          <GymIndoorNurseryListingPage />
          <Footer />
        </>
      ),
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
    },
    {
      path: "/GymIndoorNurseryDetailsPage",
      element: (
        <>
          <Navbar />
          <GymIndoorNurseryDetailsPage />
          <Footer />
        </>
      ),
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
    },
    {
      path: "/logout",
      element: <Logout />,
    },
    {
      path: "/login",
      element: <Login />,
    },
    {
      path: "/register",
      element: <Register />
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
      ],
    },
  ]);

  return <RouterProvider router={router} />;
}

export default App;


