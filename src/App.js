import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState } from "react";
import { routes } from "./routes/routes";

import "./App.scss";

function App() {
  const [location, setLocation] = useState("iznajar");

  return (
    <div className="app">
      <Router>
        <Routes>
          {routes.map((route, index) => (
            <Route
              key={index}
              path={route.path}
              element={
                <route.layout location={location} setLocation={setLocation}>
                  <route.component location={location} />
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
