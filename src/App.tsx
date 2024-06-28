import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import { KidDevProvider } from "./model/KDContext";
import { KidDevLanding } from "./pages/KidDevLanding";
import { KidDev } from "./pages/kidDevHome";

function App() {
  return (
    <KidDevProvider>
      <BrowserRouter basename={process.env.PUBLIC_URL}>
        <Routes>
          <Route path="/" element={<KidDevLanding />} />
          <Route path="home" element={<KidDev />} />
        </Routes>
      </BrowserRouter>
    </KidDevProvider>
  )
}

export default App;
