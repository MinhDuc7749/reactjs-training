import React, { useEffect, useState } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import WelcomePage from './pages/WelcomePage/WelcomePage';
import './App.css';
import LoginPage from './pages/LoginPage/LoginPage';
import LanguageContext from './shared/contexts/LanguageContext/LanguageContext';
import ProfilePage from './pages/ProfilePage/ProfilePage';
import PostsPage from "./pages/PostsPage/PostsPage";
import PostDetailPage from "./pages/PostDetailPage/PostDetailPage";
import { useHistory } from "react-router-dom";



const App = () => {
  const history = useHistory();
  const [value, setValue] = useState(10);
  const [language, setLanguage] = useState('en');
  const [token, setToken] = useState(localStorage.getItem('TOKEN'));
  const [userId, setUserId] = useState(localStorage.getItem('USERID'));
  const [isLoggedin, setIsLoggedin] = useState(false);

  useEffect(() => {
    if (token) {
      localStorage.setItem('TOKEN', token);
    } else {
      localStorage.removeItem('TOKEN');
    }
    if (userId) {
      localStorage.setItem('USERID', userId);
    } else {
      localStorage.removeItem('USERID');
    }
  }, [token, userId])
  const handleLogout = () => {
    localStorage.removeItem('TOKEN');
    localStorage.removeItem('USERID');
    setUserId(localStorage.getItem('USERID'));
  };
  console.log('render with language = ', language);
  return (
    <LanguageContext.Provider value={language}>
      <Router>
        <div className="container app-container">
          <nav>
            <ul>
              <li>
                <Link
                  to="/"
                  className="my-link"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  to="/profile"
                  className="my-link"
                >
                  Profile
                </Link>
              </li>
              <li>
                <Link
                  to="/posts"
                  className="my-link"
                >
                  Posts
                </Link>
              </li>
              {!userId &&
                <li>
                  <Link
                    to="/login"
                    className="my-link"
                  >
                    Login
                  </Link>
                </li>}
              {userId &&
                <li>
                  <button
                    onClick={handleLogout}
                    style={{ marginTop: "-2px" }}
                  >Logout
                  </button>
                </li>}
            </ul>
          </nav>

          {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */ }
          <Switch>
            <Route
              path="/"
              exact
            >
              <WelcomePage />
            </Route>
            <Route
              path="/login"
              exact
            >
              <LoginPage
                setToken={setToken}
                setUserId={setUserId}
              />
            </Route>
            <Route
              path="/posts"
              exact
            >
              <PostsPage />
            </Route>
            <Route path="/posts/:id">

              <PostDetailPage />
            </Route>
            <Route
              path="/profile"
              exact
              render={() => {
                if (!userId) {
                  return (
                    <LoginPage
                      setToken={setToken}
                      setUserId={setUserId}
                    />)
                }
                return <ProfilePage />
              }}
            />
          </Switch>
        </div>
      </Router>
    </LanguageContext.Provider>
  );
}

export default App;



