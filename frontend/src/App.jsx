import { Navigate, Route, Routes, useLocation } from "react-router-dom"
import HomePage from "./pages/HomePage"
import SignUpPage from "./pages/SignUpPage"
import LogInPage from "./pages/LogInPage"
import VerifyEmail from "./pages/VerifyEmail"
import { Toaster } from "react-hot-toast"
import { useAuthStore } from "./stateManagment/authStore"
import { useEffect } from "react"
import Sidebar from "./Sidebar/Sidebar"
import { useState } from "react"
import { AiOutlineLoading3Quarters } from "react-icons/ai"
import { useSidebarStore } from "./Sidebar/useSidebarStore"
import LogOutNotifier from "./Sidebar/LogOutNotifier"
import ResetPassword from "./pages/ResetPassword"
import ForgotPassword from "./pages/ForgotPassword"
import Profile from "./pages/Profile"
import AccountSettingsPage from "./pages/AccountSettingsPage"
import AdminPage from "./pages/AdminPage"
import MessagingPage from "./pages/MessagingPage"

//route protection sanam logined ar arian manamde ro ver miwvdenen home pagebs da egetebs

const ProtectAdmingPage = ({children}) => {
  const {isAuthenticated, isCheckingAuth, user} = useAuthStore()
  const location = useLocation()

  if(isCheckingAuth){
    return (
      <div className="min-h-screen flex items-center text-3xl justify-center bg-[#212121] text-sky-400">
        <AiOutlineLoading3Quarters className="animate-spin mx-auto" />
      </div>
    )
  }

  if (!isAuthenticated) {
		if (location.pathname === "/signup") {
			return <Navigate to="/signup" replace />
		}
    else if(location.pathname === "/forgot-password"){
      return <Navigate to={"/forgot-password"} replace />
    }
    else if(location.pathname === "/reset-password/:token"){
      return <Navigate  to={"/reset-password/:token"} replace/>
    }
		return <Navigate to="/login" replace />;
	}

  if(!user.isAdmin){
    return <Navigate to={"/"} replace />
  }

  return children
}

const ProtectRoute = ({ children }) => {
	const { isAuthenticated, isCheckingAuth } = useAuthStore();
	const location = useLocation();

  if(isCheckingAuth){
    return (
      <div className="min-h-screen flex items-center text-3xl justify-center bg-[#212121] text-sky-400">
        <AiOutlineLoading3Quarters className="animate-spin mx-auto" />
      </div>
    )
  }

	if (!isAuthenticated) {
		if (location.pathname === "/signup") {
			return <Navigate to="/signup" replace />
		}
    else if(location.pathname === "/forgot-password"){
      return <Navigate to={"/forgot-password"} replace />
    }
    else if(location.pathname === "/reset-password/:token"){
      return <Navigate  to={"/reset-password/:token"} replace/>
    }
		return <Navigate to="/login" replace />;
	}

	
	return children;
};

//gadamisamarteba tu ukve acauntze shesulebi arian da mainc /login /signup ze gadavlian avtomatural home pageze miarwobs
const RedirectAuthenticatedUser = ({children}) => {
  const {isAuthenticated, user, isCheckingAuth} = useAuthStore()

  if(isCheckingAuth){
    return (
      <div className="min-h-screen flex items-center text-3xl justify-center bg-[#212121] text-sky-400">
        <AiOutlineLoading3Quarters className="animate-spin mx-auto" />
      </div>
    )
  }

  if(isAuthenticated && user?.isVerified){
    return <Navigate to={"/"} replace />
  }

  return children
}

function App() {
  const location = useLocation();
  const { checkAuth, isAuthenticated } = useAuthStore();

  const [showSidebar, setShowSidebar] = useState(false);

  useEffect(() => {
    const hideOnPaths = ["/verify-email", "/signup", "/login"];
    setShowSidebar(isAuthenticated && !hideOnPaths.includes(location.pathname));
  }, [location.pathname, isAuthenticated]); 

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  const [open, setOpen] = useState(
    typeof window !== "undefined" && window.innerWidth >= 768
  );

  useEffect(() => {
    let resizeTimer;
    const handleResize = () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(() => {
        setOpen(window.innerWidth >= 768);
      }, 150);
    };
    window.addEventListener("resize", handleResize);
    return () => {
      clearTimeout(resizeTimer);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const{isOpen} = useSidebarStore()

  return (
    <div className="min-h-screen bg-[#212121] overflow-y-auto overflow-x-hidden">
      {showSidebar && <Sidebar open={open} setOpen={setOpen} />
      }

      <Routes>
        <Route
          path="/"
          element={
            <ProtectRoute>
              <HomePage open={open} />
            </ProtectRoute>
          }
        ></Route>

          <Route path="/messages" element={
            <ProtectRoute>
              <MessagingPage open={open} />
            </ProtectRoute>
          }></Route>
        <Route path="/control-panel" element={
          <ProtectAdmingPage>
            <AdminPage open={open} />
          </ProtectAdmingPage>
        }>
        </Route>

        <Route path="/account/:id" element={
          <ProtectRoute>
            <Profile open={open} />
          </ProtectRoute>
        }>
        </Route>

        <Route
          path="/signup"
          element={
            <RedirectAuthenticatedUser>
              <SignUpPage />
            </RedirectAuthenticatedUser>
          }
        ></Route>

        <Route
          path="/login"
          element={
            <RedirectAuthenticatedUser>
              <LogInPage />
            </RedirectAuthenticatedUser>
          }
        ></Route>

        <Route
          path="/account-settings"
          element={
            <ProtectRoute>
              <AccountSettingsPage open={open} />
            </ProtectRoute>
          }
        ></Route>

        <Route
          path="/verify-email"
          element={
            <RedirectAuthenticatedUser>
              <VerifyEmail />
            </RedirectAuthenticatedUser>
          }
        />

        <Route path="/forgot-password" element={<RedirectAuthenticatedUser>
          <ForgotPassword />
        </RedirectAuthenticatedUser>}></Route>

        <Route path="/reset-password/:token" element={<RedirectAuthenticatedUser>
          <ResetPassword />
        </RedirectAuthenticatedUser>}>
        </Route>

        <Route path="*" element={<Navigate to="/" replace />} />

      </Routes>
      {
          isOpen && <LogOutNotifier />
      }

      <Toaster />
    </div>
  );
}

export default App
