import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import SignupPage from "./pages/SignupPage";
import PopularMovies from "./pages/PopularMovies";
import LoginPage from "./pages/LoginPage";
import MyList from "./pages/MyList";
import "./App.css";
import { UserContextProvider } from "./contexts/UserContext";

function App() {
  return (
    <UserContextProvider>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/popular-movies" element={<PopularMovies />} />
        <Route path="/my-list" element={<MyList />} />
      </Routes>
    </UserContextProvider>
  );
}

export default App;
