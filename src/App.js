import { Route, Routes } from "react-router-dom";
import { Home } from "./pages/Home";
import "./styles/Global.css"
import { Ress } from "./pages/Ress";
import {KindeProvider} from "@kinde-oss/kinde-auth-react";

function App() {
  return (
    <>
    <KindeProvider
		clientId="3413125080834b118ab45d958d31ae9a"
		domain="https://deliveryyyyy.kinde.com"
		redirectUri="http://localhost:3000"
		logoutUri="http://localhost:3000"
	>
    <div className="App">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/ress" element={<Ress/>}></Route>
      </Routes>
    </div>
    </KindeProvider>
    </>
  );
}

export default App;
