import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";
import {
  Home,
  Register,
  Login,
  Logout,
  AdminDash,
  Payment,
  Profile,
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
  BookingPage,
} from "../src/components";

import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setUser } from "./Redux/userSlice"; // ✅ تأكد من المسار



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
      path: "/Profile",
      element: (
        <>
          <Navbar />
          <Profile />
          <Footer />
        </>
      ),
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
      path: "/NurseryDetailsPage",
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
      path: "/PlansPage",
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
      path: "/Booking/:id",
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
      element: <Register />,
    },
    {
      path: "/AdminDash/*",
      element: <AdminDash />,
    },
  ]);

  return <RouterProvider router={router} />;
}

export default App;


