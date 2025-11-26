import { BrowserRouter, Routes, Route } from "react-router-dom";

import Signin from "./src/pages/Signin";
import Signon from "./src/pages/Signon";
import Signup from "./src/pages/Signup";

function AppRoutes() {
    return (
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Signin />} />
          <Route path="/signon/:id" element={<Signon />} />
          <Route path="/signup" element={<Signup />} />
        </Routes>
      </BrowserRouter>
    );
  }
  
  export default AppRoutes;