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
  GymOnlyPage,
  GymIndoorNurseryPage,
  GymNearbyNurseryPage,
  IndoorService,
  NearbyService,
  OnlyService,
  PlansPage,
  GymRegistrationForm,
  BookingPage,
} from "../src/components";


function App() {
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
      path: "/GymOnlyPage",
      element: (
        <>
          <Navbar />
          <GymOnlyPage />
          <Footer />
        </>
      ),
    },
    {
      path: "/GymIndoorNurseryPage",
      element: (
        <>
          <Navbar />
          <GymIndoorNurseryPage />
          <Footer />
        </>
      ),
    },
    {
      path: "/GymNearbyNurseryPage",
      element: (
        <>
          <Navbar />
          <GymNearbyNurseryPage />
          <Footer />
        </>
      ),
    },
    {
      path: "/IndoorService",
      element: (
        <>
          <Navbar />
          <IndoorService />
          <Footer />
        </>
      ),
    },
    {
      path: "/NearbyService",
      element: (
        <>
          <Navbar />
          <NearbyService />
          <Footer />
        </>
      ),
    },
    {
      path: "/gym-details/:id",
      element: (
        <>
          <Navbar />
          <OnlyService/>
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


