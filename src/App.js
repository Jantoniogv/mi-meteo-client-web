import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { routes } from "./config/routes";

//import AuthProvider from "./providers/AuthProvider";

import "./App.scss";

function App() {
  //const { user, isLoading } = useAuth();
  return (
    <div className="app">
      <Router>
        <Routes>
          {routes.map((route, index) => (
            <Route
              key={index}
              path={route.path}
              element={
                <route.layout>
                  <route.component />
                </route.layout>
              }
            />
          ))}
        </Routes>
      </Router>
    </div>
  );
}

export default App;
