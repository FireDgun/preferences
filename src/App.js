import "./App.css";
import { BrowserRouter } from "react-router-dom";
import Layout from "./layout/Layout";
import Router from "./routes/Router";
import { UserProvider } from "./providers/UserProvider";
import { StageTwoProvider } from "./providers/StageTwoProvider";

function App() {
  return (
    <BrowserRouter>
      <UserProvider>
        <StageTwoProvider>
          <Layout>
            <Router />
          </Layout>
        </StageTwoProvider>
      </UserProvider>
    </BrowserRouter>
  );
}

export default App;
