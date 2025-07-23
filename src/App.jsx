import "./App.css";
import { TodoProvider } from "./context/TodoContext";
import { UserProvider } from "./context/userContext";
import ToDo from "./Todo/ToDo";
import LoginForm from "./components/LoginForm";
import RegisterForm from "./components/RegisterForm";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useEffect, useState } from "react";
import { useUser } from "./hooks/useUser";
import { useDispatch, useSelector } from "react-redux";
import { login, logout } from "./redux/AuthSlice";

function AppContent(){
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();

  const user = useUser();

  const userData = useSelector((state)=> state.auth.userData)
  useEffect(() => {
    user
      .getLoggedInUser()
      .then((userData) => {
        if (userData) {
          dispatch(login({ userData }));
        } else {
          dispatch(logout());
        }
      })
      .finally(() => setLoading(false));
  }, []);

  if(loading) {
    return <div>Loading...</div>
  }

  return (
    <Routes>
            <Route path="/" element={<ToDo />} />
            <Route path="/login" element={<LoginForm />} />
            <Route path="/register" element={<RegisterForm />} />
          </Routes>
  )
}
function App() {
  
  return (
    <Router>
      <UserProvider>
        <TodoProvider>
          <AppContent />
        </TodoProvider>
      </UserProvider>
      <ToastContainer />
    </Router>
  );
}

export default App;
